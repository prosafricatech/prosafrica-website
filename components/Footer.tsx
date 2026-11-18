import Link from 'next/link';
import Logo from './Logo';
import Container from './Container';
import { footer } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-navy text-[#C9CCF5]">
      <Container className="pt-16 pb-9">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-85">
            <Logo light />
            <p className="mt-3.5 text-[14.5px] leading-[1.65]">{footer.blurb}</p>
          </div>
          <div className="flex flex-wrap gap-18 text-[14.5px]">
            <div className="flex flex-col gap-3">
              <b className="text-white">Company</b>
              {footer.companyLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <b className="text-white">Modules</b>
              {footer.moduleNames.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <b className="text-white">Reach us</b>
              {footer.contact.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-11 border-t border-white/[0.14] pt-5.5 text-[13px]">{footer.copyright}</div>
      </Container>
    </footer>
  );
}
