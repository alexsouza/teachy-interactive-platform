import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold text-primary">
          Teachy Interactive
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="hover:text-primary">Teacher</Link>
            </li>
            <li>
              <Link to="/join" className="hover:text-primary">Student</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;