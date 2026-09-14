'use client';

import React, { useState, useEffect } from 'react';

const Icons = {
  Laptop: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Lock: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  Check: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
  Cpu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
};

// Hardcoded pricing ledger to eliminate external JSON dependency risks for the gateway
const pricingPlans = [
  { name: 'The Foundation', price: '$449', numeric: 449, badge: 'PORTFOLIO / CREATOR', tagline: 'Single-page scrollable architecture. Perfect for focused funnels.', highlight: false },
  { name: 'Growth Engine', price: '$829', numeric: 829, badge: 'MULTI-PAGE', tagline: 'Expanded architecture with internal routing and added pages.', highlight: true },
  { name: 'Enterprise Overhaul', price: '$1049', numeric: 1049, badge: 'BESPOKE', tagline: '100% custom structural build from scratch.', highlight: false }
];

export default function LaunchSevenApp() {
  const [view, setView] = useState<'catalog' | 'detail' | 'auth' | 'builder' | 'payment' | 'prompt'>('catalog');
  
  const [activeCategory, setActiveCategory] = useState('Logistics & Supply Chain');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [selectedTier, setSelectedTier] = useState(pricingPlans[0]);
  const [requirements, setRequirements] = useState('');
  const [pageRequests, setPageRequests] = useState(''); // Used only if tier > $449

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('cloud7_client_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn("Storage restricted.");
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    localStorage.setItem('cloud7_client_email', email);
    setIsAuthenticated(true);
    setView('builder');
  };

  const processPayment = () => {
    setTimeout(() => {
      setView('prompt');
    }, 1500);
  };

  const generateAIPrompt = () => {
    const isSinglePage = selectedTier.numeric === 449;
    
    return `[CLOUD7 MASTER OPERATIONS - DEPLOYMENT DIRECTIVE]
TARGET ENGINE: Google AI Studio (Gemini Pro)
CLIENT CREDENTIAL: ${email}
BASE ARCHITECTURE: ${selectedTemplate ? selectedTemplate.name : 'Custom Scratch Build'}
FINANCIAL CLEARANCE: ${selectedTier.name} (${selectedTier.price} Settled)

[ARCHITECTURAL SCOPE ENFORCEMENT]
PAGE LIMITATION: ${isSinglePage ? 'STRICTLY ONE (1) SCROLLABLE PAGE. You may include external hyperlinks, but NO internal Next.js routing or multi-page directory structures.' : 'MULTI-PAGE ARCHITECTURE AUTHORIZED. Implement internal Next.js routing for the requested pages.'}
${!isSinglePage && pageRequests ? `REQUESTED ROUTES: ${pageRequests}` : ''}

[OPERATIONAL INTENT & CLIENT DESCRIPTIONS]
${requirements || 'Standard baseline deployment matching selected template.'}

[EXECUTION PARAMETERS]
1. Synthesize a zero-cost, Next.js App Router compatible React codebase.
2. Structure the UI mathematically using CSS clamp() for fluid mobile-to-desktop viewports. Do not use external CSS frameworks.
3. Inject the specific workflow features requested in the operational intent block above.
4. Provide ONLY the compiled TSX code block(s). Do not output conversational text outside the code block.`;
  };

  const categories = ['Logistics & Supply Chain', 'Healthcare & Clinics', 'B2B & Legal Counsel'];
  const templateCatalog: Record<string, any[]> = {
    'Logistics & Supply Chain': [{ id: 'log-1', name: 'Apex Central Dispatch', tagline: 'Automated Carrier Verification', accentColor: '#0284c7', heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80' }],
    'Healthcare & Clinics': [{ id: 'hlth-1', name: 'Aegis Medical Collective', tagline: 'HIPAA-Compliant Patient Intake', accentColor: '#10b981', heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80' }],
    'B2B & Legal Counsel': [{ id: 'b2b-1', name: 'Blackstone Corporate', tagline: 'Encrypted Legal Discovery', accentColor: '#d97706', heroImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=900&q=80' }]
  };

  // ==========================================
  // PHASE 1A: CATALOG VIEW
  // ==========================================
  if (view === 'catalog') {
    return (
      <main style={styles.container}>
        <div style={styles.wrapperFull}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={styles.studioPill}>LAUNCH7 STUDIO</span>
            <h1 style={styles.landingHeroHeading}>Select Base Architecture</h1>
            <p style={styles.landingHeroSubheading}>Preview operational templates. Authentication required to customize and deploy.</p>
          </div>
          
          <div style={styles.portfolioCategoryTabs}>
            {categories.map((catName) => (
              <button key={catName} style={activeCategory === catName ? styles.catTabActive : styles.catTab} onClick={() => setActiveCategory(catName)}>{catName}</button>
            ))}
          </div>

          <div style={styles.templateGrid}>
            {templateCatalog[activeCategory]?.map((t) => (
              <div key={t.id} style={styles.templateCardItem} onClick={() => { setSelectedTemplate(t); setView('detail'); }}>
                <div style={styles.templateCardThumbnailBox}><img src={t.heroImage} alt={t.name} style={styles.templateCardImg} /></div>
                <div style={styles.templateCardBody}>
                  <h4 style={styles.templateCardName}>{t.name}</h4>
                  <p style={styles.templateCardTagline}>{t.tagline}</p>
                </div>
              </div>
            ))}
            <div style={styles.templateCardItem} onClick={() => { setSelectedTemplate(null); setView('detail'); }}>
              <div style={{...styles.templateCardThumbnailBox, backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><h2 style={{color: '#38bdf8'}}>{'+'}</h2></div>
              <div style={styles.templateCardBody}>
                <h4 style={styles.templateCardName}>Build From Scratch</h4>
                <p style={styles.templateCardTagline}>Bespoke custom architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PHASE 1B: TEMPLATE DETAIL
  // ==========================================
  if (view === 'detail') {
    const t = selectedTemplate;
    return (
      <main style={styles.container}>
        <div style={styles.wrapperFull}>
          <div style={styles.detailReturnBar}>
            <button style={styles.returnCatalogBtn} onClick={() => setView('catalog')}>← Back to Gallery</button>
            <div style={styles.deviceToggleGroup}>
              <button style={previewDevice === 'desktop' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('desktop')}><Icons.Laptop /> <span style={styles.deviceLabel}>Desktop</span></button>
              <button style={previewDevice === 'mobile' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('mobile')}><Icons.Smartphone /> <span style={styles.deviceLabel}>Mobile</span></button>
            </div>
          </div>
          
          {t ? (
            <div style={previewDevice === 'mobile' ? styles.frameMobile : styles.frameDesktop}>
              <div style={styles.simulatedHero}>
                <img src={t.heroImage} alt={t.name} style={styles.simulatedHeroImg} />
                <div style={styles.simulatedHeroOverlay} />
                <div style={styles.simulatedHeroContent}>
                  <h2 style={styles.simulatedHeading}>{t.name}</h2>
                  <p style={styles.simulatedSubtext}>{t.tagline}</p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{...styles.frameDesktop, padding: '60px', textAlign: 'center', border: '2px dashed #334155'}}>
              <h2 style={{color: '#f8fafc'}}>Blank Canvas</h2>
              <p style={{color: '#94a3b8'}}>Architecture will be generated entirely via AI based on your specifications.</p>
            </div>
          )}

          <div style={{...styles.card, margin: '0 auto', maxWidth: '600px'}}>
            <button style={styles.primaryBtn} onClick={() => isAuthenticated ? setView('builder') : setView('auth')}>
              Customize & Deploy This Architecture →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PHASE 2: CREDENTIAL GATE
  // ==========================================
  if (view === 'auth') {
    return (
      <main style={styles.container}>
        <div style={styles.wrapperStandard}>
          <div style={{ ...styles.card, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><Icons.Lock /></div>
            <h2 style={styles.title}>Credential Verification</h2>
            <p style={styles.text}>To unlock full customization protocols and confirm your build, please verify your corporate identity.</p>
            
            <form onSubmit={handleAuthSubmit} style={{ marginTop: '24px' }}>
              <input type="email" required placeholder="Corporate Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
              <button type="submit" style={styles.primaryBtn}>Verify & Unlock Builder →</button>
            </form>
            <button style={styles.backBtn} onClick={() => setView('detail')}>Cancel</button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PHASE 3: THE SCOPE & PRICING ENGINE
  // ==========================================
  if (view === 'builder') {
    return (
      <main style={styles.container}>
        <div style={styles.wrapperStandard}>
          <div style={styles.card}>
            <h2 style={styles.title}>Deployment Scope</h2>
            <p style={{...styles.text, marginBottom: '24px'}}>Define structural modifications and page routing for {selectedTemplate ? selectedTemplate.name : 'your Scratch Build'}.</p>
            
            <h3 style={styles.questionTitle}>1. Select Deployment Tier</h3>
            {pricingPlans.map(plan => (
              <div 
                key={plan.name} 
                style={selectedTier.name === plan.name ? styles.selectedOption : styles.optionBtn} 
                onClick={() => { setSelectedTier(plan); if(plan.numeric === 449) setPageRequests(''); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800 }}>{plan.name}</span>
                  <span style={{ fontWeight: 800 }}>{plan.price}</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>{plan.tagline}</div>
              </div>
            ))}

            <h3 style={{...styles.questionTitle, marginTop: '20px'}}>2. Operational Requirements</h3>
            <textarea 
              rows={3} 
              style={styles.textArea} 
              placeholder="Provide color schemes, text changes, or operational intent..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />

            <h3 style={{...styles.questionTitle, marginTop: '20px'}}>3. Multi-Page Architecture</h3>
            {selectedTier.numeric === 449 ? (
              <div style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#fecdd3' }}>
                <Icons.Lock /> <strong>Locked:</strong> The Foundation tier is restricted to a single-page scrollable architecture. Upgrade to Growth Engine ($829) to add multiple pages and internal routing.
              </div>
            ) : (
              <input 
                style={styles.input} 
                placeholder="List required pages (e.g., About, Services, Contact)..." 
                value={pageRequests}
                onChange={(e) => setPageRequests(e.target.value)} 
              />
            )}

            <div style={{ backgroundColor: '#090d16', padding: '16px', borderRadius: '12px', marginTop: '24px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Execution Cost</span>
                <h3 style={{ fontSize: '22px', color: '#f8fafc', margin: 0 }}>{selectedTier.price}</h3>
              </div>
              <button style={{ ...styles.primaryBtn, width: 'auto', padding: '12px 24px' }} onClick={() => setView('payment')}>Lock Specifications</button>
            </div>
            <button style={styles.backBtn} onClick={() => setView('detail')}>← Back to Preview</button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PHASE 4: PAYMENT AUTHORIZATION
  // ==========================================
  if (view === 'payment') {
    return (
      <main style={styles.container}>
        <div style={styles.wrapperStandard}>
          <div style={{...styles.card, textAlign: 'center'}}>
            <h2 style={styles.title}>Finalize Build Initiation</h2>
            <p style={styles.text}>You are authorizing a {selectedTier.name} deployment for {selectedTier.price}. Upon settlement, your specifications will automatically compile into the Cloud7 Build Engine.</p>
            <button style={{...styles.primaryBtn, backgroundColor: '#10b981', marginTop: '24px'}} onClick={processPayment}>
              Authorize {selectedTier.price} Charge
            </button>
            <button style={styles.backBtn} onClick={() => setView('builder')}>Edit Specifications</button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PHASE 5: AI PROMPT SYNTHESIS (The Hand-off)
  // ==========================================
  if (view === 'prompt') {
    return (
      <main style={styles.container}>
        <div style={styles.wrapperFull}>
          <div style={{...styles.card, border: '1px solid #10b981'}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
              <Icons.Cpu />
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', margin: 0 }}>BUILD INITIATED: PROMPT SYNTHESIZED</h2>
            </div>
            <p style={styles.text}>Payment settled. The following operational command has been generated based on your tier constraints. Route this payload directly into Google AI Studio (Gemini Pro) to generate your exact production codebase.</p>
            
            <pre style={{ backgroundColor: '#020617', padding: '20px', borderRadius: '12px', fontSize: '12px', color: '#38bdf8', overflowX: 'auto', border: '1px solid #1e293b', marginTop: '16px', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {generateAIPrompt()}
            </pre>
            
            <button style={{ ...styles.secondaryBtn, marginTop: '24px' }} onClick={() => alert('Prompt Copied. Route to AI Studio.')}>Copy Command Payload</button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '8vh', paddingBottom: '60px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box', backgroundColor: '#050811', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  wrapperStandard: { width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '16px' },
  wrapperFull: { width: '100%', maxWidth: '1040px', display: 'flex', flexDirection: 'column', gap: '16px' },
  card: { backgroundColor: 'rgba(15, 23, 42, 0.95)', width: '100%', borderRadius: '24px', padding: 'clamp(24px, 5vw, 32px)', border: '1px solid #1e293b', boxSizing: 'border-box', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' },
  landingHeroHeading: { fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 800, margin: '16px 0 12px 0', lineHeight: 1.15, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: 'clamp(14px, 3.5vw, 15px)', color: '#cbd5e1', margin: '0 0 24px 0', lineHeight: 1.5 },
  studioPill: { fontSize: '11px', letterSpacing: '1.5px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '6px 14px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  title: { fontSize: 'clamp(22px, 5vw, 26px)', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 },
  text: { fontSize: 'clamp(14px, 3.5vw, 15px)', color: '#cbd5e1', lineHeight: 1.6 },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'transform 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  secondaryBtn: { width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '14px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' },
  questionTitle: { fontSize: 'clamp(15px, 4vw, 17px)', fontWeight: 600, marginBottom: '12px', lineHeight: 1.3 },
  optionBtn: { width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', textAlign: 'left', marginBottom: '12px', fontSize: '15px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' },
  selectedOption: { width: '100%', padding: '16px', backgroundColor: '#1e3a8a', border: '1px solid #3b82f6', borderRadius: '12px', textAlign: 'left', marginBottom: '12px', fontSize: '15px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' },
  input: { width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', marginBottom: '16px', boxSizing: 'border-box', fontSize: '15px' },
  textArea: { width: '100%', padding: '16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '20px', cursor: 'pointer', fontSize: '14px', width: '100%', textAlign: 'center', padding: '12px' },
  portfolioCategoryTabs: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '20px' },
  catTab: { padding: '10px 18px', backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  catTabActive: { padding: '10px 18px', backgroundColor: '#0284c7', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  templateCardItem: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' },
  templateCardThumbnailBox: { position: 'relative', height: '180px', width: '100%', overflow: 'hidden', backgroundColor: '#000' },
  templateCardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  templateCardBody: { padding: '20px', display: 'flex', flexDirection: 'column' },
  templateCardName: { fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px 0' },
  templateCardTagline: { fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.5 },
  detailReturnBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '16px', borderRadius: '16px', border: '1px solid #1e293b', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' },
  returnCatalogBtn: { background: 'none', border: 'none', color: '#38bdf8', fontSize: '14px', fontWeight: 700, cursor: 'pointer' },
  deviceToggleGroup: { display: 'flex', backgroundColor: '#090d16', borderRadius: '10px', border: '1px solid #1e293b', padding: '4px' },
  deviceBtn: { background: 'none', border: 'none', color: '#64748b', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceBtnActive: { backgroundColor: '#1e293b', border: 'none', color: '#38bdf8', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceLabel: { fontSize: '13px', marginLeft: '6px', display: 'inline-block' },
  frameDesktop: { backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #334155', overflow: 'hidden', width: '100%', marginBottom: '20px' },
  frameMobile: { backgroundColor: '#0f172a', borderRadius: '36px', border: '6px solid #334155', maxWidth: '390px', margin: '0 auto', overflow: 'hidden', width: '100%', marginBottom: '20px' },
  simulatedHero: { position: 'relative', height: '320px', overflow: 'hidden' },
  simulatedHeroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  simulatedHeroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15,23,42,0.95) 20%, rgba(15,23,42,0.3) 100%)' },
  simulatedHeroContent: { position: 'absolute', bottom: 24, left: 24, right: 24 },
  simulatedHeading: { fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 800, margin: '12px 0 6px 0', color: '#ffffff' },
  simulatedSubtext: { fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }
};
