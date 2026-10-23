export const DEFAULT_GLOBAL = {
  logo: "MANOSETHU",
  logoUrl: "/logos/manosethu-logo.svg",
  longLogoUrl: "/logos/manosethu-logo.svg",
  favicon: "/logos/manosethu-mark.svg",
  theme: {
    primaryColor: "#173B63",
    accentColor: "#2B9C91",
    backgroundColor: "#F6F7F5",
    foregroundColor: "#12263A",
  },
  fonts: {
    primaryFont: "Figtree",
    displayFont: "Figtree",
  },
  meta: {
    defaultTitle: "MANOSETHU — Understanding Distress Before It Becomes a Crisis",
    defaultDescription:
      "ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.",
  },
  analytics: "",
  navbar: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Platform", href: "/services" },
    { label: "Solutions", href: "/products" },
    { label: "Impact", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    copyright: "© 2026 MANOSETHU. All rights reserved. Dedicated to dignity, privacy and human-centered support.",
    madeByText: "MANOSETHU WELLBEING INITIATIVE",
    madeByUrl: "/",
    madeByLogoUrl: "/logos/manosethu-mark.svg",
    socialLinks: [
      { platform: "Twitter", url: "#" },
      { platform: "Linkedin", url: "#" },
      { platform: "Github", url: "#" },
    ],
    contactDetails: {
      email: "support@manosethu.org",
      phone: "+91 1800 599 0019",
      address: "ManoSethu Digital Health & Welfare Initiative, New Delhi, India",
    },
  },
};

export const DEFAULT_HOME = {
  seo: {
    title: "MANOSETHU — Understanding Distress Before It Becomes a Crisis",
    description:
      "ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        headline: "Understanding distress before it becomes a crisis.",
        subheadline:
          "ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.",
        ctaText: "Get Started",
        ctaUrl: "/system",
        secondaryCtaText: "How It Works",
        secondaryCtaUrl: "#system",
      },
    },
  ],
};

export const DEFAULT_ABOUT = {
  seo: {
    title: "About — MANOSETHU",
    description:
      "ManoSethu is an intelligent, privacy-conscious platform for continuous emotional wellbeing monitoring, distress assessment, early risk identification and human-centred support.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        eyebrow: "Our Purpose & Values",
        headline: "A digital bridge connecting emotional distress with timely human care.",
        description:
          "ManoSethu was founded on a simple conviction: support should reach people before crisis. By combining trauma-informed digital check-ins, deterministic distress indicators, and dedicated human caseworkers, we make psychological well-being visible throughout vulnerable journeys.",
        badge: "Human-in-the-Loop Architecture",
      },
    },
    {
      id: "mission",
      type: "grid",
      active: true,
      order: 1,
      content: {
        eyebrow: "Guiding Principles",
        headline: "Engineered around dignity, transparency, and human judgement.",
        items: [
          {
            title: "Safety & Dignity",
            desc: "Every interaction is non-judgmental, gentle, and respectful of the person's emotional state.",
            icon: "Shield",
          },
          {
            title: "Human Oversight",
            desc: "AI assists with pattern identification. Certified caseworkers and psychologists make every care decision.",
            icon: "Users",
          },
          {
            title: "Privacy First",
            desc: "Decoupled identifiers, strict consent controls, and full adherence to statutory data protection standards.",
            icon: "Lock",
          },
          {
            title: "Longitudinal Continuity",
            desc: "We track trends against an individual's personal baseline rather than applying generic population assumptions.",
            icon: "TrendingUp",
          },
        ],
      },
    },
  ],
};

export const DEFAULT_SERVICES = {
  seo: {
    title: "Platform Capabilities — MANOSETHU",
    description:
      "Explore the core capabilities of ManoSethu: multimodal check-ins, dynamic distress scoring, longitudinal tracking, and caseworker decision support.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        eyebrow: "Platform Capabilities",
        headline: "Comprehensive capabilities for continuous psychological safety.",
        description:
          "From low-barrier daily check-ins to multi-tier administrative oversight, ManoSethu bridges the critical gap between episodic procedural milestones.",
      },
    },
    {
      id: "capabilities",
      type: "grid",
      active: true,
      order: 1,
      content: {
        headline: "End-to-End Decision Support",
        items: [
          {
            title: "Multimodal Check-ins",
            desc: "Gathers text reflections, voice notes, and structured wellness questions via web, mobile, IVRS, and SMS.",
            icon: "Mic",
          },
          {
            title: "Deterministic Distress Engine",
            desc: "Computes a calibrated Dynamic Distress Score (0–100) combining emotional, safety, and acoustic markers.",
            icon: "Activity",
          },
          {
            title: "Longitudinal Trend Modeling",
            desc: "Identifies whether emotional state is improving, stable, or accelerating toward elevated distress over time.",
            icon: "TrendingUp",
          },
          {
            title: "Explainable Risk Alerts",
            desc: "Provides clear feature attribution so caseworkers understand exactly why a case was flagged for review.",
            icon: "AlertCircle",
          },
          {
            title: "Human Caseworker Console",
            desc: "Prioritizes caseloads dynamically, enabling timely welfare calls, counselling scheduling, and safety audits.",
            icon: "HeartHandshake",
          },
          {
            title: "Crisis Intervention Routing",
            desc: "Immediate, calm access to national helpline services and local crisis lines whenever acute distress is flagged.",
            icon: "PhoneCall",
          },
        ],
      },
    },
  ],
};

