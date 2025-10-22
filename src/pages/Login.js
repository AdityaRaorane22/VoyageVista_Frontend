import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password });
      if (res.data.success) {
        setUserEmail(email);
        navigate("/dashboard");
      } else alert(res.data.message);
    } catch {
      alert("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    floatingCircle: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.1,
      background: "white"
    },
    circle1: {
      width: "300px",
      height: "300px",
      top: "-100px",
      right: "-50px",
      animation: "float 15s infinite ease-in-out"
    },
    circle2: {
      width: "200px",
      height: "200px",
      bottom: "-50px",
      left: "-30px",
      animation: "float 20s infinite ease-in-out 5s"
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "50px 40px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      width: "100%",
      maxWidth: "420px",
      position: "relative",
      zIndex: 10,
      animation: "slideUp 0.6s ease-out"
    },
    logo: {
      fontSize: "2rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      marginBottom: "10px",
      letterSpacing: "-1px"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2d3748",
      textAlign: "center",
      marginBottom: "8px"
    },
    subtitle: {
      fontSize: "0.95rem",
      color: "#718096",
      textAlign: "center",
      marginBottom: "35px"
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    inputGroup: {
      marginBottom: "20px",
      position: "relative"
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "8px",
      display: "block"
    },
    input: {
      width: "100%",
      padding: "14px 18px",
      fontSize: "1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box"
    },
    inputIcon: {
      position: "absolute",
      right: "18px",
      top: "43px",
      fontSize: "1.2rem",
      color: "#a0aec0"
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "white",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
      position: "relative",
      overflow: "hidden"
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed"
    },
    footer: {
      textAlign: "center",
      marginTop: "25px",
      fontSize: "0.95rem",
      color: "#718096"
    },
    link: {
      color: "#667eea",
      fontWeight: "600",
      textDecoration: "none",
      transition: "color 0.3s ease"
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "25px 0",
      color: "#a0aec0",
      fontSize: "0.85rem"
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "#e2e8f0"
    },
    dividerText: {
      padding: "0 15px"
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-10px); }
      75% { transform: translateY(-30px) translateX(5px); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const handleInputFocus = (e) => {
    e.target.style.borderColor = "#667eea";
    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
  };

  const handleButtonHover = (e) => {
    if (!isLoading) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    }
  };

  const handleButtonLeave = (e) => {
    if (!isLoading) {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    }
  };

  const handleLinkHover = (e) => {
    e.target.style.color = "#764ba2";
    e.target.style.textDecoration = "underline";
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = "#667eea";
    e.target.style.textDecoration = "none";
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      <div style={{...styles.floatingCircle, ...styles.circle1}}></div>
      <div style={{...styles.floatingCircle, ...styles.circle2}}></div>

      <div style={styles.card}>
        <div style={styles.logo}>VoyageVista</div>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to continue your journey</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <span style={styles.inputIcon}>📧</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <span style={styles.inputIcon}>🔒</span>
          </div>

          <button
            type="submit"
            style={{...styles.button, ...(isLoading ? styles.buttonDisabled : {})}}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div style={styles.footer}>
          New to VoyageVista?{" "}
          <Link
            to="/signup"
            style={styles.link}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;