import { useEffect, useState } from "react";
import { UserProvider } from "Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { FirebaseAPI, UserAPI } from "Services";
import Profile from "Components/Profile/Profile";
import ViewProfile from "Components/Profile/ViewProfile";
import {
  Header,
  Dashboard,
  Journal,
  TripsForm,
  NavBar,
  Notes,
  ListOfTrips,
  ViewPersonalTrip,
  Chat,
  Weather,
  Footer
} from "Components";
import logo from "./Assets/logo/logo.jpg";
import "./App.css";

// NOTE loads firebase's authorization service

const { auth, uiConfig } = FirebaseAPI.getConfig();

const queryClient = new QueryClient();

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
            firebaseAuth={firebase.auth()}
          />
        </div>
        <Dashboard />
        <Footer/>
      </div>
    );
  }

  // NOTE if login successful, query db to add user if not already listed
  UserAPI.checkUser(user);

  return (
    <div className="wrapper">
      <div className="app">
        <UserProvider value={user}>
          <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trips" element={<ListOfTrips />} />
              <Route path="/form" element={<TripsForm />} />
              <Route path="/trip" element={<ViewPersonalTrip />} />
              <Route path="/trip/:id" element={<ViewPersonalTrip />} />
              <Route path="/profile" element={<ViewProfile />} />
              <Route path="/updateProfile" element={<Profile />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/weather" element={<Weather />} />
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
            </QueryClientProvider>
          </BrowserRouter>
        </UserProvider>
      </div>
      <Footer />
    </div>
  );
}
