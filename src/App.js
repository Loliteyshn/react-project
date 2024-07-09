import React, { Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { initializeApp } from "./redux/app-reducer";
import { connect } from 'react-redux';
import { compose } from "redux";
import withRouter from "./hoc/withRouter";
import { withSuspense } from "./hoc/withSuspense";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = withSuspense(lazy(() => import("./components/Dialogs/DialogsContainer")));
const ProfileContainer = withSuspense(lazy(() => import("./components/Profile/ProfileContainer")));


const App = (props) => {
  useEffect(() => {
    props.initializeApp();
  }, [props.initializeApp]);

  // if (!props.initialized) {
  //   return <Preloader />
  // }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} />

          {/* <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/profile/:userId?" element={<ProfileContainer />} /> */}

          <Route path="/users" element={<UsersContainer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
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

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);