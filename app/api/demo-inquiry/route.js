// The one piece of server code on this site.
//
// Everything else renders from data written in the components. This route
// exists for a single reason: the SMTP credentials that send a demo request to
// the sales inbox cannot sit in the browser, where anyone could open DevTools
// and use the company's mail account. There is no database and nothing is
// stored — the email is the record.
//
// If a send fails, the visitor is told so and asked to try again, because
// nothing else captured their request.

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

  try {
    await sendInquiryEmail(inquiry);
  } catch (error) {
    // Logged in full for the operator; the visitor gets a plain retry message
    // rather than anything about mail servers.
    console.error("Demo request could not be sent:", error);
    return Response.json(
      { error: "We could not send your request right now. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Your demo request has been sent." });
}
