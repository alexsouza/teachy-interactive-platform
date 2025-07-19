import { useState, useEffect, useRef } from 'react';
import { Question, WordCloudItem } from '../../types';
import { useSocket } from '../../context/SocketContext';

interface WordCloudQuestionProps {
  question: Question;
  roomId: string;
  isTeacher?: boolean;
  results?: WordCloudItem[];
}

const WordCloudQuestion = ({ 
  question, 
  roomId, 
  isTeacher = false,
  results = []
}: WordCloudQuestionProps) => {
  const { socket } = useSocket();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const cloudContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (!answer.trim() || !socket) return;
    
    socket.emit('submit-answer', {
      roomId,
      questionId: question.id,
      answer: answer.trim(),
    });
    
    setSubmitted(true);
  };

  useEffect(() => {
    if (isTeacher && results.length > 0 && cloudContainerRef.current) {
      // In a real implementation, we would use d3-cloud to render the word cloud
      // This is a simplified version for demonstration purposes
      const container = cloudContainerRef.current;
      container.innerHTML = '';
      
      results.forEach(item => {
        const wordElement = document.createElement('span');
        wordElement.textContent = item.text;
        wordElement.style.fontSize = `${Math.max(12, Math.min(48, item.value * 5))}px`;
        wordElement.style.padding = '0.5rem';
        wordElement.style.display = 'inline-block';
        wordElement.style.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        container.appendChild(wordElement);
      });
    }
  }, [isTeacher, results]);

  return (
    <div className="card">
      <h3 className="text-xl mb-4">{question.text}</h3>
      
      {isTeacher ? (
        <div>
          <div 
            ref={cloudContainerRef} 
            className="min-h-[200px] bg-gray-50 rounded p-4 text-center"
          >
            {results.length === 0 && (
              <p className="text-muted">Waiting for responses...</p>
            )}
          </div>
          <div className="mt-4 text-sm text-muted">
            {results.length} {results.length === 1 ? 'response' : 'responses'} received
          </div>
        </div>
      ) : (
        <div>
          {!submitted ? (
            <>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a word or short phrase"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  maxLength={30}
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

export default WordCloudQuestion;