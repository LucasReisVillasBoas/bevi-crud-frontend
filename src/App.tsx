import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CreateProduct from "./pages/CreateProduct";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import ListProducts from "./pages/ListProducts";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { isTokenValid } from "./utils/auth";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());

  useEffect(() => {
    const tokenCheckInterval = setInterval(() => {
      setIsAuthenticated(isTokenValid());
    }, 1000);

    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <FeedbackProvider>
      <Router>
        {isAuthenticated && <Header />}
        <Routes>
          {/* Rotas publicas */}
          <Route path="/login" element={<Login />} />

          {/* Rotas protegidas */}
          <Route
            path="/"
            element={<ProtectedRoute element={<CreateProduct />} />}
          />
          <Route
            path="/produtos"
            element={<ProtectedRoute element={<ListProducts />} />}
          />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
};

export default App;
