import * as React from "react";

import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Auth, { AuthContext } from "./middleware/auth";
import routes from "./routes";

const ProtectedRoute = ({ element, user, path }) => {
  const { handleSignIn, isAuthenticated } = React.useContext(AuthContext);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [loading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    handleSignIn().then((user) => {
      setHasPermission(user != null);
      setIsLoading(false);
    });
  }, []);

  if (!hasPermission) {
    return <Box />;
  }

  return element;
};

export default function App({ user }) {
  return (
    <Auth>
      <Routes>
        {/* Signed in user routes come last */}
        { routes.private.map(({ path, component: C, key: key }) => {
          return (
          <Route
            exact
            strict
            key={key}
            path={path}
            element={<ProtectedRoute user={user} path={path} element={<C />} />}
          ></Route>
        )})}
        {/* Anon must come first to enable overwrite later */}
        { routes.public.map(({ path, component: C, key: key }) => {
          return (
          <Route exact strict key={key} path={path} element={<C />} />
        )})}
      </Routes>
    </Auth>
  );
}
