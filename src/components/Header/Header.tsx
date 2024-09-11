import { Link, NavLink } from 'react-router-dom';
import logo from '../../img/logo.svg';
import style from './Header.module.css';
import { FC } from 'react';
import { Menu, Layout, MenuProps, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';
import { AppDispatch } from '../../redux/redux-store';


const items1: MenuProps['items'] = ['1'].map((key) => ({
  key,
  label: <Link to="/users">Developers</Link>
}));

type PropsType = {}

export const Header: FC<PropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const dispatch: AppDispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout())
  }

  const { Header } = Layout

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />

      {isAuth
        ? <div>
          <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <Button onClick={logoutCallback}>Log out</Button>
        </div>
        : <Button> <Link to={'/login'}>Login</Link></Button>}
    </Header>
    // <header className={style.header}>
    //   <img src={logo} alt="" />

    //   <div className={style.loginBlock}>
    //     {props.isAuth
    //       ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
    //       : <NavLink to={'/login'}>Login</NavLink>}
    //   </div>
    // </header>
  );
};

