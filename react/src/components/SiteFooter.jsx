import SocialIcon from './SocialIcon'
import { footerLinks } from '../data/siteContent'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <a className="brand" href="#home">
            VOYA
          </a>
          <p>
            Plan your journey with elegance and ease. We bring you the finest
            destinations with a touch of sophistication.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Company</h4>
            {footerLinks.company.map((item) => (
              <a key={item.label} href={`#${item.page}`}>
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <h4>Support</h4>
            {footerLinks.support.map((item) => (
              <a key={item.label} href={`#${item.page}`}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2026 Voya. All Rights Reserved</p>

        <div className="social-list" aria-label="Social links">
          {['facebook', 'twitter', 'instagram', 'pinterest'].map((item) => (
            <a key={item} href="#home" aria-label={item}>
              <SocialIcon label={item} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
