import { createBrowserRouter } from "react-router-dom";
import ProtectedLayout from "@/pages/protected";
import RootLayout from "@/pages";
import Dashboard from "@/pages/protected/dahsboard";
import Register from "@/pages/auth/register";
import AuthLayout from "@/pages/auth";
import Login from "@/pages/auth/login";
import { routeConstants } from "@/lib/routeConstants";
import AddEvent from "@/pages/protected/events/add";
import ListEvents from "@/pages/protected/events/list";
import EventDetails from "@/pages/protected/events/details";
import Profile from "@/pages/protected/profile";
import CreateLeads from "@/pages/protected/leads/create";
import ListLeads from "@/pages/protected/leads/list";
import MembersList from "@/pages/protected/members/list";
import Products from "@/pages/protected/products";

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "auth",
        element: <AuthLayout />,
      },

      {
        path: "app",
        element: <ProtectedLayout />,
        children: [
          {
            path: routeConstants.app.products,
            element: <Products />,
          },
        ],
      },
    ],
  },
]);
