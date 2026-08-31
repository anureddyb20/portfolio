'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function Hero() {
  const [isPreloaderMounted, setIsPreloaderMounted] = useState(true);

  useEffect(() => {
    // Unmount preloader from React DOM after animation completes (2.5s)
    const timer = setTimeout(() => {
      setIsPreloaderMounted(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ========================================================
          1. CURVED ARCH PRELOADER (GUARANTEED HARDWARE-ACCELERATED OPENING)
      ======================================================== */}
      {isPreloaderMounted && (
        <div className="preloader" aria-hidden="true">
          <div className="preloader-heading">
            <div className="load-text">
              <span>A</span>
              <span>N</span>
              <span>U</span>
              <span>&nbsp;&nbsp;</span>
              <span>R</span>
              <span>E</span>
              <span>D</span>
              <span>D</span>
              <span>Y</span>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar />

      {/* Hero Banner Section */}
      <section className="banner-three-area" aria-label="Hero Banner">
        <div className="banner-container">
          <div className="banner-three-wrapper">
            
            {/* Top Stage: Giant Title + Center Portrait */}
            <div className="banner-stage">
              {/* Bust Portrait Cutout - Static and Anchored */}
              <div className="banner-three-man">
                <img
                  src="/anu-reddy-portrait.png"
                  alt="Anu Reddy"
                  loading="eager"
                />
              </div>

              {/* Giant Name Title across top */}
              <h1 className="banner-three-title">
                ANU REDDY
              </h1>

              {/* Clean Subtle Arc Line behind Portrait */}
              <div className="banner-three-line-shape" aria-hidden="true">
                <svg viewBox="0 0 740 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 10 160 Q 370 -20 730 160"
                    stroke="rgba(0, 0, 0, 0.08)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>
            </div>

            {/* Upper 3-Column Info Row */}
            <div className="banner-three-wrap">
              {/* 1. Left Card */}
              <div className="banner-three-left">
                <h2 className="banner-three-left-title">
                  HI, I'M ANU REDDY <br />
                  <span>ELECTRONICS &amp; COMMUNICATION</span> <br />
                  ENGINEERING STUDENT
                </h2>
                <div className="banner-three-list">
                  <ul>
                    <li>
                      <span className="star-icon">✦</span>
                      React.js &amp; Next.js Ecosystem
                    </li>
                    <li>
                      <span className="star-icon">✦</span>
                      Node.js, Express &amp; Databases
                    </li>
                    <li>
                      <span className="star-icon">✦</span>
                      Embedded Systems &amp; IoT
                    </li>
                    <li>
                      <span className="star-icon">✦</span>
                      Hardware &amp; Software Integration
                    </li>
                    <li>
                      <span className="star-icon">✦</span>
                      System Design &amp; Automation
                    </li>
                  </ul>
                </div>
              </div>

              {/* 2. Center Column: Outline Text & Explore CTA */}
              <div className="banner-three-center">
                <h3 className="banner-three-center-title">
                  DESIGNING AND DEVELOPING PRACTICAL DIGITAL EXPERIENCES, SOFTWARE SYSTEMS &amp; CREATIVE ENGINEERING.
                </h3>
                <div>
                  <a className="banner-explore-btn" href="#projects">
                    EXPLORE PROJECTS
                  </a>
                </div>
              </div>

              {/* 3. Right Card: Counters */}
              <div className="banner-three-right">
                <div className="counter-item">
                  <h4 className="counter-title">6+</h4>
                  <p className="counter-paragraph">Live Production &amp; Academic Projects</p>
                </div>

                <div className="counter-item dark-card">
                  <h4 className="counter-title">100%</h4>
                  <p className="counter-paragraph">Client Satisfaction &amp; Scalability</p>
                </div>

                <div className="counter-item">
                  <h4 className="counter-title">FULL–STACK</h4>
                  <p className="counter-paragraph">Frontend, Backend &amp; Hardware IoT</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll To Top Button */}
        <div 
          className="scroll-top-badge" 
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      </section>
    </>
  );
}
