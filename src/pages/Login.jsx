import { useLogin } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and Password required");
      return;
    }
    setError("");
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          console.log("loggedin successfully");
          navigate("/dashboard");
        },
        onError: (e) => console.log(e),
      }
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm  p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
