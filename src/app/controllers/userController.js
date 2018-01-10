const bcrypt = require('bcryptjs');

const { User } = require('../models');

module.exports = {
  update: async (req, res) => {
    const { userId, body: { name, password, new_password, new_password_confirm } } = req;

    try {
      if (new_password && (new_password !== new_password_confirm))
        return res.status(400).send({ error: res.__('Password confirmation mismatch') });

      const user = await User.findById(userId);

      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: res.__('Invalid password') });

      user.name = name;

      if (new_password) {
        user.password = new_password;
      }

      await user.save();

      user.password = null;

      return res.send({ user });
    } catch (err) {
      return res.status(400).send({ error: res.__('Profile update failed') });
    }
  },
};
