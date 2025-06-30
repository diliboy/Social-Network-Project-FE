import React from "react";
import { Link } from "react-router-dom";

export default function AdminLandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>Welcome, Admin!</h1>
        {/* Optional buttons */}
        <div style={styles.buttons}>
            <Link to="/registrationList" style={styles.button}>Registration Management</Link>
            <Link to="/articleList" style={styles.button}>Article Management</Link>
            <Link to="/newsList" style={styles.button}>News Management</Link>
            <Link to="/staff" style={styles.button}>Staff Management</Link>
        
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage: `url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
  },
  contentBox: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "450px",
  },
  title: {
    fontSize: "2.8rem",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  button: {
    backgroundColor: "#007bff",
    padding: "12px 25px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  }
};
