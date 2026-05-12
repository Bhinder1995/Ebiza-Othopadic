"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PRODUCTS } from '../../data/products';

const CATEGORIES = [
  { id: 'body-belts',      name: 'Body Belts & Braces Support', icon: '🦺', desc: 'Lumbar supports, abdominal binders, posture correctors & specialty braces for spinal and torso support.' },
  { id: 'cervical',        name: 'Cervical Support',             icon: '🔵', desc: 'Cervical collars, soft & hard cervical supports for neck stabilization and pain relief.' },
  { id: 'fracture',        name: 'Fracture Braces Support',      icon: '🦴', desc: 'Fracture braces and casts for immobilization and healing support of bone fractures.' },
  { id: 'finger-splints',  name: 'Finger Splints',               icon: '✋', desc: 'Finger immobilizers and splints for ligament injuries, fractures and post-surgical care.' },
  { id: 'foot-ankle',      name: 'Foot & Ankle Supports',        icon: '🦶', desc: 'Ankle braces, foot orthoses and supports for stability, sprain recovery and flat foot correction.' },
  { id: 'knee',            name: 'Knee Braces Support',          icon: '🦵', desc: 'Neoprene knee supports, hinged braces, ROM braces and knee immobilizers for all knee conditions.' },
  { id: 'wrist-forearm',   name: 'Wrist & Forearm Brace Support',icon: '💪', desc: 'Wrist splints, cock-up splints and forearm supports for carpal tunnel, sprains and fractures.' },
  { id: 'traction',        name: 'Traction Kits',                icon: '⚙️', desc: 'Cervical and lumbar traction kits for decompression therapy at home or clinic.' },
  { id: 'silicone-foot',   name: 'Silicone & Foot Products',     icon: '🟣', desc: 'Silicone heel cups, toe separators, gel insoles and foot care accessories.' },
  { id: 'physio',          name: 'Physio Products',              icon: '💊', desc: 'Physiotherapy accessories including hot/cold packs, TENS pads and therapy aids.' },
  { id: 'walking-aid',     name: 'Walking Aid Products',         icon: '🦯', desc: 'Crutches, walking frames, rollators and mobility aids for safe patient ambulation.' },
  { id: 'allied',          name: 'Allied Products',              icon: '🏥', desc: 'Wheelchairs, stretchers and other allied healthcare products for complete patient care.' },
  { id: 'child-care',      name: 'Child Care Products',          icon: '👶', desc: 'Paediatric braces, splints and orthoses designed specifically for children.' },
];

