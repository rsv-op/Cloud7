'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Icons = {
  Laptop: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>,
  Smartphone: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>,
  Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  Cpu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  ArrowLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
};

interface PricingTier {
  name: string;
  price: string;
  numeric: number;
  badge: string;
  tagline: string;
  isMultiPageAllowed: boolean;
  isManaged: boolean;
}

interface TemplateItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  accentColor: string;
  heroImage: string;
}

// THE NEW DEPLOYMENT-BASED PRICING MATRIX
const PRICING_PLANS: PricingTier[] = [
  {
    name: 'Codebase Architecture',
    price: '$449',
    numeric: 449,
    badge: 'RAW SYNTHESIS',
    tagline: 'Production-ready Next.js TSX codebase. DIY deployment and hosting. Zero ongoing management or SSL included.',
    isMultiPageAllowed: false,
    isManaged: false
  },
  {
    name: 'Managed Operational Node',
    price: '$829',
    numeric: 829,
    badge: 'DEPLOYED + SSL',
    tagline: 'Live deployment on high-speed edge networks. Includes enterprise-grade SSL provisioning and custom domain binding.',
    isMultiPageAllowed: true,
    isManaged: true
  },
  {
    name: 'Enterprise Managed Hub',
    price: '$1049',
    numeric: 1049,
    badge: 'END-TO-END CONTROL',
    tagline: 'Fully managed infrastructure, bespoke architecture, multi-page routing, and active continuous deployment control.',
    isMultiPageAllowed: true,
    isManaged: true
  }
];

const CATEGORIES = [
  'Logistics & Central Dispatch',
  'Healthcare & Clinical Practice',
  'Automotive Transport & Fleet',
  'B2B Corporate & Legal',
  'Technology & Distributed SaaS'
];

