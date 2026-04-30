import { faqItems } from '../data/siteContent'

function FaqPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <span className="eyebrow">FAQs</span>
          <h1>Helpful Answers Before You Book</h1>
          <p>
            A quick guide to how the current VOYA planning flow works and what each
            part of the experience is meant to help you do.
          </p>
        </div>

        <div className="faq-list">
          {faqItems.map((item) => (
            <article key={item.question} className="faq-card">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqPage
