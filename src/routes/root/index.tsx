import { Outlet } from 'react-router-dom';

import './Root.scss';

function Root() {
  return (
    <div className="root">
      <aside className="root__side-menu">Инфа</aside>
      <Outlet />
    </div>
  );
}

export default Root;
