import { useState } from 'react';
import { Question, OpenTextResponse } from '../../types';
import { useSocket } from '../../context/SocketContext';

interface OpenTextQuestionProps {
  question: Question;
  roomId: string;
  isTeacher?: boolean;
  results?: OpenTextResponse[];
}

const OpenTextQuestion = ({ 
  question, 
  roomId, 
  isTeacher = false,
  results = []
}: OpenTextQuestionProps) => {
  const { socket } = useSocket();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim() || !socket) return;
    
    socket.emit('submit-answer', {
      roomId,
      questionId: question.id,
      answer: answer.trim(),
    });
    
    setSubmitted(true);
  };

  return (
    <div className="card">
      <h3 className="text-xl mb-4">{question.text}</h3>
      
      {isTeacher ? (
        <div>
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((response) => (
                <div key={response.id} className="bg-gray-50 p-3 rounded">
                  {response.text}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Waiting for responses...</p>
          )}
          <div className="mt-4 text-sm text-muted">
            {results.length} {results.length === 1 ? 'response' : 'responses'} received
          </div>
        </div>
      ) : (
        <div>
          {!submitted ? (
            <>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Type your answer here"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!answer.trim()}
              >
                Submit Answer
              </button>
            </>
          ) : (
            <p className="text-green-600">Your answer has been submitted!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OpenTextQuestion;