// Persistence for demo requests.
//
// Before this existed, app/api/demo-inquiry/route.js only emailed the inquiry.
// If the SMTP call failed the visitor got a 502 and the lead was gone — no
// record, no retry, no way to know it had happened. The route now records the
// inquiry first and treats the email as a notification that may fail.

const { getDb } = require("./db");

// node:sqlite rows have a null prototype; hand back plain objects so callers can
// serialise them (see the same note in contentStore.js).
const plain = (rows) => rows.map((row) => ({ ...row }));

/**
 * Records an inquiry with `email_status = 'pending'`.
 * Returns the new row's id.
 */
function saveInquiry(data) {
  const result = getDb()
    .prepare(
      `INSERT INTO demo_inquiries
         (full_name, email, phone, organization, industry, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(
      data.full_name,
      data.email,
      data.phone,
      data.organization,
      data.industry,
      data.description,
    );

  return Number(result.lastInsertRowid);
}

/** Marks the notification as delivered. */
function markEmailSent(id) {
  getDb()
    .prepare(
      `UPDATE demo_inquiries
          SET email_status = 'sent', email_error = NULL, updated_at = datetime('now')
        WHERE id = ?`,
    )
    .run(id);
}

/**
 * Marks the notification as failed, keeping the reason.
 *
 * The lead itself is still captured — this only records that nobody has been
 * told about it yet.
 */
function markEmailFailed(id, error) {
  getDb()
    .prepare(
      `UPDATE demo_inquiries
          SET email_status = 'failed', email_error = ?, updated_at = datetime('now')
        WHERE id = ?`,
    )
    .run(String(error && error.message ? error.message : error).slice(0, 500), id);
}

/** Inquiries whose notification never went out — the retry queue. */
function pendingNotifications(limit = 50) {
  return plain(getDb()
    .prepare(
      `SELECT * FROM demo_inquiries
        WHERE email_status IN ('pending', 'failed')
        ORDER BY created_at ASC
        LIMIT ?`,
    )
    .all(limit));
}

function countInquiries() {
  return getDb()
    .prepare(
      `SELECT
         COUNT(*)                                            AS total,
         SUM(CASE WHEN email_status = 'sent'   THEN 1 ELSE 0 END) AS sent,
         SUM(CASE WHEN email_status = 'failed' THEN 1 ELSE 0 END) AS failed
       FROM demo_inquiries`,
    )
    .get();
}

module.exports = {
  countInquiries,
  markEmailFailed,
  markEmailSent,
  pendingNotifications,
  saveInquiry,
};
