import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router";

type PageContent = {
  eyebrow: string;
  title: string;
  lead: string;
  stat: string;
  statLabel: string;
  outcomes: string[];
  opportunities: { number: string; title: string; text: string }[];
  note: string;
};

const pages: Record<string, PageContent> = {
  "ai-audit/report": {
    eyebrow: "YOUR CONSULTING DELIVERABLE",
    title: "A boardroom-ready report built for confident decisions.",
    lead: "Your BRTNeura AI Audit Report brings the analysis, opportunities, financial potential, and implementation priorities into one clear document.",
    stat: "28+",
    statLabel: "pages of direction",
    outcomes: ["Executive summary", "Opportunity portfolio", "90-day roadmap"],
    opportunities: [
      { number: "01", title: "Executive clarity", text: "A concise summary of readiness, business value, key risks, and leadership decisions." },
      { number: "02", title: "Detailed evidence", text: "Workflow findings, use-case scores, savings estimates, and recommended solution approaches." },
      { number: "03", title: "Implementation plan", text: "A prioritised 90-day roadmap with clear phases, ownership, and measurable outcomes." },
    ],
    note: "The report is yours to keep and use—whether you implement with BRTNeura, internally, or with another partner.",
  },
};

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d={back ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function DetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const key = location.pathname.replace(/^\/|\/$/g, "");
  const content = pages[key];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  if (!content) {
    return (
      <main className="detail-page detail-not-found">
        <img src="/brtneura-logo.png" alt="BRTNeura" />
        <span>404 / PAGE NOT FOUND</span>
        <h1>This direction does not exist yet.</h1>
        <p>The page may have moved. Return to the AI Audit landing page to continue exploring.</p>
        <Link className="button button-primary" to="/">Return home <Arrow /></Link>
      </main>
    );
  }

  return (
    <div className="detail-page">
      <header className="detail-nav">
        <Link className="detail-logo" to="/" aria-label="BRTNeura home"><img src="/brtneura-logo.png" alt="BRTNeura" /></Link>
        <Link className="detail-back" to="/"><Arrow back />Back to AI Audit</Link>
        <a className="button button-primary" href="/#booking">Book free AI audit <Arrow /></a>
      </header>

      <main>
        <section className="detail-hero">
          <div className="detail-orb detail-orb-one" />
          <div className="detail-orb detail-orb-two" />
          <div className="detail-container">
            <div className="detail-breadcrumb"><Link to="/">AI Audit</Link><span>/</span><b>{slug?.replace("-", " ")}</b></div>
            <div className="detail-hero-grid">
              <div>
                <span className="detail-eyebrow">{content.eyebrow}</span>
                <h1>{content.title}</h1>
                <p>{content.lead}</p>
                <div className="detail-actions">
                  <a className="button button-primary" href="/#booking">Discuss your business <Arrow /></a>
                  <a className="button button-secondary" href="mailto:connect@brtneura.com">Ask a question</a>
                </div>
              </div>
              <aside className="detail-stat-card">
                <span>OPPORTUNITY SIGNAL</span>
                <strong>{content.stat}</strong>
                <p>{content.statLabel}</p>
                <div>{content.outcomes.map((outcome) => <span key={outcome}><i>✓</i>{outcome}</span>)}</div>
              </aside>
            </div>
          </div>
        </section>

        <section className="detail-content">
          <div className="detail-container">
            <div className="detail-section-heading">
              <span>WHAT WE EXPLORE</span>
              <h2>From possibility to a practical business case.</h2>
              <p>Your audit goes beyond surface-level ideas to evaluate where change can create meaningful, measurable value.</p>
            </div>
            <div className="detail-opportunity-grid">
              {content.opportunities.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href="/#booking" aria-label={`Discuss ${item.title}`}>Discuss this opportunity <Arrow /></a>
                </article>
              ))}
            </div>
            <div className="detail-note">
              <span>THE BRTNEURA APPROACH</span>
              <p>“{content.note}”</p>
              <a href="/#booking">Start with a free 15-minute call <Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="detail-footer">
        <span>© 2025 BRTNeura</span>
        <div><a href="mailto:connect@brtneura.com">connect@brtneura.com</a><a href="tel:+918879114702">+91 88791 14702</a><a href="tel:+919403828927">+91 94038 28927</a></div>
      </footer>
    </div>
  );
}
