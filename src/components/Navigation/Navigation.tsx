import { Link, NavLink } from 'react-router-dom';

import './Navigation.scss';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

type Anchor = 'left';

export default function Navigation() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="navigation"
    >
      <ul className="navigation-list">
        <li className="navigation-list__item">
          <NavLink
            className={({ isActive }) =>
              !isActive
                ? 'navigation-link'
                : 'navigation-link navigation-link_active'
            }
            to="/"
          >
            Главная
          </NavLink>
        </li>
        <li className="navigation-list__item">
          <NavLink
            className={({ isActive }) =>
              !isActive
                ? 'navigation-link'
                : 'navigation-link navigation-link_active'
            }
            to="/favourite"
          >
            Поиск совпадений
          </NavLink>
        </li>
        <li className="navigation-list__item">
          <Link className="navigation-link" to="#">
            Аналитика
          </Link>
        </li>
      </ul>
      <ul className="navigation-list">
        <li className="navigation-list__item">
          <Link className="navigation-link" to="#">
            Выход
          </Link>
        </li>
      </ul>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Меню</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
