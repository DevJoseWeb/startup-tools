const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');

const { User } = require('../models');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ where: { email } }))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);

    user.password = undefined;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user)
    return res.status(400).send({ error: 'User not found' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' });

  user.password = undefined;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).send({ error: 'User not found' });

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
      context: {
        name: user.name,
        url: `${authConfig.resetPasswordUrl}/${token}`,
      },
    }, (err) => {
      if (err)
        return res.status(400).send({ error: 'Cannot send forgot password email' });

      return res.send();
    })
  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { token, password, password_confirm } = req.body;

  try {
    if (password !== password_confirm)
      return res.status(400).send({ error: 'Password confirmation mismatch' })

    const user = await User.findOne({ where: { passwordResetToken: token } });

    if (!user)
      return res.status(400).send({ error: 'Token invalid' });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'Token expired, generate a new one' });

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    res.send();
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Cannot reset password, try again' });
  }
});

module.exports = app => app.use('/api/auth', router);
