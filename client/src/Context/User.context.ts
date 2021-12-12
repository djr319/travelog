import React from 'react';
import { User } from 'Types';

const mockUser: User = {
  authenticated: false,
  userName: "",
  uid: "",
  photoURL: "",
  email: ''
};

export const UserContext: React.Context<User> = React.createContext(mockUser)
export const UserProvider = UserContext.Provider;
