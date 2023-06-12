import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import SideDrawer from "./SideDrawer";
import Profile from "./Profile";
import Product from "./Product";
import CartItem from "./CartItem";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { fetchUser } from "./apiCall";

export default function App() {
  
  const [drawerState, setDrawerState]     = useState(false);
  const {auth, setAuth, authUser, setAuthUser}  = useAuth();
  
  useEffect(() => {
    (async () => {
      const user = await fetchUser();
      if(user) {
        setAuth(true);
        setAuthUser(user);
      }
    })();
  }, [setAuth, setAuthUser]);

  const toggleDrawer = open => event => {
    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerState(open);

  };

  return (
    <div>
      <Header 
        auth={auth} 
        setAuth={setAuth} 
        authUser={authUser} 
        setAuthUser={setAuthUser} 
        toggleDrawer={toggleDrawer}
      />
      <SideDrawer 
        auth={auth} 
        setAuth={setAuth} 
        authUser={authUser} 
        setAuthUser={setAuthUser}
        drawerState={drawerState} toggleDrawer={toggleDrawer} 
      /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            auth ? (
              <Home />
            ) : (
              <Login setAuth={setAuth} setAuthUser={setAuthUser} />          
            )}
        />
        <Route 
          path="/register" 
          element={
            auth ? (
              <Home />
            ) : (
              <Register />
            )} 
        />
        <Route 
          path="/profile/:id" 
          element={
            auth ? (
              <Profile auth={auth} authUser={authUser} />
            ): (
              <Login setAuth={setAuth} setAuthUser={setAuthUser} />              
            )} 
          />
        <Route 
          path="/products/:id"
          element={ 
            <Product />
          }
        />
        <Route 
          path="/cart"
          element={
            <CartItem />
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}