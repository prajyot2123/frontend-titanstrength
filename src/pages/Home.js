import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth"
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const loggedIn = Auth.loggedIn()

  return (
    <div className="homepage">
      <Header />
      <div className="home-hero">
        <Container className="home d-flex flex-column justify-content-center">
          <span className="home-kicker">Fitness made personal</span>
          <h1 className="home-title">Your Daily Workout Partner</h1>
          <p className="home-text">
            Cardio? Resistance? Or both? Track your daily exercises and stay fit
            with us.
          </p>
          {loggedIn ?
            (<button className="home-btn" onClick={() => navigate("/exercise")}>Add Exercise</button>) :
            (<button className="home-btn" onClick={() => navigate("/signup")}>Get Started</button>)}
        </Container>
      </div>
      <section className="home-panels">
        <div className="home-panel">
          <h3>Smart tracking</h3>
          <p>Log cardio and resistance sessions in seconds with clean, focused inputs.</p>
        </div>
        <div className="home-panel">
          <h3>Progress clarity</h3>
          <p>See your workouts in a clean timeline that makes momentum feel real.</p>
        </div>
        <div className="home-panel">
          <h3>Guided insights</h3>
          <p>Get coaching prompts powered by your latest sessions and trends.</p>
        </div>
      </section>
    </div>
  );
}