function ProductModal({ product, code, onClose }: { product: any; code: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  const cat = CATEGORIES.find(c => c.id === product.cat);
  const waText = encodeURIComponent(`Hi, I'm interested in ${product.name} (${code}). MRP: ₹${product.mrp || 'Contact for price'}. Please share more details.`);

  // Parse sizes from comma-separated string or default to UNI
  const sizeList = product.sizes 
    ? product.sizes.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0) 
    : ['UNI'];

  return (
    <div className="modal-overlay open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="modal-code">{code}</div>
            <div className="modal-title">{product.name}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-img-wrap">
            {product.img ? (
              <Image src={product.img} alt={product.name} width={400} height={400} unoptimized style={{maxWidth:'100%',height:'auto',objectFit:'contain'}} />
            ) : (
              <div className="no-img-placeholder">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                <span>No Photo</span>
              </div>
            )}
          </div>
          <div className="modal-details">
            <p className="modal-desc">{product.desc}</p>
            
            {product.mrp && (
              <div className="modal-price-wrap" style={{marginBottom:'24px', padding:'16px', background:'var(--bg-light)', borderRadius:'12px', border:'1px solid var(--border)'}}>
                <div style={{fontSize:'13px', fontWeight:600, color:'var(--text-light)', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em'}}>Maximum Retail Price (MRP)</div>
                <div style={{fontSize:'32px', fontWeight:800, color:'var(--primary)', display:'flex', alignItems:'baseline', gap:'4px'}}>
                  <span style={{fontSize:'20px', fontWeight:600}}>₹</span>
                  {product.mrp}
                </div>
              </div>
            )}

            <div className="modal-sizes-label" style={{fontSize:'14px', fontWeight:600, marginBottom:'10px'}}>Available Sizes / Variants</div>
            <div className="modal-sizes" style={{display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'16px'}}>
              {sizeList.map((size: string, idx: number) => (
                <span key={idx} className="size-chip" style={{padding:'6px 14px', background:'white', border:'1px solid var(--border)', borderRadius:'8px', fontSize:'13px', fontWeight:500, boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}>{size}</span>
              ))}
            </div>
            <p style={{fontSize:'12px', color:'var(--text-light)', marginBottom:'20px'}}>* Prices are inclusive of all taxes. Custom sizes available for bulk orders.</p>
            <a href={`https://wa.me/916291816264?text=${waText}`} target="_blank" rel="noopener noreferrer" className="modal-cta" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'16px', background:'var(--primary)', color:'white', borderRadius:'12px', fontWeight:600, textDecoration:'none', transition:'all 0.2s', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}>
              <span>📞 Inquire This Product</span>
            </a>
          </div>
        </div>
        <div className="modal-footer">
          <span className="modal-cat-tag">Category: <strong>{cat?.name || product.cat}</strong></span>
        </div>
      </div>
    </div>
  );
}


export default function ProductGallery({ products }: { products: Record<string, any> }) {
  const [activeTab, setActiveTab] = useState('body-belts');
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState<{ code: string; product: any } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mounted, setMounted] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const navInnerRef = useRef<HTMLDivElement>(null);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize search from URL query if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const qParam = urlParams.get('q');
      if (qParam) {
        setSearchTerm(qParam);
        // Scroll to products section if searching
        setTimeout(() => {
          const el = document.getElementById('products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // IntersectionObserver for auto-highlighting tab
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveTab((e.target as HTMLElement).dataset.cat || '');
      });
    }, { rootMargin: '-64px 0px -60% 0px' });
    Object.values(sectionRefs.current).forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Track scroll position of nav to show/hide arrows
  const updateArrows = () => {
    const el = navInnerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = navInnerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => { el.removeEventListener('scroll', updateArrows); window.removeEventListener('resize', updateArrows); };
  }, []);

  const scrollNav = (dir: 'left' | 'right') => {
    const el = navInnerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  const q = searchTerm.toLowerCase().trim();

  const scrollToSection = (catId: string) => {
    const el = sectionRefs.current[catId];
    if (el) {
      // navbar (64) + cat-nav (52) + search bar area (80) offset
      const offset = 64 + 52;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
    setActiveTab(catId);
  };

  return (
    <>
      {/* STICKY CATEGORY NAV with scroll arrows */}
      <div className="cat-nav">
        <div className="cat-nav-wrap">
          {/* Left arrow */}
          <button
            className={`cat-nav-arrow cat-nav-arrow-left ${mounted && canScrollLeft ? 'visible' : ''}`}
            onClick={() => scrollNav('left')}
            aria-label="Scroll categories left"
            suppressHydrationWarning
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="cat-nav-inner" id="cat-tabs" ref={navInnerRef}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`cat-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => scrollToSection(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            className={`cat-nav-arrow cat-nav-arrow-right ${mounted && canScrollRight ? 'visible' : ''}`}
            onClick={() => scrollNav('right')}
            aria-label="Scroll categories right"
            suppressHydrationWarning
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="products-search-bar">
        <div className="products-search-inner">
          <div className="search-wrap" style={{margin:0}}>
            <span className="search-icon">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products by name or code..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <section className="section" id="products" style={{paddingTop:'24px'}}>
        <div className="section-inner">
          {CATEGORIES.map(cat => {
            const catProducts = Object.entries(products).filter(([code, p]) => {
              if (p.cat !== cat.id) return false;
              if (!q) return true;
              return p.name.toLowerCase().includes(q) || code.toLowerCase().includes(q);
            });
            if (catProducts.length === 0 && q) return null;

            return (
              <div
                key={cat.id}
                id={cat.id}
                data-cat={cat.id}
                ref={el => { sectionRefs.current[cat.id] = el; }}
                style={{ marginBottom: '48px' }}
              >
                <div className="section-header">
                  <div className="section-tag">{cat.icon} {cat.name}</div>
                  <h2 className="section-title">{cat.name}</h2>
                  <p className="section-desc">{cat.desc}</p>
                  <div className="section-divider"></div>
                </div>
                <div className="products-grid">
                  {catProducts.map(([code, product]: [string, any]) => (
                    <div key={code} className="product-card" onClick={() => setModal({ code, product })} style={{cursor:'pointer'}}>
                      <div className="product-img-wrap">
                        <div className="product-code">{code}</div>
                        {product.img ? (
                          <Image src={product.img} alt={product.name} width={200} height={180} unoptimized style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',padding:'12px'}} />
                        ) : (
                          <div className="no-img-placeholder">
                            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                            <span>No Photo</span>
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <div className="product-name">{product.name}</div>
                        <div className="product-desc-short">{product.desc}</div>
                        {product.mrp && (
                          <div className="product-price" style={{marginTop:'8px', fontSize:'18px', fontWeight:700, color:'var(--primary)'}}>₹{product.mrp}</div>
                        )}
                        <div className="product-action-hint">View Details →</div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {q && Object.entries(products).filter(([code, p]) => p.name.toLowerCase().includes(q) || code.toLowerCase().includes(q)).length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <p>No products found matching &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {modal && <ProductModal code={modal.code} product={modal.product} onClose={() => setModal(null)} />}

      {/* SCROLL TO TOP */}
      <ScrollTopButton />
    </>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.pageYOffset > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >↑</button>
  );
}
