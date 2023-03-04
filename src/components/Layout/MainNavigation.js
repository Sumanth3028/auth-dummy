import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth' style={{marginRight:'0rem',fontSize:'20px'}}>Login</Link>
          </li>
          <li>
            <Link to='/profile' style={{marginRight:'0rem',fontSize:'20px'}}>Profile</Link>
          </li>
          <li>
            <button style={{marginRight:'35rem',fontSize:'20px'}}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
