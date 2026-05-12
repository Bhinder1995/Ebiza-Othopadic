import Link from 'next/link';

export const metadata = {
  title: 'About Us | Ebiza Orthopaedic',
  description: 'Learn about Ebiza Orthopaedic, our mission to provide a pain-free life, and our commitment to clinical excellence.',
};

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '80px' }}>
      <section className="section" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-tag">Our Story</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>Mission: Live Pain Free Life</h1>
          <p className="section-desc">Committed to your mobility, comfort, and well-being.</p>
          <div className="section-divider" style={{ margin: '24px auto' }}></div>
        </div>

        <div style={{ marginTop: '3rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At <strong>Ebiza Orthopaedic</strong>, we believe that everyone deserves to live a <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>pain-free life</span>. 
            Founded with a vision to revolutionize rehabilitation and mobility support, we have grown into one of India's most trusted manufacturers of premium orthopaedic appliances and fracture aids.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Our journey began with a simple yet powerful commitment: to bridge the gap between clinical efficacy and patient comfort. 
            Every product in our catalog—from cervical collars to dynamic fracture braces—is meticulously designed in collaboration with leading orthopaedic surgeons, physiotherapists, and clinical experts. 
            This ensures that when you choose Ebiza, you are choosing medical-grade support that genuinely accelerates recovery.
          </p>

          <div className="features-grid" style={{ margin: '4rem 0' }}>
            <div className="feature-card">
              <div className="feature-icon">🏅</div>
              <div className="feature-title">ISO Certified</div>
              <div className="feature-desc">ISO 9001 & ISO 13485 certified manufacturing ensuring highest medical standards.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <div className="feature-title">CE Approved</div>
              <div className="feature-desc">Products meet international health, safety, and environmental standards.</div>
            </div>
          </div>

          <h2 className="section-title" style={{ fontSize: '2rem', margin: '3rem 0 1.5rem' }}>Uncompromising Quality</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Quality is not just a buzzword for us; it is embedded in our DNA. We are proudly <strong>ISO 9001</strong> and <strong>ISO 13485</strong> certified, and our products carry the <strong>CE mark</strong> of approval. 
            Manufactured in our state-of-the-art facility in Kolkata, our "Make in India" initiative guarantees that we maintain strict control over every stage of production—from sourcing hypoallergenic, breathable materials to the final stitch.
          </p>

          <div style={{ 
            background: 'var(--bg2)', 
            padding: '3rem', 
            borderRadius: 'var(--radius-lg)', 
            border: '2px solid var(--border)',
            marginTop: '4rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: 'var(--primary)' }}></div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--navy)' }}>Ebiza Orthopaedic</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <p><strong>📍 Manufacturing Address:</strong><br/>190, N.D.B. Road, Madhya Dakshin Laskar Para, Kolkata – 700 039</p>
              <p><strong>📞 Customer Care:</strong> <a href="tel:+916291816264" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>+91 62918 16264</a></p>
              <p><strong>✉️ Email:</strong> <a href="mailto:ebizaorthopaedic6@gmail.com" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>ebizaorthopaedic6@gmail.com</a></p>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>Send an Inquiry</Link>
              <Link href="/products" className="btn-outline" style={{ textDecoration: 'none' }}>View Products</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
