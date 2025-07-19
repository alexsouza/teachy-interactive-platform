import { useState } from 'react'
import { Question, OpenTextResponse } from '../../types'
import { useSocket } from '../../context/SocketContext'
import { useTranslation } from 'react-i18next'

interface OpenTextQuestionProps {
  question: Question
  roomId: string
  isTeacher?: boolean
  results?: OpenTextResponse[]
}

const OpenTextQuestion = ({
  question,
  roomId,
  isTeacher = false,
  results = [],
}: OpenTextQuestionProps) => {
  const { t } = useTranslation()
  const { socket } = useSocket()
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!answer.trim() || !socket) return

    socket.emit('submit-answer', {
      roomId,
      questionId: question.id,
      answer: answer.trim(),
    })

    setSubmitted(true)
  }

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
            <p className="text-muted">{t('openTextQuestion.waiting')}...</p>
          )}
          <div className="mt-4 text-sm text-muted">
            {results.length}{' '}
            {results.length === 1
              ? t('openTextQuestion.response')
              : t('openTextQuestion.responses')}{' '}
            {t('openTextQuestion.received')}
          </div>
        </div>
      ) : (
        <div>
          {!submitted ? (
            <>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder={t('openTextQuestion.placeholder')}
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
                {t('openTextQuestion.submitAnswer')}
              </button>
            </>
          ) : (
            <p className="text-green-600">
              {t('openTextQuestion.submitMessage')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default OpenTextQuestion
