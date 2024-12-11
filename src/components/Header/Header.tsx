import { Link, NavLink } from 'react-router-dom';
import logo from '../../img/logo.svg';
import style from './Header.module.css';
import { FC, useState } from 'react';
// import { Menu, Layout, MenuProps, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';
import { AppDispatch } from '../../redux/redux-store';
import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { AccountBox, Inbox, Mail, Menu } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';


// const items1: MenuProps['items'] = ['1'].map((key) => ({
//   key,
//   label: <Link to="/users">Developers</Link>
// }));

type PropsType = {
  drawerWidth: number,
  handleDrawerToggle: () => void
}

export const Header: FC<PropsType> = ({ drawerWidth, handleDrawerToggle }) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const dispatch: AppDispatch = useDispatch();



  const logoutCallback = () => {
    dispatch(logout())
  }



  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'secondary.main'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>
        {/* <Typography variant="h6" noWrap component="div" color="secondary"></Typography> */}
        <img src={logo} alt="" />
        <Box>

          {isAuth
            ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='subtitle2' color='primary.main' paddingRight={'5px'}>{login}</Typography>
              <Button variant='contained' size='small' startIcon={<LogoutIcon />} onClick={logoutCallback}>Log out</Button>
            </Box>
            : <Button variant='contained'><Link to={'/login'} style={{ textDecoration: 'none', color: '#262244' }}>Login</Link></Button>
          }
        </Box>

      </Toolbar>
    </AppBar>

    // <header className={style.header}>

    //   <img src={logo} alt="" />

    //   <div className={style.loginBlock}>
    //     {isAuth
    //       ? <div>{login} - <button onClick={logoutCallback}>Log out</button></div>
    //       : <NavLink to={'/login'}>Login</NavLink>}
    //   </div>
    // </header>


    // <Header style={{ display: 'flex', alignItems: 'center' }}>
    //   <div className="demo-logo" />
    //   <Menu
    //     theme="dark"
    //     mode="horizontal"
    //     defaultSelectedKeys={['2']}
    //     items={items1}
    //     style={{ flex: 1, minWidth: 0 }}
    //   />

    //   {isAuth
    //     ? <div>
    //       <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    //       <Button onClick={logoutCallback}>Log out</Button>
    //     </div>
    //     : <Button> <Link to={'/login'}>Login</Link></Button>}
    // </Header>

  );
};

