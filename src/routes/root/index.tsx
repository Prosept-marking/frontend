import { Outlet } from 'react-router-dom';

import './Root.scss';
import Header from '../../components/Header';

function Root() {
  return (
    <div className="root">
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
