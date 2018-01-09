module.exports = {
  "secret": process.env.SECRET_KEY || "d41d8cd98f00b204e9800998ecf8427e",
  "saltRounds": 10,
  "resetPasswordUrl": process.env.RESET_PASSWORD_URL || "http://localhost:3001/reset-password"
}
