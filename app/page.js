'use client';

import { useEffect, useRef, useState } from 'react';

/* ---------- icons (tiny inline SVGs) ---------- */
const I = {
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  bed: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 17v-5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5" /><path d="M2 17h20v3" /><path d="M6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" /></svg>,
  bath: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2" /><path d="M2 12h20v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-3Z" /><path d="m6 19-1 2" /><path d="m18 19 1 2" /></svg>,
  sqft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>,
  heart: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>,
  agents: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 5-6" /></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  star: <svg viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  fb: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>,
  ig: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  tw: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  ln: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" /></svg>,
};

/* ---------- mock data ---------- */
const LISTINGS = [
  { id: 1, type: 'For Sale', price: '$1,250,000', title: 'Modern Hillside Villa', loc: 'Beverly Hills, CA', beds: 4, baths: 3, sqft: '3,200', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { id: 2, type: 'For Rent', price: '$3,400', priceUnit: '/mo', title: 'Downtown Loft Apartment', loc: 'Manhattan, NY', beds: 2, baths: 2, sqft: '1,150', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80' },
  { id: 3, type: 'For Sale', price: '$890,000', title: 'Coastal Family Home', loc: 'Santa Monica, CA', beds: 3, baths: 2, sqft: '2,400', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { id: 4, type: 'For Rent', price: '$2,100', priceUnit: '/mo', title: 'Cozy Garden Townhouse', loc: 'Portland, OR', beds: 3, baths: 2, sqft: '1,800', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80' },
  { id: 5, type: 'For Sale', price: '$2,750,000', title: 'Luxury Estate with Pool', loc: 'Miami, FL', beds: 5, baths: 4, sqft: '4,800', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 6, type: 'For Sale', price: '$640,000', title: 'Contemporary City Condo', loc: 'Austin, TX', beds: 2, baths: 2, sqft: '1,400', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80' },
];

const FEATURES = [
  { icon: I.shield, title: 'Verified Listings', text: 'Every property is verified by our team to ensure authenticity and quality.' },
  { icon: I.agents, title: 'Expert Agents', text: 'Work with seasoned professionals who know the local market inside out.' },
  { icon: I.chat, title: 'Easy Communication', text: 'Chat directly with agents, schedule tours, and get instant answers.' },
  { icon: I.chart, title: 'Market Insights', text: 'Access real-time data, price trends, and neighborhood analytics.' },
];

const STEPS = [
  { n: '01', title: 'Browse Properties', text: 'Explore thousands of verified listings tailored to your needs and budget.' },
  { n: '02', title: 'Schedule a Visit', text: 'Book in-person or virtual tours with a single tap at your convenience.' },
  { n: '03', title: 'Close the Deal', text: 'Sign paperwork digitally and move into your dream property hassle-free.' },
];

const CATEGORIES = [
  { name: 'Residential', count: '480+ properties', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' },
  { name: 'Commercial', count: '120+ properties', img: 'https://images.unsplash.com/photo-1554435493-93422e8d1a41?w=800&q=80' },
  { name: 'Land', count: '95+ properties', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
  { name: 'Rental', count: '320+ properties', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80' },
];

const TESTIMONIALS = [
  { initials: 'SR', name: 'Sarah Reynolds', role: 'Home Buyer', quote: 'ZeeLy made buying our first home feel effortless. Our agent was knowledgeable, patient, and genuinely cared about finding the right fit for us.' },
  { initials: 'MK', name: 'Marcus Kim', role: 'Property Investor', quote: 'I have used several real estate platforms, but ZeeLy stands out. The market insights helped me close on three investment properties this year.' },
  { initials: 'AT', name: 'Aisha Thompson', role: 'Renter', quote: 'Found my dream apartment within a week. The verified listings and direct chat with landlords saved me so much time and stress.' },
];

/* ---------- IntersectionObserver hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favs, setFavs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    formRef.current?.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const links = [
    { href: '#listings', label: 'Listings' },
    { href: '#why', label: 'Why Us' },
    { href: '#how', label: 'How It Works' },
    { href: '#categories', label: 'Categories' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* ============= NAV ============= */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="logo" onClick={closeMenu}>
            <span className="logo-mark">Z</span>
            ZeeLy Realty
          </a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li><a href="#contact" className="nav-cta">Get Started</a></li>
          </ul>
          <button
            className={`menu-btn ${menuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={closeMenu}>{l.label}</a></li>
          ))}
          <li><a href="#contact" className="nav-cta" onClick={closeMenu} style={{ marginTop: '0.5rem', textAlign: 'center' }}>Get Started</a></li>
        </ul>
      </div>

      {/* ============= HERO ============= */}
      <section id="top" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <span className="hero-eyebrow fade-in">Premium Real Estate</span>
          <h1 className="fade-in delay-1">
            Find Your <span className="accent">Perfect</span> Property
          </h1>
          <p className="fade-in delay-2">
            Buy, Sell, or Rent — ZeeLy Realty makes it easy with verified listings,
            expert agents, and a seamless experience from search to close.
          </p>

          <form className="search-bar fade-in delay-3" onSubmit={handleSearch}>
            <div className="search-field">
              <label htmlFor="ptype">Property Type</label>
              <select id="ptype" defaultValue="">
                <option value="" disabled>Any type</option>
                <option>Land</option>
                <option>Building</option>
                <option>Apartment</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="purpose">Purpose</label>
              <select id="purpose" defaultValue="">
                <option value="" disabled>Buy or Rent</option>
                <option>Buy</option>
                <option>Rent</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="loc">Location</label>
              <input id="loc" type="text" placeholder="City, area, or ZIP" />
            </div>
            <button className="search-btn" type="submit">
              {I.search} Search
            </button>
          </form>

          <div className="hero-stats fade-in delay-3">
            <div className="stat"><strong>12K+</strong><span>Active Listings</span></div>
            <div className="stat"><strong>850+</strong><span>Expert Agents</span></div>
            <div className="stat"><strong>9.8/10</strong><span>Client Satisfaction</span></div>
          </div>
        </div>
      </section>

      {/* ============= LISTINGS ============= */}
      <section id="listings" className="section">
        <div className="container">
          <div className="section-head fade-in">
            <span className="section-eyebrow">Handpicked for you</span>
            <h2>Featured Listings</h2>
            <p>Explore our most sought-after properties — fresh on the market and ready to view.</p>
          </div>
          <div className="listings-grid">
            {LISTINGS.map((p, i) => (
              <article key={p.id} className={`card fade-in delay-${(i % 3) + 1}`}>
                <div className="card-image" style={{ backgroundImage: `url(${p.img})` }}>
                  <span className={`badge ${p.type === 'For Rent' ? 'rent' : ''}`}>{p.type}</span>
                  <button
                    className={`heart ${favs[p.id] ? 'active' : ''}`}
                    aria-label="Save property"
                    onClick={() => toggleFav(p.id)}
                  >
                    {I.heart}
                  </button>
                </div>
                <div className="card-body">
                  <div className="card-price">
                    {p.price}{p.priceUnit && <small>{p.priceUnit}</small>}
                  </div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-loc">{I.pin} {p.loc}</div>
                  <div className="card-meta">
                    <div>{I.bed} {p.beds} Beds</div>
                    <div>{I.bath} {p.baths} Baths</div>
                    <div>{I.sqft} {p.sqft} sqft</div>
                  </div>
                  <button className="card-btn">View Details</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============= WHY CHOOSE US ============= */}
      <section id="why" className="section section-soft">
        <div className="container">
          <div className="section-head fade-in">
            <span className="section-eyebrow">Why ZeeLy</span>
            <h2>Built on Trust &amp; Expertise</h2>
            <p>We combine deep market knowledge with modern tools to make your property journey smooth and stress-free.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feature fade-in delay-${(i % 3) + 1}`}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= HOW IT WORKS ============= */}
      <section id="how" className="section section-dark">
        <div className="container">
          <div className="section-head fade-in">
            <span className="section-eyebrow">Simple Process</span>
            <h2 style={{ color: '#fff' }}>How It Works</h2>
            <p>Three steps to your next address. No paperwork mountains, no surprise fees.</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`step fade-in delay-${i + 1}`}>
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CATEGORIES ============= */}
      <section id="categories" className="section">
        <div className="container">
          <div className="section-head fade-in">
            <span className="section-eyebrow">Browse by category</span>
            <h2>Property Categories</h2>
            <p>Whatever you are looking for, we have a curated selection ready to explore.</p>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((c, i) => (
              <a
                key={c.name}
                href="#listings"
                className={`cat fade-in delay-${(i % 3) + 1}`}
                style={{ backgroundImage: `url(${c.img})` }}
              >
                <div className="cat-content">
                  <h3>{c.name}</h3>
                  <span>{c.count} {I.arrow}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============= TESTIMONIALS ============= */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-head fade-in">
            <span className="section-eyebrow">Testimonials</span>
            <h2>What Our Clients Say</h2>
            <p>Real stories from buyers, sellers, and renters who found their place with ZeeLy.</p>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`testi fade-in delay-${i + 1}`}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, k) => <span key={k}>{I.star}</span>)}
                </div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-user">
                  <div className="avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CONTACT ============= */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info fade-in">
              <span className="section-eyebrow">Get in touch</span>
              <h2>Interested? Get in Touch</h2>
              <p>Tell us what you are looking for and one of our agents will reach out within 24 hours with personalized recommendations.</p>
              <ul className="contact-list">
                <li>
                  <span className="icon">{I.phone}</span>
                  <div><strong>Call us</strong><span>+1 (555) 123-4567</span></div>
                </li>
                <li>
                  <span className="icon">{I.mail}</span>
                  <div><strong>Email</strong><span>hello@zeelyrealty.com</span></div>
                </li>
                <li>
                  <span className="icon">{I.pin}</span>
                  <div><strong>Office</strong><span>240 Oakwood Ave, Suite 500, Los Angeles, CA</span></div>
                </li>
                <li>
                  <span className="icon">{I.clock}</span>
                  <div><strong>Hours</strong><span>Mon–Sat · 9:00 AM – 7:00 PM</span></div>
                </li>
              </ul>
            </div>

            <form ref={formRef} className="form fade-in delay-1" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" type="text" required placeholder="Jane Doe" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" required placeholder="jane@example.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="field">
                  <label htmlFor="interest">Property Interest</label>
                  <select id="interest" required defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option>Buying a home</option>
                    <option>Selling a home</option>
                    <option>Renting</option>
                    <option>Investment property</option>
                    <option>Commercial</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="msg">Message</label>
                <textarea id="msg" placeholder="Tell us a bit about what you are looking for..." />
              </div>
              <button type="submit" className="submit-btn">Send Inquiry {I.arrow}</button>
              <div className={`form-success ${submitted ? 'show' : ''}`}>
                Thanks — we received your inquiry and will be in touch shortly.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-mark">Z</span> ZeeLy Realty
              </div>
              <p>Luxury real estate meets modern proptech. We help you buy, sell, and rent with confidence.</p>
              <div className="socials">
                <a href="#" className="social" aria-label="Facebook">{I.fb}</a>
                <a href="#" className="social" aria-label="Instagram">{I.ig}</a>
                <a href="#" className="social" aria-label="Twitter">{I.tw}</a>
                <a href="#" className="social" aria-label="LinkedIn">{I.ln}</a>
              </div>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="#listings">Buy</a></li>
                <li><a href="#contact">Sell</a></li>
                <li><a href="#listings">Rent</a></li>
                <li><a href="#categories">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#why">About</a></li>
                <li><a href="#how">How It Works</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4>Get in Touch</h4>
              <ul className="footer-contact">
                <li>{I.phone} +1 (555) 123-4567</li>
                <li>{I.mail} hello@zeelyrealty.com</li>
                <li>{I.pin} Los Angeles, CA</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ZeeLy Realty. All rights reserved.</span>
            <span>Privacy · Terms · Cookies</span>
          </div>
        </div>
      </footer>
    </>
  );
}
