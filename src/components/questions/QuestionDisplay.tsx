import { Question, QuestionType } from '../../types';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import WordCloudQuestion from './WordCloudQuestion';
import OpenTextQuestion from './OpenTextQuestion';

interface QuestionDisplayProps {
  question: Question;
  roomId: string;
  isTeacher?: boolean;
  results?: any;
}

const QuestionDisplay = ({ 
  question, 
  roomId, 
  isTeacher = false,
  results 
}: QuestionDisplayProps) => {
  switch (question.type) {
    case QuestionType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceQuestion 
          question={question} 
          roomId={roomId} 
          isTeacher={isTeacher} 
          results={results} 
        />
      );
    case QuestionType.WORD_CLOUD:
      return (
        <WordCloudQuestion 
          question={question} 
          roomId={roomId} 
          isTeacher={isTeacher} 
          results={results} 
        />
      );
    case QuestionType.OPEN_TEXT:
      return (
        <OpenTextQuestion 
          question={question} 
          roomId={roomId} 
          isTeacher={isTeacher} 
          results={results} 
        />
      );
    default:
      return <div>Unsupported question type</div>;
  }
};

export default QuestionDisplay;