import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setUserEmail("");
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/dashboard/itinerary", label: "Itinerary Builder", icon: "🗺️" },
    { path: "/dashboard/trips", label: "Suggested Trips", icon: "✈️" },
    { path: "/dashboard/profile", label: "Profile", icon: "👤" },
    { path: "/dashboard/pricing", label: "Pricing", icon: "💳" },
    { path: "/dashboard/contact", label: "Contact Us", icon: "📧" }
  ];

  const styles = {
    navbar: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "70px"
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "800",
      color: "white",
      textDecoration: "none",
      letterSpacing: "-0.5px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "5px"
    },
    navItem: {
      color: "white",
      textDecoration: "none",
      padding: "10px 18px",
      borderRadius: "10px",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    },
    activeNavItem: {
      background: "rgba(255,255,255,0.25)",
      fontWeight: "600"
    },
    logoutButton: {
      background: "rgba(255,255,255,0.2)",
      color: "white",
      border: "2px solid white",
      padding: "10px 24px",
      borderRadius: "10px",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginLeft: "15px"
    },
    mobileMenuButton: {
      display: "none",
      background: "none",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      padding: "5px"
    }
  };

  const handleNavHover = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
    }
  };

  const handleNavLeave = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.background = "transparent";
    }
  };

  const handleLogoutHover = (e) => {
    e.currentTarget.style.background = "white";
    e.currentTarget.style.color = "#667eea";
    e.currentTarget.style.transform = "translateY(-2px)";
  };

  const handleLogoutLeave = (e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/dashboard" style={styles.logo}>
          <span>🌍</span>
          VoyageVista
        </Link>

        <div style={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? "active" : ""}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.activeNavItem : {})
                }}
                onMouseEnter={handleNavHover}
                onMouseLeave={handleNavLeave}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseEnter={handleLogoutHover}
            onMouseLeave={handleLogoutLeave}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;