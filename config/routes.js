import React from "react";
import { HashRouter, Redirect } from "react-router-dom";
import { Pcomp, Login, HomePage, Tacos } from "@src/components";
import ComponentsView from "@src/page/componentsView";

const routes = [
  {
    path: "/login",
    exact: true,
    requiresAuth: false,
    component: Login,
    render: () => <Redirect to={"/login"} />,
  },
  { path: "/homePage", exact: true, requiresAuth: false, component: HomePage },
  { path: "/componentsView", component: ComponentsView, requiresAuth: false },
  {
    path: "/page2",
    component: Pcomp,
    requiresAuth: false,
    routes: [
      {
        path: "/page2/child1",
        requiresAuth: false,
        exact: true,
        component: Tacos,
      },
      {
        path: "/page2/child2",
        exact: true,
        requiresAuth: false,
        component: Tacos,
      },
    ],
  },
];

export default routes;
