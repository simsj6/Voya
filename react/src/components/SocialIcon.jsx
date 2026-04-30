function SocialIcon({ label }) {
  const symbols = {
    facebook: 'f',
    twitter: 't',
    instagram: '◎',
    pinterest: 'p',
  }

  return <span aria-hidden="true">{symbols[label]}</span>
}

export default SocialIcon
