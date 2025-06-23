import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Products from "@/page/Products";
import Orders from "@/page/Orders";
import Category from "@/page/Category";
import ProductDetails from "@/page/ProductDetails";
import ManageUsers from "@/page/ManageUsers/ManageUsers";
import UserInfo from "@/page/ManageUsers/UserInfo";
import LandingPage from "@/page/LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/manag-users",
        element: <ManageUsers />,
      },
      {
        path: "/user-info/:id",
        element: <UserInfo />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
  },
]);

export default router;
