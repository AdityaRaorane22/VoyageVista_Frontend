import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const SuggestedTrips = () => {
  const { userEmail } = useContext(UserContext);
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuggestedTrips();
    if (userEmail) {
      fetchUserStats();
    }
  }, [userEmail]);

  const fetchSuggestedTrips = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/suggested-trips`, {
        email: userEmail
      });
      if (res.data.success) {
        setTrips(res.data.trips);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user-stats/${userEmail}`);
      if (res.data.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
      textAlign: "center",
      marginBottom: "40px"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      color: "white",
      marginBottom: "10px",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)"
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "rgba(255,255,255,0.9)"
    },
    content: {
      maxWidth: "1400px",
      margin: "0 auto"
    },
    statsBar: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      marginBottom: "40px"
    },
    statCard: {
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      textAlign: "center",
      animation: "slideIn 0.5s ease-out"
    },
    statIcon: {
      fontSize: "2.5rem",
      marginBottom: "10px"
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "800",
      color: "#667eea",
      marginBottom: "5px"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "#718096",
      fontWeight: "600"
    },
    tripsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
      gap: "25px",
      marginTop: "30px"
    },
    tripCard: {
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      animation: "slideIn 0.5s ease-out"
    },
    tripHeader: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "30px",
      color: "white",
      position: "relative"
    },
    tripEmoji: {
      fontSize: "3rem",
      marginBottom: "10px"
    },
    tripDestination: {
      fontSize: "1.5rem",
      fontWeight: "800",
      marginBottom: "8px"
    },
    tripTagline: {
      fontSize: "0.95rem",
      opacity: 0.95,
      fontStyle: "italic"
    },
    tripBody: {
      padding: "25px"
    },
    section: {
      marginBottom: "20px"
    },
    sectionTitle: {
      fontSize: "0.85rem",
      fontWeight: "700",
      color: "#667eea",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    highlightsList: {
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    highlightItem: {
      fontSize: "0.9rem",
      color: "#4a5568",
      marginBottom: "6px",
      paddingLeft: "20px",
      position: "relative"
    },
    highlightBullet: {
      position: "absolute",
      left: 0,
      color: "#667eea"
    },
    infoText: {
      fontSize: "0.9rem",
      color: "#4a5568",
      lineHeight: "1.6"
    },
    badge: {
      display: "inline-block",
      padding: "6px 12px",
      background: "rgba(102, 126, 234, 0.1)",
      color: "#667eea",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "600",
      marginTop: "5px"
    },
    tipBox: {
      background: "#f7fafc",
      padding: "15px",
      borderRadius: "10px",
      borderLeft: "4px solid #667eea",
      marginTop: "15px"
    },
    tipIcon: {
      marginRight: "8px"
    },
    loader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px",
      color: "white"
    },
    spinner: {
      width: "60px",
      height: "60px",
      border: "4px solid rgba(255,255,255,0.3)",
      borderTop: "4px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "20px"
    },
    refreshButton: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      zIndex: 100
    }
  };

  const keyframes = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-10px)";
    e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.3)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
  };

  const handleRefreshHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
  };

  const handleRefreshLeave = (e) => {
    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>🌟 Discover Your Next Adventure</h1>
        <p style={styles.subtitle}>AI-curated destinations tailored just for you</p>
      </div>

      <div style={styles.content}>
        {/* User Stats */}
        {stats && (
          <div style={styles.statsBar}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>✈️</div>
              <div style={styles.statValue}>{stats.totalTrips}</div>
              <div style={styles.statLabel}>Trips Planned</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📅</div>
              <div style={styles.statValue}>{stats.totalDays}</div>
              <div style={styles.statLabel}>Days Traveled</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>🗺️</div>
              <div style={styles.statValue}>{stats.destinations.length}</div>
              <div style={styles.statLabel}>Destinations</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={styles.loader}>
            <div style={styles.spinner}></div>
            <p style={{fontSize: "1.2rem"}}>Finding perfect destinations for you...</p>
          </div>
        )}

        {/* Trips Grid */}
        {!isLoading && (
          <div style={styles.tripsGrid}>
            {trips.map((trip, idx) => (
              <div
                key={idx}
                style={styles.tripCard}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
              >
                <div style={styles.tripHeader}>
                  <div style={styles.tripEmoji}>{trip.image}</div>
                  <h3 style={styles.tripDestination}>{trip.destination}</h3>
                  <p style={styles.tripTagline}>{trip.tagline}</p>
                </div>

                <div style={styles.tripBody}>
                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>✨ Highlights</div>
                    <ul style={styles.highlightsList}>
                      {trip.highlights.map((highlight, i) => (
                        <li key={i} style={styles.highlightItem}>
                          <span style={styles.highlightBullet}>•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>📅 Best Time</div>
                    <p style={styles.infoText}>{trip.bestTime}</p>
                  </div>

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>💰 Budget</div>
                    <p style={styles.infoText}>{trip.budget}</p>
                  </div>

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>👥 Ideal For</div>
                    <span style={styles.badge}>{trip.idealFor}</span>
                  </div>

                  <div style={styles.section}>
                    <div style={styles.sectionTitle}>🎯 Must Try</div>
                    <p style={styles.infoText}>{trip.mustTry}</p>
                  </div>

                  <div style={styles.tipBox}>
                    <span style={styles.tipIcon}>💡</span>
                    <strong>Pro Tip:</strong> {trip.travelTip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        style={styles.refreshButton}
        onClick={fetchSuggestedTrips}
        onMouseEnter={handleRefreshHover}
        onMouseLeave={handleRefreshLeave}
        title="Get new suggestions"
      >
        🔄
      </button>
    </div>
  );
};

export default SuggestedTrips;