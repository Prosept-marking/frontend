import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Navigation from '../Navigation';

import './Header.scss';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <Logo />
      </Link>
      <Navigation />
    </div>
  );
}
