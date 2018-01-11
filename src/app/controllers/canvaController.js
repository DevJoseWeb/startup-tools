const bcrypt = require('bcryptjs');

const { Canva, User } = require('../models');

module.exports = {
  list: async (req, res) => {
    const { userId } = req;

    try {
      const canvas = await Canva.findAll({
        where: { userId },
        order: [
          ['updatedAt', 'DESC'],
        ],
      });

      return res.send({ canvas });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas list failed') });
    }
  },

  show: async (req, res) => {
    const { id } = req.params;

    try {
      const canva = await Canva.findById(id);

      if (!canva)
        return res.status(400).send({ error: res.__('Canvas not found') });

      if (canva.isPublic !== true)
        return res.status(401).send({ error: res.__('Canvas is not public') });

      return res.send({ canva });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas show failed') });
    }
  },

  create: async (req, res) => {
    const { userId } = req;

    try {
      const user = await User.findOne({ where: { id: userId } });

      if (!user)
        return res.status(400).send({ error: res.__('User doesn\'t exists') });

      const canva = await Canva.create({
        userId,
        title: 'Novo canvas',
        board: [],
      });

      return res.send({ canva });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas creation failed') });
    }
  },

  update: async (req, res) => {
    const { userId, params: { id }, body: { title, board } } = req;

    try {
      const canva = await Canva.findById(id);

      if (!canva)
        return res.status(401).send({ error: res.__('Canvas not found') });

      if (canva.userId != userId)
        return res.status(401).send({ error: res.__('User mismatch') });

      canva.title = title;
      canva.board = board;

      await canva.save();

      return res.send({ canva });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas update failed') });
    }
  },

  delete: async (req, res) => {
    const { userId, params: { id } } = req;

    try {
      const canva = await Canva.findById(id);

      if (!canva)
        return res.status(400).send({ error: res.__('Canvas not found') });

      if (canva.userId != userId)
        return res.status(401).send({ error: res.__('User mismatch') });

      await canva.destroy();

      return res.send();
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas delete failed') });
    }
  },

  share: async (req, res) => {
    const { userId, params: { id } } = req;

    try {
      const canva = await Canva.findById(id);

      if (!canva)
        return res.status(400).send({ error: res.__('Canvas not found') });

      if (canva.userId != userId)
        return res.status(401).send({ error: res.__('User mismatch') });

      canva.isPublic = true;

      await canva.save();

      return res.send({ canva });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas share failed') });
    }
  },

  unshare: async (req, res) => {
    const { userId, params: { id } } = req;

    try {
      const canva = await Canva.findById(id);

      if (!canva)
        return res.status(400).send({ error: res.__('Canvas not found') });

      if (canva.userId != userId)
        return res.status(401).send({ error: res.__('User mismatch') });

      canva.isPublic = false;

      await canva.save();

      return res.send({ canva });
    } catch (err) {
      return res.status(400).send({ error: res.__('Canvas share failed') });
    }
  },
};
