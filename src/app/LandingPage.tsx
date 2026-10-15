import { FormEvent, ReactNode, useEffect, useState } from "react";

type IconName =
  | "arrow"
  | "audit"
  | "brain"
  | "briefcase"
  | "building"
  | "chart"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "education"
  | "health"
  | "linkedin"
  | "manufacturing"
  | "menu"
  | "moon"
  | "retail"
  | "search"
  | "shield"
  | "spark"
  | "sun"
  | "target"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    audit: <><path d="M9 11.5 11 14l4-5" /><path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M9 3v3h6V3" /></>,
    brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6v1.5a3.5 3.5 0 0 0 0 6V15a3 3 0 0 0 5.5 1.5" /><path d="M14.5 4.5A3 3 0 0 1 20 6v1.5a3.5 3.5 0 0 1 0 6V15a3 3 0 0 1-5.5 1.5M12 3v18M8 9h4M12 15h4" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    building: <><path d="M4 21V5l8-3v19M12 8h8v13M8 7v.01M8 11v.01M8 15v.01M16 12v.01M16 16v.01M2 21h20" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    document: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    education: <><path d="m3 9 9-5 9 5-9 5z" /><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6" /></>,
    health: <><path d="M8 3h8v6h5v8h-5v5H8v-5H3V9h5z" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4" /></>,
    manufacturing: <><path d="M3 21V9l6 3V9l6 3V5h6v16z" /><path d="M7 17h2M12 17h2M17 17h2" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    retail: <><path d="M4 9h16l-1 12H5zM7 9a5 5 0 0 1 10 0" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.5 9.3 8 11 4.5-1.7 8-6 8-11V5z" /><path d="m9 12 2 2 4-5" /></>,
    spark: <><path d="m12 3 1.4 4.1L17 9l-3.6 1.9L12 15l-1.4-4.1L7 9l3.6-1.9z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    x: <><path d="M6 6l12 12M18 6 6 18" /></>,
  };

  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">{paths[name]}</g>
    </svg>
  );
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="BRTNeura home">
      <img src="/brtneura-logo.png" alt="BRTNeura" />
    </a>
  );
}

