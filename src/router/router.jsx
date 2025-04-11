import SignUpPersonal from '../pages/SignUp/SignUpPersonal'
import LoginPersonal from '../pages/Login/LoginPersonal'
import LoginBusiness from '../pages/Login/LoginBusiness'
import SignUpBusiness from '../pages/SignUp/SignUpBusiness'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import InputNewPassword from '../pages/ForgotPassword/InputNewPassword'
import AdminHome from '../pages/Admin/AminHome'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPersonal />,
    errorElement: <div>404 ERROR</div>,
  },
  {
    path: '/B',
    element: <LoginBusiness />,
  },
  {
    path: '/Home',
    element: <div>done</div>,
  },
  {
    path: '/SignUp',
    element: <SignUpPersonal />,
  },
  {
    path: '/ForgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/test',
    element: <AdminHome />,
  },
]);

export default router;
