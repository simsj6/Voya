import { sitemapSections } from '../data/siteContent'

function SitemapPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <span className="eyebrow">Sitemap</span>
          <h1>Everything In One Place</h1>
          <p>
            Use this page to jump directly to the main planning, exploration, and
            support pages inside the app.
          </p>
        </div>

        <div className="sitemap-grid">
          {sitemapSections.map((section) => (
            <section key={section.title} className="sitemap-card">
              <h2>{section.title}</h2>
              <div className="sitemap-links">
                {section.links.map((link) => (
                  <a key={link.label} href={`#${link.page}`}>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SitemapPage
