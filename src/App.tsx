import React, { FC, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { UsersPage } from "./components/Users/UsersContainer";
import { Login } from "./components/login/Login";
import { useEffect } from "react";
import { initializeApp } from "./redux/app-reducer";
import { connect } from 'react-redux';
import { compose } from "redux";
import { withRouter } from "./hoc/withRouter";
import withSuspense from "./hoc/withSuspense"
import { AppStateType } from "./redux/redux-store";
import s from './components/Navbar/Navbar.module.css';
import { Header } from "./components/Header/Header";
import ChatPage from "./pages/Chat/ChatPage";
import { AppBar, Avatar, Box, Button, createTheme, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { AccountBox, Menu } from "@mui/icons-material";
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import ChatIcon from '@mui/icons-material/Chat';
import logo from './img/logo.svg';

const DialogsContainer = withSuspense(lazy(() => import("./components/Dialogs/DialogsContainer") as Promise<{ default: React.ComponentType<any> }>));
const ProfileContainer = withSuspense(lazy(() => import("./components/Profile/ProfileContainer") as Promise<{ default: React.ComponentType<any> }>));
// const ChatPage = withSuspense(lazy(() => import("./pages/Chat/ChatPage") as Promise<{ default: React.ComponentType<any> }>));

type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & Props

const drawerWidth = 240;
interface Props {
  window?: () => Window;
}

const arr = [
  {
    key: 1,
    label: <Link to="/profile" style={{ textDecoration: 'none', color: '#0e0d12', fontFamily: '' }}>Profile</Link>,
    icon: <AccountBox />
  },
  {
    key: 2,
    label: <Link to="/dialogs" style={{ textDecoration: 'none', color: '#0e0d12' }}>Messages</Link>,
    icon: <ChatIcon />
  },
  {
    key: 3,
    label: <Link to="/users" style={{ textDecoration: 'none', color: '#0e0d12' }}>Users</Link>,
    icon: <GroupIcon />
  },
  {
    key: 4,
    label: <Link to="/chat" style={{ textDecoration: 'none', color: '#0e0d12' }}>Chat</Link>,
    icon: <ForumIcon />
  }
]




const App: FC<PropsType> = ({ initialized, initializeApp, window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  // if (!props.initialized) {
  //   return <Preloader />
  // }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div >
      {/* <Toolbar  /> */}
      <Typography variant="h6" textAlign={"center"} fontWeight={600}
        bgcolor={'primary.main'} color="secondary.main">
        Menu
      </Typography>
      <Divider />
      <List >
        {arr.map((item) => (
          <>
            <ListItem key={item.key} disablePadding >
              <ListItemButton color="secondary" sx={{ margin: '5% 5%' }} disableRipple>
                <ListItemIcon children={item.icon} />
                <Typography variant="subtitle1" >{item.label}</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}

      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth }, flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />

        <Box component='div' sx={{
          // marginLeft: '100px', width: '100%', backgroundColor: 'primary.main', height: '100vh',
          // border: 'solid 2px', borderColor: 'secondary.main'
        }}>
          <Routes>
            <Route path="/" element={<ProfileContainer />} />
            <Route path="/dialogs" element={<DialogsContainer />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersPage pageTitle={"Samurai"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<div> 404 NOT FOUND </div>} />
          </Routes>
        </Box>


      </Box>
      {/* <Box>
        
      </Box> */}
    </Box>


    // <div>
    //   <div className="app-wrapper">
    //     <Header />
    //     <Navbar />
    //     <div className="app-wrapper-content" >
    //       <Routes>
    //         <Route path="/" element={<ProfileContainer />} />
    //         <Route path="/dialogs" element={<DialogsContainer />} />
    //         <Route path="/profile/:userId?" element={<ProfileContainer />} />
    //         <Route path="/users" element={<UsersPage pageTitle={"Samurai"} />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="*" element={<div> 404 NOT FOUND </div>} />
    //       </Routes>
    //     </div>
    //   </div>
    // </div>



    // <Layout>
    //   <Header />
    //   <Content style={{ padding: '0 48px' }}>
    //     <Breadcrumb style={{ margin: '16px 0' }}>
    //       <Breadcrumb.Item>Home</Breadcrumb.Item>
    //       <Breadcrumb.Item>List</Breadcrumb.Item>
    //       <Breadcrumb.Item>App</Breadcrumb.Item>
    //     </Breadcrumb>
    //     <Layout
    //       style={{ padding: '24px 0', background: '#fff', borderRadius: '2px' }}
    //     >
    //       <Sider style={{ background: '#fff' }} width={200}>
    //         <Menu
    //           mode="inline"
    //           defaultSelectedKeys={['1']}
    //           defaultOpenKeys={['sub1']}
    //           style={{ height: '100%' }}
    //           items={arr}
    //         >
    //           {/* <SubMenu key={"sub1"} title="My Profile" >
    //             <Menu.Item key={"1"}><NavLink to="/profile" className={(navData) => (navData.isActive ? s.active : s.item)}>Profile</NavLink></Menu.Item>
    //             <Menu.Item key={"2"}><NavLink to="/dialogs" className={(navData) => (navData.isActive ? s.active : s.item)}>Messages</NavLink></Menu.Item>
    //           </SubMenu>
    //           <SubMenu key={"sub2"} title="Users" >
    //           <Menu.Item key={"3"}><NavLink to="/users" className={(navData) => (navData.isActive ? s.active : s.item)}>Users</NavLink></Menu.Item>
    //           </SubMenu>
    //           <SubMenu key={"sub3"} title="My Profile" >
    //             <Menu.Item key={"3"}>option 1</Menu.Item>
    //           </SubMenu> */}
    //         </Menu>
    //       </Sider>
    //       <Content style={{ padding: '0 24px', minHeight: 280 }}>
    //         <Routes>
    //           <Route path="/" element={<ProfileContainer />} />
    //           <Route path="/dialogs" element={<DialogsContainer />} />
    //           <Route path="/profile/:userId?" element={<ProfileContainer />} />
    //           <Route path="/users" element={<UsersPage pageTitle={"Samurai"} />} />
    //           <Route path="/login" element={<Login />} />
    //           <Route path="/chat" element={<ChatPage />} />
    //           <Route path="*" element={<div> 404 NOT FOUND </div>} />
    //         </Routes>
    //       </Content>
    //     </Layout>
    //   </Content>
    //   <Footer style={{ textAlign: 'center' }}>
    //     Ant Design ©{new Date().getFullYear()} Created by Ant UED
    //   </Footer>
    // </Layout>

    // <div className="app-wrapper">
    //   <Header />
    //   <Navbar />
    //   <div className="app-wrapper-content" >
    //     <Routes>
    //       <Route path="/" element={<ProfileContainer />} />
    //       <Route path="/dialogs" element={<DialogsContainer />} />
    //       <Route path="/profile/:userId?" element={<ProfileContainer />} />
    //       <Route path="/users" element={<UsersPage pageTitle={"Samurai"} />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="*" element={<div> 404 NOT FOUND </div>} />
    //     </Routes>
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized
})

// let AppContainer = compose(
//   withRouter,
//   connect(mapStateToProps, { initializeApp })
// )(App);


// const MainApp = (props) => {
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <AppContainer />
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// }

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>
    (mapStateToProps, { initializeApp })
)(App);

// const { Content, Footer, Sider } = Layout;

// const arr: MenuProps['items'] = [
//   {
//     key: 'sub1',
//     label: 'My Profile',
//     children: [
//       {
//         key: 1,
//         label: <Link to="/profile">Profile</Link>
//       },
//       {
//         key: 2,
//         label: <Link to="/dialogs">Messages</Link>
//       }
//     ]
//   },
//   {
//     key: 'sub2',
//     label: 'Users',
//     children: [
//       {
//         key: 3,
//         label: <Link to="/users">Users</Link>
//       },
//     ]
//   },
//   {
//     key: 'sub3',
//     label: 'Chat',
//     children: [
//       {
//         key: 3,
//         label: <Link to="/chat">Chat</Link>
//       },
//     ]
//   }
// ]
// console.log(arr);


// const items2: MenuProps['items'] = arr.map((item, index) => {
//   const key = String(index + 1);

//   return {
//     ...item,
//     key: `sub${key}`,
//     children: item.children.map((child, j) => {
//       const subKey = `${key}-${j + 1}`;
//       return {
//         ...child,
//         key: subKey
//       }
//     })
//   }
// });
// console.log(items2);