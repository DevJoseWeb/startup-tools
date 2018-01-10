const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const { User } = require('../models');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  register: async (req, res) => {
    const { email } = req.body;

    try {
      if (await User.findOne({ where: { email } }))
        return res.status(400).send({ error: res.__('User already exists') });

      const user = await User.create(req.body);

      user.password = undefined;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: res.__('Registration failed') });
    }
  },

  authenticate: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).send({ error: res.__('User not found') });

      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: res.__('Invalid password') });

      user.password = undefined;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: res.__('Authentication failed') });
    }
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).send({ error: res.__('User not found') });

      const token = crypto.randomBytes(20).toString('hex');

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.update({
        passwordResetToken: token,
        passwordResetExpires: now,
      }, {
        where: { id: user.id },
      });

      mailer.sendMail({
        to: email,
        from: 'oi@rocketseat.com.br',
        template: 'auth/forgot_password',
        subject: 'Startup Tools | Recuperação de senha',
        context: {
          name: user.name,
          url: `${authConfig.resetPasswordUrl}/${token}`,
        },
      }, (err) => {
        if (err)
          return res.status(400).send({ error: res.__('Cannot send forgot password email') });

        return res.send();
      })
    } catch (err) {
      res.status(400).send({ error: res.__('Error on forgot password, try again') });
    }
  },

  resetPassword: async (req, res) => {
    const { token, password, password_confirm } = req.body;

    try {
      if (password !== password_confirm)
        return res.status(400).send({ error: res.__('Password confirmation mismatch') })

      const user = await User.findOne({ where: { passwordResetToken: token } });

      if (!user)
        return res.status(400).send({ error: 'Token invalid' });

      const now = new Date();

      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: res.__('Token expired, generate a new one') });

      user.password = password;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      await user.save();

      res.send();
    } catch (err) {
      res.status(400).send({ error: res.__('Cannot reset password, try again') });
    }
  },
};
