import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact | Ebiza Orthopaedic',
  description: 'Request a catalogue or product inquiry. Contact Ebiza Orthopaedic for bulk orders, pricing and distributor enquiries.',
};

export default function ContactPage() {
  return (
    <section className="contact-section" id="contact" style={{ paddingTop: '96px' }}>
      <div className="contact-inner">
        <div>
          <div className="section-tag">Get In Touch</div>
          <h1 className="contact-info-title">Request Catalogue or Inquiry</h1>
          <p className="contact-info-desc">Reach out to us for product inquiries, pricing, bulk orders, or to become a distributor.</p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div>
                <div className="contact-item-label">Manufacturing Address</div>
                <div className="contact-item-val">190, N.D.B. Road, Madhya Dakshin<br/>Laskar Para, Kolkata – 700 039</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div>
                <div className="contact-item-label">Customer Care</div>
                <div className="contact-item-val"><a href="tel:+916291816264" style={{color:'var(--primary)',textDecoration:'none'}}>+91 62918 16264</a></div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div>
                <div className="contact-item-label">Email</div>
                <div className="contact-item-val"><a href="mailto:ebizaorthopaedic6@gmail.com" style={{color:'var(--primary)',textDecoration:'none'}}>ebizaorthopaedic6@gmail.com</a></div>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
