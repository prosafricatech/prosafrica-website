// Decorative abstract shapes for the dark hero. Purely visual, hidden from assistive tech.
export default function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft glowing orbs */}
      <div className="absolute -top-48 -left-40 size-[560px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#5A50FF_0%,transparent_68%)] opacity-70 blur-2xl" />
      <div className="absolute top-1/4 -right-56 size-[680px] rounded-full bg-[radial-gradient(circle_at_40%_40%,#2F6BFF_0%,transparent_66%)] opacity-60 blur-2xl" />
      <div className="absolute -bottom-40 left-1/4 size-[520px] rounded-full bg-[radial-gradient(circle,#3A2FD8_0%,transparent_65%)] opacity-60 blur-3xl" />

      {/* concentric rings */}
      <svg className="absolute -top-40 -right-40 size-[900px] animate-orbit text-white motion-reduce:animate-none" viewBox="0 0 900 900" fill="none" stroke="currentColor">
        {[120, 200, 280, 360, 440].map((r, i) => (
          <circle key={r} cx="450" cy="450" r={r} strokeWidth="1.5" opacity={0.2 - i * 0.03} />
        ))}
      </svg>
      <svg className="absolute -bottom-72 -left-60 size-[900px] animate-orbit text-white [animation-direction:reverse] motion-reduce:animate-none" viewBox="0 0 900 900" fill="none" stroke="currentColor">
        {[160, 250, 340, 430].map((r, i) => (
          <circle key={r} cx="450" cy="450" r={r} strokeWidth="1.5" opacity={0.16 - i * 0.03} />
        ))}
      </svg>

      {/* dot grid, fading out */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(rgba(255,255,255,0.22)_1.3px,transparent_1.3px)] bg-size-[28px_28px] [mask-image:linear-gradient(to_right,#000,transparent_85%)]" />

      {/* glassy tilted tiles */}
      <div className="absolute top-[26%] left-[7%] size-36 rotate-12 animate-float-a motion-reduce:animate-none rounded-[36px] border border-white/25 bg-linear-to-br from-white/20 to-white/0 shadow-[0_30px_60px_rgba(0,0,40,0.35)] backdrop-blur-sm max-md:hidden" />
      <div className="absolute top-[52%] left-[14%] size-20 -rotate-12 animate-float-b motion-reduce:animate-none rounded-[24px] border border-white/20 bg-white/10 backdrop-blur-sm max-md:hidden" />
      <div className="absolute top-[18%] right-[8%] size-28 -rotate-12 animate-float-b motion-reduce:animate-none rounded-[30px] border border-white/25 bg-linear-to-br from-white/20 to-white/0 shadow-[0_30px_60px_rgba(0,0,40,0.35)] backdrop-blur-sm max-md:hidden" />
      <div className="absolute top-[48%] right-[13%] size-44 rotate-[18deg] animate-float-c motion-reduce:animate-none rounded-[44px] border border-white/15 bg-linear-to-br from-white/15 to-transparent max-md:hidden" />

      {/* diagonal light beam */}
      <div className="absolute -top-1/4 left-[58%] h-[160%] w-40 rotate-[24deg] bg-linear-to-b from-white/15 via-white/5 to-transparent blur-2xl" />
    </div>
  );
}
