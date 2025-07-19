import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={() => changeLanguage('en')} 
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('pt')} 
        className={`px-2 py-1 rounded ${i18n.language === 'pt' ? 'bg-primary text-white' : 'bg-gray-200'}`}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageSwitcher;