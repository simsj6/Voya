import { navItems } from '../data/siteContent'

function SiteHeader({ currentPage }) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Voya home">
        VOYA
      </a>

      <nav className="topnav" aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={`${item.label}-${item.page}`}
            href={`#${item.page}`}
            className={currentPage === item.page ? 'nav-active' : ''}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="signin-button" href="#login">
        Sign In
      </a>
    </header>
  )
}

export default SiteHeader
