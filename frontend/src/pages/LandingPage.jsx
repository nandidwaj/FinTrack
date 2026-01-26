import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* HEADER */}
      <header className="landing-header">
        <div className="logo">FinTrack</div>

        <div className="auth-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="landing-main">
        <div className="hero-content">
          <h1>Take Control of Your Money</h1>
          <p>
            FinTrack helps you track expenses, manage budgets,
            monitor recurring bills, and achieve your financial goals —
            all in one simple dashboard.
          </p>

          <div className="hero-actions">
            <button
              className="primary-cta"
              onClick={() => navigate("/signup")}
            >
              Get Started Free
            </button>
            <button
              className="secondary-cta"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </button>
          </div>
        </div>

        {/* FEATURES */}
        <div className="features">
          <div className="feature-card">
            <h3>📊 Smart Budgeting</h3>
            <p>Create monthly budgets and track spent vs remaining in real time.</p>
          </div>

          <div className="feature-card">
            <h3>💳 Expense Tracking</h3>
            <p>Log income & expenses with categories and detailed insights.</p>
          </div>

          <div className="feature-card">
            <h3>🔁 Recurring Bills</h3>
            <p>Never miss a bill again with due-date tracking.</p>
          </div>

          <div className="feature-card">
            <h3>🎯 Savings Pots</h3>
            <p>Create saving goals and track your progress visually.</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;