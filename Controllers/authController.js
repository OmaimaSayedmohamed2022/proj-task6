const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your own secret key

// Simulating a user database
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'password3' }
];

function generateAccessToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '15m' });
}


function login(req, res) {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);


  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });

  res.json({ accessToken });
}


function refresh(req, res) {
  const refreshToken = req.body.refreshToken;

  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const accessToken = generateAccessToken(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    res.json({ accessToken });
  });
}

function logout(req, res) {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });

  res.json({ message: 'Logout successful' });
}

module.exports = {
  login,
  refresh,
  logout
};

