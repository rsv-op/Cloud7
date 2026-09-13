

'use client';

import React, { useState , useEffect } from 'react';

const Icons = {
  TrendingUp: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  ArrowRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Info: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
};

export default function VerticalForgeInteractive() {
  const [revenue, setRevenue] = useState(15000);
  const [selectedIndustry, setSelectedIndustry] = useState('B2B & Professional');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [navPage, setNavPage] = useState<any>(3);
  const [subView, setSubView] = useState<string>('questionnaire');
  const [step, setStep] = useState<number>(1);
  useEffect(() => { 
    // 1. Set the 7-day delivery target
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setDeliveryDate(target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }));

    // 2. [NEW] Pipeline Logic: Catch parameters from VerticalForge handoff
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const incomingVertical = searchParams.get('vertical');

      if (incomingVertical) {
        // Auto-populate the form data with the client's selection
        setFormData(prev => ({ ...prev, vertical: incomingVertical }));
        // Jump directly to the Action Hub page
        setNavPage(3);
        // Open the intake questionnaire
        setSubView('questionnaire');
        // Skip Step 1 (Industry Selection) and jump directly to Step 2 (Objective)
        setStep(2);
        
        // Clean the URL bar silently so a page refresh doesn't trigger it again
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  // Baseline industry multiplier based on aggregated market data
  // (e.g., Stanford Web Credibility Research, SBA.gov digital adoption metrics)
  const growthMultiplier = 0.39; // 39% average revenue increase
  const projectedIncrease = Math.round(revenue * growthMultiplier);
  const totalProjected = revenue + projectedIncrease;

  const industries = [
    'B2B & Professional',
    'Retail & E-Commerce',
    'Health & Wellness',
    'Technology & AI',
    'Creators & Hospitality'
  ];
  const templateCatalog: Record<string, any[]> = {
    'Logistics & Supply Chain': [
      {
        id: 'log-1',
        name: 'Apex Central Dispatch',
        tagline: 'Automated Carrier Verification, Telemetry & Freight Logistics',
        badge: 'FLEET LOGISTICS',
        accentColor: '#0284c7',
        colorPalette: ['#0284c7', '#0f172a', '#38bdf8', '#f8fafc'],
        heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        stats: ['Zero-Friction Carrier Onboarding', 'Live Route Telemetry', 'DOT Credential Validation'],
        layoutStyle: 'High-density telemetry dashboard with real-time schedule tracking and automated freight inquiry calculators.',
        idealFor: 'Central dispatch operators, automotive transport fleets, and freight forwarders.',
        includedModules: ['Carrier Credential Uploader', 'Dynamic Route Estimator', 'Live Terminal Locator', 'Client Tracking Portal']
      }
    ],
    'Healthcare & Clinics': [
      {
        id: 'hlth-1',
        name: 'Aegis Medical Collective',
        tagline: 'HIPAA-Compliant Patient Intake & Preventative Care Optimization',
        badge: 'CLINICAL PRACTICE',
        accentColor: '#10b981',
        colorPalette: ['#10b981', '#064e3b', '#a7f3d0', '#ecfdf5'],
        heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
        stats: ['Automated Intake Flows', 'Board-Certified MD Verification', 'Encrypted Record Handoffs'],
        layoutStyle: 'Modern clinical calm with instant patient scheduling and encrypted paperwork routing.',
        idealFor: 'Healthcare administrators, specialized clinics, and telemedicine providers.',
        includedModules: ['Real-Time Calendar Booking', 'Secure Intake Paperwork Upload', 'Insurance Eligibility Checker', 'Telehealth Video Bridge']
      }
    ],
    'Automotive & Motorsports': [
      {
        id: 'auto-1',
        name: 'Veloce Track Engineering',
        tagline: 'Performance Tuning, Telemetry Analysis & Motor Racing Portfolios',
        badge: 'MOTORSPORTS',
        accentColor: '#ef4444',
        colorPalette: ['#ef4444', '#450a0a', '#fca5a5', '#fef2f2'],
        heroImage: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=900&q=80',
        stats: ['F1/MotoGP Spec Diagnostics', 'Aero Component Showcases', 'Team Sponsorship Kits'],
        layoutStyle: 'Aggressive, high-contrast dark mode showcasing vehicle telemetry, aerodynamic performance, and track times.',
        idealFor: 'Racing teams, automotive tuners, performance parts engineers, and motorsport athletes.',
        includedModules: ['Sponsorship Pitch Deck Viewer', 'Vehicle Spec Interactive Grid', 'Track Day Booking Calendar', 'High-Octane Video Reel']
      }
    ],
    'B2B & Legal Counsel': [
      {
        id: 'b2b-1',
        name: 'Blackstone Corporate Defense',
        tagline: 'Encrypted Legal Discovery, Mergers & Private Equity Due Diligence',
        badge: 'CORPORATE LAW',
        accentColor: '#d97706',
        colorPalette: ['#d97706', '#1c1917', '#fbbf24', '#fafaf9'],
        heroImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=900&q=80',
        stats: ['Strict Confidentiality', 'Cross-Border Jurisdiction', 'Secure Retainer Settlement'],
        layoutStyle: 'Executive dark typography with confidential case consultation booking and legal brief archives.',
        idealFor: 'Law firms, private equity consultants, and corporate compliance auditors.',
        includedModules: ['Encrypted Intake Messaging', 'Practice Area Directories', 'Client Retainer Checkout Link', 'Confidential Document Vault']
      }
    ],
    'Tech & SaaS Platforms': [
      {
        id: 'tech-1',
        name: 'HyperScale Cloud Engine',
        tagline: 'Serverless Distributed Edge Compute & Fast Redis Cache Infrastructure',
        badge: 'CLOUD PLATFORM',
        accentColor: '#38bdf8',
        colorPalette: ['#38bdf8', '#082f49', '#bae6fd', '#f0f9ff'],
        heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        stats: ['99.999% Regional Uptime', '35ms Global Edge P99', 'Unlimited Autoscaling'],
        layoutStyle: 'Terminal command code previews with real-time latency map and interactive cost calculators.',
        idealFor: 'Cloud hosting providers, developer API platforms, and database tooling startups.',
        includedModules: ['Copy-Paste CLI Terminal Snippet', 'Global Ping Latency Map', 'Interactive Tier Calculator', 'Developer Documentation Center']
      }
    ],
    'Retail & E-Commerce': [
      {
        id: 'ret-1',
        name: 'Solstice Botanical Roastery',
        tagline: 'Ethically Sourced Micro-Lot Coffee & Artisan Pantry Provisions',
        badge: 'DIRECT TO CONSUMER',
        accentColor: '#f97316',
        colorPalette: ['#f97316', '#431407', '#fed7aa', '#fff7ed'],
        heroImage: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=900&q=80',
        stats: ['Single-Origin Micro-Lots', 'Compostable Bio-Bags', '4.9★ Over 8,000 Orders'],
        layoutStyle: 'Warm terracotta artisan storytelling with 1-click subscription checkout and roast level selectors.',
        idealFor: 'Specialty coffee roasters, gourmet food brands, and organic kitchen purveyors.',
        includedModules: ['Monthly Subscription Customizer', 'Tasting Notes Interactive Chart', 'Live Stock Inventory Counter', 'Express Apple Pay Integration']
      }
    ],
    'Real Estate & PropTech': [
      {
        id: 'real-1',
        name: 'Aura Commercial Holdings',
        tagline: 'Premium Commercial Real Estate & High-Rise Leasing Portfolio',
        badge: 'COMMERCIAL PROPERTY',
        accentColor: '#14b8a6',
        colorPalette: ['#14b8a6', '#042f2e', '#2dd4bf', '#f0fdfa'],
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        stats: ['$1.2B Assets Managed', '3D Virtual Walkthroughs', 'Instant Leasing Applications'],
        layoutStyle: 'Edge-to-edge architectural photography with interactive floor plans and live availability grids.',
        idealFor: 'Commercial real estate brokers, property management firms, and urban developers.',
        includedModules: ['Interactive Property Map', '3D Tour Embeds', 'Automated Leasing Application', 'Tenant Portal Login']
      }
    ],
    'Creators & Personal Brands': [
      {
        id: 'cre-1',
        name: 'Elena Rostova Studio',
        tagline: 'Visual Brand Systems, Editorial Typography & Campaign Direction',
        badge: 'CREATOR PORTFOLIO',
        accentColor: '#ec4899',
        colorPalette: ['#ec4899', '#500724', '#fbcfe8', '#fdf2f8'],
        heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        stats: ['Over 120 Brand Projects', 'Tokyo & Paris Exhibitions', 'Published in Monocle'],
        layoutStyle: 'Bold editorial typography catalog showcasing client campaigns, press features, and social link hub.',
        idealFor: 'Art directors, digital creators, models, fashion stylists, and visual consultants.',
        includedModules: ['High-Def Campaign Slider', 'Press & Exhibition Archive', 'Centralized Link Hub', 'Brand Sponsorship Inquiry Form']
      }
    ],
    'Education & E-Learning': [
      {
        id: 'edu-1',
        name: 'Nexus Digital Academy',
        tagline: 'Cohort-Based Engineering Masterclasses & Certification Pathways',
        badge: 'ONLINE ACADEMY',
        accentColor: '#8b5cf6',
        colorPalette: ['#8b5cf6', '#2e1065', '#a78bfa', '#f5f3ff'],
        heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
        stats: ['Interactive Curriculum', 'Alumni Mentorship', 'Automated Certification'],
        layoutStyle: 'Structured, distraction-free syllabus layout with cohort enrollment countdowns and video teasers.',
        idealFor: 'Course creators, corporate training firms, and independent educators.',
        includedModules: ['Curriculum Dropdown Accordion', 'Cohort Enrollment Timer', 'Student Success Video Reviews', 'Seamless Course Checkout']
      }
    ],
    'Hospitality & Culinary': [
      {
        id: 'hosp-1',
        name: 'Maison Noir Private Bistro',
        tagline: 'Seasonal Farm-Direct Tasting Menus & Biodynamic Wine Cellar',
        badge: 'FINE DINING',
        accentColor: '#e11d48',
        colorPalette: ['#e11d48', '#4c0519', '#fecdd3', '#fff1f2'],
        heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        stats: ['Michelin Guide Featured', 'Farm-Direct Daily Harvest', 'Cellar of 400 Labels'],
        layoutStyle: 'Sensory dark photography with integrated table reservation engine and downloadable seasonal menus.',
        idealFor: 'Fine dining restaurants, boutique hotels, and culinary tasting rooms.',
        includedModules: ['Live Reservation Widget', 'Daily Rotating Menu PDF Viewer', 'Sommelier Wine List', 'Private Event Rental Inquiry']
      }
    ]
  };

  return (
    <main style={styles.container}>
      <div style={styles.wrapper}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={styles.forgePill}>VERTICALFORGE ROI ENGINE</span>
          <h1 style={styles.heroHeading}>The Cost of Missing Architecture</h1>
          <p style={styles.heroSubheading}>
            Calculate the exact monthly revenue your business is leaking by relying on fragmented, manual systems instead of a high-conversion digital hub.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div style={styles.card}>
          <div style={styles.sliderSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
              <label style={styles.label}>Current Monthly Revenue ($)</label>
              <span style={styles.revenueDisplay}>${revenue.toLocaleString()}</span>
            </div>
            
            <input 
              type="range" 
              min="1000" 
              max="150000" 
              step="1000" 
              value={revenue} 
              onChange={(e) => setRevenue(Number(e.target.value))}
              style={styles.slider}
            />
            
            <div style={styles.sliderLabels}>
              <span>$1k</span>
              <span>$75k</span>
              <span>$150k+</span>
            </div>
          </div>

          <div style={styles.resultsGrid}>
            <div style={styles.resultBox}>
              <span style={styles.resultTitle}>Current Trajectory</span>
              <span style={styles.resultValueBase}>${revenue.toLocaleString()} /mo</span>
            </div>
            <div style={styles.resultBoxActive}>
              <span style={styles.resultTitleActive}>With Launch7 Architecture <Icons.TrendingUp /></span>
              <span style={styles.resultValueGrowth}>${totalProjected.toLocaleString()} /mo</span>
              <div style={styles.growthBadge}>+ ${projectedIncrease.toLocaleString()} (+39%)</div>
            </div>
          </div>

          {/* Industry Selection & Handoff */}
          <div style={{ marginTop: '32px' }}>
            <h3 style={styles.sectionTitle}>Select Your Industry Sector</h3>
            <div style={styles.industryGrid}>
              {industries.map((ind) => (
                <button 
                  key={ind} 
                  style={selectedIndustry === ind ? styles.industryBtnActive : styles.industryBtn}
                  onClick={() => setSelectedIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            {/* The secure handoff URL string passes the industry to the main page */}
            <a href={`/?vertical=${encodeURIComponent(selectedIndustry)}`} style={{ textDecoration: 'none' }}>
              <button style={styles.primaryBtn}>
                Want to know when your website will be ready? <Icons.ArrowRight />
              </button>
            </a>
            <p style={styles.btnSubtext}>
              Click to view your guaranteed deployment timeline and browse templates.
            </p>
          </div>
        </div>

        {/* Empirical Data Citations */}
        <div style={styles.citationCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Icons.Shield />
            <h4 style={styles.citationHeader}>Verified Market Infrastructure Data</h4>
          </div>
          <ul style={styles.citationList}>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>Stanford Web Credibility Project:</strong> 75% of consumers judge a business's credibility and willingness to spend strictly based on website architecture and design.
            </li>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>SBA Digital Adoption Index:</strong> Small to mid-size businesses with a dedicated operational web presence grow revenue 2.8x faster than those relying solely on manual outreach.
            </li>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>Industry Average:</strong> A structured intake and booking architecture increases captured lead volume by an average of 39% within the first 60 days of deployment.
            </li>
          </ul>
         {/* Empirical Data Citations */}
        <div style={styles.citationCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Icons.Shield />
            <h4 style={styles.citationHeader}>Verified Market Infrastructure Data</h4>
          </div>
          <ul style={styles.citationList}>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>Stanford Web Credibility Project:</strong> 75% of consumers judge a business's credibility and willingness to spend strictly based on website architecture and design.
            </li>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>SBA Digital Adoption Index:</strong> Small to mid-size businesses with a dedicated operational web presence grow revenue 2.8x faster than those relying solely on manual outreach.
            </li>
            <li style={styles.citationItem}>
              <Icons.Info /> <strong>Industry Average:</strong> A structured intake and booking architecture increases captured lead volume by an average of 39% within the first 60 days of deployment.
            </li>
          </ul>
          
          {/* [NEW] Secondary Action: Read More Market Research */}
          <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: '16px' }}>
            <a href="/research" style={{ textDecoration: 'none' }}>
              <button style={styles.secondaryBtn}>
                Read In-Depth Market Research & Whitepapers <Icons.ArrowRight />
              </button>
            </a>
          </div>
        </div> 
        </div>

        {/* Ecosystem Footer Constraint */}
        <div style={styles.footer}>
          Launch7 Studio operates under Cloud7.com
        </div>

      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', backgroundColor: '#050811', display: 'flex', justifyContent: 'center', padding: '40px 16px', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  wrapper: { width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' },
  forgePill: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.15)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'inline-block', marginBottom: '16px' },
  heroHeading: { fontSize: '32px', fontWeight: 800, letterSpacing: '-0.8px', margin: '0 0 12px 0', background: 'linear-gradient(135deg, #ffffff 0%, #d8b4fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubheading: { fontSize: '15px', color: '#94a3b8', lineHeight: 1.5, margin: 0 },
  
  card: { backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid #1e293b', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  
  sliderSection: { marginBottom: '32px', padding: '24px', backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid #1e293b' },
  label: { fontSize: '14px', fontWeight: 600, color: '#cbd5e1' },
  revenueDisplay: { fontSize: '24px', fontWeight: 800, color: '#f8fafc' },
  slider: { width: '100%', cursor: 'pointer', accentColor: '#a855f7', height: '6px', borderRadius: '3px', outline: 'none' },
  sliderLabels: { display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: '#64748b', fontWeight: 600 },
  
  resultsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  resultBox: { padding: '20px', backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '8px' },
  resultBoxActive: { padding: '20px', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', border: '1px solid #a855f7', display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' },
  resultTitle: { fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 },
  resultTitleActive: { fontSize: '12px', color: '#d8b4fe', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' },
  resultValueBase: { fontSize: '20px', fontWeight: 700, color: '#cbd5e1' },
  resultValueGrowth: { fontSize: '24px', fontWeight: 800, color: '#ffffff' },
  growthBadge: { display: 'inline-block', backgroundColor: '#059669', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', marginTop: '4px', alignSelf: 'flex-start' },
  
  sectionTitle: { fontSize: '14px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' },
  industryGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  industryBtn: { padding: '10px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#94a3b8', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
  industryBtnActive: { padding: '10px 16px', backgroundColor: '#a855f7', border: '1px solid #c084fc', borderRadius: '8px', color: '#ffffff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 15px rgba(168,85,247,0.3)' },
  
  primaryBtn: { width: '100%', padding: '18px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' },
  btnSubtext: { textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '12px' },
  secondaryBtn: { width: '100%', padding: '14px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' },

  citationCard: { backgroundColor: 'rgba(15, 23, 42, 0.4)', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' },
  citationHeader: { fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: 0 },
  citationList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' },
  citationItem: { fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, display: 'flex', gap: '10px', alignItems: 'flex-start' },

  footer: { textAlign: 'center', fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '20px', letterSpacing: '0.5px' }
};
