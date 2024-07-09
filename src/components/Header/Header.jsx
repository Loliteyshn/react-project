import { NavLink } from 'react-router-dom';
import logo from '../../img/logo.svg';
import style from './Header.module.css';

const Header = (props) => {
  return (
    <header className={style.header}>
      <img src={logo} alt="" />

      <div className={style.loginBlock}>
        {props.isAuth 
          ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
  );
};

export default Header;