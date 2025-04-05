import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          if (route.isPrivate && !isAuthenticated) {
            return <Route key={index} path={route.path} element={<Navigate to="/login" replace />} />;
          }
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
