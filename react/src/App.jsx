import './App.css'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import { useHashPage } from './hooks/useHashPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import SitemapPage from './pages/SitemapPage'
import PrivacyPage from './pages/PrivacyPage'
import PlanTripPage from './pages/PlanTripPage'
import PopularDestinationsPage from './pages/PopularDestinationsPage'
import ActivityPage from './pages/ActivityPage'
import MapPage from './pages/MapPage'
import AuthPage from './pages/AuthPage'
import AddTripPage from './pages/AddTripPage'
import ProfilePage from './pages/ProfilePage'

function renderPage(page) {
  switch (page) {
    case 'login':
      return (
        <AuthPage
          title="Log In"
          buttonLabel="Log In"
          helperLink={{ label: 'Need an account? Sign up', page: 'signup' }}
          fields={[
            { label: 'Email', value: 'FakeEmail@Gmail.com' },
            { label: 'Password', type: 'password', value: 'password' },
          ]}
        />
      )
    case 'signup':
      return (
        <AuthPage
          title="Sign Up"
          buttonLabel="Sign Up"
          helperLink={{ label: 'Already registered? Log in', page: 'login' }}
          fields={[
            { label: 'Email', value: 'FakeEmail@Gmail.com' },
            { label: 'Password', type: 'password', value: 'password123' },
            { label: 'Confirm Password', type: 'password', value: 'password123' },
          ]}
        />
      )
    case 'about':
      return <AboutPage />
    case 'contact':
      return <ContactPage />
    case 'faq':
      return <FaqPage />
    case 'privacy':
      return <PrivacyPage />
    case 'popular-destinations':
      return <PopularDestinationsPage />
    case 'sitemap':
      return <SitemapPage />
    case 'plan-a-trip':
      return <PlanTripPage />
    case 'add-trip':
      return <AddTripPage />
    case 'activity':
      return <ActivityPage />
    case 'map':
      return <MapPage />
    case 'profile':
      return <ProfilePage />
    default:
      return <HomePage />
  }
}

function App() {
  const [currentPage] = useHashPage()

  return (
    <div className="page-shell">
      <SiteHeader currentPage={currentPage} />
      <main>{renderPage(currentPage)}</main>
      <SiteFooter />
    </div>
  )
}

export default App
