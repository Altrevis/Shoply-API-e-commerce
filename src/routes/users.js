import express from 'express';

const _users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let _nextId = 3;

const User = {
  async findAll() {
    return _users.map(u => ({ ...u }));
  },
  async findByPk(id) {
    const idx = _users.findIndex(u => u.id === Number(id));
    if (idx === -1) return null;
    // retourner une "instance" avec méthodes update/destroy compatibles
    const instance = { ..._users[idx] };
    instance.update = async (attrs) => {
      _users[idx] = { ..._users[idx], ...attrs };
      return { ..._users[idx] };
    };
    instance.destroy = async () => {
      _users.splice(idx, 1);
      return;
    };
    return instance;
  },
  async create(attrs) {
    const newUser = { id: _nextId++, ...attrs };
    _users.push(newUser);
    return { ...newUser };
  }
};

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name et email requis' });
    const created = await User.create({ name, email });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    const updated = await user.update(req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    await user.destroy();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
