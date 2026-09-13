
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
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  Calendar: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  Code: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
};

export default function LaunchSevenApp() {
  const launchMeta = getLaunchData();
  const pricingPlans = getPricingTiers();
  const categories = getCategories();

  const [navPage, setNavPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'B2B & Professional');
  const [deliveryDate, setDeliveryDate] = useState('');
  
  // State Machine Flags
  const [subView, setSubView] = useState<string | null>(null); 
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [builderAccess, setBuilderAccess] = useState(false);
  const [devKeyInput, setDevKeyInput] = useState('');
  const [showDevPrompt, setShowDevPrompt] = useState(false);

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

  const handleDeveloperBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (devKeyInput.trim() === 'Ric96Cloud07') {
      setBuilderAccess(true);
      setShowDevPrompt(false);
    } else {
      alert('Invalid Developer Key.');
    }
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

  // --- VIEW: DIRECT BUILDER WORKSPACE (BYPASS SUCCESS) ---
  if (builderAccess) {
    return (
      <main style={{ ...styles.container, background: '#050811' }}>
        <div style={{ ...styles.cardRelative, maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={styles.devPill}>⚡ DEVELOPER ACCESS // ACTIVE WORKSPACE</span>
            <button style={styles.backBtnInline} onClick={() => setBuilderAccess(false)}>Exit Workspace</button>
          </div>
          
          <h2 style={{ ...styles.title, textAlign: 'left' }}>Production Staging & Builder Hub</h2>
          <p style={{ ...styles.brandSubheading, textAlign: 'left' }}>
            Payment stage bypassed. Workspace unlocked for founder verification and layout generation.
          </p>

          <div style={styles.builderGrid}>
            <div style={styles.builderBox}>
              <h4 style={styles.builderBoxTitle}>Target Specifications</h4>
              <p style={styles.builderBoxItem}><strong>Tier:</strong> {formData.tier}</p>
              <p style={styles.builderBoxItem}><strong>Client:</strong> {formData.fullName || 'Richard S (Founder)'}</p>
              <p style={styles.builderBoxItem}><strong>Entity:</strong> {formData.businessName || 'Cloud7 Internal'}</p>
              <p style={styles.builderBoxItem}><strong>Vertical:</strong> {formData.vertical || 'Custom Architecture'}</p>
              <p style={styles.builderBoxItem}><strong>Core Module:</strong> {formData.feature || 'Lead & Ingestion Pipeline'}</p>
            </div>

            <div style={styles.builderBox}>
              <h4 style={styles.builderBoxTitle}>Workspace Actions</h4>
              <button style={styles.primaryBtnSmall} onClick={() => alert('Compiling staging bundle...')}>
                Compile Staging Bundle
              </button>
              <button style={styles.secondaryBtnSmall} onClick={() => alert('Exporting Markdown schema...')}>
                Export Markdown Blueprint
              </button>
              <button style={styles.secondaryBtnSmall} onClick={() => alert('Synchronizing with VerticalForge...')}>
                Sync VerticalForge Audit
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- VIEW: SUBMISSION STAGED (PAYMENT + DEV OVERRIDE) ---
  if (submitted) {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={styles.card}>
          <h2 style={styles.title}>You are almost there!</h2>
          <p style={styles.text}>
            Specifications for <strong>{formData.businessName || 'Your Business'}</strong> are staged.
          </p>
          
          <div style={styles.alertBox}>
            <p style={styles.alertTitle}>Next Step: Payment Settlement</p>
            <p style={styles.alertText}>
              Your <strong>{launchMeta.company.deliveryWindow} delivery clock</strong> activates immediately upon payment confirmation. 
            </p>
          </div>

          <button style={styles.primaryBtn} onClick={() => alert(`Redirecting to checkout for ${formData.tier}...`)}>
            Complete Payment & Start Build
          </button>

          {/* DEVELOPER BYPASS OVERRIDE */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #334155', paddingTop: '14px', textAlign: 'center' }}>
            {!showDevPrompt ? (
              <button style={styles.devTriggerBtn} onClick={() => setShowDevPrompt(true)}>
                <Icons.Code /> Developer Access Bypass
              </button>
            ) : (
              <form onSubmit={handleDeveloperBypass} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="password"
                  placeholder="Enter Founder Key (CLOUD7_DEV)"
                  value={devKeyInput}
                  onChange={(e) => setDevKeyInput(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.devSubmitBtn}>
                  Unlock Builder Workspace →
                </button>
                <button type="button" style={styles.backBtn} onClick={() => setShowDevPrompt(false)}>
                  Cancel Bypass
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    );
  }

  // --- SUB-VIEW: QUESTIONNAIRE ---
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

  // --- DEFAULT LANDING VIEW ---
  return (
    <main style={{ ...styles.container, background: getAmbientBackground() }}>
      <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        <div style={styles.stepProgressRow}>
          <button style={navPage === 1 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(1)}>01. About</button>
          <button style={navPage === 2 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(2)}>02. Launch</button>
          <button style={navPage === 3 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(3)}>03. Action</button>
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
              <button style={styles.secondaryBtn} onClick={() => { setFormData(f => ({ ...f, fullName: 'Founder Direct', businessName: 'Cloud7 Internal' })); setSubmitted(true); }}>
                Direct Founder Checkout Preview
              </button>
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
  stepProgressRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', backgroundColor: '#090d16', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', width: '100%', boxSizing: 'border-box' },
  stepBtn: { padding: '8px 2px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid transparent', borderRadius: '6px', fontSize: '10.5px', fontWeight: 600, cursor: 'pointer', textAlign: 'center', boxSizing: 'border-box', width: '100%' },
  stepBtnActive: { padding: '8px 2px', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '10.5px', fontWeight: 700, cursor: 'pointer', textAlign: 'center', boxSizing: 'border-box', width: '100%' },
  landingHeroHeading: { fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px', margin: '8px 0 6px 0', lineHeight: 1.2, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px 0', lineHeight: 1.45 },
  studioPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  launchReadyPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#c084fc', backgroundColor: 'rgba(147, 51, 234, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(147, 51, 234, 0.4)', display: 'inline-block' },
  devPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: 800, color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'inline-block' },
  title: { fontSize: '22px', fontWeight: 800, marginBottom: '6px', textAlign: 'center', letterSpacing: '-0.5px' },
  brandSubheading: { fontSize: '12px', color: '#94a3b8', margin: '0 0 14px 0', lineHeight: 1.45, textAlign: 'center' },
  badge: { fontSize: '10px', letterSpacing: '1px', fontWeight: 700, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  dynamicDateBox: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '10px', padding: '12px', marginBottom: '14px' },
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  primaryBtn: { width: '100%', padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  primaryBtnSmall: { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', marginBottom: '8px' },
  secondaryBtnSmall: { width: '100%', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', marginBottom: '8px' },
  secondaryBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '12px', cursor: 'pointer', fontSize: '12px', width: '100%', textAlign: 'center' },
  backBtnInline: { background: 'none', border: '1px solid #334155', color: '#94a3b8', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' },
  questionTitle: { fontSize: '15px', fontWeight: 600, marginBottom: '14px' },
  optionBtn: { width: '100%', padding: '11px', backgroundColor: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  selectedOption: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  input: { width: '100%', padding: '11px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', marginBottom: '10px', boxSizing: 'border-box' },
  progressBarContainer: { height: '4px', backgroundColor: '#334155', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s' },
  alertBox: { backgroundColor: '#1e1b4b', border: '1px solid #4338ca', padding: '14px', borderRadius: '8px', marginTop: '14px', marginBottom: '14px' },
  alertTitle: { fontSize: '13px', fontWeight: 'bold', color: '#a5b4fc', margin: '0 0 4px 0' },
  alertText: { fontSize: '12px', color: '#c7d2fe', margin: 0, lineHeight: 1.4 },
  text: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.5 },
  devTriggerBtn: { background: 'none', border: 'none', color: '#a855f7', fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 },
  devSubmitBtn: { width: '100%', padding: '10px', backgroundColor: '#a855f7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' },
  builderGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' },
  builderBox: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' },
  builderBoxTitle: { fontSize: '13px', fontWeight: 700, color: '#38bdf8', margin: '0 0 12px 0', borderBottom: '1px solid #1e293b', paddingBottom: '6px' },
  builderBoxItem: { fontSize: '12px', color: '#cbd5e1', margin: '0 0 6px 0' }
};
