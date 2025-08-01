import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import { Question, QuestionType, Option } from '../types'

interface CreateQuestionFormProps {
  onQuestionCreated: (question: Question) => void
}

const CreateQuestionForm = ({ onQuestionCreated }: CreateQuestionFormProps) => {
  const { t } = useTranslation()
  const [questionText, setQuestionText] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.MULTIPLE_CHOICE
  )
  const [options, setOptions] = useState<Option[]>([
    { id: uuidv4(), text: '' },
    { id: uuidv4(), text: '' },
  ])

  const handleAddOption = () => {
    setOptions([...options, { id: uuidv4(), text: '' }])
  }

  const handleOptionChange = (id: string, text: string) => {
    setOptions(
      options.map((option) => (option.id === id ? { ...option, text } : option))
    )
  }

  const handleRemoveOption = (id: string) => {
    if (options.length <= 2) return // Keep at least 2 options
    setOptions(options.filter((option) => option.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!questionText.trim()) return

    // For multiple choice, validate options
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      const validOptions = options.filter((option) => option.text.trim() !== '')
      if (validOptions.length < 2) {
        alert('Please provide at least 2 options')
        return
      }

      const newQuestion: Question = {
        id: uuidv4(),
        text: questionText,
        type: questionType,
        options: validOptions,
      }

      onQuestionCreated(newQuestion)
    } else {
      // For other question types
      const newQuestion: Question = {
        id: uuidv4(),
        text: questionText,
        type: questionType,
      }

      onQuestionCreated(newQuestion)
    }

    // Reset form
    setQuestionText('')
    setQuestionType(QuestionType.MULTIPLE_CHOICE)
    setOptions([
      { id: uuidv4(), text: '' },
      { id: uuidv4(), text: '' },
    ])
  }

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-bold mb-4">
        {t('teacherDashboard.createQuestion')}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="questionText">
            {t('teacherDashboard.questionText')}
          </label>
          <input
            id="questionText"
            type="text"
            className="form-control"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={t('teacherDashboard.questionText')}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="questionType">
            {t('teacherDashboard.questionType')}
          </label>
          <select
            id="questionType"
            className="form-control"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          >
            <option value={QuestionType.MULTIPLE_CHOICE}>
              {t('teacherDashboard.multipleChoice')}
            </option>
            <option value={QuestionType.WORD_CLOUD}>
              {t('teacherDashboard.wordCloud')}
            </option>
            <option value={QuestionType.OPEN_TEXT}>
              {t('teacherDashboard.openText')}
            </option>
          </select>
        </div>

        {questionType === QuestionType.MULTIPLE_CHOICE && (
          <div className="form-group">
            <label>{t('teacherDashboard.options')}</label>
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(option.id, e.target.value)
                  }
                  placeholder={`${t('teacherDashboard.option')} ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => handleRemoveOption(option.id)}
                  disabled={options.length <= 2}
                >
                  {t('teacherDashboard.remove')}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline mt-2"
              onClick={handleAddOption}
            >
              {t('teacherDashboard.addOption')}
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-4">
          {t('teacherDashboard.create')}
        </button>
      </form>
    </div>
  )
}

export default CreateQuestionForm
