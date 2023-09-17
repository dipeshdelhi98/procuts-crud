const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports={
    register: async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = new User({ username, password });
          await user.save();
          res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
          res.status(500).json({ error: 'Registration failed' });
        }
      },
      login:async (req, res) => {
        try {
          const { username, password } = req.body;
          const user = await User.findOne({ username });
      
          if (!user) return res.status(404).json({ error: 'User not found' });
      
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });
      
          const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
          res.status(200).json({ token });
        } catch (error) {
          res.status(500).json({ error: 'Login failed' });
        }
      }
}