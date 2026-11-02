"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface SkinConcernCard {
  id: string;
  number: string;
  topLabel: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  featuredTreatmentId: string;
}

interface ClinicalBenefit {
  icon: "sun" | "vascular" | "sparkle" | "shield";
  text: string;
}

interface TreatmentDetail {
  id: string;
  title: string;
  titleLines: [string, string];
  eyebrow: string;
  tags: string[];
  shortTagline: [string, string];
  image: string;
  detailImage: string;
  alt: string;
  headline: string;
  description: string;
  keyBenefits: ClinicalBenefit[];
  steps: {
    step: string;
    title: string;
    detail: string;
  }[];
  specs: {
    duration: string;
    recoveryLine1: string;
    recoveryLine2?: string;
    planLine1: string;
    planLine2?: string;
    price: string;
  };
}

interface RealResultCase {
  id: string;
  concernEyebrow: string;
  treatmentTitle: string;
  treatmentId: string;
  timeframe: string;
  treatmentsCount: string;
  summaryLine1: string;
  summaryLine2: string;
  beforeImage: string;
  afterImage: string;
}

interface ApproachStep {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  treatmentId: string;
}

interface MembershipPillar {
  number: string;
  title: string;
  line1: string;
  line2: string;
}

const MEMBERSHIP_PILLARS: MembershipPillar[] = [
  {
    number: "01",
    title: "PERSONALISED CARE",
    line1: "A treatment plan built",
    line2: "around your skin.",
  },
  {
    number: "02",
    title: "PRIORITY BOOKING",
    line1: "Make your appointments",
    line2: "easier to maintain.",
  },
  {
    number: "03",
    title: "MEMBER BENEFITS",
    line1: "Exclusive treatment and",
    line2: "retail savings.",
  },
  {
    number: "04",
    title: "ONGOING SUPPORT",
    line1: "Keep your progress",
    line2: "moving forward.",
  },
];

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Which treatment is right for me?",
    answer:
      "Every skin journey begins with a comprehensive clinical consultation. We assess your skin barrier, Fitzpatrick tone, and underlying concerns to recommend the exact modality—or combination of treatments—best suited to your goals.",
  },
  {
    question: "Do I need a consultation?",
    answer:
      "Yes. A thorough skin consultation ensures every laser, needling, or resurfacing protocol is safely calibrated for your skin history and active routine before we begin treatment.",
  },
  {
    question: "How many treatments will I need?",
    answer:
      "While many clients notice brighter, calmer skin after a single session, corrective results for pigmentation, scarring, or laxity typically build over a series of 3 to 6 treatments spaced 3–4 weeks apart.",
  },
  {
    question: "Is there downtime?",
    answer:
      "Downtime varies by treatment. LED Light Therapy and RF Skin Tightening have zero downtime, whereas IPL, Chemical Peels, and Skin Needling involve 24–72 hours of mild flushing or micro-flaking as your skin renews.",
  },
  {
    question: "Are treatments painful?",
    answer:
      "Your comfort is always our priority. We use medical-grade topical numbing where appropriate and integrated sapphire contact cooling so treatments remain calm and comfortable.",
  },
  {
    question: "What should I expect during my appointment?",
    answer:
      "We start by reviewing your skin progress in a calm, unhurried setting, followed by deep clinical cleansing, your tailored treatment, barrier-repair recovery serums, and clear post-care guidance.",
  },
];

interface ClientReview {
  id: string;
  clientName: string;
  treatmentLabel: string;
  sessionsLabel: string;
  avatar: string;
  score: string;
  mainImage: string;
  sideImage: string;
  treatmentId: string;
  quote: string;
}

const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: "review-claire",
    clientName: "Claire M.",
    treatmentLabel: "IPL Skin Rejuvenation",
    sessionsLabel: "Pigmentation · 4 Sessions",
    avatar: "/images/concern-2.jpg",
    score: "5.0/5",
    mainImage: "/images/detail-ipl.jpg",
    sideImage: "/images/skin-needling.jpg",
    treatmentId: "ipl-skin-rejuvenation",
    quote:
      "After years of stubborn sun spots and redness, my complexion is finally even and luminous. The clinicians mapped my skin carefully at every IPL session and tracked my results from day one.",
  },
  {
    id: "review-emma",
    clientName: "Emma R.",
    treatmentLabel: "Skin Needling",
    sessionsLabel: "Acne Scarring & Pores · 4 Sessions",
    avatar: "/images/result-after.jpg",
    score: "4.9/5",
    mainImage: "/images/skin-needling.jpg",
    sideImage: "/images/approach-1.jpg",
    treatmentId: "skin-needling",
    quote:
      "My acne scarring and uneven texture have smoothed out completely. From my initial skin consultation to my fourth needling session, the care, honesty, and clinical expertise have been unmatched.",
  },
  {
    id: "review-sophia",
    clientName: "Sophia L.",
    treatmentLabel: "RF Skin Tightening",
    sessionsLabel: "Firmness & Lifting · 5 Sessions",
    avatar: "/images/concern-6.jpg",
    score: "4.9/5",
    mainImage: "/images/approach-1.jpg",
    sideImage: "/images/approach-3.jpg",
    treatmentId: "rf-skin-tightening",
    quote:
      "I wanted natural firmness along my jawline without invasive procedures or downtime. The RF Skin Tightening plan tightened my lower face subtly and restored my skin’s bounce.",
  },
  {
    id: "review-hannah",
    clientName: "Hannah K.",
    treatmentLabel: "Chemical Peels",
    sessionsLabel: "Clarity & Brightness · 3 Sessions",
    avatar: "/images/concern-4.jpg",
    score: "5.0/5",
    mainImage: "/images/approach-3.jpg",
    sideImage: "/images/approach-2.jpg",
    treatmentId: "chemical-peels",
    quote:
      "Their custom clinical peels cleared my congestion and post-breakout marks without leaving my skin raw. My barrier feels stronger, calmer, and brighter after every visit.",
  },
  {
    id: "review-elena",
    clientName: "Elena V.",
    treatmentLabel: "LED Light Therapy",
    sessionsLabel: "Redness & Sensitivity · 6 Sessions",
    avatar: "/images/concern-5.jpg",
    score: "4.9/5",
    mainImage: "/images/approach-2.jpg",
    sideImage: "/images/detail-ipl.jpg",
    treatmentId: "led-light-therapy",
    quote:
      "Coming to Soul Skin completely changed how I care for my reactive skin. Pairing barrier rehabilitation with medical-grade LED calmed my flushing and gave me lasting confidence.",
  },
];

const APPROACH_STEPS: ApproachStep[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand & Consult",
    description:
      "We begin with a detailed 1-on-1 clinical skin consultation to understand your concerns, long-term goals, barrier health, and full skin history before recommending any procedure.",
    image: "/images/approach-1.jpg",
    alt: "Detailed skin consultation examining skin closely",
    treatmentId: "ipl-skin-rejuvenation",
  },
  {
    id: "recommend",
    number: "02",
    title: "Strategy & Treatment Plan",
    description:
      "Based on our clinical findings, we develop a tailored treatment roadmap that aligns with your skin goals—combining the most effective medical-grade solutions and timelines.",
    image: "/images/approach-2.jpg",
    alt: "Tailored clinical skin treatment in progress",
    treatmentId: "skin-needling",
  },
  {
    id: "treat",
    number: "03",
    title: "Treat with Precision",
    description:
      "We bring your plan to life through calm, unhurried clinical sessions using calibrated laser, RF, and dermal technologies alongside barrier-repair recovery protocols.",
    image: "/images/approach-3.jpg",
    alt: "Radiant glowing skin results in warm sunlight",
    treatmentId: "rf-skin-tightening",
  },
  {
    id: "track",
    number: "04",
    title: "Track & Refine Results",
    description:
      "We continuously monitor your skin’s progress at every visit and refine your in-clinic protocols and home care routine to ensure lasting clarity, firmness, and skin health.",
    image: "/images/result-after.jpg",
    alt: "Ongoing skin progress tracking and refinement",
    treatmentId: "led-light-therapy",
  },
];

const REAL_RESULTS_CASES: RealResultCase[] = [
  {
    id: "pigmentation-ipl",
    concernEyebrow: "PIGMENTATION",
    treatmentTitle: "IPL Skin Rejuvenation",
    treatmentId: "ipl-skin-rejuvenation",
    timeframe: "6 months",
    treatmentsCount: "4 treatments",
    summaryLine1: "Reduced pigmentation, improved",
    summaryLine2: "tone and brighter, clearer skin.",
    beforeImage: "/images/result-before.jpg",
    afterImage: "/images/result-after.jpg",
  },
  {
    id: "texture-needling",
    concernEyebrow: "SKIN TEXTURE & PORES",
    treatmentTitle: "Skin Needling",
    treatmentId: "skin-needling",
    timeframe: "4 months",
    treatmentsCount: "4 treatments",
    summaryLine1: "Refined pore architecture, smoother",
    summaryLine2: "grain and firmer dermal bounce.",
    beforeImage: "/images/concern-3.jpg",
    afterImage: "/images/concern-4.jpg",
  },
  {
    id: "redness-led",
    concernEyebrow: "REDNESS & SENSITIVITY",
    treatmentTitle: "LED Light Therapy",
    treatmentId: "led-light-therapy",
    timeframe: "3 months",
    treatmentsCount: "6 treatments",
    summaryLine1: "Calmed vascular flushing, stronger",
    summaryLine2: "barrier and balanced hydration.",
    beforeImage: "/images/concern-5.jpg",
    afterImage: "/images/result-after.jpg",
  },
];

const SKIN_CONCERN_CARDS: SkinConcernCard[] = [
  {
    id: "fine-lines-ageing",
    number: "01",
    topLabel: "RF Skin Tightening",
    title: "Fine Lines & Ageing",
    description:
      "Stimulate natural collagen and soften expression lines from within.",
    image: "/images/concern-1.jpg",
    alt: "Close-up of skin showing fine lines around the eye",
    featuredTreatmentId: "rf-skin-tightening",
  },
  {
    id: "pigmentation-sun-damage",
    number: "02",
    topLabel: "IPL Skin Rejuvenation",
    title: "Pigmentation & Sun Damage",
    description:
      "Helps brighten uneven tone and lift stubborn UV sun spots.",
    image: "/images/concern-2.jpg",
    alt: "Close-up of skin with sun spots and freckles",
    featuredTreatmentId: "ipl-skin-rejuvenation",
  },
  {
    id: "acne-scarring",
    number: "03",
    topLabel: "Chemical Peels",
    title: "Acne & Scarring",
    description:
      "Clears congested pores and supports smoother, more balanced skin.",
    image: "/images/concern-3.jpg",
    alt: "Close-up of cheek showing acne and textural scarring",
    featuredTreatmentId: "chemical-peels",
  },
  {
    id: "skin-texture-pores",
    number: "04",
    topLabel: "Skin Needling",
    title: "Skin Texture & Pores",
    description:
      "Refines enlarged pores and polishes uneven surface grain.",
    image: "/images/concern-4.jpg",
    alt: "Close-up of skin pores and surface texture",
    featuredTreatmentId: "skin-needling",
  },
  {
    id: "redness-sensitivity",
    number: "05",
    topLabel: "LED Light Therapy",
    title: "Redness & Sensitivity",
    description:
      "Calms reactive flushing and strengthens fragile skin barriers.",
    image: "/images/concern-5.jpg",
    alt: "Close-up of sensitive cheek with facial redness",
    featuredTreatmentId: "led-light-therapy",
  },
  {
    id: "firmness-skin-tightening",
    number: "06",
    topLabel: "RF Skin Tightening",
    title: "Firmness & Skin Tightening",
    description:
      "Contracts deep dermal fibres to firm and contour the jawline.",
    image: "/images/concern-6.jpg",
    alt: "Close-up of jawline and neck contour",
    featuredTreatmentId: "rf-skin-tightening",
  },
];

const SIGNATURE_TREATMENT: TreatmentDetail = {
  id: "skin-needling",
  title: "Skin Needling",
  titleLines: ["Skin", "Needling"],
  eyebrow: "OUR SIGNATURE TREATMENTS",
  tags: ["COLLAGEN", "TEXTURE", "SCARRING"],
  shortTagline: [
    "Stimulate collagen. Improve texture.",
    "Reveal healthier, brighter skin.",
  ],
  image: "/images/skin-needling.jpg",
  detailImage: "/images/skin-needling.jpg",
  alt: "Skin Needling signature treatment",
  headline:
    "Precision medical microneedling to rebuild dermal collagen and smooth texture.",
  description:
    "Our signature medical-grade Skin Needling creates thousands of controlled micro-channels in the dermis, triggering your skin’s natural wound-healing cascade. Dormant fibroblasts are activated to synthesise fresh Type I and III collagen and elastin while infusing targeted clinical meso-serums deep into the tissue.",
  keyBenefits: [
    {
      icon: "sparkle",
      text: "Stimulates fresh collagen and elastin",
    },
    {
      icon: "sun",
      text: "Refines enlarged pores and scarring",
    },
    {
      icon: "vascular",
      text: "Softens fine lines and wrinkles",
    },
    {
      icon: "shield",
      text: "Strengthens long-term dermal density",
    },
  ],
  steps: [
    {
      step: "01",
      title: "Prep & Custom Meso-Infusion",
      detail:
        "Thorough double-cleanse, barrier prep, and selection of a bespoke hyaluronic or peptide glide serum.",
    },
    {
      step: "02",
      title: "Multi-Depth Microneedling",
      detail:
        "Precision digital needling tailored to exact anatomical depths across the face and jawline.",
    },
    {
      step: "03",
      title: "Peptide Mask & Recovery Seal",
      detail:
        "Cooling bio-cellulose recovery mask and barrier-sealing balm to calm redness and lock in hydration.",
    },
  ],
  specs: {
    duration: "45 Minutes",
    recoveryLine1: "24–48 Hours",
    recoveryLine2: "mild redness",
    planLine1: "4–6 Sessions",
    planLine2: "(4 weeks apart)",
    price: "$290 / session",
  },
};

