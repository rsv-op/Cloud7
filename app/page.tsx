

'use client';

import React, { useState, useEffect } from 'react';
import { getLaunchData, getPricingTiers, getCategories } from '../utils/loadLaunchData';

// Inline SVG Vector Icons
const Icons = {
  SpeedDelivery: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Laptop: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Tablet: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Smartphone: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Share: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
};

export default function LaunchSevenApp() {
  const launchMeta = getLaunchData();
  const pricingPlans = getPricingTiers();
  const categories = getCategories();

  const [navPage, setNavPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState(categories[0] || 'B2B & Professional');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [shareNotice, setShareNotice] = useState(false);

  const [subView, setSubView] = useState(null); 
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

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
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

  const templateCatalog = {
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
      },
      {
        id: 'b2b-2',
        name: 'Vance Advisory Group',
        tagline: 'Private Equity M&A Due Diligence, Restructuring & Governance',
        badge: 'FINANCIAL ADVISORY',
        accentColor: '#3b82f6',
        colorPalette: ['#3b82f6', '#172554', '#60a5fa', '#ffffff'],
        heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        stats: ['$4.2B Capital Deployed', '28 Global Deal Exits', 'Strict Confidentiality'],
        layoutStyle: 'Sleek corporate editorial aesthetic featuring secure data-room access points and institutional case studies.',
        idealFor: 'Private equity firms, boutique investment banks, and institutional corporate consultancies.',
        includedModules: ['Confidential Deal Portal', 'Managing Partner Roster', 'Regulatory Compliance Library', 'Scheduled Strategy Call Booking']
      },
      {
        id: 'b2b-3',
        name: 'Aura Architecture Lab',
        tagline: 'Sustainable Biophilic Commercial & Civic Structural Masterplanning',
        badge: 'ARCHITECTURAL DESIGN',
        accentColor: '#14b8a6',
        colorPalette: ['#14b8a6', '#042f2e', '#2dd4bf', '#f0fdfa'],
        heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
        stats: ['LEED Platinum Standard', '18 Global Design Awards', 'Carbon-Neutral Scaffolding'],
        layoutStyle: 'Ultra-clean minimalist grid showcasing edge-to-edge architectural photography and blueprint schematics.',
        idealFor: 'Commercial architects, interior designers, urban planners, and civil engineering studios.',
        includedModules: ['Full-Screen Interactive Project Inspector', 'Interactive Blueprint Drawer', 'Sustainability Index Showcase', 'Client Commission Intake']
      },
      {
        id: 'b2b-4',
        name: 'Blackstone Legal Counsel',
        tagline: 'Corporate Litigation, Regulatory Cross-Border Defense & Patent Protection',
        badge: 'CORPORATE LAW',
        accentColor: '#d97706',
        colorPalette: ['#d97706', '#1c1917', '#fbbf24', '#fafaf9'],
        heroImage: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=900&q=80',
        stats: ['Over 300 Trial Verdicts', 'Cross-Border Patent Defense', '24/7 Crisis Hotline'],
        layoutStyle: 'Executive dark typography with confidential case consultation booking and legal brief archives.',
        idealFor: 'Trial attorneys, corporate legal counsel, and IP patent protection practices.',
        includedModules: ['Encrypted Intake Messaging', 'Practice Area Directories', 'Lead Counsel Bios', 'Client Retainer Checkout Link']
      },
      {
        id: 'b2b-5',
        name: 'Synthetix Human Capital',
        tagline: 'Executive Search & Technical Engineering Headhunting for Enterprise',
        badge: 'EXECUTIVE TALENT',
        accentColor: '#8b5cf6',
        colorPalette: ['#8b5cf6', '#2e1065', '#a78bfa', '#f5f3ff'],
        heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
        stats: ['96% 1-Year Retention', 'Average 18-Day Placement', 'Fortune 500 Network'],
        layoutStyle: 'High-conversion talent search portal with confidential executive candidate inquiry pipelines.',
        idealFor: 'Executive recruiters, corporate search firms, and specialized HR staffing agencies.',
        includedModules: ['Candidate Submission Vault', 'Confidential Hiring Brief Form', 'Live Placement Statistics', 'Enterprise Talent Retainer Portal']
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
      },
      {
        id: 'ret-2',
        name: 'Kroma Nordic Ceramics',
        tagline: 'Wheel-Thrown Stoneware & Minimalist Interior Vessels for Living',
        badge: 'STUDIO CRAFT',
        accentColor: '#a1a1aa',
        colorPalette: ['#a1a1aa', '#18181b', '#e4e4e7', '#ffffff'],
        heroImage: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=80',
        stats: ['Handmade in Batches', 'Lead-Free Mineral Glazes', 'Global Express Shipping'],
        layoutStyle: 'Nordic museum gallery layout with high-resolution image zoom inspection and limited batch drops.',
        idealFor: 'Ceramicists, fine art potters, sculptors, and bespoke homeware designers.',
        includedModules: ['Limited Batch Drop Timer', 'High-Def 360 Gallery', 'Care & Maintenance Guide', 'Stockist Retailer Directory']
      },
      {
        id: 'ret-3',
        name: 'Lumina Clean Skincare',
        tagline: 'Dermatologist-Formulated Botanical Serums & Barrier Repair Oils',
        badge: 'BEAUTY & WELLNESS',
        accentColor: '#ec4899',
        colorPalette: ['#ec4899', '#500724', '#fbcfe8', '#fdf2f8'],
        heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
        stats: ['Clinical Efficacy Trials', '100% Vegan Certified', 'Carbon-Neutral Labs'],
        layoutStyle: 'Soft pastel radiance with interactive skin diagnostic quiz and personalized routine recommendations.',
        idealFor: 'Clean beauty companies, skincare formulators, and natural cosmetics houses.',
        includedModules: ['Interactive Skin Quiz', 'Ingredient Clinical Research Cards', 'Customer Video Reviews Carousel', 'Recurring Auto-Refill Engine']
      },
      {
        id: 'ret-4',
        name: 'Aero Craft Tailoring',
        tagline: 'Technical Merino Wool Travel Suits & Performance Commuter Apparel',
        badge: 'TECHNICAL APPAREL',
        accentColor: '#0ea5e9',
        colorPalette: ['#0ea5e9', '#082f49', '#bae6fd', '#f0f9ff'],
        heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
        stats: ['Odor-Resistant Fiber', '4-Way Stretch Weave', 'Lifetime Seam Warranty'],
        layoutStyle: 'High-contrast editorial lookbook with live size recommendation modules and fabric stretch demos.',
        idealFor: 'Modern menswear, performance activewear, and luxury travel apparel manufacturers.',
        includedModules: ['Smart Sizing Assistant', 'Fabric Micro-Zoom Inspector', 'Lookbook Video Feed', 'Instant Return Portal Integration']
      },
      {
        id: 'ret-5',
        name: 'Velox Precision Watches',
        tagline: 'Mechanical Horology, Pilot Chronometers & Deep Sea Diving Instruments',
        badge: 'LUXURY TIMEPIECES',
        accentColor: '#eab308',
        colorPalette: ['#eab308', '#1c1917', '#fef08a', '#fefce8'],
        heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        stats: ['Swiss Automatic Caliber', '300m Water Resistance', 'Individually Serialized'],
        layoutStyle: 'Obsidian luxury framing with dynamic 360-degree case rotation gallery and authorized dealer locators.',
        idealFor: 'Independent watchmakers, fine jewelry studios, and precision luxury accessories.',
        includedModules: ['Numbered Serial Registry', 'Caliber Movement Exploded View', 'Authorized Retailer Map', 'VIP Waitlist Pre-Orders']
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
      },
      {
        id: 'hlth-2',
        name: 'Pureform Sports Physical Therapy',
        tagline: 'Biomechanics Rehabilitation & Elite Athletic Conditioning Programs',
        badge: 'SPORTS RECOVERY',
        accentColor: '#06b6d4',
        colorPalette: ['#06b6d4', '#164e63', '#a5f3fc', '#ecfeff'],
        heroImage: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80',
        stats: ['Olympic-Level Therapists', 'Force-Plate Diagnostics', 'Accelerated Protocols'],
        layoutStyle: 'High-energy recovery aesthetic with interactive injury symptom evaluator and direct intake form.',
        idealFor: 'Physical therapy practices, sports medicine clinics, and performance chiropractors.',
        includedModules: ['Interactive Injury Body Map', 'Direct Therapist Scheduling', 'Performance Assessment Video Vault', 'Insurance Eligibility Checker']
      },
      {
        id: 'hlth-3',
        name: 'Sonoma Mind Sanctuary',
        tagline: 'Holistic Mental Health, Somatic Therapy & Forest Immersion Retreats',
        badge: 'PSYCHOLOGY & RETREAT',
        accentColor: '#84cc16',
        colorPalette: ['#84cc16', '#365314', '#d9f99d', '#f7fee7'],
        heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80',
        stats: ['Licensed Psychologists', 'Private Woodland Setting', 'Strict Confidentiality'],
        layoutStyle: 'Organic earthy calming tones with guided retreat itinerary and private confidential counseling booking.',
        idealFor: 'Therapists, psychologists, wellness retreats, and holistic healing centers.',
        includedModules: ['Confidential Consultation Form', 'Retreat Room Itinerary Viewer', 'Practitioner Philosophy Bios', 'Virtual Counseling Link Hub']
      },
      {
        id: 'hlth-4',
        name: 'Radiance Dental Spa',
        tagline: 'Cosmetic Dentistry, Clear Aligners & Gentle Anxiety-Free Oral Care',
        badge: 'DENTAL PRACTICE',
        accentColor: '#0ea5e9',
        colorPalette: ['#0ea5e9', '#0c4a6e', '#bae6fd', '#f0f9ff'],
        heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80',
        stats: ['Digital 3D Smile Preview', 'Sedation Dentistry Options', 'Zero-Anxiety Environment'],
        layoutStyle: 'Bright hygienic layout with interactive before-and-after smile transformations and insurance estimators.',
        idealFor: 'Cosmetic dentists, orthodontists, and dental surgery practices.',
        includedModules: ['Before/After Transformation Slider', 'Instant Insurance Estimator', 'Appointment Booking Calendar', 'New Patient Welcome Video']
      },
      {
        id: 'hlth-5',
        name: 'Kinetic Movement Pilates',
        tagline: 'Reformer Studio, Private Coaching & Posture Alignment Classes',
        badge: 'FITNESS STUDIO',
        accentColor: '#f43f5e',
        colorPalette: ['#f43f5e', '#4c0519', '#fecdd3', '#fff1f2'],
        heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
        stats: ['Small Classes (Max 6)', 'Certified Master Trainers', 'Custom Reformer Gear'],
        layoutStyle: 'Minimal chic studio vibe with real-time class pass and reformer seat reservation integration.',
        idealFor: 'Pilates studios, yoga collectives, and boutique fitness spaces.',
        includedModules: ['Weekly Live Schedule Grid', 'Membership Tier Checkout', 'Instructor Video Spotlights', 'First-Timer Intro Package Booking']
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
      },
      {
        id: 'tech-2',
        name: 'CyberDefend Security',
        tagline: 'Automated Threat Intelligence, Managed SOC & Zero-Trust Infrastructure',
        badge: 'CYBERSECURITY',
        accentColor: '#22c55e',
        colorPalette: ['#22c55e', '#052e16', '#bbf7d0', '#f0fdf4'],
        heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80',
        stats: ['Real-Time SOC Telemetry', 'Sub-Second Anomaly Blocks', 'SOC2 Type II Compliant'],
        layoutStyle: 'Cyber-ops dashboard with live threat feed simulator and compliance vulnerability audit forms.',
        idealFor: 'Managed security providers, vulnerability testing firms, and enterprise compliance tools.',
        includedModules: ['Free Vulnerability Scan Form', 'Interactive Architecture Diagram', 'Compliance Certifications Strip', 'Emergency Breach Dispatch Button']
      },
      {
        id: 'tech-3',
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
      },
      {
        id: 'tech-4',
        name: 'Cognitive Data Systems',
        tagline: 'Enterprise Large Language Model Scaffolding & Vector Embeddings',
        badge: 'AI APPLIED LAB',
        accentColor: '#6366f1',
        colorPalette: ['#6366f1', '#1e1b4b', '#c7d2fe', '#eef2ff'],
        heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        stats: ['Private VPC Isolation', 'Zero Data Leakage Model', 'Enterprise RAG Ready'],
        layoutStyle: 'Deep tech blueprint with interactive vector benchmark metrics and enterprise security certifications.',
        idealFor: 'Enterprise AI consultants, data engineering consultancies, and RAG search startups.',
        includedModules: ['Model Performance Benchmarks', 'Interactive Data Pipeline Chart', 'VPC Isolation Checklist', 'Executive Demo Scheduler']
      },
      {
        id: 'tech-5',
        name: 'Voxel Simulation Engine',
        tagline: 'Real-Time Physics Simulations, Gaming SDKs & Spatial Computing Tools',
        badge: 'SPATIAL COMPUTE',
        accentColor: '#f43f5e',
        colorPalette: ['#f43f5e', '#4c0519', '#fecdd3', '#fff1f2'],
        heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        stats: ['120 FPS Native Rendering', 'WebGPU Accelerated', 'Cross-Platform SDK'],
        layoutStyle: 'Futuristic wireframe layout with interactive sandbox physics demos and SDK license purchases.',
        idealFor: 'Game development studios, spatial compute startups, and 3D simulation creators.',
        includedModules: ['Interactive WebGL Sandbox', 'Developer Discord Bridge', 'SDK License Pricing Table', 'Feature Roadmap Timeline']
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
      },
      {
        id: 'cre-2',
        name: 'The Highland Atelier',
        tagline: 'Boutique Mountain Chalet & Nordic Spa Sanctuary for Rejuvenation',
        badge: 'BOUTIQUE HOTEL',
        accentColor: '#059669',
        colorPalette: ['#059669', '#064e3b', '#a7f3d0', '#ecfdf5'],
        heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        stats: ['14 Private Chalets', 'Geothermal Heated Springs', 'Panoramic Alpine Views'],
        layoutStyle: 'Expansive imagery layout with real-time chalet suite availability calendars and concierge services.',
        idealFor: 'Boutique hotels, luxury lodges, bed & breakfasts, and resort spas.',
        includedModules: ['Suite Availability Calendar', 'Interactive Property Map', 'Nordic Spa Menu', 'Direct Booking Deposit Checkout']
      },
      {
        id: 'cre-3',
        name: 'Kinesis Film & Media Lab',
        tagline: 'Commercial Cinematography, Color Grading & Visual Production Studio',
        badge: 'FILM PRODUCTION',
        accentColor: '#f59e0b',
        colorPalette: ['#f59e0b', '#451a03', '#fde68a', '#fffbeb'],
        heroImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
        stats: ['Cinema 8K RAW Cameras', 'Dolby Vision Mastering', 'Cannes Shortlisted'],
        layoutStyle: 'Cinematic wide-ratio video reel player with commercial lookbook downloads and project quote calculators.',
        idealFor: 'Commercial filmmakers, video production houses, and creative directors.',
        includedModules: ['Embedded 4K Video Reel', 'Client Brand Logo Strip', 'Interactive Production Budget Estimator', 'Commercial Deck Download']
      },
      {
        id: 'cre-4',
        name: 'Elena Rostova Portfolio',
        tagline: 'Visual Brand Systems, Editorial Typography & Campaign Direction',
        badge: 'CREATOR PORTFOLIO',
        accentColor: '#ec4899',
        colorPalette: ['#ec4899', '#500724', '#fbcfe8', '#fdf2f8'],
        heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
        stats: ['Over 120 Brand Projects', 'Tokyo & Paris Exhibitions', 'Published in Monocle'],
        layoutStyle: 'Bold editorial typography catalog showcasing client campaigns, press features, and social link hub.',
        idealFor: 'Art directors, digital creators, models, fashion stylists, and visual consultants.',
        includedModules: ['High-Def Campaign Slider', 'Press & Exhibition Archive', 'Centralized Link Hub', 'Brand Sponsorship Inquiry Form']
      },
      {
        id: 'cre-5',
        name: 'The Foundry Co-Working Hub',
        tagline: 'Curated Workspaces, Private Studios & Creator Podcast Audio Pods',
        badge: 'CREATIVE CLUB',
        accentColor: '#0284c7',
        colorPalette: ['#0284c7', '#082f49', '#bae6fd', '#f0f9ff'],
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
        stats: ['Fiber 1Gbps Dedicated', 'Soundproof Recording Pods', 'Artisan Espresso Bar'],
        layoutStyle: 'Modern collaborative club aesthetic with direct day-pass and private tour booking forms.',
        idealFor: 'Co-working spaces, private clubs, podcast studios, and event venues.',
        includedModules: ['Virtual 3D Tour Video', 'Day Pass & Desk Booking Calendar', 'Member Amenities Checklist', 'Private Event Rental Inquiry']
      }
    ]
  };

  const getAmbientBackground = () => {
    switch (navPage) {
      case 1:
        return 'radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 2:
        return 'radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 3:
        return 'radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.35) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(5, 8, 17, 0.98) 100%)';
      case 4:
        return 'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.35) 0%, rgba(15, 23, 42, 0.92) 65%, rgba(5, 8, 17, 0.98) 100%)';
      default:
        return '#050811';
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
              ← Back to All 25 Templates
            </button>
            <div style={styles.deviceToggleGroup}>
              <button
                style={previewDevice === 'desktop' ? styles.deviceBtnActive : styles.deviceBtn}
                onClick={() => setPreviewDevice('desktop')}
                title="Desktop View"
              >
                <Icons.Laptop /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Desktop</span>
              </button>
              <button
                style={previewDevice === 'tablet' ? styles.deviceBtnActive : styles.deviceBtn}
                onClick={() => setPreviewDevice('tablet')}
                title="Tablet View"
              >
                <Icons.Tablet /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Tablet</span>
              </button>
              <button
                style={previewDevice === 'mobile' ? styles.deviceBtnActive : styles.deviceBtn}
                onClick={() => setPreviewDevice('mobile')}
                title="Mobile View"
              >
                <Icons.Smartphone /> <span style={{ fontSize: '11px', marginLeft: '4px' }}>Mobile</span>
              </button>
            </div>
          </div>

          <div style={
            previewDevice === 'mobile' ? styles.frameMobile :
            previewDevice === 'tablet' ? styles.frameTablet : styles.frameDesktop
          }>
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
                <span style={{ ...styles.mockupBadge, borderColor: t.accentColor, color: t.accentColor }}>
                  {t.badge}
                </span>
                <h2 style={styles.simulatedHeading}>{t.name}</h2>
                <p style={styles.simulatedSubtext}>{t.tagline}</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                  <button style={{ ...styles.mockupActionBtn, backgroundColor: t.accentColor }}>
                    Explore Platform
                  </button>
                  <button style={styles.mockupSecondaryBtn}>
                    View Specs
                  </button>
                </div>
              </div>
            </div>

            <div style={styles.simulatedStatsStrip}>
              {t.stats.map((s, idx) => (
                <span key={idx} style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500' }}>
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.cardRelative}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '10px', color: t.accentColor, fontWeight: '800', letterSpacing: '1px' }}>{t.badge}</span>
                <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '4px 0 2px 0', color: '#f8fafc' }}>{t.name}</h2>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{t.tagline}</p>
              </div>

              <div>
                <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Color Palette Tokens</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {t.colorPalette.map((hex, i) => (
                    <div key={i} style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #334155' }} title={hex} />
                  ))}
                </div>
              </div>
            </div>

            <div style={styles.templateDetailGrid}>
              <div style={styles.detailBox}>
                <h4 style={styles.detailBoxTitle}>📐 Layout Architecture</h4>
                <p style={styles.detailBoxText}>{t.layoutStyle}</p>
              </div>
              <div style={styles.detailBox}>
                <h4 style={styles.detailBoxTitle}>🎯 Ideal Client Profile</h4>
                <p style={styles.detailBoxText}>{t.idealFor}</p>
              </div>
            </div>

            <div style={{ marginTop: '14px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#e2e8f0', margin: '0 0 8px 0' }}>Included Functional Modules</h4>
              <div style={styles.moduleBadgeList}>
                {t.includedModules.map((mod, idx) => (
                  <span key={idx} style={styles.moduleBadge}>
                    ✓ {mod}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <button
                style={{ ...styles.primaryBtn, flex: 1 }}
                onClick={() => {
                  updateField('vertical', t.name);
                  setSelectedTemplate(null);
                  setSubView('questionnaire');
                }}
              >
                Adopt {t.name} & Start 7-Day Sprint →
              </button>
              <button
                style={{ ...styles.secondaryBtn, width: 'auto', padding: '0 20px' }}
                onClick={() => setSelectedTemplate(null)}
              >
                Back
              </button>
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

          <div style={styles.roiBanner}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <Icons.TrendingUp />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#34d399' }}>Verified Industry Benchmark</span>
            </div>
            <p style={{ fontSize: '11px', color: '#cbd5e1', margin: 0 }}>
              Businesses with a dedicated website report earning an average of <strong>39% more revenue</strong> and grow <strong>2.8x faster</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                style={{
                  ...styles.pricingCard,
                  borderColor: plan.highlight ? '#38bdf8' : '#1e293b',
                  backgroundColor: plan.highlight ? 'rgba(30, 58, 138, 0.35)' : 'rgba(15, 23, 42, 0.7)'
                }}
              >
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

                <div style={styles.conciseBulletList}>
                  {plan.features.map((feat, i) => (
                    <div key={i} style={styles.conciseBulletItem}>
                      <Icons.CheckCircle />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  style={plan.highlight ? styles.primaryBtn : styles.secondaryBtn}
                  onClick={() => {
                    updateField('tier', plan.name);
                    setSelectedTier(plan.name);
                    setSubView('questionnaire');
                  }}
                >
                  Choose {plan.name} →
                </button>
              </div>
            ))}
          </div>

          <button style={styles.backBtn} onClick={() => setSubView(null)}>
            ← Back to Navigation
          </button>
        </div>
      </main>
    );
  }

  if (subView === 'creator') {
    return (
      <main style={{ ...styles.container, background: getAmbientBackground() }}>
        <div style={{ ...styles.cardRelative, maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={styles.creatorPill}>✨ CREATORS, ARTISTS & PERSONAL BRANDS</span>
            <h2 style={{ ...styles.title, marginTop: '8px' }}>Own Your Brand Hub</h2>
            <p style={styles.brandSubheading}>
              Stop sending followers to plain link trees. Own a custom portfolio and catalog on your own custom domain.
            </p>
          </div>

          <div style={styles.creatorGrid}>
            <div style={styles.creatorCard}>
              <h4 style={{ ...styles.creatorCardTitle, color: '#f472b6' }}>📸 Visual Catalog & Portfolio</h4>
              <p style={styles.creatorCardText}>Present your work, photography, designs, or physical goods with responsive high-definition galleries.</p>
            </div>
            <div style={styles.creatorCard}>
              <h4 style={{ ...styles.creatorCardTitle, color: '#c084fc' }}>🔗 Centralized Social Hub</h4>
              <p style={styles.creatorCardText}>Bring your YouTube, Instagram, TikTok, podcasts, and newsletter together under one branded roof.</p>
            </div>
            <div style={styles.creatorCard}>
              <h4 style={{ ...styles.creatorCardTitle, color: '#38bdf8' }}>💼 Direct Brand Partnerships</h4>
              <p style={styles.creatorCardText}>Capture corporate sponsorships and direct inquiries with automated intake forms and zero platform cuts.</p>
            </div>
          </div>

          <button
            style={styles.primaryBtn}
            onClick={() => {
              updateField('vertical', 'Creator & Personal Brand');
              setSubView('questionnaire');
            }}
          >
            Build My Creator Brand Site →
          </button>

          <button style={styles.backBtn} onClick={() => setSubView(null)}>
            ← Back to Navigation
          </button>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={styles.stepLabel}>Step {step} of 6</span>
            <span style={styles.selectedTierBadge}>{formData.tier}</span>
          </div>

          {step === 1 && (
            <div>
              <h3 style={styles.questionTitle}>1. What type of website is this for?</h3>
              {categories.map((item) => (
                <button
                  key={item}
                  style={formData.vertical === item ? styles.selectedOption : styles.optionBtn}
                  onClick={() => { updateField('vertical', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={styles.questionTitle}>2. What is your primary objective?</h3>
              {['Capture Customer Inquiries & Leads', 'Sell Products / Merchandise', 'Showcase Visual Work & Portfolio', 'Build Brand Trust & Reputation'].map((item) => (
                <button
                  key={item}
                  style={formData.objective === item ? styles.selectedOption : styles.optionBtn}
                  onClick={() => { updateField('objective', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={styles.questionTitle}>3. What style fits best?</h3>
              {['Clean & Minimal', 'Bold & Editorial', 'Dark & High-Tech', 'Warm & Organic'].map((item) => (
                <button
                  key={item}
                  style={formData.archetype === item ? styles.selectedOption : styles.optionBtn}
                  onClick={() => { updateField('archetype', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={styles.questionTitle}>4. What key feature do you need most?</h3>
              {['Appointment Booking Calendar', 'Lead Inquiry & Contact Form', 'Interactive Catalog Gallery', 'Client Login & Member Portal'].map((item) => (
                <button
                  key={item}
                  style={formData.feature === item ? styles.selectedOption : styles.optionBtn}
                  onClick={() => { updateField('feature', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 style={styles.questionTitle}>5. Do you already have a logo and domain?</h3>
              {['Yes, logo and domain are ready', 'I have a logo, but need a custom domain', 'I am starting from scratch and need both'].map((item) => (
                <button
                  key={item}
                  style={formData.readiness === item ? styles.selectedOption : styles.optionBtn}
                  onClick={() => { updateField('readiness', item); handleNext(); }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {step === 6 && (
            <form onSubmit={handleSubmit}>
              <h3 style={styles.questionTitle}>6. Where should we send your project details?</h3>
              <input
                style={styles.input}
                placeholder="Your Full Name"
                required
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
              />
              <input
                style={styles.input}
                placeholder="Your Business or Brand Name"
                required
                value={formData.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
              />
              <input
                style={styles.input}
                type="email"
                placeholder="Your Email Address"
                required
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              <input
                style={styles.input}
                type="tel"
                placeholder="Mobile Phone (for SMS updates)"
                required
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              <button type="submit" style={styles.primaryBtn}>
                Submit & Request Invoice ({formData.tier})
              </button>
            </form>
          )}

          {step > 1 && (
            <button style={styles.backBtn} onClick={handleBack}>
              ← Back
            </button>
          )}
          {step === 1 && (
            <button style={styles.backBtn} onClick={() => setSubView(null)}>
              ← Cancel
            </button>
          )}
        </div>
      </main>
    );

  return (
    <main style={{ ...styles.container, background: getAmbientBackground() }}>
      <div style={{ width: '100%', maxWidth: navPage === 4 ? '1040px' : '520px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        <div style={styles.stepProgressRow}>
          <button style={navPage === 1 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(1)}>
            01. About
          </button>
          <button style={navPage === 2 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(2)}>
            02. Launch
          </button>
          <button style={navPage === 3 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(3)}>
            03. Ready to build?
          </button>
          <button style={navPage === 4 ? styles.stepBtnActive : styles.stepBtn} onClick={() => setNavPage(4)}>
            04. Templates
          </button>
        </div>

        {navPage === 1 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={styles.studioPill}>{launchMeta.company.name.toUpperCase()} // WHO WE ARE</span>
              <h1 style={styles.landingHeroHeading}>
                {launchMeta.company.name}
              </h1>
              <p style={styles.landingHeroSubheading}>
                Custom websites delivered in seven days with full personal control. Operated under {launchMeta.company.parentEntity} by {launchMeta.company.founder}.
              </p>
            </div>

            <div style={styles.aboutPillarsList}>
              <div style={styles.aboutPillar}>
                <div style={styles.pillarIconBox}>⚡</div>
                <div>
                  <h4 style={styles.pillarTitle}>Guaranteed 7-Day Turnaround</h4>
                  <p style={styles.pillarText}>We eliminate months of traditional agency delays. Your custom website is staged on Day 3 and live on Day 7.</p>
                </div>
              </div>

              <div style={styles.aboutPillar}>
                <div style={styles.pillarIconBox}>🎨</div>
                <div>
                  <h4 style={styles.pillarTitle}>"My Site Manager" Autonomy</h4>
                  <p style={styles.pillarText}>Update your own text, photos, and color palettes anytime through a secure client portal without technical barriers.</p>
                </div>
              </div>

              <div style={styles.aboutPillar}>
                <div style={styles.pillarIconBox}>🛡️</div>
                <div>
                  <h4 style={styles.pillarTitle}>100% Code & Content Ownership</h4>
                  <p style={styles.pillarText}>Zero monthly platform lock-in. You own your source code, domain, and database completely from day one.</p>
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={() => setNavPage(2)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                See When Your Site Can Launch →
              </span>
            </button>

            <div style={styles.ownershipBadge}>
              <Icons.ShieldCheck />
              <span>Engineered for Maximum Speed & Conversion</span>
            </div>
          </div>
        )}

        {navPage === 2 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <span style={styles.badge}>THE 7-DAY DELIVERY BLUEPRINT</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Your Launch Timeline</h2>
              <p style={styles.brandSubheading}>Transparent milestones tracked via SMS, voice, and your client portal.</p>
            </div>

            <div style={styles.dynamicDateBox}>
              <Icons.Calendar />
              <div>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>If you start your build today:</span>
                <strong style={{ fontSize: '17px', color: '#38bdf8' }}>Guaranteed Live Launch by {deliveryDate || 'Next Week'}</strong>
              </div>
            </div>

            <div style={styles.processTimelineContainer}>
              <div style={styles.processTimelineItem}>
                <div style={styles.processDayBadge}>Day 0</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processItemTitle}>Intake & Instant Workspace Provisioning</h4>
                  <p style={styles.processItemDesc}>Payment clears, your unique Transaction ID is minted, and the 7-day clock starts immediately.</p>
                </div>
              </div>

              <div style={styles.processTimelineItem}>
                <div style={styles.processDayBadge}>Days 1-2</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processItemTitle}>Architecture & Layout Compilation</h4>
                  <p style={styles.processItemDesc}>Our system builds your responsive design system, typography tokens, and feature modules.</p>
                </div>
              </div>

              <div style={{ ...styles.processTimelineItem, borderColor: '#38bdf8' }}>
                <div style={{ ...styles.processDayBadge, backgroundColor: '#0284c7', color: '#ffffff' }}>Day 3</div>
                <div style={styles.processContent}>
                  <h4 style={{ ...styles.processItemTitle, color: '#38bdf8' }}>Staging Deploy & "My Site Manager" Unlocks</h4>
                  <p style={styles.processItemDesc}>Access your private preview portal to customize text, upload images, and test your site.</p>
                </div>
              </div>

              <div style={styles.processTimelineItem}>
                <div style={styles.processDayBadge}>Days 4-6</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processItemTitle}>Integrations & Automated QA</h4>
                  <p style={styles.processItemDesc}>We wire your forms, run mobile device tests, and optimize Google PageSpeed scores.</p>
                </div>
              </div>

              <div style={{ ...styles.processTimelineItem, borderColor: '#10b981' }}>
                <div style={{ ...styles.processDayBadge, backgroundColor: '#059669', color: '#ffffff' }}>Day 7</div>
                <div style={styles.processContent}>
                  <h4 style={styles.processItemTitle, color: '#34d399' }}>Official Production Release</h4>
                  <p style={styles.processItemDesc}>DNS routes to your live domain with SSL security. Full code ownership transferred to you.</p>
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={() => setNavPage(3)}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Choose How to Get Started <Icons.ArrowRight />
              </span>
            </button>

            <button style={styles.backBtn} onClick={() => setNavPage(1)}>
              ← Back to About Us
            </button>
          </div>
        )}

        {navPage === 3 && (
          <div style={styles.cardRelative}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <span style={styles.launchReadyPill}>PHASE 03 // ACTION HUB</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Ready to build?</h2>
              <p style={styles.brandSubheading}>Select an option below to kick off your guaranteed 7-day development cycle.</p>
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={styles.primaryBtn}
                onClick={() => setSubView('questionnaire')}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  ⚡ Build My Website Now <Icons.ArrowRight />
                </span>
              </button>

              <button
                style={styles.browseTemplatesBtn}
                onClick={() => setNavPage(4)}
              >
                <Icons.Eye />
                <span>Browse 25 Website Templates (5 Per Industry)</span>
              </button>

              <button
                style={styles.pricingBtn}
                onClick={() => setSubView('pricing')}
              >
                🏷 Full Website Starting at {launchMeta.company.pricingBase}
              </button>

              <button
                style={styles.creatorBtn}
                onClick={() => setSubView('creator')}
              >
                <Icons.Sparkles />
                <span>For Creators & Brand Catalogs</span>
              </button>
            </div>

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button style={styles.shareBtn} onClick={handleShare}>
                <Icons.Share />
                <span>Share with friends & family</span>
              </button>
              {shareNotice && (
                <p style={{ fontSize: '11px', color: '#34d399', margin: '4px 0 0 0' }}>
                  ✓ Website link copied to clipboard!
                </p>
              )}
            </div>

            <button style={styles.backBtn} onClick={() => setNavPage(2)}>
              ← Back to Delivery Timeline
            </button>
          </div>
        )}

        {navPage === 4 && (
          <div style={{ ...styles.cardRelative, maxWidth: '1000px' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={styles.portfolioBadge}>25 PRODUCTION DESIGNS // 5 PER CATEGORY</span>
              <h2 style={{ ...styles.title, marginTop: '6px' }}>Explore Real-World Website Templates</h2>
              <p style={styles.brandSubheading}>Tap any template card to open a full dedicated page with detailed specifications and live device preview.</p>
            </div>

            <div style={styles.portfolioCategoryTabs}>
              {categories.map((catName) => (
                <button
                  key={catName}
                  style={activeCategory === catName ? styles.catTabActive : styles.catTab}
                  onClick={() => setActiveCategory(catName)}
                >
                  {catName} (5)
                </button>
              ))}
            </div>

            <div style={styles.templateGrid}>
              {templateCatalog[activeCategory]?.map((t) => (
                <div
                  key={t.id}
                  style={styles.templateCardItem}
                  onClick={() => setSelectedTemplate(t)}
                >
                  <div style={styles.templateCardThumbnailBox}>
                    <img src={t.heroImage} alt={t.name} style={styles.templateCardImg} />
                    <div style={styles.templateCardBadgeOverlay}>
                      <span style={{ ...styles.mockupBadge, borderColor: t.accentColor, color: t.accentColor, backgroundColor: '#090d16cc' }}>
                        {t.badge}
                      </span>
                    </div>
                  </div>

                  <div style={styles.templateCardBody}>
                    <h4 style={styles.templateCardName}>{t.name}</h4>
                    <p style={styles.templateCardTagline}>{t.tagline}</p>
                    
                    <button
                      style={{ ...styles.previewTriggerBtn, borderColor: t.accentColor, color: t.accentColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(t);
                      }}
                    >
                      <Icons.Eye />
                      <span>Inspect Template Specs & Preview →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button style={{ ...styles.primaryBtn, flex: 1 }} onClick={() => setSubView('questionnaire')}>
                Ready to Build? Start Intake Form →
              </button>
              <button style={{ ...styles.secondaryBtn, width: 'auto', padding: '0 20px' }} onClick={() => setNavPage(3)}>
                Back to Ready to build?
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

const styles = {
  container: { position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', boxSizing: 'border-box', overflowX: 'hidden', transition: 'background 0.5s ease' },
  cardRelative: { position: 'relative', zIndex: 4, backgroundColor: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', width: '100%', borderRadius: '20px', padding: '24px 20px', color: '#f8fafc', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1)', boxSizing: 'border-box' },
  card: { position: 'relative', zIndex: 4, backgroundColor: '#1e293b', width: '100%', maxWidth: '440px', borderRadius: '16px', padding: '24px', color: '#f8fafc', boxShadow: '0 15px 35px rgba(0,0,0,0.6)', boxSizing: 'border-box' },
  stepProgressRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', backgroundColor: '#090d16', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b', width: '100%', boxSizing: 'border-box' },
  stepBtn: { padding: '8px 2px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid transparent', borderRadius: '6px', fontSize: '10.5px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', width: '100%' },
  stepBtnActive: { padding: '8px 2px', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxSizing: 'border-box', width: '100%', boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)' },
  landingHeroHeading: { fontSize: '28px', fontWeight: '800', letterSpacing: '-0.8px', margin: '8px 0 6px 0', lineHeight: '1.2', background: 'linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  landingHeroSubheading: { fontSize: '13px', color: '#cbd5e1', margin: '0 0 16px 0', lineHeight: '1.45' },
  studioPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: '800', color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  launchReadyPill: { fontSize: '9px', letterSpacing: '1.2px', fontWeight: '800', color: '#c084fc', backgroundColor: 'rgba(147, 51, 234, 0.2)', padding: '3px 8px', borderRadius: '999px', border: '1px solid rgba(147, 51, 234, 0.4)', display: 'inline-block' },
  title: { fontSize: '22px', fontWeight: '800', marginBottom: '6px', textAlign: 'center', letterSpacing: '-0.5px' },
  brandSubheading: { fontSize: '12px', color: '#94a3b8', margin: '0 0 14px 0', lineHeight: '1.45', textAlign: 'center' },
  badge: { fontSize: '10px', letterSpacing: '1px', fontWeight: '700', color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(2, 132, 199, 0.4)', display: 'inline-block' },
  aboutPillarsList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' },
  aboutPillar: { display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '10px', border: '1px solid #1e293b', alignItems: 'flex-start' },
  pillarIconBox: { fontSize: '18px', padding: '6px', backgroundColor: '#1e293b', borderRadius: '8px' },
  pillarTitle: { fontSize: '13px', fontWeight: '700', color: '#f8fafc', margin: '0 0 2px 0' },
  pillarText: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.4' },
  dynamicDateBox: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '10px', padding: '12px', marginBottom: '14px' },
  processTimelineContainer: { display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0 18px 0' },
  processTimelineItem: { display: 'flex', gap: '10px', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid #1e293b', borderRadius: '8px', alignItems: 'flex-start' },
  processDayBadge: { padding: '3px 6px', backgroundColor: '#1e293b', color: '#94a3b8', borderRadius: '4px', fontSize: '10px', fontWeight: '800', flexShrink: 0, textAlign: 'center' },
  processContent: { flex: 1 },
  processItemTitle: { fontSize: '12px', fontWeight: '700', color: '#f8fafc', margin: '0 0 2px 0' },
  processItemDesc: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.35' },
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  primaryBtn: { width: '100%', padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  browseTemplatesBtn: { width: '100%', padding: '13px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', border: '1px solid #0891b2', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  pricingBtn: { width: '100%', padding: '12px', backgroundColor: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', border: '1px solid #0284c7', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  creatorBtn: { width: '100%', padding: '12px', backgroundColor: 'rgba(236, 72, 153, 0.12)', color: '#f472b6', border: '1px solid #db2777', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  secondaryBtn: { width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#cbd5e1', border: '1px solid #334155', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  backBtn: { background: 'none', border: 'none', color: '#94a3b8', marginTop: '12px', cursor: 'pointer', fontSize: '12px', width: '100%', textAlign: 'center' },
  portfolioBadge: { fontSize: '10px', letterSpacing: '1px', fontWeight: '800', color: '#38bdf8', backgroundColor: 'rgba(6, 182, 212, 0.2)', padding: '4px 10px', borderRadius: '999px', border: '1px solid #0891b2', display: 'inline-block' },
  portfolioCategoryTabs: { display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '14px' },
  catTab: { padding: '7px 12px', backgroundColor: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  catTabActive: { padding: '7px 12px', backgroundColor: '#0284c7', color: '#ffffff', border: '1px solid #38bdf8', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' },
  templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '12px' },
  templateCardItem: { backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'border-color 0.2s' },
  templateCardThumbnailBox: { position: 'relative', height: '130px', width: '100%', overflow: 'hidden' },
  templateCardImg: { width: '100%', height: '100%', objectFit: 'cover' },
  templateCardBadgeOverlay: { position: 'absolute', top: 8, left: 8 },
  templateCardBody: { padding: '12px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' },
  templateCardName: { fontSize: '14px', fontWeight: '800', color: '#f8fafc', margin: '0 0 2px 0' },
  templateCardTagline: { fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: '1.35' },
  previewTriggerBtn: { padding: '8px', backgroundColor: 'transparent', border: '1px solid', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  detailReturnBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0f172a', padding: '10px 14px', borderRadius: '10px', border: '1px solid #1e293b', flexWrap: 'wrap', gap: '8px' },
  returnCatalogBtn: { background: 'none', border: 'none', color: '#38bdf8', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  templateDetailGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '12px' },
  detailBox: { padding: '12px', backgroundColor: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px', border: '1px solid #1e293b' },
  detailBoxTitle: { fontSize: '12px', fontWeight: '700', color: '#cbd5e1', margin: '0 0 4px 0' },
  detailBoxText: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.4' },
  moduleBadgeList: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  moduleBadge: { padding: '4px 8px', backgroundColor: 'rgba(2, 132, 199, 0.15)', border: '1px solid #0284c7', borderRadius: '4px', fontSize: '11px', color: '#38bdf8' },
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
  mockupBadge: { fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px', border: '1px solid', letterSpacing: '0.5px' },
  simulatedHeading: { fontSize: '18px', fontWeight: '800', margin: '4px 0 2px 0', color: '#ffffff' },
  simulatedSubtext: { fontSize: '11px', color: '#cbd5e1', margin: 0 },
  mockupActionBtn: { padding: '6px 12px', color: '#ffffff', border: 'none', borderRadius: '5px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' },
  mockupSecondaryBtn: { padding: '6px 10px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px', fontSize: '11px', fontWeight: '600' },
  simulatedStatsStrip: { display: 'flex', justifyContent: 'space-around', padding: '9px', backgroundColor: '#0b1120', borderTop: '1px solid #1e293b', flexWrap: 'wrap', gap: '6px' },
  roiBanner: { backgroundColor: 'rgba(6, 78, 59, 0.25)', border: '1px solid #059669', borderRadius: '8px', padding: '10px', marginBottom: '12px' },
  pricingCard: { padding: '12px 14px', borderRadius: '10px', border: '1px solid #334155' },
  conciseBulletList: { display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '4px', margin: '8px 0 10px 0' },
  conciseBulletItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1' },
  tierBadge: { fontSize: '9px', fontWeight: '700', color: '#94a3b8', backgroundColor: '#334155', padding: '2px 6px', borderRadius: '4px' },
  popularBadge: { fontSize: '9px', fontWeight: '800', color: '#38bdf8', backgroundColor: 'rgba(3, 105, 161, 0.3)', padding: '2px 6px', borderRadius: '4px', border: '1px solid #0284c7' },
  creatorPill: { fontSize: '10px', letterSpacing: '1px', fontWeight: '800', color: '#f472b6', backgroundColor: 'rgba(190, 24, 93, 0.25)', padding: '4px 10px', borderRadius: '999px', border: '1px solid rgba(219, 39, 119, 0.5)', display: 'inline-block' },
  creatorGrid: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' },
  creatorCard: { padding: '12px', backgroundColor: 'rgba(15, 23, 42, 0.75)', borderRadius: '10px', border: '1px solid #334155' },
  creatorCardTitle: { fontSize: '13px', fontWeight: '700', margin: '0 0 3px 0' },
  creatorCardText: { fontSize: '11px', color: '#cbd5e1', margin: 0, lineHeight: '1.4' },
  selectedTierBadge: { fontSize: '11px', fontWeight: '600', color: '#38bdf8', backgroundColor: 'rgba(2, 132, 199, 0.2)', padding: '2px 8px', borderRadius: '4px' },
  questionTitle: { fontSize: '15px', fontWeight: '600', marginBottom: '14px' },
  optionBtn: { width: '100%', padding: '11px', backgroundColor: '#334155', color: '#f8fafc', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  selectedOption: { width: '100%', padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', textAlign: 'left', marginBottom: '8px', fontSize: '13px', cursor: 'pointer' },
  input: { width: '100%', padding: '11px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '6px', color: '#f8fafc', marginBottom: '10px', boxSizing: 'border-box' },
  progressBarContainer: { height: '4px', backgroundColor: '#334155', borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#2563eb', transition: 'width 0.3s' },
  stepLabel: { fontSize: '12px', color: '#94a3b8' },
  alertBox: { backgroundColor: '#1e1b4b', border: '1px solid #4338ca', padding: '14px', borderRadius: '8px', marginTop: '14px', marginBottom: '14px' },
  alertTitle: { fontSize: '13px', fontWeight: 'bold', color: '#a5b4fc', margin: '0 0 4px 0' },
  alertText: { fontSize: '12px', color: '#c7d2fe', margin: 0, lineHeight: '1.4' },
  text: { fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' },
  ownershipBadge: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginTop: '14px' },
  shareBtn: { background: 'none', border: 'none', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', padding: '4px' }
};
