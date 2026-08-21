export function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children && <p className="section-intro">{children}</p>}
  </div>
}
