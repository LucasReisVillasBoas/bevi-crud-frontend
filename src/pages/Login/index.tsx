import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/apiService";
import { HttpMethod } from "../../enums/httpMethods";
import { useFeedback } from "../../contexts/FeedbackContext";
import { LoginDTO } from "../../dtos/LoginDTO";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showFeedback } = useFeedback();

  // Handles form submission for login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData: LoginDTO = { email, password };

    try {
      const data = await apiService("/auth/login", {
        method: HttpMethod.POST,
        data: loginData,
      });

      // Store token and navigate upon successful login
      localStorage.setItem("token", data.access_token);
      showFeedback("Login bem-sucedido!", "success");
      navigate("/");
    } catch (error: any) {
      showFeedback(error.message || "Erro ao fazer login", "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow" style={{ width: "30rem" }}>
        <div className="card-header">
          <h2 className="m-0">Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

