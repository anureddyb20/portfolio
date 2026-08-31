'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';

export default function Hero() {
  const [isOpeningRetracted, setIsOpeningRetracted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const centerTextRef = useRef(null);
  const ctaBtnRef = useRef(null);

  const scrollRafId = useRef(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsOpeningRetracted(true);
      setIsRevealed(true);
      return;
    }

    // Step 1: Retract black curved mask & reveal elements
    const openTimer = setTimeout(() => {
      setIsOpeningRetracted(true);
      setIsRevealed(true);
    }, 250);

    // Step 2: Native rAF-driven scroll animation (fully reversible)
    const handleScroll = () => {
      if (scrollRafId.current) cancelAnimationFrame(scrollRafId.current);

      scrollRafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScrollDist = 650; // Distance to complete hero scroll progression
        const progress = Math.min(1, Math.max(0, scrollY / maxScrollDist));

        // 1. Giant Name moves upward faster
        if (titleRef.current) {
          const titleY = -(progress * 150);
          titleRef.current.style.transform = `translateY(${titleY}px)`;
        }

        // 2. Portrait moves upward slower (parallax separation)
        if (photoRef.current) {
          const photoY = -(progress * 55);
          photoRef.current.style.transform = `translateX(-50%) translateY(${photoY}px)`;
        }

        // 3. Left Information Panel (Progressive entrance from left)
        if (leftCardRef.current) {
          const leftOpacity = 0.2 + progress * 0.8;
          const leftX = -35 * (1 - progress);
          leftCardRef.current.style.opacity = `${leftOpacity}`;
          leftCardRef.current.style.transform = `translateX(${leftX}px)`;
        }

        // 4. Right Information Panels (Progressive entrance from right)
        if (rightCardRef.current) {
          const rightOpacity = 0.2 + progress * 0.8;
          const rightX = 35 * (1 - progress);
          rightCardRef.current.style.opacity = `${rightOpacity}`;
          rightCardRef.current.style.transform = `translateX(${rightX}px)`;
        }

        // 5. Center Outlined Statement (Progressive vertical clarity)
        if (centerTextRef.current) {
          const textOpacity = 0.25 + progress * 0.75;
          const textY = 40 * (1 - progress);
          centerTextRef.current.style.opacity = `${textOpacity}`;
          centerTextRef.current.style.transform = `translateY(${textY}px)`;
        }

        // 6. CTA Button (Reveals progressively later in scroll)
        if (ctaBtnRef.current) {
          const ctaProgress = Math.min(1, Math.max(0, (progress - 0.2) / 0.8));
          const ctaOpacity = ctaProgress;
          const ctaY = 25 * (1 - ctaProgress);
          ctaBtnRef.current.style.opacity = `${ctaOpacity}`;
          ctaBtnRef.current.style.transform = `translateY(${ctaY}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position calculation

    return () => {
      clearTimeout(openTimer);
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafId.current) cancelAnimationFrame(scrollRafId.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ========================================================
          1. OPENING BLACK CURVED MASK (RETRACTS UPWARD)
      ======================================================== */}
      <div 
        className={`opening-mask-container ${isOpeningRetracted ? 'retracted' : ''}`}
        aria-hidden="true"
      >
        <div className="opening-curved-mask" />
      </div>

      {/* Header Navigation with Smooth Reveal */}
      <Navbar isRevealed={isRevealed} />

      {/* Main Hero Banner Section */}
      <section className="banner-three-area" aria-label="Hero Banner">
        <div className="banner-container">
          <div className="banner-three-wrapper">
            
            {/* Top Stage: Giant Name + Overlapping Centered Portrait */}
            <div className="banner-stage">
              {/* Centered Bust Portrait overlapping the typography */}
              <div 
                className={`banner-three-man ${isRevealed ? 'revealed' : ''}`} 
                ref={photoRef}
              >
                <img
                  src="/anu-reddy-portrait.png"
                  alt="Anu Reddy"
                  loading="eager"
                />
              </div>

              {/* Masked Giant Title (Barlow Condensed 900) */}
              <div className="banner-title-mask">
                <h1 
                  className={`banner-three-title ${isRevealed ? 'revealed' : ''}`} 
                  ref={titleRef}
                >
                  ANU REDDY
                </h1>
              </div>

              {/* Clean Subtle Arc Line behind Portrait */}
              <div 
                className={`banner-three-line-shape ${isRevealed ? 'revealed' : ''}`} 
                aria-hidden="true"
              >
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

            {/* Bottom 3-Column Content Row (Scroll-Driven Transformations) */}
            <div className="banner-three-wrap">
              {/* 1. Left Information Panel */}
              <div className="banner-three-left" ref={leftCardRef}>
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

              {/* 2. Center Column: Outlined Statement & CTA */}
              <div className="banner-three-center" ref={centerTextRef}>
                <h3 className="banner-three-center-title">
                  DESIGNING AND DEVELOPING PRACTICAL DIGITAL EXPERIENCES, SOFTWARE SYSTEMS &amp; CREATIVE ENGINEERING.
                </h3>
                <div ref={ctaBtnRef}>
                  <a className="banner-explore-btn" href="#projects">
                    EXPLORE PROJECTS
                    <span className="btn-dot" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* 3. Right Information Panels */}
              <div className="banner-three-right" ref={rightCardRef}>
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
