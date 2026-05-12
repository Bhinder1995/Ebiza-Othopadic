import Link from 'next/link';

export const metadata = {
  title: 'Why Ebiza? | Ebiza Orthopaedic',
  description: 'Learn why Ebiza Orthopaedic is the trusted choice for ISO and CE certified orthopaedic appliances.',
};

export default function WhyEbizaPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="section" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-tag">Value Proposition</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>Why Hospitals Trust Ebiza</h1>
          <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto' }}>
            We combine clinical expertise with state-of-the-art manufacturing to deliver orthopaedic products that genuinely improve your quality of life.
          </p>
          <div className="section-divider" style={{ margin: '24px auto' }}></div>
        </div>
        
        <div className="features-grid" style={{ marginTop: '3rem' }}>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <div className="feature-title">ISO Certified Quality</div>
            <div className="feature-desc">ISO 9001 & ISO 13485 certified manufacturing ensures every product meets international medical device standards.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">CE Approved</div>
            <div className="feature-desc">Products meet health, safety, and environmental protection standards, ensuring clinical safety and reliability.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🇮🇳</div>
            <div className="feature-title">Make in India</div>
            <div className="feature-desc">Proudly manufactured in Kolkata, India, supporting local industry with global quality standards.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <div className="feature-title">Clinical Expertise</div>
            <div className="feature-desc">Developed in collaboration with leading orthopaedic surgeons and physiotherapists for maximum recovery impact.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <div className="feature-title">Premium Materials</div>
            <div className="feature-desc">We use hypoallergenic, breathable, and durable materials for maximum patient comfort and product longevity.</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <div className="feature-title">Trusted Partner</div>
            <div className="feature-desc">Trusted by hospitals, clinics, and pharmacies nationwide for reliable supply and uncompromising quality.</div>
          </div>
        </div>

        <div style={{ 
          marginTop: '5rem', 
          textAlign: 'center', 
          background: 'var(--navy)', 
          padding: '4rem 2rem', 
          borderRadius: 'var(--radius-lg)',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontFamily: "'Space Grotesk', sans-serif" }}>Ready to experience the Ebiza difference?</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Join thousands of satisfied patients and healthcare providers who rely on our products for superior support.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ textDecoration: 'none' }}>Explore Products</Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
