import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    let item = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(item)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(item);
  };

 const handleRegister = async (e) => {
  e.preventDefault();
  if (emailError || !email) {
    alert("Please fix all errors before submitting.");
    setEmail("");
    return;
  }
  let result = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  let data = await result.json();
  console.log(data);
  if (!result.ok) {
    alert(data.message);
    return;
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.auth);

    navigate("/");
  }
  setName("");
  setEmail("");
  setPassword("");
};

  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "92vh" }}
        >
          <form
            className="bg-white p-3 shadow-sm rounded"
            style={{ width: "400px" }}
            onSubmit={handleRegister}
          >
            <span className="fw-semibold fs-4">Register</span>
            <div className="line mb-3"></div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i class="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <span className="text-danger mt-3">
                {emailError ? "Please Enter the Valid Email Address" : ""}
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <div>
              <span className="d-block text-center mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none text-dark">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
