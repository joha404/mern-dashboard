import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Dashboard from "@/page/Dashboard";
import Products from "@/page/Products";
import ManagUsers from "@/page/ManageUsers";
import Orders from "@/page/Orders";
import Category from "@/page/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/manag-users",
        element: <ManagUsers />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
  {
    path: "*",
    element: () => <h1>Page Not Found</h1>,
  },
]);

export default router;
