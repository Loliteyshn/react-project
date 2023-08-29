import logo from '../img/logo.svg';
import style from './Header.module.css';

const Header = () => {
  return (
    <header className={style.header}>
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;