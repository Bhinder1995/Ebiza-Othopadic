import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Ebiza Orthopaedic – Live Pain Free Life',
  description: 'ISO certified orthopaedic appliances & fracture aids. 200+ products across 14 categories, trusted by hospitals and physiotherapy centers across India.',
};

const CATEGORIES = [
  { id: 'body-belts',    name: 'Body Belts & Braces',       icon: '🦺', count: 14 },
  { id: 'cervical',      name: 'Cervical Support',           icon: '🔵', count: 7  },
  { id: 'fracture',      name: 'Fracture Braces',            icon: '🦴', count: 9  },
  { id: 'finger-splints',name: 'Finger Splints',             icon: '✋', count: 4  },
  { id: 'foot-ankle',    name: 'Foot & Ankle Supports',      icon: '🦶', count: 14 },
  { id: 'knee',          name: 'Knee Braces Support',        icon: '🦵', count: 14 },
  { id: 'wrist-forearm', name: 'Wrist & Forearm Braces',     icon: '💪', count: 15 },
  { id: 'traction',      name: 'Traction Kits',              icon: '⚙️', count: 11 },
  { id: 'silicone-foot', name: 'Silicone & Foot Products',   icon: '🟣', count: 12 },
  { id: 'physio',        name: 'Physio Products',            icon: '💊', count: 30 },
  { id: 'walking-aid',   name: 'Walking Aid Products',       icon: '🦯', count: 20 },
  { id: 'allied',        name: 'Allied Products',            icon: '🏥', count: 41 },
  { id: 'child-care',    name: 'Child Care Products',        icon: '👶', count: 9  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge"><span className="hero-badge-dot"></span>ISO 9001 &amp; ISO 13485 Certified</div>
            <h1 className="hero-title">Precision <span className="hl">Orthopaedic</span><br/>Care Products</h1>
            <p className="hero-sub">Orthopaedic appliances &amp; fracture aids developed with clinical experts. 200+ products across 14 categories — trusted by hospitals and physiotherapy centers across India.</p>
            <div className="hero-actions">
              <Link href="/products" className="btn-primary">View Products ↓</Link>
              <Link href="/contact" className="btn-outline">Get Inquiry</Link>
            </div>

            {/* QUICK SEARCH */}
            <div style={{ marginTop: '2.5rem', maxWidth: '500px', position: 'relative' }}>
              <form action="/products" method="GET">
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: '16px', top: '50%',
                    transform: 'translateY(-50%)', color: 'var(--text-light)',
                    pointerEvents: 'none', display: 'flex', alignItems: 'center', zIndex: 1
                  }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="q"
                    placeholder="Search products (e.g. knee brace, cervical collar)..."
                    style={{
                      width: '100%',
                      padding: '14px 20px 14px 48px',
                      background: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid var(--border)',
                      borderRadius: '100px',
                      fontSize: '15px',
                      color: 'var(--text)',
                      outline: 'none',
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      boxShadow: 'var(--shadow)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  <button type="submit" style={{
                    position: 'absolute', right: '6px', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>Search</button>
                </div>
              </form>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">200+</div><div className="stat-label">Products</div></div>
              <div><div className="stat-num">14</div><div className="stat-label">Categories</div></div>
              <div><div className="stat-num">ISO</div><div className="stat-label">Certified</div></div>
              <div><div className="stat-num">CE</div><div className="stat-label">Marked</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-cover-card">
              <Image src="/images/catalogue-cover.jpg" alt="Ebiza Orthopaedic Product Catalogue 2026" width={600} height={500} style={{width:'100%',borderRadius:'10px',display:'block'}} priority />
            </div>
            <div className="hero-cover-badge">2026 Products Catalogue</div>
          </div>
        </div>
      </section>

      {/* CERT BAR */}
      <div className="cert-bar">
        <div className="cert-item">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ISO 9001 Certified
        </div>
        <div className="cert-item">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ISO 13485 Certified
        </div>
        <div className="cert-item">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          CE Marked
        </div>
        <div className="cert-item">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Make in India
        </div>
        <div className="cert-item">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Developed With Experts
        </div>
      </div>

      {/* BROWSE CATEGORIES */}
      <section className="section cat-browse-section">
        <div className="section-inner">
          <div className="cat-browse-header">
            <div>
              <div className="section-tag">🗂️ Browse By Category</div>
              <h2 className="section-title">Explore Our Product Range</h2>
              <p className="section-desc">Select a category to jump straight to the products you need.</p>
              <div className="section-divider"></div>
            </div>
            <Link href="/products" className="cat-browse-viewall">View All Products →</Link>
          </div>

          {/* Mobile: horizontal scroll strip */}
          <div className="cat-scroll-strip">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/products#${cat.id}`} className="cat-scroll-card">
                <span className="cat-scroll-icon">{cat.icon}</span>
                <span className="cat-scroll-name">{cat.name}</span>
                <span className="cat-scroll-count">{cat.count} products</span>
              </Link>
            ))}
          </div>

          {/* Desktop: wrap grid */}
          <div className="cat-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/products#${cat.id}`} className="cat-grid-card">
                <div className="cat-grid-icon">{cat.icon}</div>
                <div className="cat-grid-info">
                  <div className="cat-grid-name">{cat.name}</div>
                  <div className="cat-grid-count">{cat.count} products</div>
                </div>
                <div className="cat-grid-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & TRUST SECTION */}
      <section className="section" style={{ background: 'white' }}>
        <div className="section-inner">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '60px', 
            alignItems: 'center' 
          }} className="mobile-stack">
            <div className="trust-visual" style={{ position: 'relative' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)'
              }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: 0.1 }}>📜</div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '12px', 
                    flexWrap: 'wrap',
                    marginBottom: '24px'
                  }}>
                    <span className="iso-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>ISO 9001:2015</span>
                    <span className="iso-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>ISO 13485:2016</span>
                    <span className="iso-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>CE MARKED</span>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', color: 'white', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
                    Quality You Can <br/><span style={{ color: '#29B6F6' }}>Rely On</span>
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                    Ebiza Orthopaedic products are manufactured under strict quality controls and hold multiple international certifications ensuring the highest medical standards.
                  </p>
                  <Link href="/certifications" className="btn-primary" style={{ background: 'white', color: 'var(--primary)', boxShadow: 'none' }}>
                    View All Certifications
                  </Link>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div style={{ 
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                background: 'var(--accent)',
                color: 'white',
                padding: '16px 24px',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 3
              }}>
                <div style={{ fontSize: '24px' }}>🛡️</div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>Guaranteed</div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>100% Genuine</div>
                </div>
              </div>
            </div>

            <div className="trust-content">
              <div className="section-tag">🎖️ Trusted Excellence</div>
              <h2 className="section-title">Certifications &amp; Standards</h2>
              <p className="section-desc">
                We take pride in our commitment to transparency and excellence. Our manufacturing process is fully compliant with global medical device standards.
              </p>
              
              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '20px' }}>⭐</div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>ISO 9001 &amp; 13485</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>Certified quality management specifically for medical device manufacturing.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '20px' }}>⭐</div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>CE Compliance</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>Ensuring our products meet health, safety, and environmental standards.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '20px' }}>⭐</div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Make in India</h4>
                    <p style={{ fontSize: '14px', color: 'var(--text-mid)' }}>Proudly contributing to India's self-reliance in medical technology.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="features-inner">
          <div style={{textAlign:'center',marginBottom:'8px'}}>
            <div className="section-tag" style={{background:'rgba(41,182,246,0.1)',borderColor:'rgba(41,182,246,0.2)',color:'#29B6F6'}}>Why Choose Us</div>
          </div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'clamp(24px,3vw,36px)',fontWeight:700,color:'white',textAlign:'center'}}>Why Hospitals Trust Ebiza</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <div className="feature-title">ISO Certified Quality</div>
              <div className="feature-desc">ISO 9001 &amp; ISO 13485 certified manufacturing ensures every product meets international medical device standards.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <div className="feature-title">Developed With Experts</div>
              <div className="feature-desc">Our products are developed in collaboration with orthopaedic surgeons and physiotherapists for clinical precision.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <div className="feature-title">Complete Range</div>
              <div className="feature-desc">200+ orthopaedic appliances across 14 categories — from cervical collars to wheelchairs, all under one roof.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📏</div>
              <div className="feature-title">All Sizes Available</div>
              <div className="feature-desc">Most products available in S, M, L, XL and XXL sizes to ensure a proper fit for every patient.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🇮🇳</div>
              <div className="feature-title">Made in India</div>
              <div className="feature-desc">Proudly manufactured in India with Make in India and CE certification for domestic and international markets.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">Hospital Supply</div>
              <div className="feature-desc">Trusted supplier to physiotherapy clinics, orthopaedic hospitals and rehabilitation centers.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
