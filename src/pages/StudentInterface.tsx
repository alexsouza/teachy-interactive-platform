import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { Question } from '../types';
import QuestionDisplay from '../components/questions/QuestionDisplay';

const StudentInterface = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { socket, isConnected } = useSocket();
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [studentName] = useState(() => sessionStorage.getItem('studentName') || 'Anonymous');
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (!socket || !roomId) return;

    // Join the room
    socket.emit('join-room', { roomId, studentName });

    // Listen for active question updates
    socket.on('question-activated', (data) => {
      if (data.roomId === roomId) {
        setActiveQuestion(data.question);
        setWaiting(false);
      }
    });

    // Check if there's already an active question
    socket.emit('get-active-question', { roomId }, (response: { question: Question | null }) => {
      if (response.question) {
        setActiveQuestion(response.question);
        setWaiting(false);
      }
    });

    return () => {
      socket.off('question-activated');
      // Leave room when component unmounts
      socket.emit('leave-room', { roomId });
    };
  }, [socket, roomId, studentName]);

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-center">Interactive Session</h1>
      <p className="text-center mb-8 text-muted">Room: {roomId}</p>
      
      {!isConnected && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
          Connecting to server...
        </div>
      )}
      
      {isConnected && waiting && (
        <div className="card text-center py-8">
          <h2 className="text-xl mb-4">Waiting for teacher to start a question</h2>
          <p className="text-muted">Please wait...</p>
        </div>
      )}
      
      {isConnected && activeQuestion && (
        <div>
          <QuestionDisplay
            question={activeQuestion}
            roomId={roomId || ''}
            isTeacher={false}
          />
        </div>
      )}
    </div>
  );
};

export default StudentInterface;