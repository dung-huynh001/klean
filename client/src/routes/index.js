import HeaderFooterLayout from "~/layouts/HeaderFooterLayout/HeaderFooterLayout";
import MainLayout from "~/layouts/MainLayout";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Profile from "~/pages/Profile";
import Register from "~/pages/Register";

const publicRoutes = [
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/register",
    component: Register,
    layout: null,
  },
];
const privateRoutes = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
  },
  {
    path: "/profile/:id",
    component: Profile,
    layout: HeaderFooterLayout,
  },
];

export { publicRoutes, privateRoutes };
