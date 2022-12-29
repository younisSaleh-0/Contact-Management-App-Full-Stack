import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import View from "./pages/ViewContact";
import Add from "./pages/AddContact";
import Edit from "./pages/EditContact";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import "./Style.scss";
import { spacing } from "@mui/system";

const App = () => {
  const [isToggled, setIsToggled] = useState(false);
  // layout
  const Layout = () => {
    return (
      <div className={` app  ${isToggled ? "darkMode" : "whiteMode"}`}>
        <div className="toggle__btn">
          <button onClick={() => setIsToggled(!isToggled)}>
            {isToggled ? (
              <span>
                <Brightness7Icon className="icon" />
              </span>
            ) : (
              <span>
                <DarkModeIcon className="icon left" />
              </span>
            )}
          </button>
        </div>

        <Navbar />
        {/* show if the user have been added successfully or not */}
        {/* <ToastContainer position="top-center" /> */}
        <Outlet />
      </div>
    );
  };

  // Create browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/update/:id",
          element: <Edit />,
        },
        {
          path: "/view/:id",
          element: <View />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
