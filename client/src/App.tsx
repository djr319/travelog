import { useEffect, useState } from "react";
import { UserProvider } from "Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { StyledFirebaseAuth } from "react-firebaseui";
import "firebase/compat/auth";
import { FirebaseAPI, UserAPI } from "Services";
import { StyledFirebaseAuth } from "react-firebaseui";

import ViewProfile from "Components/Profile/ViewProfile";

import {
  Dashboard,
  Profile,
  Journal,
  TripsForm,
  NavBar,
  Notes,
  ListOfTrips,
  ViewPersonalTrip,
  Footer,
  Chat,
} from "Components";

import logo from "./Assets/logo.jpg";
import "./App.css";

// NOTE loads firebase's authorization service

const { auth, uiConfig } = FirebaseAPI.getConfig();

export default function App(): JSX.Element {
  const user = FirebaseAPI.formatUser(auth);

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div className="not-logged-in">
        <div className="auth-wrapper">
          <img src={logo} alt="Travelog logo" className="logo" />
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
          />
        </div>

        <div className="app">
          <Dashboard />
        </div>
        <Footer />
      </div>
    );
  }

  // NOTE if login successful, query db to add user if not already listed
  UserAPI.checkUser(user);

  return (
    <div className="wrapper">
      <div className="app">
        <UserProvider value={user}>
          <a onClick={() => auth.signOut()}>Sign-out</a>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trips" element={<ListOfTrips />} />
              <Route path="/form" element={<TripsForm />} />
              <Route path="/trip" element={<ViewPersonalTrip />} />
              <Route path="/trip/:id" element={<ViewPersonalTrip />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/viewProfile" element={<ViewProfile />} />

              {/*

          <Route path="/planning" element={<Dashboard />} />
          <Route path="/route" element={<Dashboard />} />
          <Route path="/weather" element={<Dashboard />} />
          <Route path="/logout" element={<Dashboard />} />
        */}

              <Route path="/journal" element={<Journal />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/chat" element={<Chat />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>We've wandered off the beaten track. Nothing here!</p>
                    <p>{"User: " + auth.currentUser?.displayName}</p>
                  </main>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </div>
      <Footer />
    </div>
  );
}
