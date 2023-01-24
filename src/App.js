import './App.scss';

// global styles
import './assets/styles/normalize.css'
import './assets/styles/flex-box.css'
import './assets/styles/global.css'

import {Route, Routes, useLocation} from "react-router-dom";
import React, {useEffect, useLayoutEffect} from "react";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import Profile from "./pages/profile/Profile";
import Qarzdorlar from "./pages/qarzdorlar/Qarzdorlar";
import AddQarz from "./pages/add-qarz/AddQarz";
import Qarzdor from "./pages/qarzdor/Qarzdor";
import Layout from "./pages/Layout/Layout";
import PageNotFound from "./components/page-not-found/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import useAuth from "./hooks/useAuth";
import {Slide, toast, ToastContainer} from "react-toastify";
import EditQarz from "./pages/edit-qarz/EditQarz";
import Archive from "./pages/archive/Archive";
import Xabar from "./pages/Xabar/Xabar";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

function App() {

  const { auth } = useAuth()
  useEffect(() => {
    if (auth?.username) {
      toast.success('Success !', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [auth])

  return (
    <div className='App'>
      <>
        <ToastContainer
            transition={Slide}
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </>
      <Wrapper>
        <Header />
        <Routes>
          <Route path='/' element={<Layout />}>
            {/*  Public routes */}
            <Route path='/sign-in' element={<SignIn />} />

            {/* Protectable routes  */}
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/xabar' element={<Xabar />} />
              <Route path='/qarzdorlar' element={<Qarzdorlar />} />
              <Route path='/qarzdorlar/:id' element={<Qarzdor />} />
              <Route path='/archive/:id' element={<Archive />} />
              <Route path='/add-qarz' element={<AddQarz />} />
              <Route path='/edit-qarz/:id' element={<EditQarz />} />
            </Route>

            {/* 404 */}
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Wrapper>
    </div>
  );
}

export default App;
