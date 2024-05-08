import HomePage from "../../views/pages/home";
import LoginPage from "../../views/pages/login";

const routes = {
  public: [
    {
      path: "/login",
      component: LoginPage,
      key: "login"
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
