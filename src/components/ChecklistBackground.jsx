export default function ChecklistBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px bg-white/10 animate-line"
          style={{
            top: `${15 + i * 10}%`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  )
}