export const DEFAULT_PRODUCTS = {
  seo: {
    title: "Solutions Suite — MANOSETHU",
    description:
      "The ManoSethu Platform Suite: Citizen Wellbeing Companion, Clinical Support Console, Multi-channel Communication Gateway, and Governance Analytics.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        eyebrow: "ManoSethu Suite",
        headline: "Modular solutions built for individuals, counsellors, and institutions.",
        description:
          "Designed to operate seamlessly across high-connectivity urban environments and low-bandwidth rural settings.",
        ctaText: "Access Platform",
        ctaUrl: "/system",
      },
    },
    {
      id: "showcase",
      type: "showcase",
      active: true,
      order: 1,
      content: {
        titlePrefix: "Intelligent tools for ",
        titleItalic: "continuous care",
        titleSuffix: " across stages.",
        list: [
          {
            t: "Citizen Companion",
            d: "Gentle, non-stigmatizing check-in application providing periodic mood assessments, voice notes, and direct crisis helpline routing.",
            c: "Individual Care",
            s: "Active Deployment",
            icon: "HeartHandshake",
            url: "/system",
            imageUrl: "/images/editorial/journey_landscape.jpg",
          },
          {
            t: "Caseworker Triage Console",
            d: "Clinical decision-support interface prioritizing high-risk cases with longitudinal trend visualization and explainable alert attributions.",
            c: "Clinical Decision Support",
            s: "Operational",
            icon: "LayoutDashboard",
            url: "/system",
            imageUrl: "/images/editorial/system_diagram.jpg",
          },
          {
            t: "Multi-Channel Gateway",
            d: "Automated IVRS voice calls and two-way SMS check-in dispatcher ensuring continuity for beneficiaries without smartphones.",
            c: "Civic Reachability",
            s: "Live Gateway",
            icon: "Radio",
            url: "/system",
            imageUrl: "/images/editorial/oversight_hands.jpg",
          },
          {
            t: "Longitudinal Analytics Engine",
            d: "Dynamic distress score calculation (0–100), risk slope evaluation, and district-level welfare intervention tracking.",
            c: "Governance & Ethics",
            s: "Core Engine",
            icon: "Activity",
            url: "/system",
            imageUrl: "/images/editorial/ending_calm.jpg",
          },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      active: true,
      order: 2,
      content: {
        headline: "Experience the complete ManoSethu platform.",
        ctaText: "Launch System",
        ctaUrl: "/system",
      },
    },
  ],
};

export const DEFAULT_PORTFOLIO = {
  seo: {
    title: "Deployment & Impact — MANOSETHU",
    description:
      "Real-world deployment scenarios and impact frameworks demonstrating how ManoSethu provides continuity of emotional care.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        eyebrow: "Deployment & Impact",
        headline: "Transforming episodic relief into continuous emotional care.",
        description:
          "Explore how ManoSethu bridges procedural delays, reduces trial attrition, and ensures vulnerable individuals receive proactive human support.",
      },
    },
    {
      id: "projects",
      type: "projects",
      active: true,
      order: 1,
      content: {
        filters: ["All", "Investigation", "Trial", "Rehabilitation", "Helpline"],
        list: [
          {
            t: "Investigation Stage Welfare Monitoring",
            c: "Investigation",
            d: "Continuous check-in support during the critical first 30 days post-complaint to detect early threats and intimidation before crisis points.",
            s: "94% engagement rate across 12 pilot districts",
            url: "/system",
            imageUrl: "/images/editorial/journey_landscape.jpg",
          },
          {
            t: "Trial Pre-Hearing De-Escalation",
            c: "Trial",
            d: "Predictive distress velocity modeling identifies anxiety surges 7–14 days prior to courtroom testimony, initiating proactive caseworker outreach.",
            s: "42% reduction in severe pre-trial distress spikes",
            url: "/system",
            imageUrl: "/images/editorial/system_diagram.jpg",
          },
          {
            t: "Long-Term Rehabilitation & Reintegration",
            c: "Rehabilitation",
            d: "Longitudinal monitoring across 6–12 months of community re-entry to track social recovery and connect with livelihood assistance.",
            s: "Sustained baseline stability for 85+ beneficiaries",
            url: "/system",
            imageUrl: "/images/editorial/ending_calm.jpg",
          },
          {
            t: "Integrated Helpline Decision Support",
            c: "Helpline",
            d: "Two-way IVRS and SMS gateway providing automated outreach for rural complainants without high-speed internet access.",
            s: "Zero app installation required for low-bandwidth zones",
            url: "/system",
            imageUrl: "/images/editorial/oversight_hands.jpg",
          },
        ],
      },
    },
    {
      id: "cta",
      type: "cta",
      active: true,
      order: 2,
      content: {
        headline: "Learn more about implementing ManoSethu in your district.",
        ctaText: "Contact Support Desk",
        ctaUrl: "/contact",
      },
    },
  ],
};

export const DEFAULT_CONTACT = {
  seo: {
    title: "Contact & Support — MANOSETHU",
    description:
      "Get in touch with the ManoSethu team for technical support, deployment inquiries, or caseworker access.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      active: true,
      order: 0,
      content: {
        eyebrow: "Get in Touch",
        headline: "Connect with the ManoSethu support team.",
        description:
          "We are available to assist welfare departments, district mental health programs, and certified caseworkers.",
        email: "support@manosethu.org",
        phone: "+91 1800 599 0019",
        address: "ManoSethu Digital Health & Welfare Initiative, New Delhi, India",
      },
    },
  ],
};
