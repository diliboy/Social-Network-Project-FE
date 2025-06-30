import React from "react";
import { Link } from "react-router-dom";

export default function UserLandingPage() {
  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <h1 style={styles.title}>Welcome to Social Network!</h1>
        <p style={styles.subtitle}>Explore, share articles, and stay updated with the latest news.</p>
        <div style={styles.buttons}>
            <Link to="/userArticle" style={styles.button}>Add Article</Link>
            <Link to="/userNews" style={styles.button}>View News</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage: `url("https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1470&q=80")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
  },
  contentBox: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    backgroundColor: "#28a745",
    padding: "12px 25px",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  }
};
