import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-primary">
          {t('header.title')}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="mr-4">
            <ul className="flex gap-6">
              <li>
                <Link to="/" className="hover:text-primary">
                  {t('header.teacher')}
                </Link>
              </li>
              <li>
                <Link to="/join" className="hover:text-primary">
                  {t('header.student')}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
