import { Server } from 'http';
import app from './app';
import { Server as SocketIOServer } from 'socket.io';
import config from './app/config';

async function main() {
  const httpServer = new Server(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-session', ({ sessionId }) => {
      socket.join(sessionId);
      socket.to(sessionId).emit('user-joined');
    });

    socket.on('offer', ({ sessionId, offer }) => {
      socket.to(sessionId).emit('offer', offer);
    });

    socket.on('answer', ({ sessionId, answer }) => {
      socket.to(sessionId).emit('answer', answer);
    });

    socket.on('ice-candidate', ({ sessionId, candidate }) => {
      socket.to(sessionId).emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  httpServer.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

main();
