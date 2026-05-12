"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <div className="nav-logo">EB</div>
          <div>
            <div className="nav-name">Ebiza Orthopaedic</div>
            <div className="nav-tagline">Live Pain Free Life</div>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/products" className="nav-link">Products</Link>
          <Link href="/certifications" className="nav-link">Certifications</Link>
          <Link href="/why-ebiza" className="nav-link">Why Ebiza</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <a href="tel:+916291816264" className="nav-contact">📞 +91 62918 16264</a>
        </div>
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <Link href="/products" className="nav-link" onClick={close}>Products</Link>
        <Link href="/certifications" className="nav-link" onClick={close}>Certifications</Link>
        <Link href="/why-ebiza" className="nav-link" onClick={close}>Why Ebiza</Link>
        <Link href="/about" className="nav-link" onClick={close}>About</Link>
        <Link href="/contact" className="nav-link" onClick={close}>Contact</Link>
        <a href="tel:+916291816264" className="nav-contact" onClick={close}>📞 Call Now</a>
      </div>
    </>
  );
}
