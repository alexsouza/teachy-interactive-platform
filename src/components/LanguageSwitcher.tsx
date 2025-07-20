import { useTranslation } from 'react-i18next';
import USFlag from '../assets/flags/us.svg';
import BRFlag from '../assets/flags/br.svg';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => changeLanguage('en')} 
        className={`p-1 rounded ${i18n.language === 'en' ? 'ring-2 ring-primary' : 'opacity-50'}`}
        title="English"
      >
        <USFlag className="w-6 h-6" />
      </button>
      <button 
        onClick={() => changeLanguage('pt')} 
        className={`p-1 rounded ${i18n.language === 'pt' ? 'ring-2 ring-primary' : 'opacity-50'}`}
        title="Português"
      >
        <BRFlag className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;