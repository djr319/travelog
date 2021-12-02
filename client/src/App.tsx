import { Dashboard, Journal, TripsForm, NavBar } from "Components";

import { UserProvider } from "Context";
import "firebase/compat/auth";
import ListOfTrips from "Components/Trips/ListofTrips/ListOfTrips";
import ViewPersonalTrip from "Components/Trips/ViewTrip/ViewTrip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { FirebaseAPI } from "Services";
import { StyledFirebaseAuth } from "react-firebaseui";

export default function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  // Listen to the Firebase Auth state and set the local state.

  const mockTrips = [
    {
      id: "string",
      destination: "Rome",
      dateFrom: "Monday",
      dateTo: "Friday",
      visits: "string",
      createdAt: "string",
    },
    {
      id: "string",
      destination: "Rome",
      dateFrom: "Monday",
      dateTo: "Friday",
      visits: "string",
      createdAt: "string",
    },
  ];
  const [trips, SetTrips] = useState(mockTrips);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const { auth, uiConfig } = FirebaseAPI.getConfig();

  if (!isSignedIn) {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        <Dashboard />
      </div>
    );
  }

  const user = FirebaseAPI.formatUser(auth);

  return (
    <div>
      <UserProvider value={user}>
        <a onClick={() => auth.signOut()}>Sign-out</a>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/trips"
              element={<ListOfTrips trips={trips} setTrips={SetTrips} />}
            />
            <Route path="/trips" element={<TripsForm />} />
            <Route path="/trip" element={<ViewPersonalTrip />} />
            <Route path="/trip/:id" element={<ViewPersonalTrip />} />
            {/*
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/planning" element={<Dashboard />} />
          <Route path="/notes" element={<Dashboard />} />
          <Route path="/route" element={<Dashboard />} />
          <Route path="/weather" element={<Dashboard />} />
          <Route path="/logout" element={<Dashboard />} />
          */}
            <Route path="journal" element={<Journal />} />
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
  );
}
