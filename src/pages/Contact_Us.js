import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
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
      marginBottom: "50px"
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "800",
      color: "white",
      marginBottom: "15px",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)"
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "rgba(255,255,255,0.9)",
      maxWidth: "600px",
      margin: "0 auto"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      alignItems: "start"
    },
    card: {
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      animation: "slideIn 0.5s ease-out"
    },
    formTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "25px",
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
      padding: "14px 18px",
      fontSize: "1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "14px 18px",
      fontSize: "1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box",
      minHeight: "150px",
      resize: "vertical"
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
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed"
    },
    successMessage: {
      background: "#48bb78",
      color: "white",
      padding: "15px 20px",
      borderRadius: "12px",
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "600",
      animation: "slideIn 0.5s ease-out"
    },
    infoSection: {
      marginTop: "40px"
    },
    contactMethods: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    contactItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "15px",
      padding: "20px",
      background: "#f7fafc",
      borderRadius: "12px",
      transition: "all 0.3s ease"
    },
    contactIcon: {
      fontSize: "2rem",
      minWidth: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "12px",
      color: "white"
    },
    contactDetails: {
      flex: 1
    },
    contactLabel: {
      fontSize: "0.85rem",
      color: "#718096",
      fontWeight: "600",
      marginBottom: "5px"
    },
    contactValue: {
      fontSize: "1.05rem",
      color: "#2d3748",
      fontWeight: "600"
    },
    socialSection: {
      marginTop: "30px"
    },
    socialTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "15px"
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap"
    },
    socialIcon: {
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "12px",
      fontSize: "1.5rem",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none"
    },
    mapSection: {
      marginTop: "30px",
      borderRadius: "16px",
      overflow: "hidden",
      height: "300px",
      background: "#f7fafc"
    },
    mapPlaceholder: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem"
    }
  };

  const keyframes = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
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
    if (!isSubmitting) {
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
    }
  };

  const handleButtonLeave = (e) => {
    if (!isSubmitting) {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
    }
  };

  const handleContactHover = (e) => {
    e.currentTarget.style.background = "#edf2f7";
    e.currentTarget.style.transform = "translateX(5px)";
  };

  const handleContactLeave = (e) => {
    e.currentTarget.style.background = "#f7fafc";
    e.currentTarget.style.transform = "translateX(0)";
  };

  const handleSocialHover = (e) => {
    e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
  };

  const handleSocialLeave = (e) => {
    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
  };

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📧 Get In Touch</h1>
          <p style={styles.subtitle}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div style={styles.grid}>
          {/* Left Side - Contact Form */}
          <div style={styles.card}>
            <h2 style={styles.formTitle}>
              <span>✍️</span> Send Us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Subject *</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
              </div>

              <button
                type="submit"
                style={{ ...styles.button, ...(isSubmitting ? styles.buttonDisabled : {}) }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message 📨"}
              </button>

              {submitted && (
                <div style={styles.successMessage}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div>
            <div style={styles.card}>
              <h2 style={styles.formTitle}>
                <span>📍</span> Contact Information
              </h2>

              <div style={styles.contactMethods}>
                <div
                  style={styles.contactItem}
                  onMouseEnter={handleContactHover}
                  onMouseLeave={handleContactLeave}
                >
                  <div style={styles.contactIcon}>📧</div>
                  <div style={styles.contactDetails}>
                    <div style={styles.contactLabel}>Email</div>
                    <div style={styles.contactValue}>support@voyagevista.com</div>
                  </div>
                </div>

                <div
                  style={styles.contactItem}
                  onMouseEnter={handleContactHover}
                  onMouseLeave={handleContactLeave}
                >
                  <div style={styles.contactIcon}>📞</div>
                  <div style={styles.contactDetails}>
                    <div style={styles.contactLabel}>Phone</div>
                    <div style={styles.contactValue}>+91 98765 43210</div>
                  </div>
                </div>

                <div
                  style={styles.contactItem}
                  onMouseEnter={handleContactHover}
                  onMouseLeave={handleContactLeave}
                >
                  <div style={styles.contactIcon}>📍</div>
                  <div style={styles.contactDetails}>
                    <div style={styles.contactLabel}>Address</div>
                    <div style={styles.contactValue}>
                      123 Travel Street, Mumbai, Maharashtra 400001, India
                    </div>
                  </div>
                </div>

                <div
                  style={styles.contactItem}
                  onMouseEnter={handleContactHover}
                  onMouseLeave={handleContactLeave}
                >
                  <div style={styles.contactIcon}>🕐</div>
                  <div style={styles.contactDetails}>
                    <div style={styles.contactLabel}>Business Hours</div>
                    <div style={styles.contactValue}>Mon - Fri: 9:00 AM - 6:00 PM IST</div>
                  </div>
                </div>
              </div>

              {/* ✅ Fixed Social Links Section */}
              <div style={styles.socialSection}>
                <h3 style={styles.socialTitle}>Connect With Us</h3>
                <div style={styles.socialIcons}>
                  <a
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📘
                  </a>
                  <a
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🐦
                  </a>
                  <a
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    title="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💼
                  </a>
                  <a
                    href="#"
                    style={styles.socialIcon}
                    onMouseEnter={handleSocialHover}
                    onMouseLeave={handleSocialLeave}
                    title="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📺
                  </a>
                </div>
              </div>

              <div style={styles.mapSection}>
                <div style={styles.mapPlaceholder}>🗺️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
