import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userEmail } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchUserStats();
  }, [userEmail]);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userEmail}`);
      setProfile(res.data);
    } catch {
      alert("Failed to load profile");
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

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/update`, profile);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch {
      alert("Update failed!");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto"
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
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: "30px",
      marginTop: "30px"
    },
    card: {
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "30px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      animation: "slideIn 0.5s ease-out"
    },
    avatarSection: {
      textAlign: "center",
      marginBottom: "30px"
    },
    avatar: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "white",
      margin: "0 auto 15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
    },
    userName: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "5px"
    },
    userEmail: {
      fontSize: "0.95rem",
      color: "#718096"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "15px",
      marginTop: "20px"
    },
    statBox: {
      background: "#f7fafc",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center"
    },
    statValue: {
      fontSize: "1.8rem",
      fontWeight: "800",
      color: "#667eea",
      marginBottom: "5px"
    },
    statLabel: {
      fontSize: "0.85rem",
      color: "#718096",
      fontWeight: "600"
    },
    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    },
    inputGroup: {
      marginBottom: "20px"
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
      padding: "12px 16px",
      fontSize: "0.95rem",
      border: "2px solid #e2e8f0",
      borderRadius: "10px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box",
      background: "white"
    },
    inputDisabled: {
      background: "#f7fafc",
      cursor: "not-allowed"
    },
    buttonGroup: {
      display: "flex",
      gap: "15px",
      marginTop: "25px"
    },
    button: {
      flex: 1,
      padding: "14px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    primaryButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    secondaryButton: {
      background: "white",
      color: "#667eea",
      border: "2px solid #667eea"
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "60px"
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #667eea",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
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

  const handleInputFocus = (e) => {
    if (!e.target.disabled) {
      e.target.style.borderColor = "#667eea";
      e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
    }
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
  };

  const handleButtonHover = (e, isPrimary) => {
    if (isPrimary) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    } else {
      e.target.style.background = "#f7fafc";
    }
  };

  const handleButtonLeave = (e, isPrimary) => {
    e.target.style.transform = "translateY(0)";
    if (isPrimary) {
      e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    } else {
      e.target.style.background = "white";
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    return parts.length > 1 
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>👤 My Profile</h1>
          <p style={styles.subtitle}>Manage your account and travel preferences</p>
        </div>

        <div style={styles.grid}>
          {/* Left Side - Avatar & Stats */}
          <div>
            <div style={styles.card}>
              <div style={styles.avatarSection}>
                <div style={styles.avatar}>
                  {getInitials(profile.name)}
                </div>
                <h2 style={styles.userName}>{profile.name || "Traveler"}</h2>
                <p style={styles.userEmail}>{profile.email}</p>
              </div>

              {stats && (
                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statValue}>{stats.totalTrips}</div>
                    <div style={styles.statLabel}>Trips</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statValue}>{stats.totalDays}</div>
                    <div style={styles.statLabel}>Days</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statValue}>{stats.destinations.length}</div>
                    <div style={styles.statLabel}>Places</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Profile Form */}
          <div style={styles.card}>
            <h3 style={styles.sectionTitle}>
              <span>📋</span> Personal Information
            </h3>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.name || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Date of Birth</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                type="date"
                value={profile.dob || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Gender</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.gender || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address Lane</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.lane || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, lane: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>City</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.city || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>State</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.state || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Country</label>
              <input
                style={{...styles.input, ...(editMode ? {} : styles.inputDisabled)}}
                value={profile.country || ""}
                disabled={!editMode}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                style={{...styles.input, ...styles.inputDisabled}}
                value={profile.email || ""}
                disabled={true}
              />
            </div>

            <div style={styles.buttonGroup}>
              {editMode ? (
                <>
                  <button
                    style={{...styles.button, ...styles.primaryButton}}
                    onClick={handleSave}
                    onMouseEnter={(e) => handleButtonHover(e, true)}
                    onMouseLeave={(e) => handleButtonLeave(e, true)}
                  >
                    💾 Save Changes
                  </button>
                  <button
                    style={{...styles.button, ...styles.secondaryButton}}
                    onClick={() => {
                      setEditMode(false);
                      fetchProfile();
                    }}
                    onMouseEnter={(e) => handleButtonHover(e, false)}
                    onMouseLeave={(e) => handleButtonLeave(e, false)}
                  >
                    ✕ Cancel
                  </button>
                </>
              ) : (
                <button
                  style={{...styles.button, ...styles.primaryButton}}
                  onClick={() => setEditMode(true)}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonLeave(e, true)}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;