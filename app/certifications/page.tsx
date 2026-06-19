import Link from 'next/link';

export const metadata = {
  title: 'Certifications & Trust | Ebiza Orthopaedic',
  description: 'Ebiza Orthopaedic is ISO 9001, ISO 13485, CE, and GMP certified. Explore our official certifications and regulatory approvals ensuring the highest quality standards.',
};

const CERTIFICATES = [
  {
    name: "ISO 9001:2015",
    title: "Quality Management System",
    desc: "International standard for quality management, ensuring we consistently meet customer and regulatory requirements with clinical excellence.",
    file: "ISO 9001.pdf",
    icon: "🏆"
  },
  {
    name: "ISO 13485:2016",
    title: "Medical Devices Quality Management",
    desc: "Specific requirements for the medical device industry, guaranteeing safety and efficacy in every orthopaedic product we manufacture.",
    file: "ISO 2016.pdf",
    icon: "🛡️"
  },
  {
    name: "CE Certificate",
    title: "European Compliance",
    desc: "Confirmation that our products meet European health, safety, and environmental protection standards for global medical distribution.",
    file: "CE CERTIFICATE.pdf",
    icon: "🇪🇺"
  },
  {
    name: "GMP Certificate",
    title: "Good Manufacturing Practices",
    desc: "Ensures products are consistently produced and controlled according to the highest international quality standards for medical appliances.",
    file: "GMP CERTIFICATE.pdf",
    icon: "✅"
  },
  {
    name: "Trade Mark Certificate",
    title: "Brand Authenticity",
    desc: "Legal protection of the Ebiza brand, ensuring you receive genuine products developed by our certified experts.",
    file: "TRADE MARK CERTIFICATE.pdf",
    icon: "🏷️"
  },
  {
    name: "Udyam Registration",
    title: "MSME Recognition",
    desc: "Recognized by the Government of India as a registered enterprise contributing to the nation's medical infrastructure.",
    file: "Print _ Udyam Registration Certificate.pdf",
    icon: "🇮🇳"
  },
  {
    name: "GST Registration",
    title: "Tax Compliance",
    desc: "Registered Goods and Services Tax entity, maintaining transparency and legal integrity in all our business transactions.",
    file: "GST REGIRTRATION CERTIFICATE.pdf",
    icon: "💰"
  },
  {
    name: "Fire Safety",
    title: "Operational Safety",
    desc: "Certification of full compliance with fire safety protocols at our manufacturing facilities, ensuring a safe environment for production.",
    file: "FIRE SAFETY CERTIFICATE.pdf",
    icon: "🔥"
  }
];

export default function CertificationsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* HERO SECTION */}
      <section className="hero" style={{ minHeight: '40vh', padding: '120px 24px 60px' }}>
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner" style={{ display: 'block', textAlign: 'center', maxWidth: '900px' }}>
          <div className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            📜 Quality &amp; Excellence
          </div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
            Certifications <span className="hl">&amp;</span> Trust
          </h1>
          <p className="hero-sub" style={{ margin: '20px auto 0', maxWidth: '700px', color: 'rgba(255,255,255,0.8)' }}>
            At Ebiza Orthopaedic, quality is not just a promise; it&apos;s our foundation. We adhere to stringent international standards and local regulations to ensure every product we deliver supports a &quot;Live Pain Free Life.&quot;
          </p>
        </div>
      </section>

      {/* TRUST INDICATORS */}
      <section className="section" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="section-inner">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {/* QUALITY PROMISE */}
            <div style={{ 
              background: 'white', 
              padding: '32px', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>💎</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Uncompromising Quality</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                Every Ebiza product undergoes rigorous multi-stage quality testing. From raw material inspection to final packaging, we ensure zero defects and maximum durability.
              </p>
            </div>

            {/* EXPERT DEVELOPED */}
            <div style={{ 
              background: 'white', 
              padding: '32px', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>👨‍⚕️</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Clinical Precision</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                Our designs are validated by orthopaedic surgeons and physiotherapy experts. We focus on anatomical accuracy to provide optimal support and faster recovery.
              </p>
            </div>

            {/* COMPLIANCE */}
            <div style={{ 
              background: 'white', 
              padding: '32px', 
              borderRadius: 'var(--radius-lg)', 
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚖️</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Global Compliance</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                We maintain full transparency with all regulatory bodies. Our manufacturing facility is compliant with international health and safety protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE GRID */}
      <section className="section" style={{ background: 'white' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="section-title">Official Credentials</h2>
            <p className="section-desc" style={{ margin: '8px auto 0' }}>View and download our official certifications and regulatory documents.</p>
            <div className="section-divider" style={{ margin: '16px auto 0' }}></div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '24px' 
          }}>
            {CERTIFICATES.map((cert, idx) => (
              <div key={idx} className="feature-card" style={{ 
                background: 'var(--bg)', 
                border: '1px solid var(--border)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {cert.icon}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    color: 'var(--primary)', 
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: 'rgba(0,87,168,0.08)',
                    padding: '4px 10px',
                    borderRadius: '100px'
                  }}>
                    Certified
                  </div>
                </div>
                
                <h3 style={{ 
                  fontFamily: "'Space Grotesk', sans-serif", 
                  fontSize: '19px', 
                  fontWeight: 700, 
                  color: 'var(--text)',
                  marginBottom: '6px'
                }}>
                  {cert.name}
                </h3>
                <h4 style={{ 
                  fontSize: '13px', 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  marginBottom: '14px'
                }}>
                  {cert.title}
                </h4>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-mid)', 
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  flex: 1
                }}>
                  {cert.desc}
                </p>
                
                <a 
                  href={`/certifications/${cert.file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ 
                    width: '100%', 
                    justifyContent: 'center',
                    fontSize: '14px',
                    padding: '12px'
                  }}
                >
                  View Document
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginLeft: '8px' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL TRUST BAR */}
      <section style={{ 
        background: 'var(--navy)', 
        padding: '60px 24px', 
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="section-inner">
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>
            Trusted by Healthcare Professionals Nationwide
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Our commitment to quality has made us a preferred partner for leading hospitals, physiotherapy centers, and rehabilitation clinics across India.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary">Browse Products</Link>
            <Link href="/contact" className="btn-outline">Contact Us for Bulk Supply</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
