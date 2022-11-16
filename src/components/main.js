import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { auth, onAuthStateChanged } from "../service/firebase";
// import Header from "./header";
import Login from "./login";

const Main = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {/* <Header/> */}

      {!user ? (
        // display the login form
        <Login />
      ) : (
        <div className="app__body">{/* Rest of the app */}</div>
      )}
    </div>
  );
};
export default Main;
