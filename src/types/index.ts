export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  WORD_CLOUD = 'WORD_CLOUD',
  OPEN_TEXT = 'OPEN_TEXT',
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: Option[];
  isActive?: boolean;
}

export interface Room {
  id: string;
  questions: Question[];
  activeQuestionId?: string;
}

export interface WordCloudItem {
  text: string;
  value: number;
}

export interface MultipleChoiceResult {
  [optionId: string]: number;
}

export interface OpenTextResponse {
  id: string;
  text: string;
}