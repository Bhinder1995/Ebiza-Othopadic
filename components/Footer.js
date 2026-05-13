import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-name">Ebiza Orthopaedic</div>
            <div className="footer-brand-tag">Live Pain Free Life</div>
            <div className="footer-brand-desc">Orthopaedic appliances &amp; fracture aids with Physio &amp; Medical products. Developed with experts for clinical excellence.</div>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li><Link href="/products#body-belts">Body Belts &amp; Braces</Link></li>
              <li><Link href="/products#cervical">Cervical Support</Link></li>
              <li><Link href="/products#fracture">Fracture Braces</Link></li>
              <li><Link href="/products#finger-splints">Finger Splints</Link></li>
              <li><Link href="/products#foot-ankle">Foot &amp; Ankle</Link></li>
              <li><Link href="/products#knee">Knee Braces</Link></li>
              <li><Link href="/products#wrist-forearm">Wrist &amp; Forearm</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>More</h4>
            <ul>
              <li><Link href="/certifications">Certifications &amp; Trust</Link></li>
              <li><Link href="/products#traction">Traction Kits</Link></li>
              <li><Link href="/products#silicone-foot">Silicone &amp; Foot</Link></li>
              <li><Link href="/products#physio">Physio Products</Link></li>
              <li><Link href="/products#walking-aid">Walking Aids</Link></li>
              <li><Link href="/products#allied">Allied Products</Link></li>
              <li><Link href="/products#child-care">Pediatric Products</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+916291816264">+91 62918 16264</a></li>
              <li><a href="mailto:ebizaorthopaedic6@gmail.com">ebizaorthopaedic6@gmail.com</a></li>
              <li><Link href="/contact">190, N.D.B. Road, Kolkata-700039</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Ebiza Orthopaedic. Mfg. by Ebiza Orthopaedic, Kolkata.</div>
          <div className="footer-iso">
            <span className="iso-badge">ISO 9001</span>
            <span className="iso-badge">ISO 13485</span>
            <span className="iso-badge">CE</span>
            <span className="iso-badge">MAKE IN INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
