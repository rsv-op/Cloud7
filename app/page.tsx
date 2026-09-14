'use client';

import React, { useState, useEffect } from 'react';
import { getLaunchData, getPricingTiers, getCategories } from '../utils/loadLaunchData';

const Icons = {
  SpeedDelivery: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  CheckCircle: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Laptop: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  Tablet: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Terminal: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
};

export default function LaunchSevenApp() {
  const launchMeta = getLaunchData();
  const pricingPlans = getPricingTiers();
  const categories = getCategories();

  const [navPage, setNavPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'Logistics & Supply Chain');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  const [subView, setSubView] = useState<string | null>(null); 
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState('Growth Engine');

  const [devClicks, setDevClicks] = useState(0);
  const [devAuthenticated, setDevAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    tier: 'Growth Engine',
    vertical: '',
    objective: '',
    archetype: '',
    feature: '',
    readiness: '',
    fullName: '',
    businessName: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    setDeliveryDate(target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }));

    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const incomingVertical = searchParams.get('vertical');

      if (incomingVertical) {
        setTimeout(() => {
          setFormData(prev => ({ ...prev, vertical: incomingVertical }));
          setNavPage(3);
          setSubView('questionnaire');
          setStep(2); 
        }, 100);
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const handleStealthClick = () => {
    if (devClicks + 1 === 5) {
      const pwd = window.prompt("CLOUD7 SYSADMIN AUTH:");
      if (pwd === "Ric96Cloud07") setDevAuthenticated(true);
      setDevClicks(0);
    } else {
      setDevClicks(c => c + 1);
    }
  };

  const templateCatalog: Record<string, any[]> = {
    'Logistics & Supply Chain': [{ id: 'log-1', name: 'Apex Central Dispatch', tagline: 'Automated Carrier Verification, Telemetry & Logistics', badge: 'FLEET LOGISTICS', accentColor: '#0284c7', heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80' }],
    'Healthcare & Clinics': [{ id: 'hlth-1', name: 'Aegis Medical Collective', tagline: 'HIPAA-Compliant Patient Intake & Scheduling', badge: 'CLINICAL PRACTICE', accentColor: '#10b981', heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80' }],
    'B2B & Legal Counsel': [{ id: 'b2b-1', name: 'Blackstone Corporate', tagline: 'Encrypted Legal Discovery & Case Retainers', badge: 'CORPORATE LAW', accentColor: '#d97706', heroImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=900&q=80' }],
    'Tech & SaaS Platforms': [{ id: 'tech-1', name: 'HyperScale Edge', tagline: 'Distributed Serverless Compute Infrastructure', badge: 'CLOUD PLATFORM', accentColor: '#38bdf8', heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80' }],
    'Retail & E-Commerce': [{ id: 'ret-1', name: 'Solstice Roastery', tagline: 'Ethically Sourced Provisions & Subscriptions', badge: 'DIRECT TO CONSUMER', accentColor: '#f97316', heroImage: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=900&q=80' }]
  };

  const getAmbientBackground = () => {
    if (devAuthenticated) return '#020617'; 
    switch (navPage) {
      case 1: return 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 2: return 'radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 3: return 'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.35) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 4: return 'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.35) 0%, rgba(15, 23, 42, 0.92) 65%, rgba(5, 8, 17, 0.98) 100%)';
      default: return '#050811';
    }
  };

  if (devAuthenticated) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={{ ...styles.card, maxWidth: '700px', border: '1px solid #a855f7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
            <Icons.Terminal />
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#d8b4fe', margin: 0 }}>CLOUD7 MASTER OPERATIONS</h2>
            <span style={{ fontSize: '10px', backgroundColor: '#a855f7', padding: '2px 8px', borderRadius: '4px', marginLeft: 'auto' }}>ADMIN ACTIVE</span>
          </div>
          <h3 style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '12px' }}>Live Form State (Intake Memory)</h3>
          <pre style={{ backgroundColor: '#000000', padding: '16px', borderRadius: '8px', fontSize: '11px', color: '#34d399', overflowX: 'auto', border: '1px solid #1e293b' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
          <button style={{ ...styles.secondaryBtn, marginTop: '24px' }} onClick={() => setDevAuthenticated(false)}>Close Admin Portal</button>
        </div>
      </main>
    );
  }

  if (selectedTemplate) {
    const t = selectedTemplate;
    return (
      <main style={{ ...styles.container, background: '#050811' }}>
        <div style={styles.wrapperFull}>
          <div style={styles.detailReturnBar}>
            <button style={styles.returnCatalogBtn} onClick={() => setSelectedTemplate(null)}>← Back to All Templates</button>
            <div style={styles.deviceToggleGroup}>
              <button style={previewDevice === 'desktop' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('desktop')}><Icons.Laptop /> <span style={styles.deviceLabel}>Desktop</span></button>
              <button style={previewDevice === 'tablet' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('tablet')}><Icons.Tablet /> <span style={styles.deviceLabel}>Tablet</span></button>
              <button style={previewDevice === 'mobile' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('mobile')}><Icons.Smartphone /> <span style={styles.deviceLabel}>Mobile</span></button>
            </div>
          </div>
          <div style={previewDevice === 'mobile' ? styles.frameMobile : previewDevice === 'tablet' ? styles.frameTablet : styles.frameDesktop}>
            <div style={styles.browserHeader}>
              <div style={styles.browserDots}><span style={{ ...styles.dot, backgroundColor: '#ef4444' }} /><span style={{ ...styles.dot, backgroundColor: '#eab308' }} /><span style={{ ...styles.dot, backgroundColor: '#22c55e' }} /></div>
              <div style={styles.browserUrlPill}>preview.{t.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com</div>
              <span style={{ fontSize: '10px', color: t.accentColor, fontWeight: 800 }}>SSL LIVE</span>
            </div>
            <div style={styles.simulatedHero}>
              <img src={t.heroImage} alt={t.name} style={styles.simulatedHeroImg} />
              <div style={styles.simulatedHeroOverlay} />
              <div style={styles.simulatedHeroContent}>
                <span style={{ ...styles.mockupBadge, borderColor: t.accentColor, color: t.accentColor }}>{t.badge}</span>
                <h2 style={styles.simulatedHeading}>{t.name}</h2>
                <p style={styles.simulatedSubtext}>{t.tagline}</p>
                <button style={{ ...styles.mockupActionBtn, backgroundColor: t.accentColor, marginTop: '10px' }}>Explore Platform</button>
              </div>
            </div>
          </div>
          <div style={styles.cardRelative}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={{ ...styles.primaryBtn, flex: '1 1 auto' }} onClick={() => { updateField('vertical', t.name); setSelectedTemplate(null); setSubView('questionnaire'); }}>Adopt {t.name} & Start Sprint →</button>
              <button style={{ ...styles.secondaryBtn, width: 'auto', flex: '0 0 auto', padding: '0 20px' }} onClick={() => setSelectedTemplate(null)}>Back</button>
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
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={styles.badge}>TRANSPARENT PRICING</span>
            <h2 style={{ ...styles.title, marginTop: '8px' }}>Full Website Starting at {launchMeta.company.pricingBase}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
            {pricingPlans.map((plan: any) => (
              <div key={plan.name} style={{ ...styles.pricingCard, borderColor: plan.highlight ? '#38bdf8' : '#1e293b', backgroundColor: plan.highlight ? 'rgba(30, 58, 138, 0.35)' : 'rgba(15, 23, 42, 0.7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={plan.highlight ? styles.popularBadge : styles.tierBadge}>{plan.badge}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '6px 0 0 0', color: '#f8fafc' }}>{plan.name}</h3>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 'clamp(20px, 5vw, 24px)', fontWeight: 800, color: '#38bdf8' }}>{plan.price}</span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 12px 0', lineHeight: 1.4 }}>{plan.tagline}</p>
                <button style={plan.highlight ? styles.primaryBtn : styles.secondaryBtn} onClick={() => { updateField('tier', plan.name); setSelectedTier(plan.name); setSubView('questionnaire'); }}>Choose {plan.name} →</button>
              </div>
            ))}
          </div>
          <button style={styles.backBtn} onClick={() => setSubView(null)}>← Back to Navigation</button>
        </div>
      </main>
    );
  }

  if (subView === 'questionnaire') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.cardRelative}>
          <div style={styles.progressBarContainer}><div style={{ ...styles.progressBar, width: `${(step / 6) * 100}%` }} /></div>
          
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
              {['Capture Customer Inquiries & Leads', 'Sell Products', 'Build Brand Trust'].map((item) => (
                <button key={item} style={formData.objective === item ? styles.selectedOption : styles.optionBtn} onClick={() => { updateField('objective', item); handleNext(); }}>{item}</button>
              ))}
            </div>
          )}

          {step > 2 && step < 6 && (
            <div>
              <h3 style={styles.questionTitle}>Phase {step} Configuration</h3>
              <button style={styles.optionBtn} onClick={handleNext}>Confirm Standard Configuration</button>
            </div>
          )}

          {step === 6 && (
            <form onSubmit={handleSubmit}>
              <h3 style={styles.questionTitle}>6. Deployment Details</h3>
              <input style={styles.input} placeholder="Full Name" required onChange={(e) => updateField('fullName', e.target.value)} />
              <input style={styles.input} placeholder="Business Name" required onChange={(e) => updateField('businessName', e.target.value)} />
              <input style={styles.input} type="email" placeholder="Email Address" required onChange={(e) => updateField('email', e.target.value)} />
              <button type="submit" style={styles.primaryBtn}>Initialize Build Request</button>
            </form>
          )}

          {step > 1 && <button style={styles.backBtn} onClick={handleBack}>← Back</button>}
          {step === 1 && <button style={styles.backBtn} onClick={() => setSubView(null)}>← Cancel</button>}
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.cardRelative}>
          <h2 style={styles.title}>Deployment Authorized</h2>
          <p style={styles.text}>Specifications for <strong>{formData.businessName}</strong> are logged. Your 7-day clock begins upon payment confirmation.</p>
          <button style={styles.primaryBtn} onClick={() => alert(`Initiating payment for ${formData.tier}...`)}>Complete Payment</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ ...styles.container, background: getAmbientBackground() }}>
      <div style={navPage === 4 ? styles.wrapperFull : styles.wrapperStandard}>
        
        <div style={styles.stepProgressRow}>
          <button style={navPage === 1 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(1)}>01. About</button>
          <button style={navPage === 2 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(2)}>02. Launch</button>
          <button style={navPage === 3 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(3)}>03. Action</button>
          <button style={navPage === 4 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(4)}>04. Templates</button>
        </div>

        {navPage === 1 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={styles.studioPill}>LAUNCH7 STUDIO</span>
              <h1 style={styles.landingHeroHeading}>{launchMeta.company.name}</h1>
              <p style={styles.landingHeroSubheading}>Custom digital infrastructure delivered in exactly seven days.</p>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(2)}>View Deployment Timeline →</button>
          </div>
        )}

        {navPage === 2 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={styles.badge}>THE 7-DAY DELIVERY BLUEPRINT</span>
              <h2 style={{ ...styles.title, marginTop: '8px' }}>Your Launch Timeline</h2>
            </div>
            <div style={styles.dynamicDateBox}>
              <Icons.Calendar />
              <div>
                <span style={{ fontSize: 'clamp(11px, 2.5vw, 13px)', color: '#94a3b8', display: 'block' }}>If you start your build today:</span>
                <strong style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: '#38bdf8' }}>Live Launch by {deliveryDate}</strong>
              </div>
            </div>
            <button style={styles.primaryBtn} onClick={() => setNavPage(3)}>Continue <Icons.ArrowRight /></button>
          </div>
        )}

        {navPage === 3 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={styles.launchReadyPill}>PHASE 03 // ACTION HUB</span>
              <h2 style={{ ...styles.title, marginTop: '8px' }}>Ready to build?</h2>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.primaryBtn} onClick={() => setSubView('questionnaire')}>⚡ Build My Website Now <Icons.ArrowRight /></button>
              <button style={styles.browseTemplatesBtn} onClick={() => setNavPage(4)}><Icons.Eye /> Browse Architecture Templates</button>
              <button style={styles.pricingBtn} onClick={() => setSubView('pricing')}>🏷 View Transparent Pricing ({launchMeta.company.pricingBase})</button>
            </div>
          </div>
        )}

        {navPage === 4 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span style={styles.badge}>PRODUCTION DESIGNS</span>
              <h2 style={{ ...styles.title, marginTop: '8px' }}>Explore Templates</h2>
            </div>
            <div style={styles.portfolioCategoryTabs}>
              {categories.slice(0, 5).map((catName) => (
                <button key={catName} style={activeCategory === catName ? styles.catTabActive : styles.catTab} onClick={() => setActiveCategory(catName)}>{catName}</button>
              ))}
            </div>
            <div style={styles.templateGrid}>
              {templateCatalog[activeCategory]?.map((t) => (
                <div key={t.id} style={styles.templateCardItem} onClick={() => setSelectedTemplate(t)}>
                  <div style={styles.templateCardThumbnailBox}><img src={t.heroImage} alt={t.name} style={styles.templateCardImg} /></div>
                  <div style={styles.templateCardBody}>
                    <h4 style={styles.templateCardName}>{t.name}</h4>
                    <p style={styles.templateCardTagline}>{t.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={styles.stealthFooter} onClick={handleStealthClick}>
          Operated by {launchMeta.company.parentEntity}
        </div>
      </div>
    </main>
  );
}

// THE CSS MATHEMATICS ENGINE: Utilizing clamp() to guarantee flawless edge-to-edge scaling on all viewports
const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 32px)', boxSizing: 'border-box', transition: 'background 0.5s ease', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  wrapperStandard: { width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 20px)' },
  wrapperFull: { width: '100%', maxWidth: '1040px', display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 3vw, 20px)' },
  
  cardRelative: { backgroundColor: 'rgba(15, 23, 42, 0.95)', width: '100%', borderRadius: 'clamp(16px, 4vw, 24px)', padding: 'clamp(20px, 5vw, 32px)', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' },
  card: { backgroundColor: '#1e293b', width: '100%', maxWidth: '440px', borderRadius: 'clamp(16px, 4vw, 24px)', padding: 'clamp(20px, 5vw, 32px)' },
  
  stepProgressRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', backgroundColor: '#090d16', padding: '6px', borderRadius: '12px', border: '1px solid #1e293b' },
  stepBtn: { padding: 'clamp(8px, 2vw, 10px) 2px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid transparent', borderRadius: '8px', fontSize: 'clamp(9px, 2.5vw, 11px)', fontWeight: 600, cursor: 'pointer', textAlign: 'center' },
  stepBtnActive: { padding: 'clamp(8px, 2vw, 10px) 2px', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '8px', fontSize: 'clamp(9px, 2.5vw, 11px)', fontWeight: 700, cursor: 'pointer', textAlign: 'center', boxShadow: '0 0 12px rgba(56, 189, 248, 0.15)' },
  
  landingHeroHeading: { fontSize: 'clamp(24px, 7vw, 36px)', fontWeight: 800, margin: '12px 0 8px 0', lineHeight: 1.15, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#cbd5e1', margin: '0 0 20px 0', lineHeight: 1.5 },
  
  studioPill: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  launchReadyPill: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 800, color: '#c084fc', backgroundColor: 'rgba(147, 51, 234, 0.2)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(147, 51, 234, 0.4)', display: 'inline-block' },
  badge: { fontSize: '10px', letterSpacing: '1.5px', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '6px 12px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  
  title: { fontSize: 'clamp(20px, 5vw, 26px)', fontWeight: 800, marginBottom: '8px', textAlign: 'center', lineHeight: 1.2 },
  text: { fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#cbd5e1', lineHeight: 1.6, textAlign: 'center' },
  
  dynamicDateBox: { display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '12px', padding: '16px', marginBottom: '20px' },
  
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  primaryBtn: { width: '100%', padding: 'clamp(14px, 3.5vw, 18px)', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: 'clamp(14px, 3.5vw, 16px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(37,99,235,0.3)' },
  browseTemplatesBtn: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid #0891b2', borderRadius: '12px', fontWeight: 700, fontSize: 'clamp(13px, 3.5vw, 14px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  pricingBtn: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '12px', fontWeight: 700, fontSize: 'clamp(13px, 3.5vw, 14px)', cursor: 'pointer' },
  secondaryBtn: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '12px', fontWeight: 600, fontSize: 'clamp(13px, 3.5vw, 14px)', cursor: 'pointer' },
  
  questionTitle: { fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 600, marginBottom: '16px', lineHeight: 1.3 },
  optionBtn: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: '#334155', color: '#f8fafc', border: 'none', borderRadius: '10px', textAlign: 'left', marginBottom: '10px', fontSize: 'clamp(13px, 3.5vw, 15px)', cursor: 'pointer', transition: 'background 0.2s' },
  selectedOption: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', textAlign: 'left', marginBottom: '10px', fontSize: 'clamp(13px, 3.5vw, 15px)', cursor: 'pointer' },
  input: { width: '100%', padding: 'clamp(14px, 3.5vw, 16px)', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', color: '#f8fafc', marginBottom: '12px', boxSizing: 'border-box', fontSize: '14px' },
  
  progressBarContainer: { height: '6px', backgroundColor: '#334155', borderRadius: '3px', marginBottom: '20px' },
  progressBar: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s ease', borderRadius: '3px' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '16px', cursor: 'pointer', fontSize: '13px', width: '100%', textAlign: 'center', padding: '10px' },
  stealthFooter: { textAlign: 'center', fontSize: '11px', color: '#475569', marginTop: '24px', padding: '10px', cursor: 'default', userSelect: 'none', letterSpacing: '0.5px' },
  
  portfolioCategoryTabs: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px', WebkitOverflowScrolling: 'touch' },
  catTab: { padding: '8px 16px', backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: '8px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  catTabActive: { padding: '8px 16px', backgroundColor: '#0284c7', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '8px', fontSize: 'clamp(11px, 2.5vw, 13px)', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' },
  templateCardItem: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' },
  templateCardThumbnailBox: { position: 'relative', height: '160px', width: '100%', overflow: 'hidden', backgroundColor: '#000' },
  templateCardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  templateCardBody: { padding: '16px', display: 'flex', flexDirection: 'column' },
  templateCardName: { fontSize: 'clamp(15px, 4vw, 17px)', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' },
  templateCardTagline: { fontSize: 'clamp(12px, 3vw, 13px)', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: 1.4 },
  
  detailReturnBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '12px', border: '1px solid #1e293b', flexWrap: 'wrap', gap: '10px' },
  returnCatalogBtn: { background: 'none', border: 'none', color: '#38bdf8', fontSize: '13px', fontWeight: 700, cursor: 'pointer' },
  deviceToggleGroup: { display: 'flex', backgroundColor: '#090d16', borderRadius: '8px', border: '1px solid #1e293b', padding: '4px' },
  deviceBtn: { background: 'none', border: 'none', color: '#64748b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceBtnActive: { backgroundColor: '#1e293b', border: 'none', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceLabel: { fontSize: '12px', marginLeft: '6px', display: 'inline-block' },
  
  frameDesktop: { backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden', width: '100%', transition: 'all 0.3s ease' },
  frameTablet: { backgroundColor: '#0f172a', borderRadius: '24px', border: '4px solid #334155', maxWidth: '768px', margin: '0 auto', overflow: 'hidden', width: '100%' },
  frameMobile: { backgroundColor: '#0f172a', borderRadius: '32px', border: '6px solid #334155', maxWidth: '390px', margin: '0 auto', overflow: 'hidden', width: '100%' },
  
  browserHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' },
  browserDots: { display: 'flex', gap: '6px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%' },
  browserUrlPill: { backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '11px', padding: '4px 12px', borderRadius: '6px', border: '1px solid #334155' },
  simulatedHero: { position: 'relative', height: 'clamp(200px, 40vh, 320px)', overflow: 'hidden' },
  simulatedHeroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  simulatedHeroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15,23,42,0.95) 20%, rgba(15,23,42,0.3) 100%)' },
  simulatedHeroContent: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  mockupBadge: { fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px', border: '1px solid', letterSpacing: '0.5px' },
  simulatedHeading: { fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 800, margin: '8px 0 4px 0', color: '#ffffff' },
  simulatedSubtext: { fontSize: 'clamp(12px, 3vw, 14px)', color: '#cbd5e1', margin: 0, lineHeight: 1.5 },
  mockupActionBtn: { padding: '8px 16px', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '12px' },
  
  pricingCard: { padding: 'clamp(16px, 4vw, 24px)', borderRadius: '16px', border: '1px solid #334155' },
  tierBadge: { fontSize: '10px', fontWeight: 700, color: '#94a3b8', backgroundColor: '#334155', padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.5px' },
  popularBadge: { fontSize: '10px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(3, 105, 161, 0.3)', padding: '4px 8px', borderRadius: '6px', border: '1px solid #0284c7', letterSpacing: '0.5px' }
};