const RIGHT_TREATMENTS: TreatmentDetail[] = [
  {
    id: "ipl-skin-rejuvenation",
    title: "IPL Skin Rejuvenation",
    titleLines: ["IPL Skin", "Rejuvenation"],
    eyebrow: "LIGHT-BASED PHOTOREJUVENATION",
    tags: ["PIGMENTATION", "REDNESS", "SUN DAMAGE"],
    shortTagline: [
      "Clear sun damage. Calm redness. Restore luminous,",
      "even skin tone.",
    ],
    image: "/images/thumb-ipl.jpg",
    detailImage: "/images/detail-ipl.jpg",
    alt: "IPL Skin Rejuvenation eye and cheek close-up",
    headline:
      "Targeted broad-spectrum light to lift pigment and clear vascular redness.",
    description:
      "Intense Pulsed Light (IPL) delivers calibrated wavelengths of light that are selectively absorbed by melanin clusters (freckles, sun spots, age spots) and oxyhaemoglobin (broken capillaries and diffuse redness). Pigmented lesions gently darken and micro-flake away within days, leaving clearer, more uniform skin.",
    keyBenefits: [
      {
        icon: "sun",
        text: "Fades sun spots and pigmentation",
      },
      {
        icon: "vascular",
        text: "Reduces redness and visible capillaries",
      },
      {
        icon: "sparkle",
        text: "Improves skin tone and texture",
      },
      {
        icon: "shield",
        text: "Supports long-term skin health",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Skin Melanin & Vascular Mapping",
        detail:
          "Assessment of Fitzpatrick skin type and custom calibration of wavelength filters and pulse fluence.",
      },
      {
        step: "02",
        title: "Chilled Sapphire Light Pulses",
        detail:
          "Integrated contact cooling protects the epidermis while light energy fragments underlying pigment and redness.",
      },
      {
        step: "03",
        title: "Antioxidant & SPF Shield",
        detail:
          "Soothing botanical recovery gel and broad-spectrum mineral protection.",
      },
    ],
    specs: {
      duration: "45 Minutes",
      recoveryLine1: "3–7 Days",
      recoveryLine2: "micro-darkening",
      planLine1: "3–4 Sessions",
      planLine2: "(4 weeks apart)",
      price: "$320 / session",
    },
  },
  {
    id: "rf-skin-tightening",
    title: "RF Skin Tightening",
    titleLines: ["RF Skin", "Tightening"],
    eyebrow: "THERMAL COLLAGEN REMODELLING",
    tags: ["FIRMNESS", "LIFTING", "COLLAGEN"],
    shortTagline: [
      "Firm lax tissue. Sculpt contours. Rebuild deep",
      "dermal elasticity.",
    ],
    image: "/images/thumb-rf.jpg",
    detailImage: "/images/detail-rf.jpg",
    alt: "RF Skin Tightening lower face and jawline",
    headline:
      "Non-surgical radiofrequency lifting for jawline, cheeks, and neck.",
    description:
      "Multi-polar Radiofrequency (RF) gently heats the deep reticular dermis to an optimal 40–42°C without harming the surface. This controlled thermal energy causes immediate contraction of existing collagen coils while stimulating fibroblasts to produce firmer, tighter structural fibres over the following 90 days.",
    keyBenefits: [
      {
        icon: "sparkle",
        text: "Firms and lifts jawline contours",
      },
      {
        icon: "sun",
        text: "Stimulates deep collagen synthesis",
      },
      {
        icon: "vascular",
        text: "Smooths fine lines and crepey skin",
      },
      {
        icon: "shield",
        text: "Zero downtime thermal remodelling",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Thermal Vector Mapping",
        detail:
          "Marking key structural lift vectors along the jawline, cheekbones, and lower face.",
      },
      {
        step: "02",
        title: "Continuous Thermal Sculpting",
        detail:
          "Temperature-monitored RF handpiece glides across the skin to maintain therapeutic dermal heat.",
      },
      {
        step: "03",
        title: "Firming Peptide Infusion",
        detail:
          "Application of biomimetic lifting peptides while dermal micro-circulation is elevated.",
      },
    ],
    specs: {
      duration: "50 Minutes",
      recoveryLine1: "Zero Downtime",
      recoveryLine2: "immediate glow",
      planLine1: "6 Sessions",
      planLine2: "(2 weeks apart)",
      price: "$275 / session",
    },
  },
  {
    id: "chemical-peels",
    title: "Chemical Peels",
    titleLines: ["Chemical", "Peels"],
    eyebrow: "MEDICAL-GRADE RESURFACING",
    tags: ["CLARITY", "TEXTURE", "BRIGHTNESS"],
    shortTagline: [
      "Dissolve congestion. Refine texture. Unveil fresh,",
      "glass-like clarity.",
    ],
    image: "/images/thumb-peels.jpg",
    detailImage: "/images/detail-peels.jpg",
    alt: "Radiant skin after a chemical peel",
    headline:
      "Custom-blended clinical acids to resurface, clarify, and brighten.",
    description:
      "Far beyond traditional salon exfoliation, our medical-grade Chemical Peels use synergistic blends of AHA, BHA, PHA, and tyrosinase inhibitors tailored to your barrier tolerance. They dissolve intercellular glue holding dull cells, clear congested pores, and accelerate fresh cellular turnover.",
    keyBenefits: [
      {
        icon: "sun",
        text: "Brightens dull and uneven skin tone",
      },
      {
        icon: "sparkle",
        text: "Unclogs pores and clears breakouts",
      },
      {
        icon: "vascular",
        text: "Smooths rough surface texture",
      },
      {
        icon: "shield",
        text: "Supports healthy cell renewal",
      },
    ],
    steps: [
      {
        step: "01",
        title: "pH Balancing & Prep",
        detail:
          "Cleanses and balances the acid mantle for uniform, predictable active penetration.",
      },
      {
        step: "02",
        title: "Layered Acid Application",
        detail:
          "Targeted application of your bespoke peel formula, monitored closely for clinical endpoints.",
      },
      {
        step: "03",
        title: "Neutralisation & Barrier Lock",
        detail:
          "Calming ceramide and niacinamide infusion to replenish lipids and restore comfort.",
      },
    ],
    specs: {
      duration: "35 Minutes",
      recoveryLine1: "None to 3 Days",
      recoveryLine2: "light flaking",
      planLine1: "4–6 Sessions",
      planLine2: "(3 weeks apart)",
      price: "$195 / session",
    },
  },
  {
    id: "led-light-therapy",
    title: "LED Light Therapy",
    titleLines: ["LED Light", "Therapy"],
    eyebrow: "CELLULAR PHOTOBIOMODULATION",
    tags: ["HEALING", "CALM", "SKIN HEALTH"],
    shortTagline: [
      "Soothe inflammation. Energise cells. Accelerate",
      "natural barrier repair.",
    ],
    image: "/images/thumb-led.jpg",
    detailImage: "/images/detail-led.jpg",
    alt: "Relaxing red LED light therapy treatment",
    headline:
      "Medical-grade wavelengths to calm inflammation and supercharge repair.",
    description:
      "Clinical LED Phototherapy uses high-output narrowband wavelengths — 415nm Blue to neutralise acne bacteria, 633nm Red to boost collagen and circulation, and 830nm Near-Infrared to calm deep inflammation and accelerate cellular ATP energy. Ideal both standalone and paired post-procedure.",
    keyBenefits: [
      {
        icon: "vascular",
        text: "Calms redness and reactive flushing",
      },
      {
        icon: "sun",
        text: "Energises cellular ATP repair",
      },
      {
        icon: "sparkle",
        text: "Neutralises breakout bacteria",
      },
      {
        icon: "shield",
        text: "Strengthens compromised barriers",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Enzyme Cleanse & Mist",
        detail:
          "Removes light-reflecting surface oils and preps skin with hydrating hyaluronic mist.",
      },
      {
        step: "02",
        title: "Wavelength Canopy Immersion",
        detail:
          "20 minutes under our medical-grade LED array delivering therapeutic light energy.",
      },
      {
        step: "03",
        title: "Ceramide & SPF Finishing",
        detail:
          "Seals in hydration with barrier-strengthening ceramides and mineral protection.",
      },
    ],
    specs: {
      duration: "30 Minutes",
      recoveryLine1: "Zero Downtime",
      recoveryLine2: "instant calm",
      planLine1: "6–10 Sessions",
      planLine2: "(twice weekly)",
      price: "$110 / session",
    },
  },
];

const ALL_TREATMENTS: TreatmentDetail[] = [
  SIGNATURE_TREATMENT,
  ...RIGHT_TREATMENTS,
];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 5H12.5M12.5 5L8.75 1.25M12.5 5L8.75 8.75"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13 5H1.5M1.5 5L5.25 1.25M1.5 5L5.25 8.75"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.25 1.5L1.75 6L6.25 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.75 1.5L6.25 6L1.75 10.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 5H17M3 10H17M3 15H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 3L13 13M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 1.15L8.72 4.64L12.57 5.2L9.78 7.92L10.44 11.75L7 9.94L3.56 11.75L4.22 7.92L1.43 5.2L5.28 4.64L7 1.15Z" />
    </svg>
  );
}

function BenefitIcon({ type }: { type: ClinicalBenefit["icon"] }) {
  switch (type) {
    case "sun":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="12" cy="12" r="3.6" />
          <line x1="12" y1="4.2" x2="12" y2="6.2" strokeLinecap="round" />
          <line x1="12" y1="17.8" x2="12" y2="19.8" strokeLinecap="round" />
          <line x1="4.2" y1="12" x2="6.2" y2="12" strokeLinecap="round" />
          <line x1="17.8" y1="12" x2="19.8" y2="12" strokeLinecap="round" />
          <line x1="6.5" y1="6.5" x2="7.9" y2="7.9" strokeLinecap="round" />
          <line x1="16.1" y1="16.1" x2="17.5" y2="17.5" strokeLinecap="round" />
          <line x1="17.5" y1="6.5" x2="16.1" y2="7.9" strokeLinecap="round" />
          <line x1="7.9" y1="16.1" x2="6.5" y2="17.5" strokeLinecap="round" />
        </svg>
      );
    case "vascular":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7.5 6.5V17.5" />
          <path d="M16.5 6.5V17.5" />
          <path d="M7.5 7L12 12.5L16.5 7" />
          <path d="M7.5 17L12 11.5L16.5 17" />
          <path d="M12 6.5V17.5" />
        </svg>
      );
    case "sparkle":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        >
          <path d="M14.5 4.5 Q14.5 8 18 8 Q14.5 8 14.5 11.5 Q14.5 8 11 8 Q14.5 8 14.5 4.5Z" />
          <path d="M8 11.5 Q8 14.5 11 14.5 Q8 14.5 8 17.5 Q8 14.5 5 14.5 Q8 14.5 8 11.5Z" />
        </svg>
      );
    case "shield":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6.5 6.5H17.5V11.2C17.5 15.2 14.5 17.6 12 18.5C9.5 17.6 6.5 15.2 6.5 11.2V6.5Z" />
        </svg>
      );
  }
}

// Interactive image helpers: 3D tilt + glare spotlight following the cursor
function handleTiltMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
  el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
  el.style.setProperty("--gx", `${px * 100}%`);
  el.style.setProperty("--gy", `${py * 100}%`);
}

function handleTiltLeave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
}

