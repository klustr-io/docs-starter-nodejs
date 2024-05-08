import * as React from "react";
import Login from "./auth/login";
import AuthTemplate from "../layouts/signin";

export default function LoginPage() {
  return AuthTemplate(<Login />);
}
