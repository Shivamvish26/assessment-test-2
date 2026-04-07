import { Link, useNavigate } from "react-router-dom";

export default function NavbarHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BlogApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/create">
                Create Post
              </Link>
            </li>

            {user ? (
              <>
                <div className="d-flex align-items-center">
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/profile">
                      {user.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <i
                      className="bi bi-box-arrow-right text-white fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    ></i>
                  </li>
                </div>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
