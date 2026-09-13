 
'use client';

import React, { useState, useEffect } from 'react';
import { getLaunchData, getPricingTiers, getCategories } from '../utils/loadLaunchData';

// Inline SVG Vector Icons
const Icons = {
  SpeedDelivery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  CheckCircle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  ShieldCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
  Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  Sparkles: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Laptop: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  Tablet: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Share: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
};

export default function LaunchSevenApp() {
  const launchMeta = getLaunchData();
  const pricingPlans = getPricingTiers();
  const categories = getCategories();

  const [navPage, setNavPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'B2B & Professional');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [shareNotice, setShareNotice] = useState(false);

  const [subView, setSubView] = useState<string | null>(null); 
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState('Growth Engine');

  const [formData, setFormData] = useState({
    tier: 'Growth Engine',
    vertical: '',
    objective: '',
    archetype: '',
    feature: '',
    readiness: '',
    fullName: '',
    businessName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setDeliveryDate(target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }));
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: launchMeta.company.name,
          text: 'Custom websites delivered in seven days with full personal control.',
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareNotice(true);
      setTimeout(() => setShareNotice(false), 3000);
    }
  };

  const templateCatalog: Record<string, any[]> = {
    'B2B & Professional': [
      {
        id: 'b2b-1',
        name: 'Apex Transit Dynamics',
        tagline: 'Global Autonomous Supply Chain & Freight Logistics Infrastructure',
        badge: 'ENTERPRISE FREIGHT',
        accentColor: '#0284c7',
        colorPalette: ['#0284c7', '#0f172a', '#38bdf8', '#f8fafc'],
        heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        stats: ['42 Global Logistics Hubs', 'Sub-Second Route Telemetry', '99.99% Node SLA'],
        layoutStyle: 'High-density telemetry dashboard with real-time schedule tracking and automated freight inquiry calculators.',
        idealFor: 'Logistics fleets, international freight forwarders, and commercial supply chain networks.',
        includedModules: ['Live Terminal Locator', 'Dynamic RFP Document Uploader', 'Automated Quote Calculator', 'Executive Leadership Directory']
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
    'Health & Wellness': [
      {
        id: 'hlth-1',
        name: 'Aegis Medical Collective',
        tagline: 'Evidence-Based Preventative Care, Longevity & Metabolic Optimization',
        badge: 'CLINICAL PRACTICE',
        accentColor: '#10b981',
        colorPalette: ['#10b981', '#064e3b', '#a7f3d0', '#ecfdf5'],
        heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
        stats: ['Same-Day Intake Slots', 'Board-Certified MDs', 'HIPAA Encrypted Records'],
        layoutStyle: 'Modern clinical calm with instant patient scheduling and private lab result portal routing.',
        idealFor: 'Integrative medicine clinics, functional doctors, and concierge medical practices.',
        includedModules: ['Real-Time Calendar Booking', 'Physician Profile Directories', 'Patient Intake Paperwork Upload', 'Telehealth Video Integration']
      }
    ],
    'Technology & AI': [
      {
        id: 'tech-1',
        name: 'Kinesis Robotics Lab',
        tagline: 'Autonomous Industrial Fabrication & Neural Actuator Hardware Systems',
        badge: 'HARDWARE & AI',
        accentColor: '#a855f7',
        colorPalette: ['#a855f7', '#3b0764', '#e9d5ff', '#faf5ff'],
        heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
        stats: ['12ms Actuator Response', 'ISO-Certified Firmware', '24/7 Remote Diagnostics'],
        layoutStyle: 'Obsidian dark terminal with high-contrast hardware schematics and developer whitepaper downloads.',
        idealFor: 'Robotics startups, industrial hardware developers, and automation manufacturers.',
        includedModules: ['Hardware Specification Table', 'API Documentation Link Hub', 'Technical Whitepaper Request', 'Pilot Program Application']
      }
    ],
    'Creators & Hospitality': [
      {
        id: 'cre-1',
        name: 'Maison Noir Private Bistro',
        tagline: 'Seasonal Farm-Direct Tasting Menus & Biodynamic Wine Cellar',
        badge: 'FINE DINING',
        accentColor: '#e11d48',
        colorPalette: ['#e11d48', '#4c0519', '#fecdd3', '#fff1f2'],
        heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        stats: ['Michelin Guide Featured', 'Farm-Direct Daily Harvest', 'Cellar of 400 Labels'],
        layoutStyle: 'Sensory dark photography with integrated table reservation engine and downloadable seasonal menus.',
        idealFor: 'Fine dining restaurants, chef collectives, and culinary tasting rooms.',
        includedModules: ['Live OpenTable/Resy Widget', 'Daily Rotating Menu PDF Viewer', 'Sommelier Wine List', 'Private Event Rental Inquiry']
      }
    ]
  };

  const getAmbientBackground = () => {
    switch (navPage) {
      case 1: return 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 2: return 'radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 3: return 'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.35) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 4: return 'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.35) 0%, rgba(15, 23, 42, 0.92) 65%, rgba(5, 8, 17, 0.98) 100%)';
      default: return '#050811';
    }
  };

  if (submitted) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.card}>
          <h2 style={styles.title}>You are almost there!</h2>
          <p style={styles.text}>
            Thank you, <strong>{formData.fullName}</strong>. Specifications for <strong>{formData.businessName}</strong> are logged under <strong>{launchMeta.company.name}</strong>.
          </p>
          <div style={styles.alertBox}>
            <p style={styles.alertTitle}>Next Step: Payment Settlement</p>
            <p style={styles.alertText}>
              Your <strong>{launchMeta.company.deliveryWindow} delivery clock</strong> activates immediately upon payment confirmation. 
              Invoice confirmation and portal tokens have been staged for <strong>{formData.email}</strong>.
            </p>
          </div>
          <button style={styles.primaryBtn} onClick={() => alert(`Redirecting to secure checkout for ${formData.tier}...`)}>
            Complete Payment & Start Build
          </button>
        </div>
      </main>
    );
  }

  if (selectedTemplate) {
    const t = selectedTemplate;
    return (
      <main style={{ ...styles.container, background: '#050811', padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={styles.detailReturnBar}>
            <button style={styles.returnCatalogBtn} onClick={() => setSelectedTemplate(null)}>
              ← Back to All Templates
            </button>
            <div style={styles.deviceToggleGroup}>
              <button style={previewDevice === 'desktop' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('desktop')}>
                <Icons.Laptop /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Desktop</span>
              </button>
              <button style={previewDevice === 'tablet' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('tablet')}>
                <Icons.Tablet /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Tablet</span>
              </button>
              <button style={previewDevice === 'mobile' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('mobile')}>
                <Icons.Smartphone /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Mobile</span>
              </button>
            </div>
          </div>

          <div style={previewDevice === 'mobile' ? styles.frameMobile : previewDevice === 'tablet' ? styles.frameTablet : styles.frameDesktop}>
            <div style={styles.browserHeader}>
              <div style={styles.browserDots}>
                <span style={{ ...styles.dot, backgroundColor: '#ef4444' }} />
                <span style={{ ...styles.dot, backgroundColor: '#eab308' }} />
                <span style={{ ...styles.dot, backgroundColor: '#22c55e' }} />
              </div>
              <div style={styles.browserUrlPill}>
                preview.{t.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
              </div>
              <span style={{ fontSize: '10px', color: t.accentColor, fontWeight: '700' }}>SSL LIVE</span>
            </div>

            <div style={styles.simulatedHero}>
              <img src={t.heroImage} alt={t.name} style={styles.simulatedHeroImg} />
              <div style={styles.simulatedHeroOverlay} />
              <div style={styles.simulatedHeroContent}>
                <span style={{ ...styles.mockupBadge, borderColor: t.accentColor, color: t.accentColor }}>{t.badge}</span>
                <h2 style={styles.simulatedHeading}>{t.name}</h2>
                <p style={styles.simulatedSubtext}>{t.tagline}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <button style={{ ...styles.mockupActionBtn, backgroundColor: t.accentColor }}>Explore Platform</button>
                  <button style={styles.mockupSecondaryBtn}>View Specs</button>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.cardRelative}>
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => { updateField('vertical', t.name); setSelectedTemplate(null); setSubView('questionnaire'); }}>
                Adopt {t.name} & Start 7-Day Sprint →
              </button>
              <button style={{ ...styles.secondaryBtn, width: 'auto', padding: '0 20px' }} onClick={() => setSelectedTemplate(null)}>Back</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (subView === 'pricing') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={{ ...styles.cardRelative, maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={styles.badge}>TRANSPARENT PRICING</span>
            <h2 style={{ ...styles.title, marginTop: '6px' }}>Full Website Starting at {launchMeta.company.pricingBase}</h2>
            <p style={styles.brandSubheading}>One-time investment. 100% code ownership with zero monthly lock-in.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {pricingPlans.map((plan: any) => (
              <div key={plan.name} style={{ ...styles.pricingCard, borderColor: plan.highlight ? '#38bdf8' : '#1e293b', backgroundColor: plan.highlight ? 'rgba(30, 58, 138, 0.35)' : 'rgba(15, 23, 42, 0.7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={plan.highlight ? styles.popularBadge : styles.tierBadge}>{plan.badge}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '4px 0 0 0', color: '#f8fafc' }}>{plan.name}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '22px', fontWeight: '800', color: '#38bdf8' }}>{plan.price}</span>
                    <span style={{ fontSize: '9px', color: '#94a3b8', display: 'block' }}>one-time</span>
                  </div>
                </div>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 6px 0' }}>{plan.tagline}</p>
                <button style={plan.highlight ? styles.primaryBtn : styles.secondaryBtn} onClick={() => { updateField('tier', plan.name); setSelectedTier(plan.name); setSubView('questionnaire'); }}>
                  Choose {plan.name} →
                </button>
              </div>
            ))}
          </div>

          <button style={styles.backBtn} onClick={() => setSubView(null)}>← Back to Navigation</button>
        </div>
      </main>
    );
  }

  if (subView === 'creator') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={{ ...styles.cardRelative, maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={styles.creatorPill}>✨ CREATORS & BRANDS</span>
            <h2 style={{ ...styles.title, marginTop: '8px' }}>Own Your Brand Hub</h2>
            <p style={styles.brandSubheading}>Stop sending followers to plain link trees.</p>
          </div>
          <button style={styles.primaryBtn} onClick={() => { updateField('vertical', 'Creator & Personal Brand'); setSubView('questionnaire'); }}>
            Build My Creator Brand Site →
          </button>
          <button style={styles.backBtn} onClick={() => setSubView(null)}>← Back to Navigation</button>
        </div>
      </main>
    );
  }

  if (subView === 'questionnaire') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.card}>
          <div style={styles.progressBarContainer}>
            <div style={{ ...styles.progressBar, width: `${(step / 6) * 100}%` }} />
          </div>
          
          {step === 1 && (
            <div>
              <h3 style={styles.questionTitle}>1. What type of website is this for?</h3>
              {categories.map((item) => (
                <button key={item} style={formData.vertical === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('vertical', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={styles.questionTitle}>2. What is your primary objective?</h3>
              {['Capture Customer Inquiries & Leads', 'Sell Products', 'Showcase Portfolio', 'Build Brand Trust'].map((item) => (
                <button key={item} style={formData.objective === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('objective', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={styles.questionTitle}>3. What style fits best?</h3>
              {['Clean & Minimal', 'Bold & Editorial', 'Dark & High-Tech'].map((item) => (
                <button key={item} style={formData.archetype === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('archetype', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={styles.questionTitle}>4. What key feature do you need most?</h3>
              {['Appointment Booking', 'Lead Inquiry Form', 'Interactive Catalog'].map((item) => (
                <button key={item} style={formData.feature === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('feature', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={styles.questionTitle}>5. Do you already have a logo and domain?</h3>
              {['Yes, both ready', 'Have logo, need domain', 'Need both'].map((item) => (
                <button key={item} style={formData.readiness === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('readiness', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step === 6 && (
            <form onSubmit={handleSubmit}>
              <h3 style={styles.questionTitle}>6. Where should we send your project details?</h3>
              <input style={styles.input} placeholder="Your Full Name" required value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
              <input style={styles.input} placeholder="Your Business or Brand Name" required value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} />
              <input style={styles.input} type="email" placeholder="Your Email Address" required value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
              <button type="submit" style={styles.primaryBtn}>Submit & Request Invoice ({formData.tier})</button>
            </form>
          )}

          {step > 1 && <button style={styles.backBtn} onClick={handleBack}>← Back</button>}
          {step === 1 && <button style={styles.backBtn} onClick={() => setSubView(null)}>← Cancel</button>}
        </div>
      </main>
    );
  }

  return (
    <main style={{ ...styles.container, background: getAmbientBackground() }}>
      <div style={{ width: '100%', maxWidth: navPage === 4 ? '1040px' : '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        <div style={styles.stepProgressRow}>
          <button style={navPage === 1 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(1)}>01. About</button>
          <button style={navPage === 2 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(2)}>02. Launch</button>
          <button style={navPage === 3 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(3)}>03. Action</button>
          <button style={navPage === 4 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(4)}>04. Templates</button>
        </div>

        {navPage === 1 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={styles.studioPill}>{launchMeta.company.name.toUpperCase()} // WHO WE ARE</span>
              <h1 style={styles.landingHeroHeading}>{launchMeta.company.name}</h1>
              <p style={styles.landingHeroSubheading}>Custom websites delivered in seven days with full personal control. Operated under {launchMeta.company.parentEntity} by {launchMeta.company.founder}.</p>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(2)}>See When Your Site Can Launch →</button>
          </div>
        )}

        {navPage === 2 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={styles.badge}>THE 7-DAY DELIVERY BLUEPRINT</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Your Launch Timeline</h2>
            </div>
            <div style={styles.dynamicDateBox}>
              <Icons.Calendar />
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>If you start your build today:</span>
                <strong style={{ fontSize: '17px', color: '#38bdf8' }}>Live Launch by {deliveryDate || 'Next Week'}</strong>
              </div>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(3)}>Choose How to Get Started <Icons.ArrowRight /></button>
          </div>
        )}

        {navPage === 3 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={styles.launchReadyPill}>PHASE 03 // ACTION HUB</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Ready to build?</h2>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.primaryBtn} onClick={() => setSubView('questionnaire')}>⚡ Build My Website Now <Icons.ArrowRight /></button>
              <button style={styles.browseTemplatesBtn} onClick={() => setNavPage(4)}><Icons.Eye /> Browse Templates</button>
              <button style={styles.pricingBtn} onClick={() => setSubView('pricing')}>🏷 Full Website Starting at {launchMeta.company.pricingBase}</button>
            </div>
          </div>
        )}

        {navPage === 4 && (
          <div style={{ ...styles.cardRelative, maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={styles.portfolioBadge}>PRODUCTION DESIGNS</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Explore Templates</h2>
            </div>
            <div style={styles.portfolioCategoryTabs}>
              {categories.map((catName) => (
                <button key={catName} style={activeCategory === catName ? styles.catTabActive : styles.catTab} onClick={() => setActiveCategory(catName)}>{catName}</button>
              ))}
            </div>
            <div style={styles.templateGrid}>
              {templateCatalog[activeCategory]?.map((t) => (
                <div key={t.id} style={styles.templateCardItem} onClick={() => setSelectedTemplate(t)}>
                  <div style={styles.templateCardThumbnailBox}>
                    <img src={t.heroImage} alt={t.name} style={styles.templateCardImg} />
                  </div>
                  <div style={styles.templateCardBody}>
                    <h4 style={styles.templateCardName}>{t.name}</h4>
                    <p style={styles.templateCardTagline}>{t.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box', overflowX: 'hidden', transition: 'background 0.5s ease' },
  cardRelative: { position: 'relative', zIndex: 4, backgroundColor: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', width: '100%', borderRadius: '20px', padding: '24px 20px', color: '#f8fafc', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1)', boxSizing: 'border-box' },
  card: { position: 'relative', zIndex: 4, backgroundColor: '#1e293b', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', color: '#f8fafc', boxShadow: '0 15px 35px rgba(0,0,0,0.6)', boxSizing: 'border-box' },
  stepProgressRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', backgroundColor: '#090d16', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', width: '100%', boxSizing: 'border-box' },
  stepBtn: { padding: '8px 2px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid transparent', borderRadius: '6px', fontSize: '10.5px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', width: '100%' },
  stepBtnActive: { padding: '8px 2px', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '10.5px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', width: '100%', boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)' },
  landingHeroHeading: { fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px', margin: '8px 0 6px 0', lineHeight: 1.2, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px 0', lineHeight: 1.45 },
  studioPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  launchReadyPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#c084fc', backgroundColor: 'rgba(147, 51, 234, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(147, 51, 234, 0.4)', display: 'inline-block' },
  title: { fontSize: '22px', fontWeight: 800, marginBottom: '6px', textAlign: 'center', letterSpacing: '-0.5px' },
  brandSubheading: { fontSize: '12px', color: '#94a3b8', margin: '0 0 14px 0', lineHeight: 1.45, textAlign: 'center' },
  badge: { fontSize: '10px', letterSpacing: '1px', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  dynamicDateBox: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '10px', padding: '12px', marginBottom: '14px' },
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  primaryBtn: { width: '100%', padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  browseTemplatesBtn: { width: '100%', padding: '13px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid #0891b2', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  pricingBtn: { width: '100%', padding: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '10px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' },
  creatorBtn: { width: '100%', padding: '12px', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#f472b6', border: '1px solid #db2777', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  secondaryBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '12px', cursor: 'pointer', fontSize: '12px', width: '100%', textAlign: 'center' },
  portfolioBadge: { fontSize: '10px', letterSpacing: '1px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(6, 182, 212, 0.2)', padding: '4px 10px', borderRadius: '999px', border: '1px solid #0891b2', display: 'inline-block' },
  portfolioCategoryTabs: { display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '14px' },
  catTab: { padding: '7px 12px', backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  catTabActive: { padding: '7px 12px', backgroundColor: '#0284c7', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' },
  templateCardItem: { backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'border-color 0.2s' },
  templateCardThumbnailBox: { position: 'relative', height: '130px', width: '100%', overflow: 'hidden' },
  templateCardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  templateCardBadgeOverlay: { position: 'absolute', top: 8, left: 8 },
  templateCardBody: { padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' },
  templateCardName: { fontSize: '14px', fontWeight: 800, color: '#f8fafc', margin: '0 0 2px 0' },
  templateCardTagline: { fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: 1.35 },
  detailReturnBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '10px', border: '1px solid #1e293b', flexWrap: 'wrap', gap: '8px' },
  returnCatalogBtn: { background: 'none', border: 'none', color: '#38bdf8', fontSize: '12px', fontWeight: 700, cursor: 'pointer' },
  deviceToggleGroup: { display: 'flex', backgroundColor: '#090d16', borderRadius: '6px', border: '1px solid #1e293b', padding: '2px' },
  deviceBtn: { background: 'none', border: 'none', color: '#64748b', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceBtnActive: { backgroundColor: '#1e293b', border: 'none', color: '#38bdf8', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  frameDesktop: { backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden', width: '100%', transition: 'all 0.3s ease' },
  frameTablet: { backgroundColor: '#0f172a', borderRadius: '18px', border: '3px solid #334155', maxWidth: '580px', margin: '0 auto', overflow: 'hidden', width: '100%', transition: 'all 0.3s ease' },
  frameMobile: { backgroundColor: '#0f172a', borderRadius: '24px', border: '4px solid #334155', maxWidth: '320px', margin: '0 auto', overflow: 'hidden', width: '100%', transition: 'all 0.3s ease' },
  browserHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' },
  browserDots: { display: 'flex', gap: '5px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%' },
  browserUrlPill: { backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '10px', padding: '2px 10px', borderRadius: '4px', border: '1px solid #334155' },
  simulatedHero: { position: 'relative', height: '240px', overflow: 'hidden' },
  simulatedHeroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  simulatedHeroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15,23,42,0.95) 20%, rgba(15,23,42,0.3) 100%)' },
  simulatedHeroContent: { position: 'absolute', bottom: 12, left: 12, right: 12 },
  mockupBadge: { fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', border: '1px solid', letterSpacing: '0.5px' },
  simulatedHeading: { fontSize: '18px', fontWeight: 800, margin: '4px 0 2px 0', color: '#ffffff' },
  simulatedSubtext: { fontSize: '11px', color: '#cbd5e1', margin: 0 },
  mockupActionBtn: { padding: '6px 12px', color: '#ffffff', border: 'none', borderRadius: '5px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' },
  mockupSecondaryBtn: { padding: '6px 10px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', fontSize: '11px', fontWeight: 600 },
  pricingCard: { padding: '12px 14px', borderRadius: '10px', border: '1px solid #334155' },
  tierBadge: { fontSize: '9px', fontWeight: 700, color: '#94a3b8', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px' },
  popularBadge: { fontSize: '9px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(3, 105, 161, 0.3)', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0284c7' },
  creatorPill: { fontSize: '10px', letterSpacing: '1px', fontWeight: 800, color: '#f472b6', backgroundColor: 'rgba(190, 24, 93, 0.25)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(219, 39, 119, 0.5)', display: 'inline-block' },
  selectedTierBadge: { fontSize: '11px', fontWeight: 600, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '2px 8px', borderRadius: '4px' },
  questionTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '14px' },
  optionBtn: { width: '100%', padding: '11px', backgroundColor: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  selectedOption: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  input: { width: '100%', padding: '11px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', marginBottom: '10px', boxSizing: 'border-box' },
  progressBarContainer: { height: '4px', backgroundColor: '#334155', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s' },
  stepLabel: { fontSize: '12px', color: '#94a3b8' },
  alertBox: { backgroundColor: '#1e1b4b', border: '1px solid #4338ca', padding: '14px', borderRadius: '8px', marginTop: '14px', marginBottom: '14px' },
  alertTitle: { fontSize: '13px', fontWeight: 'bold', color: '#a5b4fc', margin: '0 0 4px 0' },
  alertText: { fontSize: '12px', color: '#c7d2fe', margin: 0, lineHeight: 1.4 },
  text: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 },
};
