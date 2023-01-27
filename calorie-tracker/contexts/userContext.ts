import React from "react";

export const UserContext = React.createContext<{
  user?: User;
  fetchCurrentUser: () => void;
  isAdmin?: boolean;
  logout: () => void;
}>({
  user: {},
  fetchCurrentUser: () => { },
  isAdmin: false,
  logout: () => { }
});