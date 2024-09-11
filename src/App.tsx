import React, { FC, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Link, Route, Routes } from "react-router-dom";
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
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Header } from "./components/Header/Header";
import ChatPage from "./pages/Chat/ChatPage";

const { Content, Footer, Sider } = Layout;

const DialogsContainer = withSuspense(lazy(() => import("./components/Dialogs/DialogsContainer") as Promise<{ default: React.ComponentType<any> }>));
const ProfileContainer = withSuspense(lazy(() => import("./components/Profile/ProfileContainer") as Promise<{ default: React.ComponentType<any> }>));
// const ChatPage = withSuspense(lazy(() => import("./pages/Chat/ChatPage") as Promise<{ default: React.ComponentType<any> }>));

type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

const arr: MenuProps['items'] = [
  {
    key: 'sub1',
    label: 'My Profile',
    children: [
      {
        key: 1,
        label: <Link to="/profile">Profile</Link>
      },
      {
        key: 2,
        label: <Link to="/dialogs">Messages</Link>
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Users',
    children: [
      {
        key: 3,
        label: <Link to="/users">Users</Link>
      },
    ]
  },
  {
    key: 'sub3',
    label: 'Chat',
    children: [
      {
        key: 3,
        label: <Link to="/chat">Chat</Link>
      },
    ]
  }
]
console.log(arr);


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


const App: FC<PropsType> = ({ initialized, initializeApp }) => {
  const catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
    console.error(e);
  }
  useEffect(() => {
    initializeApp();
    // window.addEventListener("unhandledrejection", catchAllUnhandleErrors);

    // return () => {
    //   window.removeEventListener("unhandledrejection", catchAllUnhandleErrors);
    // }
  }, [initializeApp]);

  // if (!props.initialized) {
  //   return <Preloader />
  // }

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{ padding: '24px 0', background: '#fff', borderRadius: '2px' }}
        >
          <Sider style={{ background: '#fff' }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={arr}
            >
              {/* <SubMenu key={"sub1"} title="My Profile" >
                <Menu.Item key={"1"}><NavLink to="/profile" className={(navData) => (navData.isActive ? s.active : s.item)}>Profile</NavLink></Menu.Item>
                <Menu.Item key={"2"}><NavLink to="/dialogs" className={(navData) => (navData.isActive ? s.active : s.item)}>Messages</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key={"sub2"} title="Users" >
              <Menu.Item key={"3"}><NavLink to="/users" className={(navData) => (navData.isActive ? s.active : s.item)}>Users</NavLink></Menu.Item>
              </SubMenu>
              <SubMenu key={"sub3"} title="My Profile" >
                <Menu.Item key={"3"}>option 1</Menu.Item>
              </SubMenu> */}
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Routes>
              <Route path="/" element={<ProfileContainer />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersPage pageTitle={"Samurai"} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<div> 404 NOT FOUND </div>} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>

    // <div className="app-wrapper">
    //   <HeaderContainer />
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