// Cursor-follow parallax: writes normalised -0.5..0.5 offsets as --mx / --my
function handlePointerParallax(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${(e.clientX - r.left) / r.width - 0.5}`);
  el.style.setProperty("--my", `${(e.clientY - r.top) / r.height - 0.5}`);
}

function resetPointerParallax(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--mx", "0");
  e.currentTarget.style.setProperty("--my", "0");
}

const tiltProps = {
  onMouseMove: handleTiltMove,
  onMouseLeave: handleTiltLeave,
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConcernIndex, setSelectedConcernIndex] = useState<number>(0);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(
    null
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeNavSection, setActiveNavSection] = useState<string>("home");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Real Results Carousel & Before/After Slider state
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  // Client Reviews Carousel state (5 reviews, default index 1 -> Emma R. matching "• ▬ • • •")
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(1);
  const activeReview =
    CLIENT_REVIEWS[activeReviewIndex] ?? CLIENT_REVIEWS[1];
  const reviewTouchStartXRef = useRef<number | null>(null);

  const handleReviewTouchStart = (e: React.TouchEvent) => {
    reviewTouchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleReviewTouchEnd = (e: React.TouchEvent) => {
    if (reviewTouchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX === null) return;
    const deltaX = touchEndX - reviewTouchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setActiveReviewIndex((prev) => (prev + 1) % CLIENT_REVIEWS.length);
      } else {
        setActiveReviewIndex(
          (prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length
        );
      }
    }
    reviewTouchStartXRef.current = null;
  };

  const activeConcern =
    SKIN_CONCERN_CARDS[selectedConcernIndex] ?? SKIN_CONCERN_CARDS[0];
  const activeTreatment =
    ALL_TREATMENTS.find((t) => t.id === selectedTreatmentId) ?? null;
  const activeResultCase =
    REAL_RESULTS_CASES[activeResultIndex] ?? REAL_RESULTS_CASES[0];

  const openConcernModal = (index: number) => {
    setSelectedConcernIndex(index);
    setSelectedTreatmentId(null);
    setIsModalOpen(true);
  };

  const openTreatmentModal = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTreatmentId(null);
  }, []);

  const handlePrevResult = () => {
    setActiveResultIndex(
      (prev) =>
        (prev - 1 + REAL_RESULTS_CASES.length) % REAL_RESULTS_CASES.length
    );
    setSliderPosition(50);
  };

  const handleNextResult = () => {
    setActiveResultIndex((prev) => (prev + 1) % REAL_RESULTS_CASES.length);
    setSliderPosition(50);
  };

  const updateSliderFromClientX = useCallback((clientX: number) => {
    const el = sliderContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(88, Math.max(12, rawPercent));
    setSliderPosition(clamped);
  }, []);

  useEffect(() => {
    if (!isDraggingSlider) return;

    const onMouseMove = (e: MouseEvent) => {
      updateSliderFromClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        updateSliderFromClientX(e.touches[0].clientX);
      }
    };
    const onStop = () => setIsDraggingSlider(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onStop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onStop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onStop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onStop);
    };
  }, [isDraggingSlider, updateSliderFromClientX]);

  // Close mobile menu on desktop breakpoint resize or Escape key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedTreatmentId !== null) {
          setSelectedTreatmentId(null);
        } else {
          closeModal();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedTreatmentId, closeModal]);

  // Sticky header scroll state + active section spy + scroll reveal observer
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const vh = window.innerHeight;
      document
        .querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          const speed = Number(el.dataset.parallax) || 0.12;
          const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
          el.style.setProperty("--py", `${offset.toFixed(1)}px`);
        });
      ticking = false;
    };

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateParallax);
      }

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        docHeight > 0 ? Math.min(100, Math.max(0, (y / docHeight) * 100)) : 0
      );

      const sections = [
        { id: "home", nav: "home" },
        { id: "services", nav: "services" },
        { id: "treatments", nav: "about" },
        { id: "results", nav: "about" },
        { id: "approach", nav: "about" },
        { id: "reviews", nav: "about" },
        { id: "membership", nav: "about" },
        { id: "faq", nav: "contact" },
        { id: "book", nav: "contact" },
        { id: "contact", nav: "contact" },
      ];

      let current = "home";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = s.nav;
          }
        }
      }
      setActiveNavSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("is-revealed");
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
            // Reset elements below the viewport so they animate again on the next scroll down
            target.classList.remove("is-revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="soul-page min-h-screen w-full bg-[#F1EEE9] text-[#1C1917]">
      {/* ================= TOP STICKY NAVIGATION HEADER ================= */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-[#F1EEE9]/95 backdrop-blur-md shadow-[0_6px_24px_rgba(28,25,23,0.06)] border-b border-[#DFDBD2]"
            : "bg-[#F1EEE9]"
        }`}
      >
        <div
          className={`relative w-[90%] mx-auto flex items-center justify-between h-14 sm:h-[calc(33*var(--u))] transition-colors duration-300 ${
            isScrolled || mobileMenuOpen ? "" : "border-b border-[#DFDBD2]"
          }`}
        >
          {/* Mobile Left: Official Brand Logo */}
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden flex items-center py-1 group"
            aria-label="Soul Skin & Laser Home"
          >
            <img
              src="/images/logo-dark.png"
              alt="Soul Skin & Laser"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </a>

          {/* Desktop Left: Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center h-full gap-5 sm:gap-[calc(18.5*var(--u))] text-xs sm:text-[calc(6.6*var(--u))] tracking-[0.01em]"
          >
            <a
              href="#home"
              className={`relative flex items-center h-full transition-colors ${
                activeNavSection === "home"
                  ? "text-[#1C1917] font-medium"
                  : "text-[#5E5850] hover:text-[#1C1917]"
              }`}
            >
              Home
              {activeNavSection === "home" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#FC5E2F]" />
              )}
            </a>
            <a
              href="#services"
              className={`relative flex items-center h-full transition-colors ${
                activeNavSection === "services"
                  ? "text-[#1C1917] font-medium"
                  : "text-[#5E5850] hover:text-[#1C1917]"
              }`}
            >
              Services
              {activeNavSection === "services" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#FC5E2F]" />
              )}
            </a>
            <a
              href="#approach"
              className={`relative flex items-center h-full transition-colors ${
                activeNavSection === "about"
                  ? "text-[#1C1917] font-medium"
                  : "text-[#5E5850] hover:text-[#1C1917]"
              }`}
            >
              About
              {activeNavSection === "about" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#FC5E2F]" />
              )}
            </a>
            <a
              href="#contact"
              className={`relative flex items-center h-full transition-colors ${
                activeNavSection === "contact"
                  ? "text-[#1C1917] font-medium"
                  : "text-[#5E5850] hover:text-[#1C1917]"
              }`}
            >
              Contact
              {activeNavSection === "contact" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-[#FC5E2F]" />
              )}
            </a>
          </nav>

          {/* Desktop Center: Official Brand Logo */}
          <a
            href="#home"
            className="hidden md:flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 h-full py-1.5 group"
            aria-label="Soul Skin & Laser Home"
          >
            <img
              src="/images/logo-dark.png"
              alt="Soul Skin & Laser"
              className="h-10 sm:h-[calc(22*var(--u))] max-h-12 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </a>

          {/* Desktop Right: Header Pill CTA */}
          <a
            href="#book"
            className={`hidden md:inline-flex items-center justify-center rounded-full border transition-all duration-300 px-3.5 py-1.5 text-xs sm:h-[calc(21.5*var(--u))] sm:px-[calc(11*var(--u))] sm:py-0 sm:text-[calc(6.2*var(--u))] sm:gap-[calc(5*var(--u))] gap-1.5 font-normal tracking-[0.01em] ${
              isScrolled
                ? "border-[#FC5E2F] bg-[#FC5E2F] text-white hover:bg-[#1C1917] hover:border-[#1C1917] shadow-2xs"
                : "border-[#1C1917]/30 bg-transparent text-[#1C1917] hover:bg-[#FC5E2F] hover:text-white hover:border-[#FC5E2F]"
            }`}
          >
            <span>Book an Appointment</span>
            <ArrowRight className="w-3 h-2.5 sm:w-[calc(8*var(--u))] sm:h-[calc(6*var(--u))]" />
          </a>

          {/* Mobile Right: Compact Book CTA + Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#book"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-[#FC5E2F] text-white px-3 py-1.5 text-[11px] font-medium tracking-tight hover:bg-[#E54E20] transition-colors"
            >
              <span>Book</span>
              <ArrowRight className="w-2.5 h-2 ml-1" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="p-1.5 -mr-1 rounded-md text-[#1C1917] hover:text-[#FC5E2F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#DFDBD2] bg-[#F1EEE9] px-6 py-5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-3.5 text-sm font-medium tracking-[0.02em]">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-1 transition-colors ${
                  activeNavSection === "home"
                    ? "text-[#FC5E2F] font-semibold"
                    : "text-[#1C1917] hover:text-[#FC5E2F]"
                }`}
              >
                <span>Home</span>
                {activeNavSection === "home" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC5E2F]" />
                )}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-1 transition-colors ${
                  activeNavSection === "services"
                    ? "text-[#FC5E2F] font-semibold"
                    : "text-[#1C1917] hover:text-[#FC5E2F]"
                }`}
              >
                <span>Skin Concerns</span>
                {activeNavSection === "services" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC5E2F]" />
                )}
              </a>
              <a
                href="#treatments"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#1C1917] hover:text-[#FC5E2F] transition-colors"
              >
                <span>Signature Treatments</span>
              </a>
              <a
                href="#results"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#1C1917] hover:text-[#FC5E2F] transition-colors"
              >
                <span>Real Results</span>
              </a>
              <a
                href="#approach"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-1 transition-colors ${
                  activeNavSection === "about"
                    ? "text-[#FC5E2F] font-semibold"
                    : "text-[#1C1917] hover:text-[#FC5E2F]"
                }`}
              >
                <span>About Our Clinic</span>
                {activeNavSection === "about" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC5E2F]" />
                )}
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#1C1917] hover:text-[#FC5E2F] transition-colors"
              >
                <span>Client Reviews</span>
              </a>
              <a
                href="#membership"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#1C1917] hover:text-[#FC5E2F] transition-colors"
              >
                <span>Membership</span>
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#1C1917] hover:text-[#FC5E2F] transition-colors"
              >
                <span>FAQ</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-1 transition-colors ${
                  activeNavSection === "contact"
                    ? "text-[#FC5E2F] font-semibold"
                    : "text-[#1C1917] hover:text-[#FC5E2F]"
                }`}
              >
                <span>Contact &amp; Hours</span>
                {activeNavSection === "contact" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC5E2F]" />
                )}
              </a>
            </nav>

            <div className="pt-4 mt-4 border-t border-[#DFDBD2] flex flex-col gap-3">
              <a
                href="tel:0406541628"
                className="text-xs text-[#6E6860] flex items-center justify-between"
              >
                <span>Direct Line:</span>
                <strong className="text-[#1C1917] font-semibold">0406 541 628</strong>
              </a>
              <a
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-[#FC5E2F] text-white py-2.5 text-xs font-medium tracking-wide shadow-xs gap-2 hover:bg-[#E54E20] transition-colors"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-3 h-2.5" />
              </a>
            </div>
          </div>
        )}

        {/* Scroll Progress Bar */}
        <span
          aria-hidden="true"
          className="absolute left-0 bottom-0 h-[2px] bg-[#FC5E2F] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* ================= HERO SECTION (90% WIDTH + ROUNDED CORNERS) ================= */}
      <section
        id="home"
        data-reveal="scale"
        className="relative w-[90%] mx-auto mt-4 sm:mt-[calc(9*var(--u))] rounded-[20px] sm:rounded-[calc(14*var(--u))] overflow-hidden bg-[#584D3B] sm:h-[calc(305*var(--u))] min-h-[460px] sm:min-h-0 flex items-end sm:items-center"
      >
        {/* Background Portrait Image (Responsive: tailored vertical 3:4 portrait for mobile, landscape for desktop) */}
        <picture className="absolute inset-0 h-full w-full select-none pointer-events-none">
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.jpg" />
          <img
            src="/images/hero.jpg"
            alt="Radiant glowing skin portrait"
            className="h-full w-full object-cover object-[center_20%] sm:object-center"
          />
        </picture>

        {/* Dynamic contrast gradient: vertical bottom-to-top on mobile to preserve face visibility, horizontal on desktop */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/40 md:via-black/20 md:to-transparent" />

        {/* Hero Left Content */}
        <div className="relative z-10 px-6 py-8 sm:p-0 sm:pl-[calc(37*var(--u))] max-w-xl sm:max-w-none">
          {/* Eyebrow */}
          <p className="hero-animate-eyebrow uppercase text-white/80 font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.135em] leading-none">
            MEDICAL-GRADE SKIN &amp; LASER TREATMENTS
          </p>

          {/* Main Display Heading */}
          <h1 className="hero-animate-heading font-editorial text-white font-light text-3xl xs:text-4xl sm:text-[calc(38*var(--u))] leading-[1.05] sm:leading-[calc(39*var(--u))] tracking-[-0.015em] mt-3 sm:mt-[calc(12*var(--u))]">
            <span className="block">Your skin,</span>
            <span className="block">understood &mdash;</span>
            <span className="block italic font-normal">then transformed</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="hero-animate-subtitle text-white/85 font-normal text-sm sm:text-[calc(7.2*var(--u))] leading-relaxed sm:leading-[calc(12.2*var(--u))] mt-4 sm:mt-[calc(13*var(--u))] tracking-[0.005em]">
            Advanced, science-backed treatments designed
            <br />
            to reveal your healthiest, most radiant skin &mdash;
            <br />
            with genuine care and expert guidance.
          </p>

          {/* Hero CTAs */}
          <div className="hero-animate-cta flex flex-wrap items-center gap-4 sm:gap-[calc(18.5*var(--u))] mt-6 sm:mt-[calc(17*var(--u))]">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-[#FC5E2F] text-white font-medium transition-transform hover:scale-[1.01] hover:bg-[#E54E20] px-5 py-2.5 text-xs sm:w-[calc(131*var(--u))] sm:h-[calc(27.5*var(--u))] sm:px-0 sm:py-0 sm:text-[calc(6.6*var(--u))] gap-2 sm:gap-[calc(6*var(--u))] shadow-sm"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-3 h-2.5 sm:w-[calc(8.5*var(--u))] sm:h-[calc(6.5*var(--u))]" />
            </a>

            <a
              href="#treatments"
              className="inline-block text-white/90 hover:text-white transition-colors text-xs sm:text-[calc(6.7*var(--u))] tracking-[0.01em] border-b border-white/40 hover:border-[#FC5E2F] pb-0.5 sm:pb-[calc(2.5*var(--u))]"
            >
              Explore Treatments
            </a>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: SKIN CONCERNS ================= */}
      <section
        id="services"
        className="w-full px-5 pt-10 sm:px-[calc(35*var(--u))] sm:pt-[calc(31*var(--u))]"
      >
        {/* Section Header Row */}
        <div
          data-reveal="up"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-0"
        >
          {/* Left Title Group */}
          <div>
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.135em] leading-none">
              WHAT ARE YOU LOOKING TO CHANGE?
            </p>
            <h2 className="font-editorial text-[#1C1917] font-normal text-3xl sm:text-[calc(25*var(--u))] leading-[1.12] sm:leading-[calc(27.8*var(--u))] tracking-[-0.015em] mt-3 sm:mt-[calc(11*var(--u))]">
              <span className="block">Your skin concerns,</span>
              <span className="block">our focus.</span>
            </h2>
          </div>

          {/* Right Description Paragraph */}
          <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(7.1*var(--u))] leading-relaxed sm:leading-[calc(12.6*var(--u))] sm:w-[calc(202*var(--u))] sm:mb-[calc(1*var(--u))]">
            Whether it&apos;s fine lines, pigmentation, acne or
            <br className="hidden sm:inline" /> something else, we&apos;ll help
            you understand
            <br className="hidden sm:inline" /> what&apos;s driving your
            concerns &mdash; and create a
            <br className="hidden sm:inline" /> plan to get your skin back on
            track.
          </p>
        </div>

        {/* 6 Skin Concern Cards with "See Treatment" Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-[calc(8.5*var(--u))] mt-7 sm:mt-[calc(23*var(--u))]">
          {SKIN_CONCERN_CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              onClick={() => openConcernModal(index)}
              aria-haspopup="dialog"
              data-reveal="up"
              style={
                {
                  "--reveal-delay": `${(index % 3) * 90}ms`,
                } as React.CSSProperties
              }
              {...tiltProps}
              className="tilt-card group relative block w-full text-left overflow-hidden bg-[#8C6245] aspect-[347/421] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
            >
              {/* Original Skin Concern Image */}
              <img
                src={card.image}
                alt={card.alt}
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Subtle Top & Bottom Gradient for Crisp White Typography & Divider Lines */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

              {/* Top Header Row: Matched Treatment Label (Left) + White Number Circle Badge (Right) */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3.5 sm:px-[calc(10*var(--u))] sm:pt-[calc(8*var(--u))]">
                <span className="text-white font-normal text-sm sm:text-[calc(8.5*var(--u))] tracking-[-0.01em] drop-shadow-xs">
                  {card.topLabel}
                </span>

                <span className="inline-flex items-center justify-center rounded-full bg-white group-hover:bg-[#FC5E2F] group-hover:text-white text-[#1C1917] font-semibold w-8 h-8 text-[11px] sm:w-[calc(19*var(--u))] sm:h-[calc(19*var(--u))] sm:text-[calc(5.8*var(--u))] tracking-tight shadow-xs transition-all duration-300 group-hover:scale-105">
                  {card.number}
                </span>
              </div>

              {/* Bottom Divided Footer Bar */}
              <div className="absolute inset-x-0 bottom-0 h-[22%] border-t border-white/45 grid grid-cols-[62%_38%]">
                {/* Bottom-Left: Actual Skin Concern Title + Description */}
                <div className="border-r border-white/45 flex flex-col justify-center px-4 py-2.5 sm:px-[calc(10*var(--u))] sm:py-[calc(6*var(--u))]">
                  <h3 className="text-white font-normal text-base sm:text-[calc(9*var(--u))] leading-tight tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p className="text-white/80 font-normal text-xs sm:text-[calc(5.6*var(--u))] leading-[1.4] mt-1 sm:mt-[calc(2.5*var(--u))] line-clamp-2">
                    {card.description}
                  </p>
                </div>

                {/* Bottom-Right: "See Treatment" Button */}
                <div className="flex items-center justify-center px-2.5 sm:px-[calc(5*var(--u))]">
                  <span className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/15 backdrop-blur-[2px] text-white font-medium text-xs sm:text-[calc(5.8*var(--u))] px-3.5 py-2 sm:px-[calc(7.5*var(--u))] sm:py-[calc(4.5*var(--u))] gap-1.5 sm:gap-[calc(3*var(--u))] whitespace-nowrap transition-all duration-300 group-hover:bg-[#FC5E2F] group-hover:border-[#FC5E2F]">
                    <span>See Treatment</span>
                    <ArrowRight className="w-2.5 h-2 sm:w-[calc(6*var(--u))] sm:h-[calc(4.5*var(--u))] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ================= SECTION 3: SIGNATURE TREATMENTS ================= */}
      <section
        id="treatments"
        className="w-full px-5 pt-12 pb-12 sm:px-[calc(35*var(--u))] sm:pt-[calc(36*var(--u))] sm:pb-[calc(36*var(--u))]"
      >
        {/* Section Header Row */}
        <div
          data-reveal="up"
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-0 mb-7 sm:mb-[calc(22*var(--u))]"
        >
          <div>
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.135em] leading-none">
              OUR CLINICAL PROTOCOLS
            </p>
            <h2 className="font-editorial text-[#1C1917] font-normal text-3xl sm:text-[calc(25*var(--u))] leading-[1.12] sm:leading-[calc(27.8*var(--u))] tracking-[-0.015em] mt-3 sm:mt-[calc(11*var(--u))]">
              Signature Treatments
            </h2>
          </div>

          <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(7.1*var(--u))] leading-relaxed sm:leading-[calc(12.6*var(--u))] sm:w-[calc(202*var(--u))]">
            Select any of our medical-grade signature treatments below to
            explore its clinical science, key benefits, and what to expect in
            clinic.
          </p>
        </div>

        {/* Split Treatments Showcase (Matching Modal UI & Interactive) */}
        <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-6 lg:gap-[calc(12*var(--u))]">
          {/* Left Featured Signature Treatment Card (Skin Needling) */}
          <button
            type="button"
            onClick={() => openTreatmentModal(SIGNATURE_TREATMENT.id)}
            aria-haspopup="dialog"
            data-reveal="left"
            {...tiltProps}
            className="tilt-card group relative text-left overflow-hidden bg-[#5C4B3B] w-full lg:w-[calc(368*var(--u))] min-h-[340px] sm:min-h-[420px] lg:min-h-0 lg:h-[calc(314*var(--u))] shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
          >
            <img
              src={SIGNATURE_TREATMENT.image}
              alt={SIGNATURE_TREATMENT.alt}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            {/* Overlay Text positioned matching the reference layout */}
            <div className="absolute left-5 bottom-6 sm:left-8 sm:bottom-8 lg:left-[calc(18*var(--u))] lg:top-[calc(190*var(--u))] lg:bottom-auto">
              <p className="uppercase text-white/80 font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.14em] leading-none">
                {SIGNATURE_TREATMENT.eyebrow}
              </p>
              <h3 className="font-editorial text-white font-normal text-2xl sm:text-[calc(21.5*var(--u))] leading-[1.1] mt-2 sm:mt-[calc(8.5*var(--u))] tracking-[-0.01em]">
                {SIGNATURE_TREATMENT.title}
              </h3>
              <p className="text-white/85 font-normal text-xs sm:text-[calc(7.3*var(--u))] leading-relaxed sm:leading-[calc(12.2*var(--u))] mt-2 sm:mt-[calc(8.5*var(--u))]">
                {SIGNATURE_TREATMENT.shortTagline[0]}
                <br />
                {SIGNATURE_TREATMENT.shortTagline[1]}
              </p>
            </div>
          </button>

          {/* Right List of 4 Treatments */}
          <div className="flex flex-col justify-between w-full lg:w-[calc(276*var(--u))] gap-2 sm:gap-2.5 lg:gap-[calc(2*var(--u))] mt-2 lg:mt-0">
            {RIGHT_TREATMENTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openTreatmentModal(item.id)}
                aria-haspopup="dialog"
                data-reveal="right"
                style={
                  {
                    "--reveal-delay": `${idx * 85}ms`,
                  } as React.CSSProperties
                }
                className="group flex items-center text-left w-full bg-[#E7E1D7] hover:bg-[#DFD8CC] transition-colors p-2 sm:p-2.5 lg:p-[calc(4*var(--u))] min-h-[76px] sm:min-h-[84px] lg:h-[calc(75*var(--u))] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
              >
                {/* Thumbnail */}
                <div className="img-shine relative overflow-hidden shrink-0 w-24 sm:w-32 lg:w-[calc(115*var(--u))] h-16 sm:h-20 lg:h-[calc(67.5*var(--u))] bg-[#C8A892]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center pl-4 sm:pl-[calc(14*var(--u))] pr-2">
                  <h4 className="font-editorial text-[#1C1917] font-normal text-base sm:text-[calc(10.2*var(--u))] leading-[1.2] tracking-[-0.01em]">
                    {item.title}
                  </h4>

                  <p className="text-[#6E6860] font-normal text-[11px] sm:text-[calc(6.1*var(--u))] leading-tight mt-1 sm:mt-[calc(3.5*var(--u))] tracking-[0.01em]">
                    {item.tags.map((tag, tagIdx) => (
                      <React.Fragment key={tag}>
                        {tagIdx > 0 && (
                          <span className="mx-1 sm:mx-[calc(2.5*var(--u))] opacity-75">
                            &middot;
                          </span>
                        )}
                        <span className="capitalize">{tag.toLowerCase()}</span>
                      </React.Fragment>
                    ))}
                  </p>

                  <span
                    className={`inline-flex items-center font-medium text-[11px] sm:text-[calc(6.2*var(--u))] mt-2 sm:mt-[calc(9*var(--u))] gap-1.5 sm:gap-[calc(4.5*var(--u))] transition-colors ${
                      idx === 1
                        ? "text-[#FC5E2F]"
                        : "text-[#1C1917] group-hover:text-[#FC5E2F]"
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-2.5 h-2 sm:w-[calc(7*var(--u))] sm:h-[calc(5.5*var(--u))] transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: REAL SKIN. REAL RESULTS. ================= */}
      <section
        id="results"
        className="w-full bg-[#E7E1D7] px-5 py-14 sm:px-[calc(48*var(--u))] sm:py-[calc(40*var(--u))]"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-[calc(24*var(--u))]">
          {/* Left Column: Real Results Intro & CTA */}
          <div
            data-reveal="left"
            className="w-full lg:w-[calc(195*var(--u))] shrink-0"
          >
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.6*var(--u))] tracking-[0.15em] leading-none">
              REAL RESULTS
            </p>

            <h2 className="font-editorial text-[#1C1917] font-normal text-4xl sm:text-[calc(27.5*var(--u))] leading-[1.08] tracking-[-0.015em] mt-3.5 sm:mt-[calc(12*var(--u))]">
              <span className="block">Real skin.</span>
              <span className="block">Real results.</span>
            </h2>

            <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.6*var(--u))] leading-[1.7] mt-4 sm:mt-[calc(14*var(--u))]">
              See the difference our personalised treatments
              <br className="hidden sm:inline" /> can make. Every journey is
              unique, but the goals
              <br className="hidden sm:inline" /> are the same &mdash;
              healthier, clearer, more confident skin.
            </p>

            <button
              type="button"
              onClick={() => openTreatmentModal(activeResultCase.treatmentId)}
              className="font-editorial text-[#1C1917] hover:text-[#FC5E2F] transition-colors inline-flex items-center gap-2 sm:gap-[calc(5.5*var(--u))] text-sm sm:text-[calc(7.6*var(--u))] border-b border-[#8C857B] hover:border-[#FC5E2F] pb-1 sm:pb-[calc(3.5*var(--u))] mt-6 sm:mt-[calc(20*var(--u))] cursor-pointer"
            >
              <span>View More Results</span>
              <ArrowRight className="w-3 h-2.5 sm:w-[calc(6.8*var(--u))] sm:h-[calc(5*var(--u))]" />
            </button>
          </div>

          {/* Center Column: Interactive Before / After Split Comparison Card */}
          <div
            ref={sliderContainerRef}
            data-reveal="scale"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            onMouseDown={(e) => {
              setIsDraggingSlider(true);
              updateSliderFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDraggingSlider(true);
              if (e.touches[0]) {
                updateSliderFromClientX(e.touches[0].clientX);
              }
            }}
            className="relative w-full max-w-[460px] lg:max-w-none lg:w-[calc(298*var(--u))] aspect-[361/287] rounded-[8px] overflow-hidden select-none cursor-ew-resize bg-[#B88E72] shadow-xs shrink-0 touch-none"
          >
            {/* Left Side: BEFORE Image (0% -> sliderPosition%) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeResultCase.beforeImage}
                alt={`${activeResultCase.treatmentTitle} before treatment`}
                className="h-full w-full object-cover object-center pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Right Side: AFTER Image (sliderPosition% -> 100%) */}
            <div
              className="absolute inset-y-0 right-0 overflow-hidden"
              style={{ width: `${100 - sliderPosition}%` }}
            >
              <img
                src={activeResultCase.afterImage}
                alt={`${activeResultCase.treatmentTitle} after treatment`}
                className="h-full w-full object-cover object-center pointer-events-none"
                draggable={false}
              />
            </div>

            {/* Subtle Bottom Gradient for "Before" and "After" Labels */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent" />

            {/* Bottom-Left "Before" Label */}
            <span className="pointer-events-none absolute left-3.5 bottom-3 sm:left-[calc(11*var(--u))] sm:bottom-[calc(9*var(--u))] text-white/95 text-xs sm:text-[calc(6.8*var(--u))] font-normal tracking-[0.01em] drop-shadow-xs">
              Before
            </span>

            {/* Bottom-Right "After" Label */}
            <span className="pointer-events-none absolute right-3.5 bottom-3 sm:right-[calc(11*var(--u))] sm:bottom-[calc(9*var(--u))] text-white/95 text-xs sm:text-[calc(6.8*var(--u))] font-normal tracking-[0.01em] drop-shadow-xs">
              After
            </span>

            {/* Vertical White Divider Line */}
            <div
              className="pointer-events-none absolute inset-y-0 w-[1.5px] bg-white/95"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            />

            {/* Center Circular Slider Handle (< >) */}
            <div
              className="slider-handle-pulse pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-[calc(26*var(--u))] sm:h-[calc(26*var(--u))] rounded-full bg-[#F1EEE9] text-[#1C1917] shadow-md flex items-center justify-center gap-1 sm:gap-[calc(3.5*var(--u))]"
              style={{ left: `${sliderPosition}%` }}
            >
              <ChevronLeft className="w-1.5 h-2.5 sm:w-[calc(3.8*var(--u))] sm:h-[calc(5.5*var(--u))]" />
              <ChevronRight className="w-1.5 h-2.5 sm:w-[calc(3.8*var(--u))] sm:h-[calc(5.5*var(--u))]" />
            </div>
          </div>

          {/* Right Column: Case Study Details & Prev/Next Carousel Buttons */}
          <div
            data-reveal="right"
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="w-full lg:w-[calc(140*var(--u))] shrink-0"
          >
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.14em] leading-none">
              {activeResultCase.concernEyebrow}
            </p>

            <h3 className="font-editorial text-[#1C1917] font-normal text-xl sm:text-[calc(10.8*var(--u))] leading-[1.2] tracking-[-0.01em] mt-2 sm:mt-[calc(7*var(--u))]">
              {activeResultCase.treatmentTitle}
            </h3>

            <p className="text-[#1C1917] font-medium text-xs sm:text-[calc(6.2*var(--u))] mt-2 sm:mt-[calc(6.5*var(--u))]">
              <span>{activeResultCase.timeframe}</span>
              <span className="mx-1.5 opacity-60">&middot;</span>
              <span>{activeResultCase.treatmentsCount}</span>
            </p>

            <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.3*var(--u))] leading-[1.6] mt-2.5 sm:mt-[calc(9*var(--u))]">
              {activeResultCase.summaryLine1}
              <br />
              {activeResultCase.summaryLine2}
            </p>

            {/* Circular Prev / Next Arrow Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-[calc(7.5*var(--u))] mt-5 sm:mt-[calc(15*var(--u))]">
              <button
                type="button"
                onClick={handlePrevResult}
                aria-label="Previous result"
                className="w-9 h-9 sm:w-[calc(24*var(--u))] sm:h-[calc(24*var(--u))] rounded-full border border-[#CFC8BC] bg-[#F1EEE9] hover:border-[#1C1917] text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-2 h-3 sm:w-[calc(4.2*var(--u))] sm:h-[calc(6.2*var(--u))]" />
              </button>

              <button
                type="button"
                onClick={handleNextResult}
                aria-label="Next result"
                className="w-9 h-9 sm:w-[calc(24*var(--u))] sm:h-[calc(24*var(--u))] rounded-full bg-[#FC5E2F] hover:bg-[#E54E20] text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-2 h-3 sm:w-[calc(4.2*var(--u))] sm:h-[calc(6.2*var(--u))]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: OUR APPROACH ================= */}
      <section
        id="approach"
        className="w-full px-5 pt-14 pb-16 sm:px-[calc(35*var(--u))] sm:pt-[calc(42*var(--u))] sm:pb-[calc(46*var(--u))]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[36%_56%] justify-between items-start gap-10 lg:gap-0">
          {/* LEFT COLUMN: Heading + Orange Asterisk + Description + "↳ Book a consultation" */}
          <div data-reveal="left" className="w-full pt-2 sm:pt-[calc(6*var(--u))]">
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.135em] leading-none mb-3 sm:mb-[calc(10*var(--u))]">
              OUR APPROACH
            </p>

            {/* Heading Row with Orange Asterisk Icon on Right */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-editorial text-[#1C1917] font-normal text-4xl sm:text-[calc(28*var(--u))] leading-[1.08] tracking-[-0.02em]">
                <span className="block">What happens when</span>
                <span className="block">you choose Soul Skin?</span>
              </h2>

              {/* Warm Orange Asterisk / Spark Icon (*) */}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-4 h-4 sm:w-[calc(11*var(--u))] sm:h-[calc(11*var(--u))] text-[#FC5E2F] shrink-0 mt-1 sm:mt-[calc(2*var(--u))]"
              >
                <path
                  d="M10 2V18M2 10H18M4.34 4.34L15.66 15.66M15.66 4.34L4.34 15.66"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Description Paragraph */}
            <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.6*var(--u))] leading-[1.68] mt-5 sm:mt-[calc(14*var(--u))] max-w-md sm:max-w-[calc(198*var(--u))]">
              A personalised approach, designed around your skin. Every journey
              starts with understanding what&apos;s driving your concerns and
              building a science-backed clinical plan that delivers lasting
              results.
            </p>

            {/* Elbow Arrow + Bold CTA Link */}
            <a
              href="#book"
              className="group inline-flex items-center gap-2 sm:gap-[calc(5*var(--u))] mt-6 sm:mt-[calc(18*var(--u))] text-[#1C1917] hover:text-[#FC5E2F] font-semibold text-xs sm:text-[calc(6.3*var(--u))] transition-colors"
            >
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-3.5 h-3.5 sm:w-[calc(7.5*var(--u))] sm:h-[calc(7.5*var(--u))] text-[#FC5E2F] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path
                  d="M3 2.5V8.5H11M11 8.5L8.2 5.7M11 8.5L8.2 11.3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Book a consultation</span>
            </a>
          </div>

          {/* RIGHT COLUMN: 01 - 04 Stacked Process Rows with Top Divider & Top-Right Corner Bracket */}
          <div className="w-full">
            {APPROACH_STEPS.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => openTreatmentModal(step.treatmentId)}
                aria-haspopup="dialog"
                data-reveal="up"
                style={
                  {
                    "--reveal-delay": `${idx * 90}ms`,
                  } as React.CSSProperties
                }
                className="group relative w-full text-left border-t border-[#DFDBD2] py-6 sm:py-[calc(18*var(--u))] pr-6 sm:pr-[calc(20*var(--u))] flex items-start gap-4 sm:gap-[calc(15*var(--u))] cursor-pointer transition-colors hover:bg-[#E7E1D7]/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
              >
                {/* Top-Right Terracotta L-Corner Bracket Accent */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-2.5 right-0 sm:top-[calc(6*var(--u))] w-2.5 h-2.5 sm:w-[calc(7.5*var(--u))] sm:h-[calc(7.5*var(--u))] border-t-[1.8px] border-r-[1.8px] border-[#FC5E2F] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />

                {/* Left Square Number Badge (01, 02, 03, 04) */}
                <span className="inline-flex items-center justify-center w-9 h-9 sm:w-[calc(23*var(--u))] sm:h-[calc(23*var(--u))] bg-[#E7E1D7] group-hover:bg-[#FC5E2F] group-hover:text-white text-[#1C1917] font-medium text-xs sm:text-[calc(5.8*var(--u))] shrink-0 transition-colors">
                  {step.number}
                </span>

                {/* Step Title & Description */}
                <div className="flex-1">
                  <h3 className="font-editorial text-[#1C1917] group-hover:text-[#FC5E2F] font-normal text-xl sm:text-[calc(12.2*var(--u))] leading-[1.2] tracking-[-0.015em] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.4*var(--u))] leading-[1.62] mt-2 sm:mt-[calc(5.5*var(--u))] max-w-xl">
                    {step.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: CLIENT REVIEWS ================= */}
      <section
        id="reviews"
        className="w-full bg-[#E7E1D7] px-5 py-14 sm:px-[calc(35*var(--u))] sm:py-[calc(38*var(--u))]"
      >
        {/* Top Centered Section Heading & Subtitle (Tailored to Soul Skin & Laser) */}
        <div data-reveal="up" className="text-center max-w-xl mx-auto">
          <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.14em] leading-none mb-2.5 sm:mb-[calc(8*var(--u))]">
            CLIENT STORIES &amp; CLINICAL REVIEWS
          </p>
          <h2 className="font-editorial text-[#1C1917] font-normal text-3xl sm:text-[calc(25*var(--u))] leading-[1.12] tracking-[-0.02em]">
            Why clients choose Soul Skin &amp; Laser
          </h2>
          <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.6*var(--u))] leading-[1.6] mt-2.5 sm:mt-[calc(7.5*var(--u))]">
            Real reflections from Brisbane clients who transformed their skin
            through
            <br className="hidden sm:inline" /> our personalised consultations
            and medical-grade laser &amp; dermal treatments.
          </p>
        </div>

        {/* Main 3-Column Review Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[32%_42%_20.5%] justify-between items-stretch gap-8 lg:gap-0 mt-9 sm:mt-[calc(26*var(--u))]">
          {/* LEFT COLUMN: Quote Block + Reviewer Row + Divider + Clinic Summary */}
          <div
            data-reveal="left"
            onTouchStart={handleReviewTouchStart}
            onTouchEnd={handleReviewTouchEnd}
            className="flex flex-col justify-between pt-1 sm:pt-[calc(4*var(--u))] pb-1 sm:pb-[calc(4*var(--u))]"
          >
            {/* Top Quote & Reviewer Group */}
            <div>
              {/* Large Muted Double Quote Mark + Treatment Badge */}
              <div className="flex items-center justify-between gap-3">
                <svg
                  viewBox="0 0 36 28"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-7 h-6 sm:w-[calc(23*var(--u))] sm:h-[calc(18*var(--u))] text-[#D4CCC0]"
                >
                  <path d="M0 0H14V13.5C14 21 9.5 26 2.5 28L0.5 23.5C4.8 22 7 19 7.2 14H0V0ZM22 0H36V13.5C36 21 31.5 26 24.5 28L22.5 23.5C26.8 22 29 19 29.2 14H22V0Z" />
                </svg>

                <button
                  type="button"
                  onClick={() => openTreatmentModal(activeReview.treatmentId)}
                  className="inline-flex items-center rounded-full border border-[#D4CBC0] bg-[#F1EEE9] hover:border-[#FC5E2F] hover:text-[#FC5E2F] text-[#4A433C] uppercase font-medium text-[9px] sm:text-[calc(4.8*var(--u))] tracking-[0.11em] px-2.5 py-1 sm:px-[calc(7*var(--u))] sm:py-[calc(2.8*var(--u))] transition-colors cursor-pointer"
                >
                  {activeReview.treatmentLabel}
                </button>
              </div>

              {/* Review Quote Paragraph */}
              <p className="text-[#1C1917] font-normal text-base sm:text-[calc(9.8*var(--u))] leading-[1.48] tracking-[-0.01em] mt-4 sm:mt-[calc(13*var(--u))]">
                {activeReview.quote}
              </p>

              {/* Reviewer Avatar + Stars Row (Left) & Progress Indicator Dots (Right) */}
              <div className="flex items-center justify-between gap-4 mt-6 sm:mt-[calc(20*var(--u))]">
                <div className="flex items-center gap-2.5 sm:gap-[calc(7*var(--u))]">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.clientName}
                    className="w-9 h-9 sm:w-[calc(25*var(--u))] sm:h-[calc(25*var(--u))] rounded-[4px] object-cover object-center shrink-0 border border-[#D5CBBF]"
                  />

                  <div>
                    <p className="text-[#1C1917] font-medium text-xs sm:text-[calc(6.5*var(--u))] leading-tight">
                      {activeReview.clientName}
                    </p>
                    <p className="text-[#6E6860] text-[10px] sm:text-[calc(5.2*var(--u))] leading-tight mt-0.5">
                      {activeReview.sessionsLabel}
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-[calc(4*var(--u))] mt-1 sm:mt-[calc(2*var(--u))]">
                      <div className="flex items-center gap-0.5 text-[#FC5E2F]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-2.5 h-2.5 sm:w-[calc(5.5*var(--u))] sm:h-[calc(5.5*var(--u))]"
                          />
                        ))}
                      </div>
                      <span className="text-[#1C1917] font-medium text-[11px] sm:text-[calc(5.6*var(--u))] leading-none">
                        {activeReview.score}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5-Item Progress Pill/Dots Indicator (• ▬ • • •) */}
                <div
                  className="flex items-center gap-1.5 sm:gap-[calc(3*var(--u))]"
                  role="tablist"
                  aria-label="Select client review"
                >
                  {CLIENT_REVIEWS.map((item, idx) => {
                    const isActive = idx === activeReviewIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Review by ${item.clientName}`}
                        onClick={() => setActiveReviewIndex(idx)}
                        className={`h-1.5 sm:h-[calc(4.2*var(--u))] rounded-full transition-all cursor-pointer ${
                          isActive
                            ? "w-4 sm:w-[calc(11.5*var(--u))] bg-[#FC5E2F]"
                            : idx < activeReviewIndex
                              ? "w-1.5 sm:w-[calc(4.2*var(--u))] bg-[#1C1917]"
                              : "w-1.5 sm:w-[calc(4.2*var(--u))] bg-[#C8C1B6] hover:bg-[#9E9689]"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Mobile / Tablet Review Carousel Navigation Controls */}
              <div className="flex lg:hidden items-center justify-between gap-4 mt-6 pt-5 border-t border-[#D8D1C5]">
                <span className="text-[11px] text-[#6E6860]">
                  Story <strong>{activeReviewIndex + 1}</strong> of {CLIENT_REVIEWS.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReviewIndex(
                        (prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length
                      )
                    }
                    aria-label="Previous review"
                    className="w-9 h-9 rounded-full border border-[#BFB7AA] bg-[#F1EEE9] text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-2 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveReviewIndex((prev) => (prev + 1) % CLIENT_REVIEWS.length)
                    }
                    aria-label="Next review"
                    className="w-9 h-9 rounded-full bg-[#FC5E2F] text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-2 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thin Horizontal Divider Line */}
            <div className="w-full border-t border-[#D8D1C5] my-7 lg:my-0" />

            {/* Bottom Verified Clinic Rating & Consultation Guarantee Block */}
            <div>
              <div className="flex items-center gap-3.5 sm:gap-[calc(9.5*var(--u))]">
                <img
                  src="/images/approach-1.jpg"
                  alt="Soul Skin & Laser 1-on-1 clinical consultation"
                  className="w-16 h-12 sm:w-[calc(52*var(--u))] sm:h-[calc(38*var(--u))] rounded-[5px] object-cover object-center shrink-0 border border-[#D8CFC3] transition-transform duration-500 hover:scale-110 hover:-rotate-2"
                />

                <div>
                  <div className="flex items-center gap-2 sm:gap-[calc(5*var(--u))]">
                    {/* 5 Small Rating Squares */}
                    <div
                      className="flex items-center gap-1 sm:gap-[calc(2.2*var(--u))]"
                      aria-hidden="true"
                    >
                      <span className="w-2 h-2 sm:w-[calc(4.5*var(--u))] sm:h-[calc(4.5*var(--u))] rounded-[1px] bg-[#FC5E2F]" />
                      <span className="w-2 h-2 sm:w-[calc(4.5*var(--u))] sm:h-[calc(4.5*var(--u))] rounded-[1px] bg-[#FC5E2F]" />
                      <span className="w-2 h-2 sm:w-[calc(4.5*var(--u))] sm:h-[calc(4.5*var(--u))] rounded-[1px] bg-[#FC5E2F]" />
                      <span className="w-2 h-2 sm:w-[calc(4.5*var(--u))] sm:h-[calc(4.5*var(--u))] rounded-[1px] bg-[#FC5E2F]" />
                      <span className="w-2 h-2 sm:w-[calc(4.5*var(--u))] sm:h-[calc(4.5*var(--u))] rounded-[1px] bg-[#FC5E2F]" />
                    </div>
                    <span className="text-[#1C1917] font-bold text-xs sm:text-[calc(6.6*var(--u))] leading-none">
                      4.9/5
                    </span>
                  </div>

                  <p className="text-[#6E6860] text-[11px] sm:text-[calc(5.8*var(--u))] mt-1.5 sm:mt-[calc(4*var(--u))]">
                    <strong className="font-bold text-[#1C1917]">500+</strong>{" "}
                    Verified Clinic Transformations
                  </p>
                </div>
              </div>

              <p className="text-[#1C1917] font-normal text-xs sm:text-[calc(7.1*var(--u))] leading-[1.55] mt-4 sm:mt-[calc(12*var(--u))]">
                1-on-1 clinical skin consultation &amp; custom treatment plan
                <br />
                at our{" "}
                <strong className="font-bold text-[#1C1917]">
                  Brisbane, QLD
                </strong>{" "}
                clinic. Your healthiest skin starts here.
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: Large Featured Clinical Treatment Portrait */}
          <button
            type="button"
            onClick={() => openTreatmentModal(activeReview.treatmentId)}
            aria-label={`View ${activeReview.treatmentLabel} clinical details`}
            data-reveal="scale"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            {...tiltProps}
            className="tilt-card group relative w-full aspect-[424/471] rounded-[14px] sm:rounded-[calc(11*var(--u))] overflow-hidden bg-[#6E533E] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
          >
            <img
              key={activeReview.mainImage}
              src={activeReview.mainImage}
              alt={`${activeReview.clientName} — ${activeReview.treatmentLabel}`}
              className="img-swap-in h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
            <div className="pointer-events-none absolute left-4 bottom-3.5 sm:left-[calc(12*var(--u))] sm:bottom-[calc(10*var(--u))] text-left">
              <p className="uppercase text-white/80 text-[9px] sm:text-[calc(4.8*var(--u))] tracking-[0.14em]">
                FEATURED PROTOCOL
              </p>
              <p className="font-editorial text-white text-sm sm:text-[calc(8.5*var(--u))] mt-0.5">
                {activeReview.treatmentLabel} &rarr;
              </p>
            </div>
          </button>

          {/* RIGHT COLUMN: Top-Right << / >> Buttons (Desktop) + Bottom-Right Secondary Portrait */}
          <div
            data-reveal="right"
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            className="flex flex-col justify-between items-end"
          >
            {/* Top-Right Double-Chevron Navigation Buttons (Hidden on mobile where controls are in col 1) */}
            <div className="hidden lg:flex items-center gap-2.5 sm:gap-[calc(6.5*var(--u))]">
              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex(
                    (prev) =>
                      (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length
                  )
                }
                aria-label="Previous review"
                className="w-10 h-10 sm:w-[calc(28*var(--u))] sm:h-[calc(28*var(--u))] rounded-full border border-[#BFB7AA] hover:border-[#1C1917] bg-[#F1EEE9] text-[#1C1917] flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3 sm:w-[calc(8*var(--u))] sm:h-[calc(6.8*var(--u))]"
                  aria-hidden="true"
                >
                  <path
                    d="M6.5 2L2.5 6L6.5 10M11.5 2L7.5 6L11.5 10"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveReviewIndex(
                    (prev) => (prev + 1) % CLIENT_REVIEWS.length
                  )
                }
                aria-label="Next review"
                className="w-10 h-10 sm:w-[calc(28*var(--u))] sm:h-[calc(28*var(--u))] rounded-full bg-[#FC5E2F] hover:bg-[#E54E20] text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shadow-2xs"
              >
                <svg
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3 sm:w-[calc(8*var(--u))] sm:h-[calc(6.8*var(--u))]"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 2L6.5 6L2.5 10M7.5 2L11.5 6L7.5 10"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Bottom-Right Secondary Portrait Thumbnail */}
            <button
              type="button"
              onClick={() =>
                setActiveReviewIndex(
                  (prev) => (prev + 1) % CLIENT_REVIEWS.length
                )
              }
              aria-label="Preview next client story"
              {...tiltProps}
              className="tilt-card group relative w-full aspect-[204/206] max-h-[220px] sm:max-h-[300px] lg:max-h-none rounded-[12px] sm:rounded-[calc(9*var(--u))] overflow-hidden bg-[#8C6A52] mt-6 lg:mt-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F]"
            >
              <img
                key={activeReview.sideImage}
                src={activeReview.sideImage}
                alt="Next client transformation preview"
                className="img-swap-in h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: SOUL SKIN MEMBERSHIP ================= */}
      <section
        id="membership"
        data-parallax="0.12"
        onMouseMove={handlePointerParallax}
        onMouseLeave={resetPointerParallax}
        className="relative w-full overflow-hidden bg-[#221B15] sm:h-[calc(440*var(--u))] min-h-[540px] sm:min-h-0 flex flex-col items-center justify-center px-6 py-12 sm:px-[calc(42*var(--u))] sm:py-[calc(40*var(--u))]"
      >
        {/* Full-Bleed Split Macro Skin Portraits Background (Left 50% + Right 50%) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid grid-cols-2 select-none"
        >
          {/* Left Macro Portrait */}
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/images/concern-2.jpg"
              alt=""
              className="membership-img-left h-full w-full object-cover object-[55%_55%] brightness-[0.88]"
            />
          </div>

          {/* Right Macro Portrait */}
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="/images/detail-ipl.jpg"
              alt=""
              className="membership-img-right h-full w-full object-cover object-[45%_60%] brightness-[0.82] contrast-[1.08]"
            />
          </div>

          {/* Center Vertical Seam Shadow & Overall Editorial Vignette */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-28 sm:w-[calc(95*var(--u))] bg-gradient-to-r from-transparent via-black/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/45" />
        </div>

        {/* CENTER EDITORIAL DISPLAY HEADING + DIRECTLY UNDERNEATH PARAGRAPH & CTA */}
        <div
          data-reveal="up"
          className="relative z-10 w-full flex flex-col items-center justify-center text-center"
        >
          {/* Top Pill Eyebrow Badge with Flanking Hairlines */}
          <div className="inline-flex items-center gap-3 sm:gap-[calc(8*var(--u))] mb-3 sm:mb-[calc(8*var(--u))] select-none">
            <span className="h-[1px] w-7 sm:w-[calc(22*var(--u))] bg-gradient-to-r from-transparent to-[#FC5E2F]" />
            <span className="inline-flex items-center gap-2 sm:gap-[calc(4.5*var(--u))] rounded-full border border-white/20 bg-black/35 backdrop-blur-md px-3.5 py-1.5 sm:px-[calc(10*var(--u))] sm:py-[calc(3.2*var(--u))] text-[9px] sm:text-[calc(5.2*var(--u))] font-semibold uppercase tracking-[0.26em] text-white/95 shadow-sm">
              <span className="h-1.5 w-1.5 sm:h-[calc(3.2*var(--u))] sm:w-[calc(3.2*var(--u))] rounded-full bg-[#FC5E2F]" />
              ONGOING CARE &middot; CLINICAL CLUB
            </span>
            <span className="h-[1px] w-7 sm:w-[calc(22*var(--u))] bg-gradient-to-l from-transparent to-[#FC5E2F]" />
          </div>

          {/* Editorial Serif Display Heading matching remaining section headings */}
          <h2 className="font-editorial text-center select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] text-3xl sm:text-[calc(25*var(--u))] leading-[1.12] sm:leading-[calc(27.8*var(--u))] tracking-[-0.015em]">
            <span className="italic font-normal text-[#FC5E2F]">Soul Skin </span>
            <span className="font-normal text-[#F1EEE9]">Membership.</span>
          </h2>

          <div className="mt-4 sm:mt-[calc(11*var(--u))] w-full max-w-lg sm:max-w-[calc(330*var(--u))] mx-auto flex flex-col items-center">
            <p className="text-white/95 font-normal text-xs sm:text-[calc(7.3*var(--u))] leading-[1.62] tracking-[0.005em] drop-shadow-sm">
              Experience the perfect balance of clinical science and
              personalised care with priority booking, monthly skin treatments,
              and exclusive member savings crafted to hydrate, rejuvenate, and
              protect your skin, helping you reveal your most confident self.
            </p>

            <button
              type="button"
              onClick={() => openTreatmentModal(SIGNATURE_TREATMENT.id)}
              className="mt-4 sm:mt-[calc(11*var(--u))] inline-flex items-center justify-center rounded-full bg-[#FC5E2F] hover:bg-white text-white hover:text-[#1C1917] font-medium px-6 py-3 sm:px-[calc(16*var(--u))] sm:py-[calc(6*var(--u))] text-xs sm:text-[calc(6.7*var(--u))] gap-2.5 sm:gap-[calc(5.5*var(--u))] shadow-lg ring-1 ring-white/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore Membership Plans</span>
              <ArrowRight className="w-3 h-2.5 sm:w-[calc(7*var(--u))] sm:h-[calc(5.2*var(--u))]" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 8: FREQUENTLY ASKED QUESTIONS ================= */}
      <section
        id="faq"
        className="relative w-full overflow-hidden bg-[#F1EEE9] px-5 py-14 sm:px-[calc(40*var(--u))] sm:py-[calc(50*var(--u))]"
      >
        {/* Subtle Botanical Line-Art Illustration at Bottom-Left */}
        <svg
          viewBox="0 0 120 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 bottom-4 sm:bottom-[calc(16*var(--u))] w-20 sm:w-[calc(68*var(--u))] text-[#D8CFC3]"
        >
          <path
            d="M-5 205C18 165 38 115 48 45"
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <path
            d="M28 112C33 82 47 58 64 40C59 68 46 92 28 112Z"
            stroke="currentColor"
            strokeWidth="1.05"
          />
          <path
            d="M36 122C62 108 86 104 108 106C84 122 60 126 36 122Z"
            stroke="currentColor"
            strokeWidth="1.05"
          />
          <path
            d="M16 155C40 144 64 142 84 147C62 160 39 162 16 155Z"
            stroke="currentColor"
            strokeWidth="1.05"
          />
          <path
            d="M2 188C25 180 48 180 68 186C46 197 24 198 2 188Z"
            stroke="currentColor"
            strokeWidth="1.05"
          />
        </svg>

        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[calc(44*var(--u))]">
          {/* Left Column: FAQ Heading, Description & Contact Prompt */}
          <div
            data-reveal="left"
            className="w-full lg:w-[calc(230*var(--u))] shrink-0"
          >
            <p className="uppercase text-[#7A736B] font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.14em] leading-none">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2 className="font-editorial text-[#1C1917] font-normal text-4xl sm:text-[calc(28.5*var(--u))] leading-[1.06] tracking-[-0.015em] mt-3.5 sm:mt-[calc(11*var(--u))]">
              <span className="block">Questions,</span>
              <span className="block">answered.</span>
            </h2>

            <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.6*var(--u))] leading-[1.68] mt-4 sm:mt-[calc(13*var(--u))]">
              Here are some of the most common questions
              <br className="hidden sm:inline" /> we get about our treatments,
              membership
              <br className="hidden sm:inline" /> and what to expect.
            </p>

            <div className="flex items-center gap-3 sm:gap-[calc(8*var(--u))] mt-6 sm:mt-[calc(18*var(--u))] text-xs sm:text-[calc(6.2*var(--u))]">
              <span className="text-[#6E6860]">Still have questions?</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 sm:gap-[calc(4*var(--u))] text-[#1C1917] hover:text-[#FC5E2F] border-b border-[#6E6860] hover:border-[#FC5E2F] pb-0.5 transition-colors"
              >
                <span>Contact us</span>
                <ArrowRight className="w-2.5 h-2 sm:w-[calc(5.8*var(--u))] sm:h-[calc(4.4*var(--u))]" />
              </a>
            </div>
          </div>

          {/* Right Column: 6 Expandable Accordion Items */}
          <div
            data-reveal="right"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="w-full lg:w-[calc(355*var(--u))]"
          >
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className="border-b border-[#DFDBD2]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqIndex((prev) => (prev === idx ? null : idx))
                    }
                    aria-expanded={isOpen}
                    className={`group w-full flex items-center justify-between text-left gap-4 cursor-pointer transition-colors ${
                      idx === 0
                        ? "pb-4 sm:pb-[calc(14.5*var(--u))]"
                        : "py-4 sm:py-[calc(14.5*var(--u))]"
                    }`}
                  >
                    <span
                      className={`font-editorial font-normal text-base sm:text-[calc(9.5*var(--u))] leading-[1.3] tracking-[-0.005em] transition-colors ${
                        isOpen
                          ? "text-[#FC5E2F]"
                          : "text-[#1C1917] group-hover:text-[#FC5E2F]"
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`font-light text-lg sm:text-[calc(11*var(--u))] leading-none select-none shrink-0 transition-colors ${
                        isOpen
                          ? "text-[#FC5E2F]"
                          : "text-[#1C1917] group-hover:text-[#FC5E2F]"
                      }`}
                    >
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-[#6E6860] font-normal text-xs sm:text-[calc(6.4*var(--u))] leading-[1.68] pb-4 sm:pb-[calc(13*var(--u))] pr-6">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 9: BOOK AN APPOINTMENT BANNER ================= */}
      <section
        id="book"
        data-parallax="0.14"
        className="relative w-full overflow-hidden bg-[#221B15] sm:h-[calc(244*var(--u))] min-h-[340px] sm:min-h-0"
      >
        {/* Full-Bleed Portrait Banner Background (scroll parallax) */}
        <img
          src="/images/book-banner.jpg"
          alt="Close-up of radiant glowing skin"
          className="parallax-img absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
        />

        {/* Subtle Left Gradient on Small Screens for Text Contrast */}
        <div className="pointer-events-none absolute inset-0 bg-black/30 sm:bg-transparent" />

        {/* Left Content Overlay */}
        <div
          data-reveal="up"
          className="relative z-10 px-5 py-12 sm:p-0 sm:pl-[calc(42*var(--u))] sm:pt-[calc(54*var(--u))] max-w-xl sm:max-w-[calc(390*var(--u))]"
        >
          <p className="uppercase text-white/80 font-medium text-[10px] sm:text-[calc(5.5*var(--u))] tracking-[0.15em] leading-none">
            READY TO UNDERSTAND YOUR SKIN?
          </p>

          <h2 className="font-editorial text-white font-light text-3xl sm:text-[calc(28.5*var(--u))] leading-[1.1] tracking-[-0.015em] mt-3 sm:mt-[calc(9*var(--u))]">
            Book an Appointment
          </h2>

          <p className="text-white/85 font-normal text-xs sm:text-[calc(6.7*var(--u))] leading-[1.65] mt-3.5 sm:mt-[calc(10*var(--u))]">
            Take the first step towards healthier, clearer,
            <br className="hidden sm:inline" /> more confident skin. We&apos;re
            here to help.
          </p>

          <button
            type="button"
            onClick={() => openTreatmentModal(SIGNATURE_TREATMENT.id)}
            className="inline-flex items-center justify-center rounded-full bg-[#F1EEE9] hover:bg-[#FC5E2F] text-[#1C1917] hover:text-white font-normal transition-all duration-300 hover:scale-[1.01] px-6 py-3 text-xs sm:w-[calc(138*var(--u))] sm:h-[calc(30*var(--u))] sm:px-0 sm:py-0 sm:text-[calc(6.4*var(--u))] gap-2.5 sm:gap-[calc(6*var(--u))] mt-6 sm:mt-[calc(17*var(--u))] shadow-xs cursor-pointer"
          >
            <span>Book an Appointment</span>
            <ArrowRight className="w-3 h-2.5 sm:w-[calc(6.8*var(--u))] sm:h-[calc(5*var(--u))]" />
          </button>
        </div>
      </section>

      {/* ================= SECTION 10: FOOTER ================= */}
      <footer
        id="contact"
        className="w-full bg-[#221B15] text-white border-t border-white/10 px-5 py-10 sm:px-[calc(40*var(--u))] sm:py-[calc(18*var(--u))]"
      >
        <div
          data-reveal="up"
          className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0"
        >
          {/* Left / Middle Column (Brand + Nav Links on Top, Divider, Copyright on Bottom) */}
          <div className="w-full lg:w-[calc(430*var(--u))] lg:pr-[calc(28*var(--u))] lg:border-r lg:border-white/15 flex flex-col justify-between py-1 lg:py-[calc(4*var(--u))]">
            {/* Top Row: Brand Logo Left + Navigation Links Right */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 pb-5 lg:pb-[calc(15*var(--u))] border-b border-white/15">
              <a
                href="#home"
                className="flex items-center group"
                aria-label="Soul Skin & Laser Home"
              >
                <img
                  src="/images/logo-white.png"
                  alt="Soul Skin & Laser"
                  className="h-9 sm:h-[calc(19*var(--u))] w-auto object-contain transition-opacity group-hover:opacity-85"
                />
              </a>

              <nav
                aria-label="Footer Navigation"
                className="flex items-center gap-5 sm:gap-[calc(18*var(--u))] text-xs sm:text-[calc(5.8*var(--u))] text-white/80"
              >
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
                <a
                  href="#approach"
                  className="hover:text-white transition-colors"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Bottom Row: Copyright */}
            <p className="text-white/55 text-[11px] sm:text-[calc(5.3*var(--u))] pt-4 sm:pt-[calc(11*var(--u))]">
              &copy; 2025 Soul Skin &amp; Laser. All rights reserved.
            </p>
          </div>

          {/* Right Column: Contact Details + Social Icons & Legal Links */}
          <div className="w-full lg:flex-1 lg:pl-[calc(26*var(--u))] flex flex-col sm:flex-row items-stretch justify-between gap-6 py-1 lg:py-[calc(4*var(--u))]">
            {/* Contact Info List (Phone, Email, Location) */}
            <div className="flex flex-col justify-between gap-2.5 sm:gap-[calc(6*var(--u))] text-xs sm:text-[calc(5.8*var(--u))] text-white/85">
              <a
                href="tel:0406541628"
                className="inline-flex items-center gap-2.5 sm:gap-[calc(7*var(--u))] hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-[calc(6*var(--u))] sm:h-[calc(6*var(--u))] text-white/75 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M3.1 1.8C3.5 1.8 3.9 2.1 4.1 2.5L4.8 4.2C4.9 4.5 4.8 4.9 4.6 5.2L3.6 6.1C4.3 7.5 5.5 8.7 6.9 9.4L7.8 8.4C8.1 8.2 8.5 8.1 8.8 8.2L10.5 8.9C10.9 9.1 11.2 9.5 11.2 9.9V11.3C11.2 11.8 10.8 12.2 10.3 12.2C5.6 12.2 1.8 8.4 1.8 3.7C1.8 3.2 2.2 1.8 3.1 1.8Z" />
                </svg>
                <span>0406 541 628</span>
              </a>

              <a
                href="mailto:hello@soulskinandlaser.com"
                className="inline-flex items-center gap-2.5 sm:gap-[calc(7*var(--u))] hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="w-3 h-3 sm:w-[calc(6*var(--u))] sm:h-[calc(6*var(--u))] text-white/75 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="1.5" y="3" width="11" height="8" rx="1.2" />
                  <path d="M2 3.8L7 7.4L12 3.8" />
                </svg>
                <span>hello@soulskinandlaser.com</span>
              </a>

              <div className="inline-flex items-center gap-2.5 sm:gap-[calc(7*var(--u))]">
                <svg
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-[calc(6*var(--u))] sm:h-[calc(6*var(--u))] text-white/75 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M7 1.5C4.65 1.5 2.75 3.4 2.75 5.75C2.75 8.9 7 12.5 7 12.5C7 12.5 11.25 8.9 11.25 5.75C11.25 3.4 9.35 1.5 7 1.5ZM7 7.3C6.14 7.3 5.45 6.61 5.45 5.75C5.45 4.89 6.14 4.2 7 4.2C7.86 4.2 8.55 4.89 8.55 5.75C8.55 6.61 7.86 7.3 7 7.3Z" />
                </svg>
                <span>Brisbane, QLD</span>
              </div>
            </div>

            {/* Social Icons Top-Right + Privacy/Terms Bottom-Right */}
            <div className="flex flex-col items-end justify-between">
              <div className="flex items-center gap-3 sm:gap-[calc(7.5*var(--u))]">
                {/* Instagram Icon */}
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="text-white/85 hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.35"
                    className="w-4 h-4 sm:w-[calc(9*var(--u))] sm:h-[calc(9*var(--u))]"
                  >
                    <rect x="2.2" y="2.2" width="11.6" height="11.6" rx="3.2" />
                    <circle cx="8" cy="8" r="2.6" />
                    <circle
                      cx="11.3"
                      cy="4.7"
                      r="0.6"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                {/* Facebook Icon */}
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="text-white/85 hover:text-white transition-colors"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 sm:w-[calc(9*var(--u))] sm:h-[calc(9*var(--u))]"
                  >
                    <path d="M14 8C14 4.69 11.31 2 8 2C4.69 2 2 4.69 2 8C2 10.99 4.19 13.47 7.06 13.93V9.73H5.54V8H7.06V6.68C7.06 5.18 7.95 4.35 9.32 4.35C9.98 4.35 10.67 4.47 10.67 4.47V5.95H9.91C9.16 5.95 8.94 6.41 8.94 6.89V8H10.6L10.33 9.73H8.94V13.93C11.81 13.47 14 10.99 14 8Z" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-[calc(10*var(--u))] text-[11px] sm:text-[calc(5.3*var(--u))] text-white/55 pt-4 sm:pt-0">
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL (STEP 1: TREATMENTS SHOWCASE -> STEP 2: TREATMENT DETAILS) ================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            activeTreatment
              ? `${activeTreatment.title} Details`
              : `${activeConcern.title} Treatments`
          }
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-7"
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-[#14110E]/75 backdrop-blur-[3px] transition-opacity"
          />

          {/* STEP 1 VIEW: THE SPLIT TREATMENTS SHOWCASE */}
          {!activeTreatment ? (
            <div className="relative z-10 w-full max-w-[1060px] max-h-[92vh] overflow-y-auto bg-[#F1EEE9] text-[#1C1917] shadow-2xl border border-[#DFDBD2] p-4 sm:p-6 md:p-8">
              {/* Top Header Bar: Concern Title, Target Modality & Close Button */}
              <div className="flex flex-col gap-3 pb-4 mb-5 border-b border-[#E2DED5]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#FC5E2F] text-white text-[11px] font-semibold w-6 h-6 shadow-xs">
                      {activeConcern.number}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-2xl text-[#1C1917] font-normal">
                      {activeConcern.title}
                    </h3>
                    <span className="hidden sm:inline text-[#C5BFB5] mx-1">|</span>
                    <span className="text-xs text-[#7A736B]">
                      Primary Target Modality:{" "}
                      <strong className="text-[#1C1917] font-semibold">
                        {activeConcern.topLabel}
                      </strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-[#E4DFD5] text-[#4A453E] hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Concern Switcher Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                  {SKIN_CONCERN_CARDS.map((c, idx) => {
                    const isSelected = selectedConcernIndex === idx;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setSelectedConcernIndex(idx);
                          setSelectedTreatmentId(null);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1C1917] text-white shadow-xs"
                            : "bg-[#E5E1D7] text-[#5E5850] hover:bg-[#DDD8CD] hover:text-[#1C1917]"
                        }`}
                      >
                        <span className="opacity-70 text-[10px]">{c.number}</span>
                        <span>{c.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Split Layout */}
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-5">
                {/* Left Featured Treatment Card: DYNAMICALLY matching activeConcern.featuredTreatmentId! */}
                {(() => {
                  const featuredTreatment =
                    ALL_TREATMENTS.find(
                      (t) => t.id === activeConcern.featuredTreatmentId
                    ) ?? SIGNATURE_TREATMENT;
                  return (
                    <button
                      type="button"
                      onClick={() => setSelectedTreatmentId(featuredTreatment.id)}
                      className="group relative text-left overflow-hidden bg-[#3B281B] w-full md:w-[56.5%] min-h-[300px] md:min-h-[380px] shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F] border border-[#DDD8CD]"
                    >
                      <img
                        src={featuredTreatment.detailImage || featuredTreatment.image}
                        alt={featuredTreatment.alt}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                      {/* Top-Left Tag: PRIMARY RECOMMENDED PROTOCOL */}
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FC5E2F] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          Recommended for {activeConcern.title}
                        </span>
                      </div>

                      {/* Bottom-left Overlay Text */}
                      <div className="absolute left-5 bottom-6 sm:left-7 sm:bottom-8 right-5">
                        <p className="uppercase text-white/80 font-medium text-[10px] sm:text-[11px] tracking-[0.16em] leading-none">
                          {featuredTreatment.eyebrow}
                        </p>
                        <h3 className="font-editorial text-white font-normal text-3xl sm:text-[38px] leading-[1.06] mt-2.5 tracking-[-0.015em]">
                          {featuredTreatment.title}
                        </h3>
                        <p className="text-white/85 font-normal text-xs sm:text-[13px] leading-[1.6] mt-2.5 max-w-md">
                          {featuredTreatment.shortTagline[0]}{" "}
                          {featuredTreatment.shortTagline[1]}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-4">
                          {featuredTreatment.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-white/40 bg-black/30 px-2.5 py-1 text-[9px] uppercase tracking-wider text-white/95"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between">
                          <span className="text-white/90 text-xs font-editorial">
                            {featuredTreatment.specs.price} &middot;{" "}
                            {featuredTreatment.specs.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-[#FC5E2F] transition-colors">
                            <span>View Full Clinical Protocol</span>
                            <ArrowRight className="w-3 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })()}

                {/* Right Stack of Complementary/Alternative Treatment Cards */}
                {(() => {
                  const featuredTreatment =
                    ALL_TREATMENTS.find(
                      (t) => t.id === activeConcern.featuredTreatmentId
                    ) ?? SIGNATURE_TREATMENT;
                  const otherTreatments = ALL_TREATMENTS.filter(
                    (t) => t.id !== featuredTreatment.id
                  );
                  return (
                    <div className="flex flex-col justify-start w-full md:flex-1 gap-1.5 sm:gap-2">
                      <div className="pb-1 border-b border-[#E2DED5]">
                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#7A736B] font-medium">
                          Alternative &amp; Complementary Modalities
                        </p>
                      </div>

                      {otherTreatments.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedTreatmentId(item.id)}
                          className="group flex items-center text-left w-full bg-[#EBE8E1] hover:bg-[#E4DFD4] transition-colors p-2 sm:p-2.5 min-h-[76px] sm:min-h-[82px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5E2F] border border-[#DDD8CD]"
                        >
                          {/* Thumbnail */}
                          <div className="relative overflow-hidden shrink-0 w-24 h-16 sm:w-28 sm:h-[72px] bg-[#C8A892]">
                            <img
                              src={item.image}
                              alt={item.alt}
                              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Text Content */}
                          <div className="flex flex-col justify-center pl-3 sm:pl-3.5 pr-2 flex-1 min-w-0">
                            <h4 className="font-editorial text-[#1E1B18] font-normal text-sm sm:text-[16px] leading-[1.2] tracking-[-0.01em] group-hover:text-[#FC5E2F] transition-colors">
                              {item.title}
                            </h4>

                            <p className="text-[#7E7870] font-normal text-[10.5px] sm:text-[11px] leading-tight mt-0.5 tracking-[0.01em] truncate">
                              {item.tags.join(" · ")}
                            </p>

                            <div className="flex items-center justify-between mt-1.5">
                              <span className="text-[11px] text-[#6E6860] font-editorial">
                                {item.specs.price}
                              </span>
                              <span className="inline-flex items-center font-medium text-[11px] sm:text-xs text-[#2B2724] group-hover:text-[#FC5E2F] gap-1 transition-colors">
                                <span>Learn More</span>
                                <ArrowRight className="w-2.5 h-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            /* STEP 2 VIEW: FULL-BLEED SPLIT TREATMENT DETAILS MODAL */
            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1080px] max-h-[92vh] overflow-y-auto md:overflow-hidden bg-[#F2EFE9] text-[#1C1917] shadow-2xl border border-[#D8D2C7]">
              {/* Left 40% Full-Bleed Portrait Image Panel */}
              <div className="relative w-full md:w-[40%] min-h-[250px] sm:min-h-[320px] md:min-h-[600px] lg:min-h-[660px] shrink-0 overflow-hidden bg-[#2C2117]">
                <img
                  src={activeTreatment.detailImage || activeTreatment.image}
                  alt={activeTreatment.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                {/* Subtle Top & Bottom Vignette for Legibility */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Top-Left: "<- Back to Treatments" Button */}
                <button
                  type="button"
                  onClick={() => setSelectedTreatmentId(null)}
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-xs px-3 py-1.5 sm:px-3.5 text-white/95 hover:text-white hover:bg-black/65 transition-all cursor-pointer border border-white/20 text-xs sm:text-sm"
                >
                  <ArrowLeft className="w-3.5 h-2.5" />
                  <span className="font-editorial tracking-[-0.01em]">
                    Back to Treatments
                  </span>
                </button>

                {/* Bottom-Left: Eyebrow, Large Serif Title, Tagline & Pill Badges */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 z-10">
                  <p className="uppercase text-white/80 font-medium text-[9px] sm:text-[10px] tracking-[0.16em]">
                    {activeTreatment.eyebrow}
                  </p>

                  <h3 className="font-editorial text-white font-normal text-2xl sm:text-3xl md:text-[40px] leading-[1.08] tracking-[-0.015em] mt-1.5 sm:mt-2.5">
                    <span className="block">{activeTreatment.titleLines[0]}</span>
                    <span className="block">{activeTreatment.titleLines[1]}</span>
                  </h3>

                  <p className="text-white/85 text-[11px] sm:text-[13px] leading-[1.5] mt-2 sm:mt-3 max-w-[320px]">
                    {activeTreatment.shortTagline[0]}
                    <br />
                    {activeTreatment.shortTagline[1]}
                  </p>

                  {/* Outline Pill Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {activeTreatment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center justify-center rounded-full border border-white/35 bg-black/30 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-white/95 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right 60% Editorial Clinical Breakdown Panel */}
              <div className="relative flex flex-col justify-between w-full md:w-[60%] md:max-h-[92vh] md:overflow-y-auto bg-[#F2EFE9] p-4 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
                {/* Top Bar with Context Pill and Close Button */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCD6CC] mb-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E4DFD5] text-[10px] font-semibold tracking-wider uppercase text-[#4A453E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FC5E2F]" />
                      Targeting: {activeConcern.title}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#E4DFD5] text-[#5A534A] hover:text-[#1C1917] transition-colors cursor-pointer"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  {/* 1. TREATMENT OVERVIEW & SCIENCE */}
                  <p className="uppercase text-[#7A736A] font-medium text-[10px] tracking-[0.16em]">
                    TREATMENT OVERVIEW &amp; SCIENCE
                  </p>

                  <h2 className="font-editorial text-[#1C1917] font-normal text-xl sm:text-[28px] lg:text-[32px] leading-[1.18] tracking-[-0.015em] mt-2 pr-2">
                    {activeTreatment.headline}
                  </h2>

                  <p className="text-[#4E4942] text-xs sm:text-[13px] leading-[1.68] mt-3">
                    {activeTreatment.description}
                  </p>

                  {/* 2. KEY CLINICAL BENEFITS */}
                  <div className="mt-6 sm:mt-7">
                    <p className="uppercase text-[#7A736A] font-medium text-[10px] tracking-[0.16em]">
                      KEY CLINICAL BENEFITS
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 mt-3.5">
                      {activeTreatment.keyBenefits.map((benefit, idx) => (
                        <div
                          key={benefit.text}
                          className={`flex flex-col ${
                            idx < activeTreatment.keyBenefits.length - 1
                              ? "sm:border-r sm:border-[#DDD6C8]"
                              : ""
                          } ${idx > 0 ? "sm:pl-4" : ""} ${
                            idx < activeTreatment.keyBenefits.length - 1
                              ? "sm:pr-3.5"
                              : ""
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full border border-[#DDD6C8] bg-transparent flex items-center justify-center text-[#2C2520] mb-3">
                            <BenefitIcon type={benefit.icon} />
                          </div>
                          <p className="text-[#2C2520] text-xs sm:text-[12.5px] leading-[1.4] font-normal">
                            {benefit.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. WHAT TO EXPECT IN CLINIC */}
                  <div className="mt-6 sm:mt-7">
                    <p className="uppercase text-[#7A736A] font-medium text-[10px] tracking-[0.16em]">
                      WHAT TO EXPECT IN CLINIC
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 mt-3">
                      {activeTreatment.steps.map((s, idx) => (
                        <div
                          key={s.step}
                          className={`flex flex-col ${
                            idx < activeTreatment.steps.length - 1
                              ? "sm:border-r sm:border-[#DCD6CC]"
                              : ""
                          } ${idx > 0 ? "sm:pl-4" : ""} ${
                            idx < activeTreatment.steps.length - 1
                              ? "sm:pr-3"
                              : ""
                          }`}
                        >
                          <span className="text-[#7A736A] text-[11px] font-semibold">
                            {s.step}
                          </span>
                          <h4 className="font-editorial text-[#1C1917] font-normal text-sm sm:text-[15px] leading-[1.25] mt-1">
                            {s.title}
                          </h4>
                          <p className="text-[#655F57] text-[11px] sm:text-[11.5px] leading-[1.55] mt-1.5">
                            {s.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. BOTTOM SPECS & CTA FOOTER BAR */}
                <div className="mt-6 pt-5 border-t border-[#DCD6CC] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 flex-1">
                    {/* Duration */}
                    <div className="sm:border-r sm:border-[#DCD6CC] sm:pr-3">
                      <p className="uppercase text-[#7A736A] text-[9px] tracking-[0.13em] font-medium">
                        DURATION
                      </p>
                      <p className="font-editorial text-[#1C1917] text-[13.5px] leading-snug mt-1">
                        {activeTreatment.specs.duration}
                      </p>
                    </div>

                    {/* Recovery */}
                    <div className="sm:border-r sm:border-[#DCD6CC] sm:px-3">
                      <p className="uppercase text-[#7A736A] text-[9px] tracking-[0.13em] font-medium">
                        RECOVERY
                      </p>
                      <p className="font-editorial text-[#1C1917] text-[13.5px] leading-snug mt-1">
                        {activeTreatment.specs.recoveryLine1}
                      </p>
                      {activeTreatment.specs.recoveryLine2 && (
                        <p className="text-[#6E6860] text-[11px] leading-tight mt-0.5">
                          {activeTreatment.specs.recoveryLine2}
                        </p>
                      )}
                    </div>

                    {/* Recommended Plan */}
                    <div className="sm:border-r sm:border-[#DCD6CC] sm:px-3">
                      <p className="uppercase text-[#7A736A] text-[9px] tracking-[0.13em] font-medium">
                        RECOMMENDED PLAN
                      </p>
                      <p className="font-editorial text-[#1C1917] text-[13.5px] leading-snug mt-1">
                        {activeTreatment.specs.planLine1}
                      </p>
                      {activeTreatment.specs.planLine2 && (
                        <p className="text-[#6E6860] text-[11px] leading-tight mt-0.5">
                          {activeTreatment.specs.planLine2}
                        </p>
                      )}
                    </div>

                    {/* Investment */}
                    <div className="sm:pl-3">
                      <p className="uppercase text-[#7A736A] text-[9px] tracking-[0.13em] font-medium">
                        INVESTMENT
                      </p>
                      <p className="font-editorial text-[#1C1917] text-[13.5px] leading-snug mt-1 font-semibold text-[#FC5E2F]">
                        {activeTreatment.specs.price}
                      </p>
                    </div>
                  </div>

                  {/* Book an Appointment CTA */}
                  <a
                    href="#book"
                    onClick={closeModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#1C1917] hover:bg-[#FC5E2F] text-white text-xs px-6 py-3.5 gap-2.5 shrink-0 transition-colors shadow-xs"
                  >
                    <span className="font-editorial tracking-[-0.01em] text-[13px]">
                      Book an Appointment
                    </span>
                    <ArrowRight className="w-3 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
