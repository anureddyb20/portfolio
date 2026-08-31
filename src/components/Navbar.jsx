'use client';

import React, { useState } from 'react';

export default function Navbar({ isRevealed = true }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className={`header-area ${isRevealed ? 'revealed' : ''}`}>
        <div className="header-container">
          {/* Boxed Logo Card matching reference */}
          <a href="#" className="header-logo-card">
            ANU REDDY
          </a>

          {/* Navigation Links */}
          <nav className="header-nav-menu" aria-label="Main Navigation">
            <a href="#about" className="nav-link-item">About</a>
            <a href="#expertise" className="nav-link-item">Expertise</a>
            <a href="#projects" className="nav-link-item">Projects</a>
            <a href="#what-i-build" className="nav-link-item">What I Build</a>
            <a href="#contact" className="nav-link-item">Contact</a>
          </nav>

          {/* Right Header Actions */}
          <div className="header-right">
            <button
              className="header-grid-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
            >
              {/* 3x3 Grid Dots */}
              <svg viewBox="0 0 24 24">
                <circle cx="5" cy="5" r="2" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
              </svg>
            </button>

            <a className="header-talk-btn" href="#contact">
              LET'S TALK
              <span className="btn-dot" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      {/* Offcanvas Drawer - Rendered only when active */}
      {isDrawerOpen && (
        <div 
          className="offcanvas-overlay"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div 
            className="offcanvas-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="offcanvas-header">
              <div className="offcanvas-logo">ANU REDDY</div>
              <button 
                className="offcanvas-close-btn"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                CLOSE ✕
              </button>
            </div>

            <nav className="offcanvas-nav">
              <ul>
                <li><a href="#about" onClick={() => setIsDrawerOpen(false)}>About</a></li>
                <li><a href="#expertise" onClick={() => setIsDrawerOpen(false)}>Core Expertise</a></li>
                <li><a href="#projects" onClick={() => setIsDrawerOpen(false)}>Projects</a></li>
                <li><a href="#what-i-build" onClick={() => setIsDrawerOpen(false)}>What I Build</a></li>
                <li><a href="#contact" onClick={() => setIsDrawerOpen(false)}>Connect</a></li>
              </ul>
            </nav>

            <div className="offcanvas-footer">
              <p>Electronics &amp; Communication Engineering Student</p>
              <div className="offcanvas-socials">
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="offcanvas-social-pill">GitHub</a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="offcanvas-social-pill">LinkedIn</a>
                <a href="mailto:contact@anureddy.dev" className="offcanvas-social-pill">Email</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
