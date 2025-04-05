import Home from "../page/home/Home";
import Login from "../page/login/Login";
import JobDiscrip from "../page/jobDiscrip/JobDiscrip";

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
    path: "/jobdiscrip",
    element: <JobDiscrip />,
    isPrivate: true
  },
];

export default routes;
