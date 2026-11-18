'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from './FormField';
import Button from './Button';
import { contact, contactForm } from '@/lib/content';
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema';

const requiredFields = new Set(['name', 'company', 'email']);

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      industryOther: '',
      message: '',
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const industry = watch('industry');

  useEffect(() => {
    if (industry !== 'Other') {
      setValue('industryOther', '');
    }
  }, [industry, setValue]);

  const [sendError, setSendError] = useState('');

  const sending = useRef(false);
  const supportEmail = contact.info.find((i) => i.label === 'Email')?.value ?? '';

  const onSubmit = async (data: ContactFormValues) => {
    if (sending.current) return;
    sending.current = true;
    setSendError('');
    setSubmitted(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? '' }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'We could not send your message. Please try again.');
      }
      reset();
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'We could not send your message. Please try again.');
    } finally {
      sending.current = false;
    }
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-5 rounded-3xl border border-tint bg-white p-6 shadow-[0_14px_40px_rgba(12,10,46,0.08)] sm:p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {contactForm.fields.map((f) => (
          <FormField
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            required={requiredFields.has(f.id)}
            error={errors[f.id as keyof ContactFormValues]?.message}
            registration={register(f.id as 'name' | 'company' | 'email' | 'phone')}
          />
        ))}
      </div>

      <FormField
        label="Your industry"
        id="industry"
        as="select"
        required
        error={errors.industry?.message}
        registration={register('industry')}
      >
        <option value="">Select your industry</option>
        {contactForm.industryOptions.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </FormField>

      {industry === 'Other' && (
        <FormField
          label="Tell us your industry"
          id="industryOther"
          placeholder="e.g. Agriculture, Retail"
          required
          autoFocus
          error={errors.industryOther?.message}
          registration={register('industryOther')}
        />
      )}

      <FormField
        label="Message"
        id="message"
        as="textarea"
        rows={5}
        placeholder={contactForm.messagePlaceholder}
        error={errors.message?.message}
        registration={register('message')}
      />

      {/* honeypot: hidden from people, bots tend to fill it */}
      <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : contactForm.submitLabel}
      </Button>

      {sendError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-[15px] leading-normal text-red-900">
          <b className="block font-bold">Message not sent</b>
          {sendError}
          {supportEmail && (
            <>
              {' '}
              You can also write to us at{' '}
              <a href={`mailto:${supportEmail}`} className="font-semibold underline underline-offset-2">
                {supportEmail}
              </a>
              .
            </>
          )}
        </div>
      )}

      {submitted && (
        <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-[15px] leading-normal text-emerald-900">
          <b className="block font-bold">Message sent</b>
          Thank you. We have received your details and will get back to you soon.
        </div>
      )}
    </form>
  );
}
