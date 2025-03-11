import HomePage from "../../views/pages/home";
import LoginPage from "../../views/pages/login";

const routes = {
  public: [
    {
      path: "/login",
      component: LoginPage,
      key: "login"
    },
    {
      path: "/error",
      component: LoginPage,
      key: "error"
    },
  ],
  private: [
    {
      path: "/",
      component: HomePage,
      key: "home"
    }
  ],
};

export default routes;
