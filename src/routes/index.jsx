import Home from "../page/home/Home";
import Login from "../page/login/Login";
import JobDiscrip from "../page/jobDiscrip/JobDiscrip";
import AuthSuccess from "../page/login/AuthSuccess";

const routes = [
  {
    path: "/",
    element: <Home />,
    isPrivate: false
  },
  {
    path: "/login",
    element: <Login />,
    isPrivate: false
  },
  {
    path: "/authsuccess",
    element: <AuthSuccess />,
    isPrivate: false
  },
  {
    path: "/jobdiscrip",
    element: <JobDiscrip />,
    isPrivate: true
  },
];

export default routes;
