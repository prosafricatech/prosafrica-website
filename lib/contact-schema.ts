import * as yup from 'yup';

const phoneRegex = /^[\d\s+()-]+$/;

export const contactSchema = yup.object({
  name: yup.string().trim().required('Full name is required').min(2, 'Enter at least 2 characters'),
  company: yup.string().trim().required('Company is required'),
  email: yup.string().trim().required('Email is required').email('Enter a valid email address'),
  phone: yup
    .string()
    .trim()
    .optional()
    .test('phone-format', 'Use only digits, spaces, +, -, ( and )', (value) => !value || phoneRegex.test(value))
    .test('phone-length', 'Enter a valid phone number', (value) => !value || (value.replace(/\D/g, '').length >= 7 && value.length <= 20)),
  industry: yup.string().required('Select your industry'),
  industryOther: yup.string().when('industry', {
    is: 'Other',
    then: (schema) => schema.trim().required('Tell us your industry'),
    otherwise: (schema) => schema.notRequired(),
  }),
  message: yup.string().optional(),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