const TEMPLATE_CATALOG: Record<string, TemplateItem[]> = {
  'Logistics & Central Dispatch': [{ id: 'log-1', name: 'Apex Central Dispatch', tagline: 'Automated Carrier Verification & Telemetry Tracking', badge: 'HIGH-FRICTION LOGISTICS', accentColor: '#0284c7', heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80' }],
  'Healthcare & Clinical Practice': [{ id: 'hlth-1', name: 'Aegis Medical Collective', tagline: 'HIPAA-Compliant Patient Intake & Credential Verification', badge: 'CLINICAL GOVERNANCE', accentColor: '#10b981', heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80' }]
  // Add other templates as needed to match the ledger
};

export default function LaunchSevenStudio() {
  const [view, setView] = useState<'catalog' | 'detail' | 'auth' | 'builder' | 'payment' | 'prompt'>('catalog');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_PLANS[0]);
  const [operationalRequirements, setOperationalRequirements] = useState('');
  const [requestedPages, setRequestedPages] = useState('');
  const [copiedState, setCopiedState] = useState(false);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('cloud7_auth_credential');
      if (storedAuth) {
        setEmail(storedAuth);
        setIsAuthenticated(true);
      }
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const incomingVertical = params.get('vertical');
        if (incomingVertical && CATEGORIES.includes(incomingVertical)) {
          setActiveCategory(incomingVertical);
        }
      }
    } catch (err) {
      console.warn('Local storage restricted.');
    }
  }, []);

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try { localStorage.setItem('cloud7_auth_credential', email.trim()); } catch (err) {}
    setIsAuthenticated(true);
    setView('builder');
  };

  const handleTierSelection = (tier: PricingTier) => {
    setSelectedTier(tier);
    if (!tier.isMultiPageAllowed) setRequestedPages('');
  };

  const compileGeminiPrompt = (): string => {
    const isSinglePage = !selectedTier.isMultiPageAllowed;
    const isManaged = selectedTier.isManaged;
    const baseArchitectureName = selectedTemplate ? selectedTemplate.name : 'Bespoke Custom Build';
    const targetVertical = selectedTemplate ? activeCategory : 'Specialized Enterprise Architecture';

    return `### SYSTEM DIRECTIVE: CLOUD7 MASTER ENGINE CODE SYNTHESIS
**Target Compiler:** Google AI Studio / Gemini Pro (Next.js Edge Architecture)
**Executing Entity:** Cloud7.com // Founded and Operated by Richu Shaji
**Client Credential:** ${email}
**Base Blueprint:** ${baseArchitectureName} (${targetVertical})
**Settled Tier Commitment:** ${selectedTier.name} (${selectedTier.price} USD)

---

### ARCHITECTURAL ENFORCEMENT & CONSTRAINTS
* **Deployment Model:** ${isManaged ? 'MANAGED INFRASTRUCTURE. Synthesize code optimized for immediate Vercel edge deployment with automated SSL binding.' : 'RAW CODEBASE HANDOFF. Synthesize standalone component. Client will self-host and manually manage SSL certificates.'}
* **Page Routing Strictness:** ${isSinglePage ? 'STRICTLY ONE (1) PAGE SCROLLABLE ARCHITECTURE. All content sections must reside in a single page.tsx file. NO internal multi-page routing directories.' : `MULTI-PAGE ROUTING AUTHORIZED. Implement clean routing pathways for: ${requestedPages || 'About, Operations, Portal, Verification'}.`}
* **Zero-Cost Constraint:** Use exclusively native Next.js App Router patterns with zero external CSS frameworks. Apply mathematical inline styling leveraging CSS clamp() and flexbox.

---

### CLIENT OPERATIONAL INTENT & SPECIFICATIONS
${operationalRequirements || 'Deploy standardized high-conversion operational infrastructure aligned with the verified base architecture.'}

---

### EXPECTED OUTPUT FORMAT
Synthesize a production-ready, fully typed TypeScript TSX component (app/page.tsx). Output ONLY raw code inside a standard TypeScript code block. Do not provide preliminary conversational chatter or unprompted operational commentary.`;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(compileGeminiPrompt());
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 3000);
  };

  return (
    <main style={styles.container}>
      <div style={view === 'catalog' || view === 'detail' || view === 'prompt' ? styles.wrapperWide : styles.wrapperStandard}>
        
        {/* Navigation Breadcrumb */}
        <div style={styles.topNav}>
          <Link href="/" style={styles.navLink}>
            <Icons.ArrowLeft /> Return to Cloud7 Corporate Hub
          </Link>
          <span style={styles.authBadge}>
            {isAuthenticated ? `VERIFIED: ${email}` : 'UNAUTHENTICATED EXPLORATION'}
          </span>
        </div>

        {/* PHASE 1A: CATALOG VIEW */}
        {view === 'catalog' && (
          <section style={styles.contentSection}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={styles.studioPill}>LAUNCH7 STUDIO // PHASE 01</span>
              <h1 style={styles.mainHeading}>Select Base Architecture</h1>
              <p style={styles.subHeading}>Explore productized operational templates engineered for high-friction workflows.</p>
            </div>

            <div style={styles.categoryScroll}>
              {CATEGORIES.map((cat) => (
                <button key={cat} style={activeCategory === cat ? styles.categoryTabActive : styles.categoryTab} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>

            <div style={styles.templateGrid}>
              {TEMPLATE_CATALOG[activeCategory]?.map((tpl) => (
                <div key={tpl.id} style={styles.templateCard} onClick={() => { setSelectedTemplate(tpl); setView('detail'); }}>
                  <div style={styles.cardImageContainer}>
                    <img src={tpl.heroImage} alt={tpl.name} style={styles.cardImage} />
                    <span style={{ ...styles.cardBadge, borderColor: tpl.accentColor, color: tpl.accentColor }}>{tpl.badge}</span>
                  </div>
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{tpl.name}</h3>
                    <p style={styles.cardTagline}>{tpl.tagline}</p>
                    <div style={styles.cardFooter}>
                      <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700 }}>Inspect Architecture →</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={styles.scratchCard} onClick={() => { setSelectedTemplate(null); setView('detail'); }}>
                <div style={styles.scratchIconBox}>+</div>
                <h3 style={styles.cardTitle}>Build From Scratch</h3>
                <p style={styles.cardTagline}>Engineer a completely bespoke digital layout tailored precisely to proprietary operational constraints.</p>
              </div>
            </div>
          </section>
        )}

        {/* PHASE 1B: DETAIL VIEW */}
        {view === 'detail' && (
          <section style={styles.contentSection}>
            <div style={styles.simulatorControlBar}>
              <button style={styles.secondaryBtn} onClick={() => setView('catalog')}>← Return to Architecture Catalog</button>
              <div style={styles.deviceToggleGroup}>
                <button style={previewDevice === 'desktop' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('desktop')}><Icons.Laptop /> <span style={{ fontSize: '12px', marginLeft: '6px' }}>Desktop</span></button>
                <button style={previewDevice === 'mobile' ? styles.deviceBtnActive : styles.deviceBtn} onClick={() => setPreviewDevice('mobile')}><Icons.Smartphone /> <span style={{ fontSize: '12px', marginLeft: '6px' }}>Mobile</span></button>
              </div>
            </div>

            {selectedTemplate ? (
              <div style={previewDevice === 'mobile' ? styles.mobileFrame : styles.desktopFrame}>
                <div style={styles.browserBar}>
                  <div style={styles.browserDots}><span style={{ ...styles.dot, backgroundColor: '#ef4444' }} /><span style={{ ...styles.dot, backgroundColor: '#eab308' }} /><span style={{ ...styles.dot, backgroundColor: '#22c55e' }} /></div>
                  <span style={styles.browserUrl}>preview.{selectedTemplate.id}.cloud7.internal</span>
                  <span style={{ fontSize: '10px', color: selectedTemplate.accentColor, fontWeight: 700 }}>SSL SECURED</span>
                </div>
                <div style={styles.simulatorHero}>
                  <img src={selectedTemplate.heroImage} alt={selectedTemplate.name} style={styles.simulatorHeroImg} />
                  <div style={styles.simulatorHeroOverlay} />
                  <div style={styles.simulatorHeroText}>
                    <span style={{ ...styles.badgeStatic, color: selectedTemplate.accentColor }}>{selectedTemplate.badge}</span>
                    <h2 style={styles.heroBannerTitle}>{selectedTemplate.name}</h2>
                    <p style={styles.heroBannerTagline}>{selectedTemplate.tagline}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={styles.scratchCanvasBox}>
                <Icons.Cpu />
                <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '12px 0 6px 0', color: '#f8fafc' }}>Bespoke Architectural Canvas</h2>
                <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '440px', lineHeight: 1.5 }}>Gemini Pro will synthesize complete component trees from the requirements logged in the builder phase.</p>
              </div>
            )}

            <div style={{ ...styles.card, marginTop: '20px', textAlign: 'center' }}>
              <button style={styles.primaryBtn} onClick={() => (isAuthenticated ? setView('builder') : setView('auth'))}>Authorize & Customize This Architecture <Icons.ArrowRight /></button>
            </div>
          </section>
        )}

        {/* PHASE 2: CREDENTIAL GATE */}
        {view === 'auth' && (
          <section style={styles.card}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={styles.iconCircle}><Icons.Lock /></div>
              <h2 style={styles.sectionTitle}>Credential Verification</h2>
              <p style={styles.bodyText}>Access to the Launch7 Scope Engine requires an authenticated operational identity.</p>
            </div>
            <form onSubmit={handleAuthentication} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={styles.inputLabel}>Corporate Email Address</label>
                <input type="email" required placeholder="operations@enterprise.com" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
              </div>
              <button type="submit" style={styles.primaryBtn}>Verify Identity & Unlock Engine <Icons.ArrowRight /></button>
              <button type="button" style={styles.backButton} onClick={() => setView('detail')}>Cancel Verification</button>
            </form>
          </section>
        )}

        {/* PHASE 3: THE SCOPE ENGINE */}
        {view === 'builder' && (
          <section style={styles.card}>
            <div style={{ marginBottom: '20px' }}>
              <span style={styles.studioPill}>SCOPE ENGINE // LOCKED SPRINT</span>
              <h2 style={styles.sectionTitle}>Configure Infrastructure & Deployment</h2>
              <p style={styles.bodyText}>Target: <strong>{selectedTemplate ? selectedTemplate.name : 'Bespoke Scratch Build'}</strong>.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <label style={styles.inputLabel}>1. Select Deployment & Infrastructure Tier</label>
              {PRICING_PLANS.map((plan) => (
                <div key={plan.name} style={selectedTier.name === plan.name ? styles.tierOptionActive : styles.tierOption} onClick={() => handleTierSelection(plan)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#f8fafc' }}>{plan.name}</span>
                      <span style={styles.tierPill}>{plan.badge}</span>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8' }}>{plan.price}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0 0', lineHeight: 1.4 }}>{plan.tagline}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.inputLabel}>2. Operational Instructions</label>
              <textarea rows={4} style={styles.textArea} placeholder="Log critical workflows, corporate hex colors, and custom compliance mandates..." value={operationalRequirements} onChange={(e) => setOperationalRequirements(e.target.value)} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={styles.inputLabel}>3. Multi-Page Architecture Governance</label>
              {!selectedTier.isMultiPageAllowed ? (
                <div style={styles.lockedConstraintBox}>
                  <Icons.Lock />
                  <div>
                    <strong style={{ display: 'block', color: '#fecdd3', fontSize: '13px' }}>Single-Page Architecture Locked</strong>
                    <span style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: 1.4 }}>The Codebase Architecture Tier ($449) is strictly bound to a 1-page layout. Multi-page internal routing requires a Managed Deployment Tier.</span>
                  </div>
                </div>
              ) : (
                <input type="text" style={styles.input} placeholder="Specify internal page routes (e.g., /dispatch, /verification)..." value={requestedPages} onChange={(e) => setRequestedPages(e.target.value)} />
              )}
            </div>

            <div style={styles.financialLockBanner}>
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Fixed Execution Settlement</span>
                <strong style={{ fontSize: '24px', color: '#38bdf8' }}>{selectedTier.price} USD</strong>
              </div>
              <button style={styles.primaryBtnNarrow} onClick={() => setView('payment')}>Lock Sprint Specifications →</button>
            </div>
            <button style={styles.backButton} onClick={() => setView('detail')}>← Cancel & Return to Simulator</button>
          </section>
        )}

        {/* PHASE 4: PAYMENT CONFIRMATION */}
        {view === 'payment' && (
          <section style={styles.card}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={styles.iconCircle}><Icons.Cpu /></div>
              <h2 style={styles.sectionTitle}>Authorize 7-Day Sprint</h2>
              <p style={styles.bodyText}>You are committing <strong>{selectedTier.price} USD</strong> for the <strong>{selectedTier.name}</strong> deployment of <strong>{selectedTemplate ? selectedTemplate.name : 'Bespoke Custom Build'}</strong>.</p>
            </div>

            <div style={styles.settlementAuditBox}>
              <div style={styles.auditRow}><span style={styles.auditLabel}>Executing Entity:</span><span style={styles.auditVal}>Cloud7.com // Operations Desk</span></div>
              <div style={styles.auditRow}><span style={styles.auditLabel}>Client Authorized:</span><span style={styles.auditVal}>{email}</span></div>
              <div style={styles.auditRow}><span style={styles.auditLabel}>Deployment Control:</span><span style={styles.auditVal}>{selectedTier.isManaged ? 'Cloud7 Managed Edge (+ SSL)' : 'Client Self-Hosted (Raw Code)'}</span></div>
              <div style={styles.auditRow}><span style={styles.auditLabel}>Total Commitment:</span><span style={{ ...styles.auditVal, color: '#38bdf8', fontWeight: 800 }}>{selectedTier.price} USD</span></div>
            </div>

            <button style={{ ...styles.primaryBtn, backgroundColor: '#10b981', marginTop: '20px' }} onClick={() => setView('prompt')}>Simulate Settlement & Compile Engine Directive →</button>
            <button style={styles.backButton} onClick={() => setView('builder')}>← Edit Architectural Scope</button>
          </section>
        )}

        {/* PHASE 5: PROMPT SYNTHESIS ENGINE */}
        {view === 'prompt' && (
          <section style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '16px', marginBottom: '20px' }}>
              <Icons.Cpu />
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', margin: 0 }}>SPRINT INITIATED // DIRECTIVE SYNTHESIZED</h2>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Execution Payload Prepared for Google AI Studio</span>
              </div>
            </div>
            <p style={styles.bodyText}>The operational scope is sealed and verified. Copy this directive directly into Google AI Studio to synthesize your zero-cost production Next.js codebase.</p>
            <pre style={styles.promptPayloadBox}>{compileGeminiPrompt()}</pre>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
              <button style={{ ...styles.primaryBtn, flex: '1 1 200px', backgroundColor: copiedState ? '#10b981' : '#2563eb' }} onClick={handleCopyPrompt}>{copiedState ? '✓ Directive Copied' : 'Copy AI Studio Directive'}</button>
              <button style={{ ...styles.secondaryBtn, flex: '0 0 auto' }} onClick={() => setView('catalog')}>Return to Architecture Desk</button>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '4vh', paddingBottom: '60px', paddingLeft: '16px', paddingRight: '16px', boxSizing: 'border-box', backgroundColor: '#050811', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  wrapperStandard: { width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '20px' },
  wrapperWide: { width: '100%', maxWidth: '1040px', display: 'flex', flexDirection: 'column', gap: '20px' },
  topNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #1e293b', paddingBottom: '14px', flexWrap: 'wrap', gap: '8px' },
  navLink: { display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', textDecoration: 'none', fontSize: '12px', fontWeight: 700 },
  authBadge: { fontSize: '10px', letterSpacing: '0.8px', color: '#94a3b8', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '6px', border: '1px solid #334155', fontWeight: 600 },
  contentSection: { display: 'flex', flexDirection: 'column', width: '100%' },
  card: { backgroundColor: 'rgba(15, 23, 42, 0.95)', width: '100%', borderRadius: '24px', padding: 'clamp(20px, 5vw, 32px)', border: '1px solid #1e293b', boxSizing: 'border-box', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
  studioPill: { fontSize: '10px', letterSpacing: '1.4px', fontWeight: 800, color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.15)', padding: '5px 12px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block', marginBottom: '10px' },
  mainHeading: { fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 800, margin: '0 0 10px 0', lineHeight: 1.15, background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subHeading: { fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#cbd5e1', lineHeight: 1.5, margin: '0 auto', maxWidth: '620px' },
  categoryScroll: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px', WebkitOverflowScrolling: 'touch' },
  categoryTab: { padding: '9px 16px', backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  categoryTabActive: { padding: '9px 16px', backgroundColor: '#0284c7', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  templateCard: { backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s' },
  cardImageContainer: { position: 'relative', height: '180px', width: '100%', backgroundColor: '#020617' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover' },
  cardBadge: { position: 'absolute', top: '12px', left: '12px', fontSize: '9px', fontWeight: 800, letterSpacing: '0.8px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(5, 8, 17, 0.85)', border: '1px solid' },
  cardContent: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardTitle: { fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' },
  cardTagline: { fontSize: '12px', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: 1.5, flexGrow: 1 },
  cardFooter: { borderTop: '1px solid #1e293b', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' },
  scratchCard: { backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '2px dashed #334155', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', minHeight: '260px' },
  scratchIconBox: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '24px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', border: '1px solid rgba(168, 85, 247, 0.4)' },
  simulatorControlBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '12px 16px', borderRadius: '14px', border: '1px solid #1e293b', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' },
  deviceToggleGroup: { display: 'flex', backgroundColor: '#090d16', borderRadius: '8px', border: '1px solid #1e293b', padding: '3px' },
  deviceBtn: { background: 'none', border: 'none', color: '#64748b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  deviceBtnActive: { backgroundColor: '#1e293b', border: 'none', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 700 },
  desktopFrame: { backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden', width: '100%', transition: 'max-width 0.3s ease' },
  mobileFrame: { backgroundColor: '#0f172a', borderRadius: '28px', border: '5px solid #334155', maxWidth: '390px', margin: '0 auto', overflow: 'hidden', width: '100%', transition: 'max-width 0.3s ease' },
  browserBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' },
  browserDots: { display: 'flex', gap: '6px' },
  dot: { width: '9px', height: '9px', borderRadius: '50%' },
  browserUrl: { fontSize: '11px', color: '#94a3b8', backgroundColor: '#0f172a', padding: '3px 12px', borderRadius: '6px', border: '1px solid #334155' },
  simulatorHero: { position: 'relative', height: 'clamp(240px, 45vh, 380px)', width: '100%', overflow: 'hidden' },
  simulatorHeroImg: { width: '100%', height: '100%', objectFit: 'cover' },
  simulatorHeroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 15%, rgba(15, 23, 42, 0.3) 100%)' },
  simulatorHeroText: { position: 'absolute', bottom: '24px', left: '24px', right: '24px' },
  badgeStatic: { fontSize: '10px', fontWeight: 800, letterSpacing: '1px', padding: '4px 8px', borderRadius: '4px', border: '1px solid', display: 'inline-block', marginBottom: '8px' },
  heroBannerTitle: { fontSize: 'clamp(22px, 5vw, 32px)', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff', lineHeight: 1.2 },
  heroBannerTagline: { fontSize: 'clamp(12px, 3vw, 14px)', color: '#cbd5e1', margin: 0, lineHeight: 1.4 },
  scratchCanvasBox: { backgroundColor: '#0f172a', borderRadius: '16px', border: '2px dashed #334155', padding: 'clamp(40px, 8vw, 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  iconCircle: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' },
  sectionTitle: { fontSize: '22px', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px 0' },
  bodyText: { fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 16px 0' },
  inputLabel: { display: 'block', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '14px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', fontSize: '14px', boxSizing: 'border-box' },
  textArea: { width: '100%', padding: '14px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc', fontSize: '13px', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.5, resize: 'vertical' },
  tierOption: { padding: '16px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '14px', cursor: 'pointer', transition: 'border-color 0.2s' },
  tierOptionActive: { padding: '16px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #38bdf8', borderRadius: '14px', cursor: 'pointer' },
  tierPill: { fontSize: '9px', letterSpacing: '0.8px', fontWeight: 800, color: '#94a3b8', backgroundColor: '#1e293b', padding: '3px 8px', borderRadius: '6px' },
  lockedConstraintBox: { display: 'flex', gap: '12px', backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', borderRadius: '12px', padding: '14px' },
  financialLockBanner: { backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '16px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '20px' },
  primaryBtn: { width: '100%', padding: '16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  primaryBtnNarrow: { padding: '14px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' },
  secondaryBtn: { padding: '9px 16px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' },
  backButton: { background: 'none', border: 'none', color: '#94a3b8', fontSize: '13px', marginTop: '14px', width: '100%', textAlign: 'center', cursor: 'pointer', padding: '8px' },
  settlementAuditBox: { backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' },
  auditRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' },
  auditLabel: { color: '#94a3b8' },
  auditVal: { color: '#f8fafc', fontWeight: 600 },
  promptPayloadBox: { backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', fontSize: '12px', color: '#38bdf8', lineHeight: 1.5, overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }
};
