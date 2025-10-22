import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentDestination, setCurrentDestination] = useState(0);

  const destinations = [
    { name: "Paris", emoji: "🗼", color: "#FF6B9D" },
    { name: "Tokyo", emoji: "🗾", color: "#4A90E2" },
    { name: "Bali", emoji: "🏝️", color: "#50C878" },
    { name: "New York", emoji: "🗽", color: "#FFB347" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    floatingCircle: {
      position: "absolute",
      borderRadius: "50%",
      opacity: 0.1,
      animation: "float 20s infinite ease-in-out"
    },
    circle1: {
      width: "400px",
      height: "400px",
      background: "white",
      top: "-100px",
      right: "-100px",
      animationDelay: "0s"
    },
    circle2: {
      width: "300px",
      height: "300px",
      background: "white",
      bottom: "-50px",
      left: "-50px",
      animationDelay: "7s"
    },
    circle3: {
      width: "200px",
      height: "200px",
      background: "rgba(255,255,255,0.3)",
      top: "50%",
      left: "10%",
      animationDelay: "3s"
    },
    content: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center"
    },
    logo: {
      fontSize: "3.5rem",
      fontWeight: "800",
      color: "white",
      marginBottom: "10px",
      letterSpacing: "-2px",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)",
      animation: "fadeInDown 1s ease-out"
    },
    tagline: {
      fontSize: "1.2rem",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "40px",
      maxWidth: "600px",
      lineHeight: "1.6",
      animation: "fadeInUp 1s ease-out 0.2s both"
    },
    destinationBox: {
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "30px 50px",
      marginBottom: "50px",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      animation: "fadeInUp 1s ease-out 0.4s both",
      transition: "all 0.3s ease"
    },
    destinationEmoji: {
      fontSize: "4rem",
      marginBottom: "10px",
      display: "block",
      animation: "bounce 2s infinite"
    },
    destinationText: {
      fontSize: "1.5rem",
      color: "white",
      fontWeight: "600"
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      maxWidth: "900px",
      width: "100%",
      marginBottom: "50px",
      animation: "fadeInUp 1s ease-out 0.6s both"
    },
    featureCard: {
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      padding: "25px",
      borderRadius: "15px",
      border: "1px solid rgba(255,255,255,0.2)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    featureIcon: {
      fontSize: "2.5rem",
      marginBottom: "10px"
    },
    featureTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "white",
      marginBottom: "8px"
    },
    featureDesc: {
      fontSize: "0.9rem",
      color: "rgba(255,255,255,0.8)",
      lineHeight: "1.5"
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
      animation: "fadeInUp 1s ease-out 0.8s both"
    },
    button: {
      padding: "15px 40px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "50px",
      border: "none",
      cursor: "pointer",
      textDecoration: "none",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      display: "inline-block"
    },
    primaryButton: {
      background: "white",
      color: "#667eea"
    },
    secondaryButton: {
      background: "rgba(255,255,255,0.2)",
      color: "white",
      border: "2px solid white"
    }
  };

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-10px); }
      75% { transform: translateY(-30px) translateX(5px); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  const handleFeatureHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
  };

  const handleFeatureLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
  };

  const handleButtonHover = (e, isPrimary) => {
    if (isPrimary) {
      e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
      e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.3)";
    } else {
      e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
      e.currentTarget.style.background = "rgba(255,255,255,0.3)";
    }
  };

  const handleButtonLeave = (e, isPrimary) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    if (isPrimary) {
      e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    } else {
      e.currentTarget.style.background = "rgba(255,255,255,0.2)";
    }
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      {/* Floating Background Elements */}
      <div style={{...styles.floatingCircle, ...styles.circle1}}></div>
      <div style={{...styles.floatingCircle, ...styles.circle2}}></div>
      <div style={{...styles.floatingCircle, ...styles.circle3}}></div>

      <div style={styles.content}>
        <h1 style={styles.logo}>VoyageVista</h1>
        <p style={styles.tagline}>
          Your AI-powered travel companion for extraordinary journeys. 
          Discover personalized itineraries, hidden gems, and unforgettable experiences.
        </p>

        <div style={styles.destinationBox}>
          <span style={styles.destinationEmoji}>
            {destinations[currentDestination].emoji}
          </span>
          <div style={styles.destinationText}>
            Explore {destinations[currentDestination].name}
          </div>
        </div>

        <div style={styles.featuresGrid}>
          <div 
            style={styles.featureCard}
            onMouseEnter={handleFeatureHover}
            onMouseLeave={handleFeatureLeave}
          >
            <div style={styles.featureIcon}>🗺️</div>
            <div style={styles.featureTitle}>Smart Itineraries</div>
            <div style={styles.featureDesc}>
              AI-crafted travel plans tailored to your preferences and style
            </div>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={handleFeatureHover}
            onMouseLeave={handleFeatureLeave}
          >
            <div style={styles.featureIcon}>✨</div>
            <div style={styles.featureTitle}>Curated Experiences</div>
            <div style={styles.featureDesc}>
              Discover hidden gems and authentic local experiences
            </div>
          </div>

          <div 
            style={styles.featureCard}
            onMouseEnter={handleFeatureHover}
            onMouseLeave={handleFeatureLeave}
          >
            <div style={styles.featureIcon}>🌤️</div>
            <div style={styles.featureTitle}>Real-time Insights</div>
            <div style={styles.featureDesc}>
              Weather updates and travel tips for perfect planning
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <Link 
            to="/login" 
            style={{...styles.button, ...styles.primaryButton}}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonLeave(e, true)}
          >
            Get Started
          </Link>
          <Link 
            to="/signup" 
            style={{...styles.button, ...styles.secondaryButton}}
            onMouseEnter={(e) => handleButtonHover(e, false)}
            onMouseLeave={(e) => handleButtonLeave(e, false)}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;