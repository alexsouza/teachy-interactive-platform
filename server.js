const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Store active rooms and questions
const rooms = new Map();

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Create a new room
  socket.on('create-room', ({ roomId }) => {
    console.log(`Room created: ${roomId}`);
    rooms.set(roomId, {
      id: roomId,
      activeQuestion: null,
      students: new Set(),
    });
    
    socket.join(roomId);
  });
  
  // Join an existing room
  socket.on('join-room', ({ roomId, studentName }) => {
    console.log(`Student ${studentName} joined room: ${roomId}`);
    
    const room = rooms.get(roomId);
    if (room) {
      room.students.add(socket.id);
      socket.join(roomId);
      
      // Notify teacher about new student
      socket.to(roomId).emit('student-joined', {
        studentId: socket.id,
        studentName,
        count: room.students.size,
      });
    }
  });
  
  // Leave a room
  socket.on('leave-room', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.students.delete(socket.id);
      socket.leave(roomId);
      
      // Notify teacher about student leaving
      socket.to(roomId).emit('student-left', {
        studentId: socket.id,
        count: room.students.size,
      });
    }
  });
  
  // Activate a question
  socket.on('activate-question', ({ roomId, questionId, question }) => {
    const room = rooms.get(roomId);
    if (room) {
      room.activeQuestion = question;
      
      // Notify all students in the room
      io.to(roomId).emit('question-activated', {
        roomId,
        questionId,
        question,
      });
    }
  });
  
  // Get active question
  socket.on('get-active-question', ({ roomId }, callback) => {
    const room = rooms.get(roomId);
    if (room && callback) {
      callback({ question: room.activeQuestion });
    } else if (callback) {
      callback({ question: null });
    }
  });
  
  // Submit answer
  socket.on('submit-answer', ({ roomId, questionId, answer }) => {
    const room = rooms.get(roomId);
    if (room && room.activeQuestion && room.activeQuestion.id === questionId) {
      // Broadcast the answer to the teacher
      socket.to(roomId).emit('answer-received', {
        roomId,
        questionId,
        questionType: room.activeQuestion.type,
        answer,
      });
    }
  });
  
  // Disconnect handling
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove student from all rooms
    rooms.forEach((room, roomId) => {
      if (room.students.has(socket.id)) {
        room.students.delete(socket.id);
        
        // Notify teacher about student leaving
        socket.to(roomId).emit('student-left', {
          studentId: socket.id,
          count: room.students.size,
        });
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});