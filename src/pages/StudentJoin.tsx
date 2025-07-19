import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StudentJoin = () => {
  const { t } = useTranslation();
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if roomId is provided in URL
    const roomIdParam = searchParams.get('roomId');
    if (roomIdParam) {
      setRoomId(roomIdParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      setError(t('studentJoin.invalidCode'));
      return;
    }
    
    // Store student name in session storage
    if (name.trim()) {
      sessionStorage.setItem('studentName', name);
    }
    
    // Navigate to student interface with room ID
    navigate(`/student/${roomId}`);
  };

  return (
    <div className="py-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">{t('studentJoin.title')}</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name (Optional)</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="roomId">{t('studentJoin.enterCode')}</label>
            <input
              id="roomId"
              type="text"
              className="form-control"
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setError('');
              }}
              placeholder={t('studentJoin.enterCode')}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4">
            {t('studentJoin.join')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentJoin;