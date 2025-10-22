import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    lane: "",
    city: "",
    state: "",
    country: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, form);
      if (res.data.success) {
        alert("Signup successful!");
        navigate("/login");
      } else alert(res.data.message);
    } catch {
      alert("Signup failed.");
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
      padding: "40px 20px",
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
      width: "400px",
      height: "400px",
      top: "-150px",
      right: "-100px",
      animation: "float 18s infinite ease-in-out"
    },
    circle2: {
      width: "250px",
      height: "250px",
      bottom: "-80px",
      left: "-60px",
      animation: "float 22s infinite ease-in-out 6s"
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "45px 40px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      width: "100%",
      maxWidth: "500px",
      position: "relative",
      zIndex: 10,
      animation: "slideUp 0.6s ease-out"
    },
    logo: {
      fontSize: "1.8rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      marginBottom: "8px",
      letterSpacing: "-1px"
    },
    title: {
      fontSize: "1.7rem",
      fontWeight: "700",
      color: "#2d3748",
      textAlign: "center",
      marginBottom: "8px"
    },
    subtitle: {
      fontSize: "0.95rem",
      color: "#718096",
      textAlign: "center",
      marginBottom: "30px"
    },
    form: {
      display: "flex",
      flexDirection: "column"
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "15px"
    },
    inputGroup: {
      marginBottom: "15px",
      position: "relative"
    },
    label: {
      fontSize: "0.85rem",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "6px",
      display: "block"
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "0.95rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box"
    },
    select: {
      width: "100%",
      padding: "12px 16px",
      fontSize: "0.95rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box",
      background: "white",
      cursor: "pointer"
    },
    button: {
      width: "100%",
      padding: "15px",
      fontSize: "1.05rem",
      fontWeight: "600",
      color: "white",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed"
    },
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "0.95rem",
      color: "#718096"
    },
    link: {
      color: "#667eea",
      fontWeight: "600",
      textDecoration: "none",
      transition: "color 0.3s ease"
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-25px) translateX(15px); }
      50% { transform: translateY(-15px) translateX(-15px); }
      75% { transform: translateY(-35px) translateX(8px); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
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
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Start your adventure with us today</p>
        
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input
                style={styles.input}
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Gender</label>
              <select
                style={styles.select}
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address Lane</label>
            <input
              style={styles.input}
              placeholder="Street address"
              value={form.lane}
              onChange={(e) => setForm({ ...form, lane: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>City</label>
              <input
                style={styles.input}
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>State</label>
              <input
                style={styles.input}
                placeholder="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Country</label>
            <input
              style={styles.input}
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <button
            type="submit"
            style={{...styles.button, ...(isLoading ? styles.buttonDisabled : {})}}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;