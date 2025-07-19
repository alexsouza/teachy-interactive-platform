import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import { Question, Room, QuestionType } from '../types'
import { useSocket } from '../context/SocketContext'
import CreateQuestionForm from '../components/CreateQuestionForm'
import QuestionDisplay from '../components/questions/QuestionDisplay'

const TeacherDashboard = () => {
  const { t } = useTranslation()
  const { socket, isConnected } = useSocket()
  const [room, setRoom] = useState<Room | null>(null)
  const [results, setResults] = useState<Record<string, any>>({})

  useEffect(() => {
    if (!socket) return

    // Create a room when component mounts
    if (!room) {
      const newRoomId = uuidv4()
      const newRoom: Room = {
        id: newRoomId,
        questions: [],
      }
      setRoom(newRoom)

      // Register room with server
      socket.emit('create-room', { roomId: newRoomId })
    }

    // Listen for answer submissions
    socket.on('answer-received', (data) => {
      setResults((prev) => {
        const questionResults = prev[data.questionId] || {}

        // Handle different question types
        if (data.questionType === QuestionType.MULTIPLE_CHOICE) {
          return {
            ...prev,
            [data.questionId]: {
              ...questionResults,
              [data.answer]: (questionResults[data.answer] || 0) + 1,
            },
          }
        } else if (data.questionType === QuestionType.WORD_CLOUD) {
          const wordCloudData = questionResults.wordCloud || []
          const existingWordIndex = wordCloudData.findIndex(
            (item: any) => item.text.toLowerCase() === data.answer.toLowerCase()
          )

          let newWordCloudData
          if (existingWordIndex >= 0) {
            newWordCloudData = [...wordCloudData]
            newWordCloudData[existingWordIndex] = {
              ...newWordCloudData[existingWordIndex],
              value: newWordCloudData[existingWordIndex].value + 1,
            }
          } else {
            newWordCloudData = [
              ...wordCloudData,
              { text: data.answer, value: 1 },
            ]
          }

          return {
            ...prev,
            [data.questionId]: {
              ...questionResults,
              wordCloud: newWordCloudData,
            },
          }
        } else if (data.questionType === QuestionType.OPEN_TEXT) {
          const responses = questionResults.responses || []
          return {
            ...prev,
            [data.questionId]: {
              ...questionResults,
              responses: [...responses, { id: uuidv4(), text: data.answer }],
            },
          }
        }

        return prev
      })
    })

    return () => {
      socket.off('answer-received')
    }
  }, [socket, room])

  const handleQuestionCreated = (question: Question) => {
    if (!room) return

    setRoom({
      ...room,
      questions: [...room.questions, question],
    })
  }

  const handleActivateQuestion = (questionId: string) => {
    if (!room || !socket) return

    const updatedRoom = {
      ...room,
      activeQuestionId: questionId,
    }

    setRoom(updatedRoom)

    // Notify server about active question
    socket.emit('activate-question', {
      roomId: room.id,
      questionId,
      question: room.questions.find((q) => q.id === questionId),
    })
  }

  const getJoinUrl = () => {
    if (!room) return ''
    return `${window.location.origin}/join?roomId=${room.id}`
  }

  const getActiveQuestion = () => {
    if (!room || !room.activeQuestionId) return null
    return room.questions.find((q) => q.id === room.activeQuestionId) || null
  }

  const getQuestionResults = (questionId: string) => {
    if (!results[questionId]) return undefined

    const questionData = results[questionId]
    const activeQuestion = room?.questions.find((q) => q.id === questionId)

    if (!activeQuestion) return undefined

    if (activeQuestion.type === QuestionType.MULTIPLE_CHOICE) {
      return questionData
    } else if (activeQuestion.type === QuestionType.WORD_CLOUD) {
      return questionData.wordCloud || []
    } else if (activeQuestion.type === QuestionType.OPEN_TEXT) {
      return questionData.responses || []
    }

    return undefined
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-4">{t('teacherDashboard.title')}</h1>

      {room && (
        <div className="mb-8">
          <div className="card mb-4">
            <h2 className="text-xl font-bold mb-2">
              {t('teacherDashboard.roomCode')}
            </h2>
            <p className="mb-2">
              {t('teacherDashboard.roomCode')}: {room.id}
            </p>
            <div className="form-group">
              <label>{t('teacherDashboard.shareLink')}: </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  value={getJoinUrl()}
                  readOnly
                />
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    navigator.clipboard.writeText(getJoinUrl())
                    alert(t('teacherDashboard.linkCopied'))
                  }}
                >
                  {t('teacherDashboard.copyLink')}
                </button>
              </div>
            </div>
          </div>

          <CreateQuestionForm onQuestionCreated={handleQuestionCreated} />

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {t('teacherDashboard.activeQuestions')}
            </h2>
            {room.questions.length === 0 ? (
              <p className="text-muted">{t('teacherDashboard.noQuestions')}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.questions.map((question) => (
                  <div key={question.id} className="card">
                    <h3 className="text-lg mb-2">{question.text}</h3>
                    <p className="text-sm text-muted mb-4">
                      {t('teacherDashboard.type')}: {question.type}
                    </p>
                    <button
                      className={`btn ${
                        question.id === room.activeQuestionId
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                      onClick={() => handleActivateQuestion(question.id)}
                      disabled={question.id === room.activeQuestionId}
                    >
                      {question.id === room.activeQuestionId
                        ? t('teacherDashboard.deactivate')
                        : t('teacherDashboard.activate')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {getActiveQuestion() && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {t('teacherDashboard.activeQuestions')}
              </h2>
              <QuestionDisplay
                question={getActiveQuestion()!}
                roomId={room.id}
                isTeacher={true}
                results={getQuestionResults(room.activeQuestionId!)}
              />
            </div>
          )}
        </div>
      )}

      {!isConnected && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
          {t('teacherDashboard.connecting')}...
        </div>
      )}
    </div>
  )
}

export default TeacherDashboard
