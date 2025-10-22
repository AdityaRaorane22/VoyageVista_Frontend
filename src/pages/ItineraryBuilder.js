import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const ItineraryBuilder = () => {
  const { userEmail } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    interests: [],
    budget: "",
    mealPreference: "",
    travelStyle: "",
    accommodation: "",
    pace: "",
    otherRequirements: ""
  });
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [chainOfThought, setChainOfThought] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [parsedItinerary, setParsedItinerary] = useState(null);

  const interestOptions = [
    { emoji: "🏔️", label: "Adventure", value: "adventure" },
    { emoji: "🏛️", label: "Culture", value: "culture" },
    { emoji: "🍜", label: "Food", value: "food" },
    { emoji: "🏖️", label: "Beach", value: "beach" },
    { emoji: "🛍️", label: "Shopping", value: "shopping" },
    { emoji: "📸", label: "Photography", value: "photography" },
    { emoji: "🧘", label: "Wellness", value: "wellness" },
    { emoji: "🎭", label: "Entertainment", value: "entertainment" }
  ];

  const parseItinerary = (text) => {
    const sections = {};
    let currentSection = "overview";
    let content = [];

    const lines = text.split("\n");
    
    for (let line of lines) {
      // Detect section headers
      if (line.match(/^#+\s/)) {
        if (content.length > 0) {
          sections[currentSection] = content.join("\n");
          content = [];
        }
        currentSection = line.replace(/^#+\s/, "").toLowerCase().replace(/[^a-z0-9]/g, "_");
      } else if (line.match(/^\*\*.*\*\*$/)) {
        if (content.length > 0) {
          sections[currentSection] = content.join("\n");
          content = [];
        }
        currentSection = line.replace(/\*\*/g, "").toLowerCase().replace(/[^a-z0-9]/g, "_");
      } else {
        content.push(line);
      }
    }
    
    if (content.length > 0) {
      sections[currentSection] = content.join("\n");
    }

    return sections;
  };

  useEffect(() => {
    if (result && !isGenerating) {
      setParsedItinerary(parseItinerary(result));
    }
  }, [result, isGenerating]);

  const handleGenerate = async () => {
    if (!formData.destination || !formData.days || formData.interests.length === 0) {
      alert("Please complete all required steps!");
      return;
    }

    setIsGenerating(true);
    setResult("");
    setChainOfThought([]);
    setWeatherInfo(null);
    setParsedItinerary(null);

    const thoughts = [
      "🔍 Analyzing your destination...",
      "🌡️ Checking weather conditions...",
      "💰 Optimizing for your budget...",
      "🍽️ Finding best local cuisines...",
      "🎯 Matching activities with your interests...",
      "📅 Creating day-by-day itinerary...",
      "✨ Adding personalized recommendations..."
    ];

    let thoughtIndex = 0;
    const thoughtInterval = setInterval(() => {
      if (thoughtIndex < thoughts.length) {
        setChainOfThought(prev => [...prev, thoughts[thoughtIndex]]);
        thoughtIndex++;
      } else {
        clearInterval(thoughtInterval);
      }
    }, 800);

    try {
      // Add other requirements to interests string
      const interestsString = [
        ...formData.interests,
        formData.travelStyle && `Travel Style: ${formData.travelStyle}`,
        formData.accommodation && `Accommodation: ${formData.accommodation}`,
        formData.pace && `Pace: ${formData.pace}`,
        formData.otherRequirements && `Special Requirements: ${formData.otherRequirements}`
      ].filter(Boolean).join(", ");

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/itinerary`, {
        destination: formData.destination,
        days: formData.days,
        interests: interestsString,
        budget: formData.budget,
        mealPreference: formData.mealPreference,
        email: userEmail,
      });

      clearInterval(thoughtInterval);
      
      if (res.data.success) {
        setResult(res.data.itinerary);
        if (res.data.weather) {
          setWeatherInfo(res.data.weather);
        }
      } else {
        setResult("Failed: " + res.data.error);
      }
    } catch (err) {
      clearInterval(thoughtInterval);
      setResult("Error generating itinerary. Try again!");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleInterest = (value) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }));
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>✈️ Where would you like to go?</h2>
            <p style={styles.stepSubtitle}>Tell us your dream destination</p>
            <input
              style={styles.largeInput}
              placeholder="e.g., Paris, Tokyo, Bali, New York..."
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              autoFocus
            />
          </div>
        );
      
      case 2:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>📅 How long is your adventure?</h2>
            <p style={styles.stepSubtitle}>Number of days you'll be traveling</p>
            <div style={styles.daysGrid}>
              {[3, 5, 7, 10, 14].map(d => (
                <button
                  key={d}
                  style={{
                    ...styles.optionCard,
                    ...(formData.days === d.toString() ? styles.optionCardActive : {})
                  }}
                  onClick={() => setFormData({...formData, days: d.toString()})}
                >
                  <div style={styles.optionEmoji}>📆</div>
                  <div style={styles.optionLabel}>{d} Days</div>
                </button>
              ))}
            </div>
            <input
              style={{...styles.input, marginTop: "20px"}}
              type="number"
              placeholder="Or enter custom number of days"
              value={formData.days}
              onChange={(e) => setFormData({...formData, days: e.target.value})}
              min="1"
              max="90"
            />
          </div>
        );
      
      case 3:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>🎯 What interests you?</h2>
            <p style={styles.stepSubtitle}>Select all that apply (choose at least one)</p>
            <div style={styles.interestsGrid}>
              {interestOptions.map(option => (
                <button
                  key={option.value}
                  style={{
                    ...styles.interestCard,
                    ...(formData.interests.includes(option.label) ? styles.interestCardActive : {})
                  }}
                  onClick={() => toggleInterest(option.label)}
                >
                  <div style={styles.interestEmoji}>{option.emoji}</div>
                  <div style={styles.interestLabel}>{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>💰 What's your budget?</h2>
            <p style={styles.stepSubtitle}>Per day spending range</p>
            <div style={styles.budgetGrid}>
              <button
                style={{
                  ...styles.budgetCard,
                  ...(formData.budget === "budget" ? styles.budgetCardActive : {})
                }}
                onClick={() => setFormData({...formData, budget: "budget"})}
              >
                <div style={styles.budgetEmoji}>💵</div>
                <div style={styles.budgetTitle}>Budget</div>
                <div style={styles.budgetAmount}>₹5K-15K/day</div>
                <div style={styles.budgetDesc}>Hostels, street food, local transport</div>
              </button>
              <button
                style={{
                  ...styles.budgetCard,
                  ...(formData.budget === "moderate" ? styles.budgetCardActive : {})
                }}
                onClick={() => setFormData({...formData, budget: "moderate"})}
              >
                <div style={styles.budgetEmoji}>💳</div>
                <div style={styles.budgetTitle}>Moderate</div>
                <div style={styles.budgetAmount}>₹15K-35K/day</div>
                <div style={styles.budgetDesc}>Comfort hotels, good restaurants</div>
              </button>
              <button
                style={{
                  ...styles.budgetCard,
                  ...(formData.budget === "luxury" ? styles.budgetCardActive : {})
                }}
                onClick={() => setFormData({...formData, budget: "luxury"})}
              >
                <div style={styles.budgetEmoji}>💎</div>
                <div style={styles.budgetTitle}>Luxury</div>
                <div style={styles.budgetAmount}>₹35K+/day</div>
                <div style={styles.budgetDesc}>Premium hotels, fine dining, private tours</div>
              </button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>🍽️ Food preferences?</h2>
            <p style={styles.stepSubtitle}>We'll recommend restaurants accordingly</p>
            <div style={styles.optionsGrid}>
              {[
                { value: "vegetarian", emoji: "🥗", label: "Vegetarian" },
                { value: "non-vegetarian", emoji: "🍗", label: "Non-Vegetarian" },
                { value: "vegan", emoji: "🌱", label: "Vegan" },
                { value: "no-preference", emoji: "🍴", label: "No Preference" }
              ].map(option => (
                <button
                  key={option.value}
                  style={{
                    ...styles.optionCard,
                    ...(formData.mealPreference === option.value ? styles.optionCardActive : {})
                  }}
                  onClick={() => setFormData({...formData, mealPreference: option.value})}
                >
                  <div style={styles.optionEmoji}>{option.emoji}</div>
                  <div style={styles.optionLabel}>{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 6:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>🎒 What's your travel style?</h2>
            <p style={styles.stepSubtitle}>How do you like to explore?</p>
            <div style={styles.optionsGrid}>
              {[
                { value: "solo", emoji: "🧳", label: "Solo Traveler" },
                { value: "couple", emoji: "💑", label: "Couple" },
                { value: "family", emoji: "👨‍👩‍👧‍👦", label: "Family with Kids" },
                { value: "friends", emoji: "👥", label: "Group of Friends" }
              ].map(option => (
                <button
                  key={option.value}
                  style={{
                    ...styles.optionCard,
                    ...(formData.travelStyle === option.value ? styles.optionCardActive : {})
                  }}
                  onClick={() => setFormData({...formData, travelStyle: option.value})}
                >
                  <div style={styles.optionEmoji}>{option.emoji}</div>
                  <div style={styles.optionLabel}>{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 7:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>⚡ What's your ideal pace?</h2>
            <p style={styles.stepSubtitle}>How much do you want to pack in?</p>
            <div style={styles.optionsGrid}>
              {[
                { value: "relaxed", emoji: "🧘", label: "Relaxed", desc: "2-3 activities per day" },
                { value: "moderate", emoji: "🚶", label: "Moderate", desc: "3-4 activities per day" },
                { value: "fast", emoji: "🏃", label: "Fast-Paced", desc: "5+ activities per day" }
              ].map(option => (
                <button
                  key={option.value}
                  style={{
                    ...styles.paceCard,
                    ...(formData.pace === option.value ? styles.paceCardActive : {})
                  }}
                  onClick={() => setFormData({...formData, pace: option.value})}
                >
                  <div style={styles.optionEmoji}>{option.emoji}</div>
                  <div style={styles.optionLabel}>{option.label}</div>
                  <div style={styles.paceDesc}>{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 8:
        return (
          <div style={styles.stepContainer}>
            <h2 style={styles.stepTitle}>✨ Any special requirements?</h2>
            <p style={styles.stepSubtitle}>Tell us anything else we should know (optional)</p>
            <textarea
              style={styles.textarea}
              placeholder="E.g., Wheelchair accessible, prefer morning activities, avoid crowded places, interested in specific festivals, need family-friendly options..."
              value={formData.otherRequirements}
              onChange={(e) => setFormData({...formData, otherRequirements: e.target.value})}
              rows="5"
            />
            <div style={styles.summaryBox}>
              <h3 style={styles.summaryTitle}>📋 Your Trip Summary</h3>
              <div style={styles.summaryItem}>📍 <strong>Destination:</strong> {formData.destination}</div>
              <div style={styles.summaryItem}>📅 <strong>Duration:</strong> {formData.days} days</div>
              <div style={styles.summaryItem}>🎯 <strong>Interests:</strong> {formData.interests.join(", ")}</div>
              <div style={styles.summaryItem}>💰 <strong>Budget:</strong> {formData.budget}</div>
              <div style={styles.summaryItem}>🍽️ <strong>Meals:</strong> {formData.mealPreference}</div>
              {formData.travelStyle && <div style={styles.summaryItem}>🎒 <strong>Style:</strong> {formData.travelStyle}</div>}
              {formData.pace && <div style={styles.summaryItem}>⚡ <strong>Pace:</strong> {formData.pace}</div>}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderItinerary = () => {
    if (!parsedItinerary) return null;

    return (
      <div style={styles.itineraryContainer}>
        {Object.entries(parsedItinerary).map(([section, content], idx) => {
          if (!content || content.trim() === "") return null;
          
          const sectionTitle = section
            .split("_")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          const getIcon = (section) => {
            if (section.includes("day")) return "📅";
            if (section.includes("restaurant") || section.includes("food")) return "🍽️";
            if (section.includes("accommodation") || section.includes("hotel")) return "🏨";
            if (section.includes("transport")) return "🚗";
            if (section.includes("packing")) return "🎒";
            if (section.includes("budget") || section.includes("cost")) return "💰";
            if (section.includes("safety") || section.includes("emergency")) return "🚨";
            if (section.includes("tip")) return "💡";
            return "📝";
          };

          return (
            <div key={idx} style={styles.itinerarySection}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>{getIcon(section)}</span>
                {sectionTitle}
              </h3>
              <div style={styles.sectionContent}>
                {content.split("\n").map((line, i) => {
                  if (!line.trim()) return null;
                  
                  // Format bold text
                  const formattedLine = line
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>');
                  
                  // Check if it's a bullet point
                  const isBullet = line.trim().startsWith("-") || line.trim().startsWith("•");
                  
                  return (
                    <div
                      key={i}
                      style={{
                        ...styles.contentLine,
                        ...(isBullet ? styles.bulletLine : {})
                      }}
                      dangerouslySetInnerHTML={{ __html: formattedLine }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "white"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      marginBottom: "10px",
      textShadow: "0 2px 10px rgba(0,0,0,0.2)"
    },
    subtitle: {
      fontSize: "1.1rem",
      opacity: 0.9
    },
    progressBar: {
      maxWidth: "800px",
      margin: "0 auto 40px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "50px",
      padding: "5px",
      display: "flex",
      gap: "5px"
    },
    progressStep: {
      flex: 1,
      height: "8px",
      borderRadius: "50px",
      background: "rgba(255,255,255,0.3)",
      transition: "all 0.3s ease"
    },
    progressStepActive: {
      background: "white",
      boxShadow: "0 0 10px rgba(255,255,255,0.5)"
    },
    mainCard: {
      maxWidth: "900px",
      margin: "0 auto",
      background: "white",
      borderRadius: "24px",
      padding: "50px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      minHeight: "500px",
      position: "relative"
    },
    stepContainer: {
      animation: "slideIn 0.5s ease-out"
    },
    stepTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "10px",
      textAlign: "center"
    },
    stepSubtitle: {
      fontSize: "1.1rem",
      color: "#718096",
      marginBottom: "40px",
      textAlign: "center"
    },
    largeInput: {
      width: "100%",
      padding: "20px 24px",
      fontSize: "1.3rem",
      border: "3px solid #e2e8f0",
      borderRadius: "16px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box",
      textAlign: "center"
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "1.1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box"
    },
    textarea: {
      width: "100%",
      padding: "16px 20px",
      fontSize: "1rem",
      border: "2px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      transition: "all 0.3s ease",
      fontFamily: "inherit",
      boxSizing: "border-box",
      resize: "vertical"
    },
    daysGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "15px"
    },
    interestsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: "15px"
    },
    interestCard: {
      background: "#f7fafc",
      border: "3px solid #e2e8f0",
      borderRadius: "16px",
      padding: "24px 16px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center"
    },
    interestCardActive: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderColor: "#667eea",
      transform: "scale(1.05)",
      color: "white"
    },
    interestEmoji: {
      fontSize: "2.5rem",
      marginBottom: "8px"
    },
    interestLabel: {
      fontSize: "1rem",
      fontWeight: "600"
    },
    budgetGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px"
    },
    budgetCard: {
      background: "#f7fafc",
      border: "3px solid #e2e8f0",
      borderRadius: "20px",
      padding: "30px 20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center"
    },
    budgetCardActive: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderColor: "#667eea",
      transform: "scale(1.05)",
      color: "white",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
    },
    budgetEmoji: {
      fontSize: "3rem",
      marginBottom: "10px"
    },
    budgetTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      marginBottom: "8px"
    },
    budgetAmount: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "10px",
      opacity: 0.9
    },
    budgetDesc: {
      fontSize: "0.9rem",
      opacity: 0.8,
      lineHeight: "1.4"
    },
    optionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px"
    },
    optionCard: {
      background: "#f7fafc",
      border: "3px solid #e2e8f0",
      borderRadius: "16px",
      padding: "28px 20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center"
    },
    optionCardActive: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderColor: "#667eea",
      transform: "scale(1.05)",
      color: "white"
    },
    optionEmoji: {
      fontSize: "2.5rem",
      marginBottom: "10px"
    },
    optionLabel: {
      fontSize: "1.1rem",
      fontWeight: "600"
    },
    paceCard: {
      background: "#f7fafc",
      border: "3px solid #e2e8f0",
      borderRadius: "16px",
      padding: "28px 20px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center"
    },
    paceCardActive: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderColor: "#667eea",
      transform: "scale(1.05)",
      color: "white"
    },
    paceDesc: {
      fontSize: "0.9rem",
      marginTop: "8px",
      opacity: 0.8
    },
    summaryBox: {
      background: "#f7fafc",
      borderRadius: "16px",
      padding: "25px",
      marginTop: "30px",
      border: "2px solid #e2e8f0"
    },
    summaryTitle: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "15px"
    },
    summaryItem: {
      fontSize: "1rem",
      color: "#4a5568",
      marginBottom: "10px",
      lineHeight: "1.6"
    },
    buttonGroup: {
      display: "flex",
      gap: "15px",
      marginTop: "40px",
      justifyContent: "center"
    },
    button: {
      padding: "16px 40px",
      fontSize: "1.1rem",
      fontWeight: "600",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    buttonPrimary: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
    },
    buttonSecondary: {
      background: "white",
      color: "#667eea",
      border: "2px solid #667eea"
    },
    resultContainer: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    weatherCard: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "20px",
      padding: "30px",
      color: "white",
      marginBottom: "30px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
    },
    weatherGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "20px",
      marginTop: "20px"
    },
    weatherItem: {
      background: "rgba(255,255,255,0.2)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center"
    },
    itineraryContainer: {
      background: "white",
      borderRadius: "24px",
      padding: "40px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
    },
    itinerarySection: {
      marginBottom: "40px",
      paddingBottom: "30px",
      borderBottom: "2px solid #e2e8f0"
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2d3748",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },
    sectionIcon: {
      fontSize: "2rem"
    },
    sectionContent: {
      fontSize: "1.05rem",
      color: "#4a5568",
      lineHeight: "1.8"
    },
    contentLine: {
      marginBottom: "12px"
    },
    bulletLine: {
      paddingLeft: "20px",
      position: "relative"
    },
    loader: {
      textAlign: "center",
      padding: "40px"
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "4px solid rgba(102,126,234,0.2)",
      borderTop: "4px solid #667eea",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto"
    },
    thoughtCard: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
      marginBottom: "30px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)"
    },
    thoughtItem: {
      padding: "12px 16px",
      marginBottom: "10px",
      background: "linear-gradient(90deg, rgba(102,126,234,0.1) 0%, transparent 100%)",
      borderRadius: "10px",
      color: "#4a5568",
      fontSize: "1rem",
      animation: "fadeInLeft 0.5s ease-out"
    }
  };

  const keyframes = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInLeft {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const canProceed = () => {
    switch(step) {
      case 1: return formData.destination.trim() !== "";
      case 2: return formData.days !== "" && parseInt(formData.days) > 0;
      case 3: return formData.interests.length > 0;
      case 4: return formData.budget !== "";
      case 5: return formData.mealPreference !== "";
      case 6: return formData.travelStyle !== "";
      case 7: return formData.pace !== "";
      default: return true;
    }
  };

  if (isGenerating || (result && !isGenerating)) {
    return (
      <div style={styles.container}>
        <style>{keyframes}</style>
        
        <div style={styles.header}>
          <h1 style={styles.title}>✈️ AI Itinerary Builder</h1>
          <p style={styles.subtitle}>Your personalized journey awaits</p>
        </div>

        <div style={styles.resultContainer}>
          {/* Chain of Thought */}
          {isGenerating && chainOfThought.length > 0 && (
            <div style={styles.thoughtCard}>
              <h3 style={{fontSize: "1.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "20px"}}>
                🧠 AI Planning Your Perfect Trip
              </h3>
              {chainOfThought.map((thought, idx) => (
                <div key={idx} style={styles.thoughtItem}>
                  {thought}
                </div>
              ))}
              <div style={styles.loader}>
                <div style={styles.spinner}></div>
              </div>
            </div>
          )}

          {/* Weather Info */}
          {weatherInfo && !isGenerating && (
            <div style={styles.weatherCard}>
              <h3 style={{fontSize: "1.5rem", fontWeight: "700", marginBottom: "10px"}}>
                🌤️ Current Weather in {formData.destination}
              </h3>
              <p style={{fontSize: "0.95rem", opacity: 0.9, marginBottom: "20px"}}>
                Here's what to expect during your visit
              </p>
              <div style={styles.weatherGrid}>
                <div style={styles.weatherItem}>
                  <div style={{fontSize: "2.5rem", marginBottom: "8px"}}>🌡️</div>
                  <div style={{fontSize: "0.9rem", opacity: 0.9, marginBottom: "5px"}}>Temperature</div>
                  <div style={{fontSize: "1.8rem", fontWeight: "700"}}>{weatherInfo.temp}°C</div>
                </div>
                <div style={styles.weatherItem}>
                  <div style={{fontSize: "2.5rem", marginBottom: "8px"}}>💧</div>
                  <div style={{fontSize: "0.9rem", opacity: 0.9, marginBottom: "5px"}}>Humidity</div>
                  <div style={{fontSize: "1.8rem", fontWeight: "700"}}>{weatherInfo.humidity}%</div>
                </div>
                <div style={styles.weatherItem}>
                  <div style={{fontSize: "2.5rem", marginBottom: "8px"}}>☁️</div>
                  <div style={{fontSize: "0.9rem", opacity: 0.9, marginBottom: "5px"}}>Conditions</div>
                  <div style={{fontSize: "1.8rem", fontWeight: "700"}}>{weatherInfo.condition}</div>
                </div>
                <div style={styles.weatherItem}>
                  <div style={{fontSize: "2.5rem", marginBottom: "8px"}}>💨</div>
                  <div style={{fontSize: "0.9rem", opacity: 0.9, marginBottom: "5px"}}>Wind Speed</div>
                  <div style={{fontSize: "1.8rem", fontWeight: "700"}}>{weatherInfo.windSpeed} km/h</div>
                </div>
              </div>
            </div>
          )}

          {/* Generated Itinerary */}
          {result && !isGenerating && (
            <>
              {renderItinerary()}
              <div style={{textAlign: "center", marginTop: "40px"}}>
                <button
                  style={{...styles.button, ...styles.buttonPrimary}}
                  onClick={() => {
                    setStep(1);
                    setResult("");
                    setParsedItinerary(null);
                    setFormData({
                      destination: "",
                      days: "",
                      interests: [],
                      budget: "",
                      mealPreference: "",
                      travelStyle: "",
                      accommodation: "",
                      pace: "",
                      otherRequirements: ""
                    });
                  }}
                >
                  ✨ Plan Another Trip
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>

      <div style={styles.header}>
        <h1 style={styles.title}>✈️ AI Itinerary Builder</h1>
        <p style={styles.subtitle}>Let's plan your perfect journey together</p>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
          <div
            key={s}
            style={{
              ...styles.progressStep,
              ...(s <= step ? styles.progressStepActive : {})
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div style={styles.mainCard}>
        {renderStep()}

        {/* Navigation Buttons */}
        <div style={styles.buttonGroup}>
          {step > 1 && (
            <button
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          
          {step < 8 ? (
            <button
              style={{
                ...styles.button,
                ...styles.buttonPrimary,
                ...(canProceed() ? {} : { opacity: 0.5, cursor: "not-allowed" })
              }}
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
            >
              Continue →
            </button>
          ) : (
            <button
              style={{...styles.button, ...styles.buttonPrimary}}
              onClick={handleGenerate}
            >
              🎉 Generate My Itinerary
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#718096",
          fontSize: "0.9rem"
        }}>
          Step {step} of 8
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;