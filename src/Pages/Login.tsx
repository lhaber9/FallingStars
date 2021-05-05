import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavigationBar from "../Components/NavigationBar";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LoginPage = () => {
  return (
    <div style={{ marginTop: 100 }}>
      <NavigationBar />
      <LoginButton />
    </div>
  );
};

export default LoginPage;
