module.exports = {
  "transporter": process.env.MAIL_TRANSPORTER || "smtp",
  "host": process.env.MAIL_HOST || "smtp.mailtrap.io",
  "port": process.env.MAIL_PORT || 2525,
  "user": process.env.MAIL_USER || null,
  "pass": process.env.MAIL_PASS || null
}
