'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

export default function Hero() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isTextFaded, setIsTextFaded] = useState(false);
  const [isCardsVisible, setIsCardsVisible] = useState(false);

  const pathRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPreloaderDone(true);
      setIsCardsVisible(true);
      return;
    }

    // Step 1: Fade out load text after 1.2s
    const textTimer = setTimeout(() => {
      setIsTextFaded(true);
    }, 1200);

    // Step 2: Trigger dismissal and arch curve after 1.5s
    const dismissTimer = setTimeout(() => {
      setIsDismissing(true);

      const startTime = performance.now();
      const duration = 850; // ms

      const animateCurve = (now) => {
        const elapsed = now - startTime;
        const rawP = Math.min(1, elapsed / duration);
        const p = 1 - Math.pow(1 - rawP, 3);

        const leftY = 1000 * (1 - p);
        const rightY = 1000 * (1 - p);
        const archHeight = 460 * Math.sin(rawP * Math.PI);
        const controlY = leftY - archHeight;

        if (pathRef.current) {
          pathRef.current.setAttribute(
            'd',
            `M 0 0 L 1000 0 L 1000 ${rightY.toFixed(1)} Q 500 ${controlY.toFixed(1)} 0 ${leftY.toFixed(1)} Z`
          );
        }

        if (rawP < 1) {
          requestAnimationFrame(animateCurve);
        } else {
          setIsPreloaderDone(true);
        }
      };

      requestAnimationFrame(animateCurve);
    }, 1500);

    // Guaranteed fallback: Unmount preloader after 2.6s
    const fallbackTimer = setTimeout(() => {
      setIsPreloaderDone(true);
    }, 2600);

    // Trigger card scroll reveal with IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    // Also trigger cards automatically 600ms after preloader opens
    const cardTimer = setTimeout(() => {
      setIsCardsVisible(true);
    }, 2100);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(dismissTimer);
      clearTimeout(fallbackTimer);
      clearTimeout(cardTimer);
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreloaderClick = () => {
    setIsPreloaderDone(true);
    setIsCardsVisible(true);
  };

  return (
    <>
      {/* ========================================================
          1. CURVED SVG ARCH PRELOADER
      ======================================================== */}
      {!isPreloaderDone && (
        <div 
          className={`preloader ${isDismissing ? 'dismissed' : ''}`}
          onClick={handlePreloaderClick}
          aria-hidden="true"
        >
          <svg
            className="preloader-svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              className="preloader-path"
              d="M 0 0 L 1000 0 L 1000 1000 Q 500 1000 0 1000 Z"
            />
          </svg>

          <div className={`preloader-heading ${isTextFaded ? 'faded' : ''}`}>
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

            {/* Bottom 3-Column Row with Smooth Fade-Up Scroll Animation */}
            <div 
              ref={cardsRef} 
              className={`banner-three-wrap ${isCardsVisible ? 'animate-visible' : ''}`}
            >
              {/* 1. Left Card (Fade-up delay 200ms) */}
              <div className="banner-three-left anim-card-left">
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

              {/* 2. Center Column (Fade-up delay 200ms) */}
              <div className="banner-three-center anim-card-center">
                <h3 className="banner-three-center-title">
                  DESIGNING AND DEVELOPING PRACTICAL DIGITAL EXPERIENCES, SOFTWARE SYSTEMS &amp; CREATIVE ENGINEERING.
                </h3>
                <div>
                  <a className="banner-explore-btn" href="#projects">
                    EXPLORE PROJECTS
                  </a>
                </div>
              </div>

              {/* 3. Right Card (Fade-up delay 300ms) */}
              <div className="banner-three-right anim-card-right">
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
