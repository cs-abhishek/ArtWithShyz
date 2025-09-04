require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ArtWithShyz Test API Server is running!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Mock authentication routes for frontend testing
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock login response
  if (email && password) {
    res.json({
      message: 'Login successful (mock)',
      token: 'mock-jwt-token-123',
      user: {
        id: 1,
        email: email,
        name: 'Test User'
      }
    });
  } else {
    res.status(400).json({
      message: 'Email and password are required'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Mock register response
  if (email && password) {
    res.status(201).json({
      message: 'Registration successful (mock)',
      token: 'mock-jwt-token-456',
      user: {
        id: 2,
        email: email,
        name: firstName ? `${firstName} ${lastName || ''}`.trim() : 'New User'
      }
    });
  } else {
    res.status(400).json({
      message: 'Email and password are required'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server without MongoDB
app.listen(PORT, () => {
  console.log(`🎨 ArtWithShyz Test API Server running on port ${PORT}`);
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log('⚠️ Using mock authentication for frontend testing');
  console.log('💡 To test with real database, ensure MongoDB is running');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