function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const className = `button button-${variant}`;
  if (href) return <a className={className} href={href} onClick={onClick}>{children}</a>;
  return <button className={className} type={type} onClick={onClick}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text, centered = false }: { eyebrow?: string; title: string; text?: string; centered?: boolean }) {
  return (
    <div className={`section-title ${centered ? "centered" : ""}`}>
      {eyebrow && <div className="eyebrow"><span />{eyebrow}</div>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

const auditCards = [
  { icon: "search" as IconName, number: "01", title: "Analyse", text: "Understand existing workflows and identify operational inefficiencies.", detail: "We map how work moves through your business today, including the people, systems, handoffs, and repetitive tasks behind each critical process.", points: ["Current workflow mapping", "Bottleneck and delay detection", "Technology and data review", "AI readiness baseline"], result: "A clear current-state view of where time, cost, and team capacity are being lost." },
  { icon: "target" as IconName, number: "02", title: "Identify", text: "Discover automation opportunities and high-impact AI applications.", detail: "We connect operational challenges to realistic AI opportunities, then evaluate each one for business impact, feasibility, effort, and risk.", points: ["AI use-case portfolio", "Value and feasibility scoring", "Potential savings estimate", "Risk and dependency review"], result: "A prioritised portfolio of realistic opportunities—not a list of generic AI ideas." },
  { icon: "document" as IconName, number: "03", title: "Recommend", text: "Receive practical recommendations and an actionable roadmap.", detail: "We turn the strongest opportunities into an independent, prioritised plan your leadership and delivery teams can confidently act on.", points: ["Priority implementation matrix", "Vendor-independent tool direction", "Ownership and milestone plan", "Practical 90-day roadmap"], result: "A decision-ready roadmap that tells your team what to do first, why it matters, and what success looks like." },
];

const industries = [
  { icon: "education" as IconName, title: "Education", text: "Automated grading, attendance, reporting, and student performance analysis.", tag: "Smarter operations", detail: "Reduce administrative pressure and give educators clearer, faster access to the information they need to support students.", points: ["Admissions and enquiry automation", "Attendance and grading workflows", "Student support and reminders", "Performance trend analysis"], result: "More educator time, more consistent administration, and earlier visibility into student needs." },
  { icon: "health" as IconName, title: "Healthcare", text: "Appointment scheduling, patient follow-ups, and documentation automation.", tag: "Better care delivery", detail: "Explore responsible automation that improves patient communication and operational coordination without compromising human oversight.", points: ["Appointment and reminder workflows", "Patient follow-up automation", "Documentation support", "Capacity and handoff visibility"], result: "Faster patient response, reduced administrative load, and more reliable care coordination." },
  { icon: "manufacturing" as IconName, title: "Manufacturing", text: "Quality control, inventory tracking, and predictive scheduling.", tag: "Efficient production", detail: "Turn production, quality, inventory, and equipment data into stronger operational decisions and fewer avoidable delays.", points: ["Quality and defect intelligence", "Inventory demand visibility", "Predictive maintenance support", "Production scheduling insights"], result: "Better production visibility, fewer manual reporting hours, and more proactive operational planning." },
  { icon: "retail" as IconName, title: "Retail & Services", text: "Customer support, lead management, and inventory automation.", tag: "Stronger experiences", detail: "Create faster customer experiences while giving commercial teams more time to focus on valuable conversations and decisions.", points: ["Customer support automation", "Lead qualification and follow-up", "Inventory and demand insight", "Automated performance reporting"], result: "Faster response times, stronger lead coverage, and a more focused customer-facing team." },
];

const steps = [
  { n: "01", title: "Discovery call", time: "15 minutes", text: "Understand your business goals, bottlenecks, and requirements.", icon: "briefcase" as IconName },
  { n: "02", title: "Research phase", time: "48 hours", text: "Study your industry, current tools, competitors, and workflows.", icon: "search" as IconName },
  { n: "03", title: "Deep-dive session", time: "60 minutes", text: "Map processes and pinpoint valuable automation opportunities.", icon: "brain" as IconName },
  { n: "04", title: "Report delivery", time: "2–4 weeks overall", text: "Deliver your complete AI Audit Report and 90-day roadmap.", icon: "document" as IconName },
];

const deliverables = [
  "AI Readiness Assessment",
  "Workflow Analysis",
  "Automation Opportunity Mapping",
  "AI Tool Recommendations",
  "Potential Cost and Time Savings",
  "Implementation Priority Matrix",
  "90-Day AI Adoption Roadmap",
];

const features = [
  { icon: "briefcase" as IconName, title: "Business-first approach", text: "We begin with your commercial goals—not the technology." },
  { icon: "shield" as IconName, title: "Vendor-independent", text: "Recommendations built around your needs, with no lock-in." },
  { icon: "target" as IconName, title: "Actionable roadmap", text: "Clear priorities, ownership, effort, and next steps." },
  { icon: "brain" as IconName, title: "AI development expertise", text: "Practical advice grounded in real implementation experience." },
];

const faqs = [
  ["What is an AI Audit?", "An AI Audit is a structured review of your workflows, systems, and business goals to identify where AI and automation can deliver measurable value."],
  ["Is the initial discovery call free?", "Yes. The first 15-minute discovery call is completely free, with no commitment or obligation."],
  ["How long does an AI Audit take?", "The complete process typically takes 2–4 weeks, depending on your business size, workflows, and audit scope."],
  ["Who can benefit from an AI Audit?", "Founders, CEOs, and operational leaders in almost any industry who want to reduce repetitive work, improve efficiency, or plan AI investment with confidence."],
  ["Do I need technical knowledge?", "Not at all. We explain everything in practical business language and focus on outcomes, not jargon."],
  ["What will I receive after the audit?", "You receive an AI readiness assessment, opportunity map, tool recommendations, priority matrix, potential savings, and a 90-day roadmap."],
  ["Do you implement the recommended AI solutions?", "Yes, BRTNeura can support implementation after the audit, but every recommendation remains vendor-independent."],
  ["Am I required to work with BRTNeura after the audit?", "No. Your audit and roadmap stand alone. You are free to implement internally or with any partner you choose."],
];

function Dashboard() {
  return (
    <div className="dashboard-wrap">
      <div className="dash-orbit orbit-one" />
      <div className="dash-orbit orbit-two" />
      <div className="dashboard">
        <div className="dash-top">
          <div>
            <span className="dash-kicker">AI AUDIT / SAMPLE DATA</span>
            <strong>Business intelligence overview</strong>
          </div>
          <span className="live-pill"><i /> Live analysis</span>
        </div>
        <div className="dash-grid">
          <div className="score-card">
            <span>AI readiness score</span>
            <div className="score-ring"><strong>72</strong><small>/100</small></div>
            <em>Ready to accelerate</em>
          </div>
          <div className="metric-card">
            <span>Estimated time savings</span>
            <strong>36 hrs</strong>
            <small>per week</small>
            <div className="sparkline"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="opportunities-card">
            <div className="card-heading">
              <span>Automation opportunities</span>
              <b>8 identified</b>
            </div>
            {[
              ["Lead qualification", "92%", "high"],
              ["Invoice processing", "78%", "medium"],
              ["Customer reporting", "64%", "low"],
            ].map(([name, value, level]) => (
              <div className="opportunity" key={name}>
                <div><span>{name}</span><b>{value}</b></div>
                <div className="progress"><i className={level} /></div>
              </div>
            ))}
          </div>
          <div className="efficiency-card">
            <div className="card-heading"><span>Business efficiency</span><b>+24%</b></div>
            <div className="chart">
              {[28, 38, 34, 51, 47, 67, 79, 72, 88].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="chart-labels"><span>Current</span><span>With AI</span></div>
          </div>
        </div>
        <div className="dash-bottom">
          <div className="workflow">
            <span className="workflow-node"><Icon name="building" size={16} /></span><i />
            <span className="workflow-node active"><Icon name="brain" size={16} /></span><i />
            <span className="workflow-node"><Icon name="chart" size={16} /></span>
          </div>
          <span>Workflow automation potential</span><strong>High impact</strong>
        </div>
      </div>
      <div className="floating-stat floating-stat-one"><Icon name="spark" size={15} /><span><b>12 workflows</b> mapped</span></div>
      <div className="floating-stat floating-stat-two"><Icon name="clock" size={15} /><span><b>320 hours</b> saved / month</span></div>
    </div>
  );
}

function ReportMockup() {
  return (
    <div className="report-scene">
      <div className="report-back report-back-one" />
      <div className="report-back report-back-two" />
      <div className="report">
        <div className="report-header">
          <Logo />
          <span>CONFIDENTIAL</span>
        </div>
        <div className="report-title">
          <span>AI AUDIT REPORT / 2025</span>
          <strong>Your 90-Day<br />AI Adoption Roadmap</strong>
          <p>Strategic opportunities for sustainable, measurable growth.</p>
        </div>
        <div className="report-score">
          <div><span>AI READINESS</span><strong>72<span>/100</span></strong></div>
          <div className="report-mini-chart">{[35, 48, 42, 62, 70, 86].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
        <div className="report-footer"><span>BRTNEURA CONSULTING</span><span>01</span></div>
      </div>
      <a className="report-tab" href="/ai-audit/report" aria-label="Explore the AI Audit report deliverable"><Icon name="document" size={18} /><span><b>28 pages</b> of clear direction</span></a>
    </div>
  );
}

function LandingPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formState, setFormState] = useState<"idle" | "error" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<(typeof auditCards)[number] | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof industries)[number] | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  useEffect(() => {
    if (!selectedAudit && !selectedIndustry && !showSuccessModal) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAudit(null);
        setSelectedIndustry(null);
        setShowSuccessModal(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedAudit, selectedIndustry, showSuccessModal]);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    // Capture form reference and data synchronously before any await —
    // React nullifies event.currentTarget after the handler returns.
    const form = event.currentTarget;
    const data = new FormData(form);
    const required = ["name", "email", "phone", "company", "industry", "size", "challenge"];
    const valid = required.every((key) => String(data.get(key) || "").trim());
    if (!valid) {
      setFormState("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(data.get("name") || "").trim(),
          businessEmail: String(data.get("email") || "").trim(),
          phoneNumber: String(data.get("phone") || "").trim(),
          companyName: String(data.get("company") || "").trim(),
          industry: String(data.get("industry") || "").trim(),
          companySize: String(data.get("size") || "").trim(),
          biggestChallenge: String(data.get("challenge") || "").trim(),
        }),
      });
      const json = await response.json().catch(() => ({ success: false }));
      if (json?.success) {
        setFormState("success");
        setShowSuccessModal(true);
        form.reset();
      } else {
        setFormState("error");
        setShowSuccessModal(false);
      }
    } catch {
      setFormState("error");
      setShowSuccessModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app" data-theme={theme} id="top">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav">
          <Logo />
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About AI Audit</a>
            <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <div className="mobile-nav-cta"><Button href="#booking">Book free AI audit</Button></div>
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <span className={theme === "light" ? "active" : ""}><Icon name="sun" size={15} /></span>
              <span className={theme === "dark" ? "active" : ""}><Icon name="moon" size={15} /></span>
            </button>
            <div className="desktop-cta"><Button href="#booking">Book free AI audit <Icon name="arrow" size={16} /></Button></div>
            <button className="menu-button" aria-expanded={menuOpen} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "x" : "menu"} size={22} />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section-pad is-visible" data-reveal>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span />BRTNEURA AI AUDIT</div>
              <h1>Discover how AI can <span>transform</span> your business.</h1>
              <p className="hero-lead">Identify opportunities to automate workflows, reduce operational costs, and improve productivity with a personalised AI Audit from BRTNeura.</p>
              <div className="hero-actions">
                <Button href="#booking">Book your free AI audit <Icon name="arrow" size={18} /></Button>
                <Button href="#process" variant="secondary">Explore how it works</Button>
              </div>
              <div className="trust-row">
                {["Free 15-minute call", "No commitment", "Practical recommendations"].map((item) => (
                  <span key={item}><i><Icon name="check" size={12} /></i>{item}</span>
                ))}
              </div>
            </div>
            <Dashboard />
          </div>
          <div className="hero-proof container">
            <span>BUILT FOR DECISION-MAKERS IN</span>
          <div>
            <a href="#industries">Education</a><i />
            <a href="#industries">Healthcare</a><i />
            <a href="#industries">Manufacturing</a><i />
            <a href="#industries">Retail & services</a>
          </div>
          </div>
        </section>

        <section className="section-pad intro reveal-section" id="about" data-reveal>
          <div className="container">
            <SectionTitle
              centered
              eyebrow="CLARITY BEFORE COMPLEXITY"
              title="Before you invest in AI, understand where you need it."
              text="An AI Audit reveals where artificial intelligence and automation can create meaningful improvements across your business operations."
            />
            <div className="audit-grid">
              {auditCards.map((card) => (
                <article className="audit-card" key={card.title}>
                  <span className="card-number">{card.number}</span>
                  <div className="icon-box"><Icon name={card.icon} size={22} /></div>
                  <h3>{card.title}</h3><p>{card.text}</p>
                  <button className="card-link" type="button" onClick={() => setSelectedAudit(card)} aria-label={`Explore ${card.title.toLowerCase()} opportunities`}>Explore potential <Icon name="arrow" size={15} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedAudit && (
          <div className="audit-modal-backdrop" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedAudit(null);
          }}>
            <section className="audit-modal" role="dialog" aria-modal="true" aria-labelledby="audit-modal-title">
              <button className="audit-modal-close" type="button" onClick={() => setSelectedAudit(null)} aria-label="Close audit detail">
                <Icon name="x" size={20} />
              </button>
              <div className="audit-modal-heading">
                <div className="icon-box"><Icon name={selectedAudit.icon} size={24} /></div>
                <span>AI AUDIT / STAGE {selectedAudit.number}</span>
                <h2 id="audit-modal-title">{selectedAudit.title} your business.</h2>
                <p>{selectedAudit.detail}</p>
              </div>
              <div className="audit-modal-grid">
                {selectedAudit.points.map((point, index) => (
                  <article key={point}>
                    <span>0{index + 1}</span>
                    <p>{point}</p>
                    <i><Icon name="check" size={14} /></i>
                  </article>
                ))}
              </div>
              <div className="audit-modal-result"><span>EXPECTED OUTPUT</span><p>{selectedAudit.result}</p></div>
              <div className="audit-modal-footer">
                <p><strong>Included in your audit.</strong> Each finding is documented and prioritised in your final roadmap.</p>
                <Button href="#booking" onClick={() => setSelectedAudit(null)}>Book free AI audit <Icon name="arrow" size={17} /></Button>
              </div>
            </section>
          </div>
        )}

        <section className="section-pad industries-section reveal-section" id="industries" data-reveal>
          <div className="container">
            <div className="split-heading">
              <SectionTitle eyebrow="INDUSTRY INTELLIGENCE" title="AI opportunities across every industry." />
              <p>Every business works differently. Our audits identify the specific opportunities that matter in your context.</p>
            </div>
            <div className="industry-grid">
              {industries.map((industry, index) => (
                <article className="industry-card" key={industry.title}>
                  <div className="industry-top"><div className="industry-icon"><Icon name={industry.icon} size={24} /></div><span>0{index + 1}</span></div>
                  <div><span className="mini-label">{industry.tag}</span><h3>{industry.title}</h3><p>{industry.text}</p></div>
                  <button className="round-arrow" type="button" onClick={() => setSelectedIndustry(industry)} aria-label={`Explore AI opportunities for ${industry.title}`}><Icon name="arrow" size={16} /></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {selectedIndustry && (
          <div className="audit-modal-backdrop" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndustry(null);
          }}>
            <section className="audit-modal industry-modal" role="dialog" aria-modal="true" aria-labelledby="industry-modal-title">
              <button className="audit-modal-close" type="button" onClick={() => setSelectedIndustry(null)} aria-label="Close industry detail">
                <Icon name="x" size={20} />
              </button>
              <div className="audit-modal-heading">
                <div className="icon-box"><Icon name={selectedIndustry.icon} size={24} /></div>
                <span>AI OPPORTUNITIES / {selectedIndustry.title.toUpperCase()}</span>
                <h2 id="industry-modal-title">{selectedIndustry.tag} for {selectedIndustry.title.toLowerCase()}.</h2>
                <p>{selectedIndustry.detail}</p>
              </div>
              <div className="audit-modal-grid">
                {selectedIndustry.points.map((point, index) => (
                  <article key={point}>
                    <span>0{index + 1}</span>
                    <p>{point}</p>
                    <i><Icon name="check" size={14} /></i>
                  </article>
                ))}
              </div>
              <div className="audit-modal-result"><span>POTENTIAL BUSINESS IMPACT</span><p>{selectedIndustry.result}</p></div>
              <div className="audit-modal-footer">
                <p><strong>Every recommendation is contextual.</strong> We evaluate your workflows, systems, constraints, and business priorities.</p>
                <Button href="#booking" onClick={() => setSelectedIndustry(null)}>Explore opportunities <Icon name="arrow" size={17} /></Button>
              </div>
            </section>
          </div>
        )}

        <section className="section-pad process-section reveal-section" id="process" data-reveal>
          <div className="container">
            <SectionTitle centered eyebrow="A PROVEN PROCESS" title="From business discovery to an actionable AI roadmap." text="A focused, transparent process designed to turn complexity into confident next steps." />
            <div className="timeline">
              <div className="timeline-line" />
              {steps.map((step) => (
                <article className="step-card" key={step.n}>
                  <div className="step-marker"><span>{step.n}</span></div>
                  <div className="step-icon"><Icon name={step.icon} size={20} /></div>
                  <span className="step-time">{step.time}</span>
                  <h3>{step.title}</h3><p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad deliverables-section reveal-section" data-reveal>
          <div className="container deliverables-grid">
            <ReportMockup />
            <div className="deliverables-copy">
              <SectionTitle eyebrow="YOUR AUDIT DELIVERABLE" title="More than recommendations. A clear roadmap." text="A boardroom-ready document that turns complex AI opportunities into practical priorities your team can act on." />
              <div className="deliverables-list">
                {deliverables.map((item, index) => <div key={item}><span><Icon name="check" size={14} /></span><p>{item}</p><b>0{index + 1}</b></div>)}
              </div>
              <div className="deliverable-note"><Icon name="spark" size={18} /><p><strong>Built for action.</strong> Prioritised by business impact, effort, and implementation readiness.</p></div>
            </div>
          </div>
        </section>

        <section className="section-pad why-section reveal-section" data-reveal>
          <div className="container">
            <SectionTitle centered eyebrow="WHY BRTNEURA" title="Practical AI. Real business problems. Clear direction." text="Independent advice, grounded in your reality—not in a sales quota." />
            <div className="feature-grid">
              {features.map((feature) => <article className="feature-card" key={feature.title}><div className="feature-icon"><Icon name={feature.icon} size={22} /></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
            </div>
            <blockquote className="manifesto">
              <div className="quote-mark">“</div>
              <p>We are the <span>doctor</span>, not the pharmacist.<br />We diagnose first. Then prescribe.</p>
              <div className="manifesto-note"><i /><span>Transparent guidance</span><i /><span>No vendor lock-in</span><i /><span>Practical outcomes</span></div>
            </blockquote>
          </div>
        </section>

        <section className="booking-section reveal-section" id="booking" data-reveal>
          <div className="booking-glow" />
          <div className="container booking-grid">
            <div className="booking-copy">
              <div className="eyebrow light"><span />YOUR NEXT STEP</div>
              <h2>Let’s find the right AI opportunities for your business.</h2>
              <p>Start with a free 15-minute discovery call. Tell us about your business, and our team will help you explore where AI can make a difference.</p>
              <div className="booking-benefits">
                {["Free discovery call", "No commitment", "Personalised business discussion", "Practical AI recommendations"].map((item) => <div key={item}><span><Icon name="check" size={14} /></span>{item}</div>)}
              </div>
              <div className="booking-contact">
                <span>Prefer to speak directly?</span>
                <div>
                  <a href="tel:+918879114702">+91 88791 14702</a>
                  <a href="tel:+919403828927">+91 94038 28927</a>
                </div>
                <a href="mailto:connect@brtneura.com">connect@brtneura.com</a>
              </div>
            </div>
            <form className="booking-form" onSubmit={submitForm} noValidate>
              <div className="form-heading"><div><span>FREE AI AUDIT</span><h3>Book your discovery call</h3></div><div className="form-badge"><Icon name="clock" size={16} />15 min</div></div>
              <div className="form-grid">
                <label><span>Full name</span><input name="name" placeholder="e.g. Alex Morgan" /></label>
                <label><span>Business email</span><input name="email" type="email" placeholder="alex@company.com" /></label>
                <label><span>Phone number</span><input name="phone" type="tel" placeholder="+91 00000 00000" /></label>
                <label><span>Company name</span><input name="company" placeholder="Your company" /></label>
                <label><span>Industry</span><select name="industry" defaultValue=""><option value="" disabled>Select industry</option><option>Education</option><option>Healthcare</option><option>Manufacturing</option><option>Retail & Services</option><option>Other</option></select></label>
                <label><span>Company size</span><select name="size" defaultValue=""><option value="" disabled>Select size</option><option>1–10</option><option>11–50</option><option>51–200</option><option>201–500</option><option>500+</option></select></label>
                <label className="full-field"><span>Biggest business challenge</span><textarea name="challenge" rows={3} placeholder="Tell us what is slowing your team down..." /></label>
              </div>
              {formState === "error" && <div className="form-message error">Please complete all fields so we can prepare for your call.</div>}
              {formState === "success" && <div className="form-message success"><Icon name="check" size={16} />Thank you. Your request has been received.</div>}
              <Button type="submit">Book my free AI audit <Icon name="arrow" size={18} /></Button>
              <small className="form-privacy"><Icon name="shield" size={13} />Your details stay private. No spam, ever.</small>
            </form>
          </div>
        </section>

        {showSuccessModal && (
          <div
            className="success-modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowSuccessModal(false);
            }}
          >
            <section
              className="success-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-modal-title"
            >
              <button
                className="success-modal-close"
                type="button"
                onClick={() => setShowSuccessModal(false)}
                aria-label="Close thank you dialog"
              >
                <Icon name="x" size={20} />
              </button>

              <div className="success-modal-badge">
                <div className="success-modal-icon-ring">
                  <div className="success-modal-icon">
                    <svg
                      aria-hidden="true"
                      className="success-checkmark"
                      fill="none"
                      height="32"
                      viewBox="0 0 24 24"
                      width="32"
                    >
                      <path
                        d="m5 12 4.5 4.5L19 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="success-modal-content">
                <span className="success-modal-kicker">REQUEST CONFIRMED</span>
                <h2 id="success-modal-title">Thank You!</h2>
                <p className="success-modal-message">
                  Thank you for sharing your details with us. Your request has been received successfully. Our team at BRTNeura will review your information and connect with you as soon as possible.
                </p>
                <div className="success-modal-note">
                  <span className="spark-bullet"><Icon name="spark" size={16} /></span>
                  <p>We look forward to helping your business explore AI opportunities!</p>
                </div>
              </div>

              <div className="success-modal-actions">
                <button
                  className="success-got-it-btn"
                  type="button"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Got It
                </button>
              </div>
            </section>
          </div>
        )}

        <section className="section-pad faq-section reveal-section" data-reveal>
          <div className="container faq-grid">
            <div className="faq-intro">
              <SectionTitle eyebrow="FREQUENTLY ASKED" title="Questions, answered clearly." text="Everything you need to know before booking your free discovery call." />
              <div className="faq-contact-card"><Icon name="audit" size={22} /><div><strong>Still have a question?</strong><span>Speak directly with our AI consulting team.</span></div><a href="mailto:connect@brtneura.com"><Icon name="arrow" size={17} /></a></div>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                    <span><b>{String(index + 1).padStart(2, "0")}</b>{question}</span>
                    <i><Icon name="chevron" size={17} /></i>
                  </button>
                  <div className="faq-answer"><p>{answer}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="container footer-top">
          <div className="footer-brand"><Logo /><p>Build. Refine. Thrive.</p><span>Simplifying AI for every business.</span></div>
          <div className="footer-links"><span>Explore</span><a href="#about">About AI Audit</a><a href="#industries">Industries</a><a href="#process">How it works</a><a href="#booking">Book a call</a></div>
          <div className="footer-links"><span>Contact</span><a href="mailto:connect@brtneura.com">connect@brtneura.com</a><a href="tel:+918879114702">+91 88791 14702</a><a href="tel:+919403828927">+91 94038 28927</a><a href="https://brtneura.com" target="_blank" rel="noreferrer">brtneura.com</a></div>
          <div className="footer-cta"><span>Ready to move forward?</span><h3>Make your next AI decision the right one.</h3><Button href="#booking">Book free audit <Icon name="arrow" size={16} /></Button></div>
        </div>
        <div className="container footer-bottom">
          <div className="footer-legal">
            <a href="https://brtneura.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://brtneura.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms</a>
            <a className="social" href="https://www.linkedin.com/company/brtneura/" target="_blank" rel="noopener noreferrer" aria-label="BRTNeura on LinkedIn"><Icon name="linkedin" size={16} /></a>
          </div>
          <div className="footer-credit">
            <span className="footer-credit-text">Powered by</span>
            <a href="https://brtneura.com/" target="_blank" rel="noopener noreferrer" className="footer-credit-brand">BRTNeura</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
