const express = require('express');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/auth');

const { Canva, User } = require('../models');

const router = express.Router();

router.use(authMiddleware);

router.get('/from/:id', async (req, res) => {
  const { id } = req.params;

  if (req.userId != id)
    return res.status(401).send({ error: 'User mismatch' });

  try {
    const canvas = await Canva.findAll({ where: { userId: id } });

    return res.send({ canvas });
  } catch (err) {
    return res.status(400).send({ error: 'Canvas list failed.' });
  }
});

router.post('/', async (req, res) => {
  const { userId } = req;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user)
      return res.status(400).send({ error: 'User doesn\'t exists' });

    const canva = await Canva.create({
      userId,
      title: 'Novo canvas',
      board: [],
    });

    return res.send({ canva });
  } catch (err) {
    return res.status(400).send({ error: 'Canvas creation failed.' });
  }
});

router.put('/:id', async (req, res) => {
  const { userId, params: { id }, body: { title, board } } = req;

  try {
    const canva = await Canva.findById(id);

    if (!canva)
      return res.status(401).send({ error: 'Canvas not found' });

    if (canva.userId != userId)
      return res.status(401).send({ error: 'User mismatch' });

    canva.title = title;
    canva.board = board;

    await canva.save();

    return res.send({ canva });
  } catch (err) {
    return res.status(400).send({ error: 'Canvas update failed.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { userId, params: { id } } = req;

  try {
    const canva = await Canva.findById(id);

    if (!canva)
      return res.status(401).send({ error: 'Canvas not found' });

    if (canva.userId != userId)
      return res.status(401).send({ error: 'User mismatch' });

    canva.destroy();

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Canvas delete failed.' });
  }
});

module.exports = app => app.use('/api/canvas', router);
