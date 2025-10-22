import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import ItineraryBuilder from "./ItineraryBuilder";
import SuggestedTrips from "./SuggestedTrips";
import Profile from "./Profile";

const DashboardHome = () => {
  const { userEmail } = useContext(UserContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const recentTrips = [
    {
      id: 1,
      destination: "Paris, France",
      date: "March 2025",
      duration: "7 Days",
      image: "🗼",
      status: "Completed",
      highlights: "Eiffel Tower, Louvre Museum, Seine River Cruise"
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      date: "January 2025",
      duration: "10 Days",
      image: "🗾",
      status: "Completed",
      highlights: "Mount Fuji, Shibuya, Traditional Temples"
    },
    {
      id: 3,
      destination: "Bali, Indonesia",
      date: "December 2024",
      duration: "5 Days",
      image: "🏝️",
      status: "Completed",
      highlights: "Beach Resorts, Rice Terraces, Temples"
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      destination: "Dubai, UAE",
      date: "November 2025",
      duration: "6 Days",
      image: "🏜️",
      countdown: "12 days"
    }
  ];

  const quickStats = [
    { label: "Countries Visited", value: "12", icon: "🌍", color: "#667eea" },
    { label: "Total Trips", value: "24", icon: "✈️", color: "#764ba2" },
    { label: "Cities Explored", value: "45", icon: "🏙️", color: "#f093fb" },
    { label: "Upcoming Plans", value: "1", icon: "📅", color: "#4facfe" }
  ];

  const styles = {
    container: {
      minHeight: "calc(100vh - 70px)",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: "30px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
      maxWidth: "1400px",
      margin: "0 auto 40px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "20px",
      padding: "40px",
      color: "white",
      boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
      position: "relative",
      overflow: "hidden"
    },
    headerPattern: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "300px",
      height: "300px",
      background: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
      opacity: 0.5
    },
    greeting: {
      fontSize: "2.5rem",
      fontWeight: "800",
      marginBottom: "10px",
      position: "relative",
      zIndex: 2
    },
    userEmail: {
      fontSize: "1.2rem",
      opacity: 0.9,
      position: "relative",
      zIndex: 2
    },
    statsGrid: {
      maxWidth: "1400px",
      margin: "0 auto 40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px"
    },
    statCard: {
      background: "white",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    statIcon: {
      fontSize: "3rem",
      width: "70px",
      height: "70px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    },
    statContent: {
      flex: 1
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "800",
      color: "#2d3748",
      marginBottom: "5px"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "#718096",
      fontWeight: "500"
    },
    contentGrid: {
      maxWidth: "1400px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "30px"
    },
    section: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "25px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    tripsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "20px"
    },
    tripCard: {
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      borderRadius: "16px",
      padding: "25px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      border: "2px solid transparent"
    },
    tripEmoji: {
      fontSize: "3.5rem",
      marginBottom: "15px",
      display: "block"
    },
    tripDestination: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "10px"
    },
    tripDetails: {
      fontSize: "0.9rem",
      color: "#718096",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    tripHighlights: {
      fontSize: "0.85rem",
      color: "#4a5568",
      marginTop: "12px",
      lineHeight: "1.6",
      paddingTop: "12px",
      borderTop: "1px solid rgba(0,0,0,0.1)"
    },
    badge: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "600",
      marginTop: "10px"
    },
    completedBadge: {
      background: "#48bb78",
      color: "white"
    },
    upcomingBadge: {
      background: "#667eea",
      color: "white"
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#a0aec0"
    },
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "20px"
    },
    emptyText: {
      fontSize: "1.1rem",
      marginBottom: "10px"
    }
  };

  const handleStatHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)";
  };

  const handleStatLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  };

  const handleTripHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.borderColor = "#667eea";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.2)";
  };

  const handleTripLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerPattern}></div>
        <h1 style={styles.greeting}>{getGreeting()}! 👋</h1>
        <p style={styles.userEmail}>Welcome back, {userEmail || "Traveler"}</p>
      </div>

      <div style={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <div
            key={index}
            style={styles.statCard}
            onMouseEnter={handleStatHover}
            onMouseLeave={handleStatLeave}
          >
            <div style={{...styles.statIcon, background: `${stat.color}20`}}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.contentGrid}>
        {upcomingTrips.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span>🎯</span> Upcoming Adventures
            </h2>
            <div style={styles.tripsGrid}>
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  style={styles.tripCard}
                  onMouseEnter={handleTripHover}
                  onMouseLeave={handleTripLeave}
                >
                  <span style={styles.tripEmoji}>{trip.image}</span>
                  <div style={styles.tripDestination}>{trip.destination}</div>
                  <div style={styles.tripDetails}>
                    <span>📅</span> {trip.date}
                  </div>
                  <div style={styles.tripDetails}>
                    <span>⏱️</span> {trip.duration}
                  </div>
                  <div style={styles.tripDetails}>
                    <span>⏳</span> Starts in {trip.countdown}
                  </div>
                  <span style={{...styles.badge, ...styles.upcomingBadge}}>Upcoming</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <span>🗺️</span> Recent Trips
          </h2>
          <div style={styles.tripsGrid}>
            {recentTrips.map((trip) => (
              <div
                key={trip.id}
                style={styles.tripCard}
                onMouseEnter={handleTripHover}
                onMouseLeave={handleTripLeave}
              >
                <span style={styles.tripEmoji}>{trip.image}</span>
                <div style={styles.tripDestination}>{trip.destination}</div>
                <div style={styles.tripDetails}>
                  <span>📅</span> {trip.date}
                </div>
                <div style={styles.tripDetails}>
                  <span>⏱️</span> {trip.duration}
                </div>
                <div style={styles.tripHighlights}>
                  <strong>Highlights:</strong> {trip.highlights}
                </div>
                <span style={{...styles.badge, ...styles.completedBadge}}>{trip.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="itinerary" element={<ItineraryBuilder />} />
        <Route path="trips" element={<SuggestedTrips />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Dashboard;