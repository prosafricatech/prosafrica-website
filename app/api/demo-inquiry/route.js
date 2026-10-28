const {
  markEmailFailed,
  markEmailSent,
  saveInquiry,
} = require("../../../services/leadStore");
const { sendInquiryEmail } = require("../../../services/mailService");

export const runtime = "nodejs";

const readField = (value) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return Response.json({ error: "Please submit a valid form." }, { status: 400 });
  }

  const full_name = readField(body?.full_name);
  const email = readField(body?.email);
  const phone = readField(body?.phone);
  const organization = readField(body?.organization_name);
  const industry = readField(body?.industry);
  const description = readField(body?.description);

  if (
    !full_name ||
    !email ||
    !phone ||
    !organization ||
    !industry ||
    !description
  ) {
    return Response.json(
      { error: "Complete all fields before submitting your request." },
      { status: 400 },
    );
  }

  if (
    full_name.length > 120 ||
    email.length > 254 ||
    phone.length > 40 ||
    organization.length > 160 ||
    industry.length > 100 ||
    description.length > 2000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json(
      { error: "Check your details and try again." },
      { status: 400 },
    );
  }

  const inquiry = { full_name, email, phone, organization, industry, description };

  // Record the lead before anything that can fail over the network. If this
  // throws we genuinely have not captured the request, so the visitor is asked
  // to retry; that is the only path that still loses data.
  let inquiryId;
  try {
    inquiryId = saveInquiry(inquiry);
  } catch (error) {
    console.error("Could not record demo request:", error);
    return Response.json(
      { error: "We could not record your request right now. Please try again." },
      { status: 503 },
    );
  }

  // The email is a notification about a lead we already hold. Failing to send
  // it is an internal problem to retry, not a reason to tell the visitor their
  // request did not go through — and not a reason to make them submit twice.
  try {
    await sendInquiryEmail(inquiry);
    markEmailSent(inquiryId);
  } catch (error) {
    console.error(`Demo request ${inquiryId} saved, notification failed:`, error);
    markEmailFailed(inquiryId, error);
  }

  return Response.json({ message: "Your demo request has been sent." });
}
