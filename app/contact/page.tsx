import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Photo from '@/components/Photo';
import Eyebrow from '@/components/Eyebrow';
import ContactForm from '@/components/ContactForm';
import { contact } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(contact.meta, '/contact');

export default function Contact() {
  return (
    <>
      {/* ===== START: HERO ===== */}
      <section className="bg-linear-to-b from-alt to-white">
        <Container className="px-5 pt-28 pb-0 md:px-10 md:pt-41 md:pb-16">
          <SectionHeading as="h1" {...contact.hero} />
        </Container>
      </section>
      {/* ===== END: HERO ===== */}
      {/* ===== START: CONTACT FORM + CONTACT DETAILS ===== */}
      <section className="mx-auto flex max-w-7xl flex-wrap items-start gap-12 px-5 pt-6 pb-24 md:px-10">
        <div className="min-w-0 flex-[1_1_480px]">
          <ContactForm />
        </div>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
          <Photo src={contact.image.src} alt={contact.image.alt} height={280} />
          <div className="flex flex-col gap-5 rounded-[20px] bg-alt p-7.5">
            {contact.info.map((i) => (
              <div key={i.label}>
                <Eyebrow>{i.label}</Eyebrow>
                <b className="mt-1.5 block text-[17px] text-navy">{i.value}</b>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== END: CONTACT FORM + CONTACT DETAILS ===== */}
    </>
  );
}
