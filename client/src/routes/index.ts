import React, { Suspense, lazy } from 'react';

// Lazy load the components
const HeaderFooterLayout = lazy(() => import("~/layouts/HeaderFooterLayout/HeaderFooterLayout"));
const MainLayout = lazy(() => import("~/layouts/MainLayout"));
const Home = lazy(() => import("~/pages/Home"));
const Login = lazy(() => import("~/pages/Login"));
const Profile = lazy(() => import("~/pages/Profile"));
const Register = lazy(() => import("~/pages/Register"));
const CreateUser = lazy(() => import("~/pages/ManageUser/CreateUser"));
const UpdateUser = lazy(() => import("~/pages/ManageUser/UpdateUser"));
const UserList = lazy(() => import("~/pages/ManageUser/UserList"));

type AppRoute = {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any> | null;
};

const publicRoutes: AppRoute[] = [
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
  {
    path: "/profile",
    component: Profile,
    layout: HeaderFooterLayout,
  },
];

const privateRoutes: AppRoute[] = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
  },
  {
    path: "/profile/:id",
    component: Profile,
    layout: MainLayout,
  },
  {
    path: "/createUser",
    component: CreateUser,
    layout: MainLayout,
  },
  {
    path: "/updateUser",
    component: UpdateUser,
    layout: MainLayout,
  },
  {
    path: "/userList",
    component: UserList,
    layout: MainLayout,
  },
];

export { publicRoutes, privateRoutes };
