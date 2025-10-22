import React, { useState } from "react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
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
      marginBottom: "30px"
    },
    toggleContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      marginBottom: "40px"
    },
    toggleLabel: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "white"
    },
    toggle: {
      position: "relative",
      width: "70px",
      height: "35px",
      background: "rgba(255,255,255,0.3)",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    toggleSlider: {
      position: "absolute",
      width: "28px",
      height: "28px",
      background: "white",
      borderRadius: "50%",
      top: "3.5px",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
    },
    saveBadge: {
      display: "inline-block",
      padding: "5px 12px",
      background: "#48bb78",
      color: "white",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "700"
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    pricingGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "30px",
      marginTop: "40px"
    },
    pricingCard: {
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "40px 30px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
      position: "relative",
      animation: "slideIn 0.5s ease-out"
    },
    popularBadge: {
      position: "absolute",
      top: "-15px",
      right: "30px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "8px 20px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "700",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    planIcon: {
      fontSize: "3rem",
      marginBottom: "15px"
    },
    planName: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "10px"
    },
    planDescription: {
      fontSize: "0.95rem",
      color: "#718096",
      marginBottom: "25px",
      lineHeight: "1.6"
    },
    priceContainer: {
      marginBottom: "30px"
    },
    price: {
      fontSize: "3rem",
      fontWeight: "800",
      color: "#667eea",
      display: "flex",
      alignItems: "baseline",
      gap: "5px"
    },
    currency: {
      fontSize: "1.5rem"
    },
    period: {
      fontSize: "1rem",
      color: "#718096",
      fontWeight: "500"
    },
    featuresList: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 30px 0"
    },
    featureItem: {
      fontSize: "0.95rem",
      color: "#4a5568",
      marginBottom: "12px",
      paddingLeft: "30px",
      position: "relative",
      lineHeight: "1.5"
    },
    checkmark: {
      position: "absolute",
      left: 0,
      color: "#48bb78",
      fontSize: "1.2rem"
    },
    button: {
      width: "100%",
      padding: "16px",
      fontSize: "1.05rem",
      fontWeight: "600",
      borderRadius: "12px",
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
    faqSection: {
      maxWidth: "800px",
      margin: "80px auto 0",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
    },
    faqTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "30px",
      textAlign: "center"
    },
    faqItem: {
      marginBottom: "20px",
      paddingBottom: "20px",
      borderBottom: "1px solid #e2e8f0"
    },
    question: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#2d3748",
      marginBottom: "10px"
    },
    answer: {
      fontSize: "0.95rem",
      color: "#718096",
      lineHeight: "1.6"
    }
  };

  const keyframes = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  const plans = [
    {
      name: "Free Explorer",
      icon: "🌱",
      description: "Perfect for trying out VoyageVista",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "3 AI itineraries per month",
        "Basic destination suggestions",
        "Weather information",
        "Email support",
        "Community access"
      ],
      popular: false
    },
    {
      name: "Travel Pro",
      icon: "✈️",
      description: "For frequent travelers and explorers",
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        "Unlimited AI itineraries",
        "Personalized recommendations",
        "Advanced weather insights",
        "Priority support",
        "Save unlimited trips",
        "Budget optimization",
        "Meal preference customization"
      ],
      popular: true
    },
    {
      name: "Wanderlust Elite",
      icon: "🌟",
      description: "Ultimate travel planning experience",
      monthlyPrice: 999,
      yearlyPrice: 9990,
      features: [
        "Everything in Travel Pro",
        "Dedicated travel consultant",
        "Exclusive destination guides",
        "24/7 premium support",
        "Group trip planning",
        "Real-time travel alerts",
        "Custom itinerary refinement",
        "Partner discounts"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking for Indian customers."
    },
    {
      question: "Is there a free trial?",
      answer: "Our Free Explorer plan gives you a taste of VoyageVista. You can upgrade anytime to unlock premium features."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! You can cancel your subscription at any time with no questions asked. Your plan remains active until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full."
    }
  ];

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-10px)";
    e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.3)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
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

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>💎 Choose Your Adventure</h1>
        <p style={styles.subtitle}>Unlock the full potential of AI-powered travel planning</p>

        <div style={styles.toggleContainer}>
          <span style={{...styles.toggleLabel, opacity: billingCycle === "monthly" ? 1 : 0.6}}>
            Monthly
          </span>
          <div 
            style={styles.toggle}
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          >
            <div style={{
              ...styles.toggleSlider,
              left: billingCycle === "monthly" ? "3.5px" : "38.5px"
            }}></div>
          </div>
          <span style={{...styles.toggleLabel, opacity: billingCycle === "yearly" ? 1 : 0.6}}>
            Yearly
          </span>
          {billingCycle === "yearly" && (
            <span style={styles.saveBadge}>Save 17%</span>
          )}
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.pricingGrid}>
          {plans.map((plan, idx) => (
            <div
              key={idx}
              style={styles.pricingCard}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {plan.popular && <div style={styles.popularBadge}>MOST POPULAR</div>}
              
              <div style={styles.planIcon}>{plan.icon}</div>
              <h3 style={styles.planName}>{plan.name}</h3>
              <p style={styles.planDescription}>{plan.description}</p>

              <div style={styles.priceContainer}>
                <div style={styles.price}>
                  <span style={styles.currency}>₹</span>
                  <span>{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}</span>
                  <span style={styles.period}>/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
              </div>

              <ul style={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={styles.featureItem}>
                    <span style={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={{...styles.button, ...(plan.popular ? styles.primaryButton : styles.secondaryButton)}}
                onMouseEnter={(e) => handleButtonHover(e, plan.popular)}
                onMouseLeave={(e) => handleButtonLeave(e, plan.popular)}
              >
                {plan.monthlyPrice === 0 ? "Get Started Free" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        <div style={styles.faqSection}>
          <h2 style={styles.faqTitle}>❓ Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div key={idx} style={styles.faqItem}>
              <div style={styles.question}>{faq.question}</div>
              <div style={styles.answer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;