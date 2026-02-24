import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [role, setRole] = useState("user"); // user or admin
  const navigate = useNavigate();

  // 🔹 Handle Login
  const handleLogin = () => {
    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    // 🔐 Admin Login
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", "admin");
        alert("Admin Login Successful");
        navigate("/admin");
      } else {
        alert("Invalid Admin Credentials");
      }
      return;
    }

    // 👤 User Login
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      u => u.username === username && u.password === password
    );

    if (validUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem("username", username);
      alert("User Login Successful");
      navigate("/products");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSignup = () => {
    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    if (username === "admin") {
      alert("Admin account cannot be created here");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.username === username);

    if (userExists) {
      alert("Username already exists");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    setIsSignupMode(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Header />

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.heading}>
            {isSignupMode ? "Signup" : "Login"}
          </h2>

          {/* 🔹 Role Selection */}
          {!isSignupMode && (
            <div style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setRole("user")}
                style={{
                  ...styles.roleButton,
                  background: role === "user" ? "#00e5ff" : "#ccc"
                }}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                style={{
                  ...styles.roleButton,
                  background: role === "admin" ? "#ff9800" : "#ccc"
                }}
              >
                Admin
              </button>
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {isSignupMode ? (
            <>
              <button style={styles.button} onClick={handleSignup}>
                Signup
              </button>

              <p style={styles.text}>
                Already have an account?{" "}
                <span
                  style={styles.link}
                  onClick={() => setIsSignupMode(false)}
                >
                  Login
                </span>
              </p>
            </>
          ) : (
            <>
              <button style={styles.button} onClick={handleLogin}>
                Login
              </button>

              <p style={styles.text}>
                Don't have an account?{" "}
                <span
                  style={styles.link}
                  onClick={() => {
                    setRole("user"); // Signup only for user
                    setIsSignupMode(true);
                  }}
                >
                  Signup
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 140px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    width: "360px",
    padding: "45px 40px",
    borderRadius: "22px",
    background: "rgb(226, 156, 156)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
    textAlign: "center",
    color: "#fff"
  },

  heading: {
    marginBottom: "25px",
    fontWeight: "700",
    fontSize: "26px"
  },

  input: {
    width: "100%",
    maxWidth: "280px",
    padding: "14px 16px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "#fff",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    maxWidth: "280px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(90deg, #00e5ff, #1de9b6)",
    color: "#000",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  },

  roleButton: {
    width: "130px",
    padding: "10px",
    margin: "5px",
    borderRadius: "10px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    color: "#000"
  },

  text: {
    marginTop: "22px",
    fontSize: "14px"
  },

  link: {
    color: "#00f2ff",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default Login; 