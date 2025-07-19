import { useState } from 'react';
import { Question } from '../../types';
import { useSocket } from '../../context/SocketContext';

interface MultipleChoiceQuestionProps {
  question: Question;
  roomId: string;
  isTeacher?: boolean;
  results?: Record<string, number>;
}

const MultipleChoiceQuestion = ({ 
  question, 
  roomId, 
  isTeacher = false,
  results
}: MultipleChoiceQuestionProps) => {
  const { socket } = useSocket();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption || !socket) return;
    
    socket.emit('submit-answer', {
      roomId,
      questionId: question.id,
      answer: selectedOption,
    });
    
    setSubmitted(true);
  };

  // Calculate percentages for teacher view
  const calculatePercentage = (optionId: string) => {
    if (!results) return 0;
    
    const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);
    if (totalVotes === 0) return 0;
    
    return Math.round((results[optionId] || 0) / totalVotes * 100);
  };

  return (
    <div className="card">
      <h3 className="text-xl mb-4">{question.text}</h3>
      
      <div className="flex flex-col gap-2 mb-4">
        {question.options?.map((option) => (
          <div key={option.id} className="flex items-center">
            {isTeacher ? (
              <div className="w-full">
                <div className="flex justify-between mb-1">
                  <span>{option.text}</span>
                  <span>{results?.[option.id] || 0} votes</span>
                </div>
                <div className="bg-gray-200 rounded-full h-4 w-full">
                  <div 
                    className="bg-primary h-4 rounded-full" 
                    style={{ width: `${calculatePercentage(option.id)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm mt-1">
                  {calculatePercentage(option.id)}%
                </div>
              </div>
            ) : (
              <label className="flex items-center gap-2 p-3 border rounded w-full cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  disabled={submitted}
                />
                {option.text}
              </label>
            )}
          </div>
        ))}
      </div>
      
      {!isTeacher && !submitted && (
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit Answer
        </button>
      )}
      
      {!isTeacher && submitted && (
        <p className="text-green-600">Your answer has been submitted!</p>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;