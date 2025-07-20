import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`p-1 rounded border ${
          i18n.language === 'en' ? 'border-primary shadow-sm' : 'border-gray-200 opacity-70'
        }`}
        title="English"
      >
        <img src="https://flagcdn.com/w20/us.png" alt="English" className="w-6 h-4" />
      </button>
      <button
        onClick={() => changeLanguage('pt')}
        className={`p-1 rounded border ${
          i18n.language === 'pt' ? 'border-primary shadow-sm' : 'border-gray-200 opacity-70'
        }`}
        title="Português"
      >
        <img src="https://flagcdn.com/w20/br.png" alt="Português" className="w-6 h-4" />
      </button>
    </div>
  )
}

export default LanguageSwitcher
