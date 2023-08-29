import logo from '../img/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="" className='logo' height={50} width={175} />
    </header>
  );
};

export default Header;