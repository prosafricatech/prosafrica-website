import { cn } from '@/lib/utils';
import type { UseFormRegisterReturn } from 'react-hook-form';

type FormFieldProps = {
  label: string;
  id: string;
  as?: 'input' | 'select' | 'textarea';
  type?: string;
  placeholder?: string;
  rows?: number;
  children?: React.ReactNode;
  className?: string;
  required?: boolean;
  error?: string;
  registration?: UseFormRegisterReturn;
  autoFocus?: boolean;
};

const baseFieldClasses =
  'h-[50px] w-full rounded-xl border-[1.5px] bg-white px-4 text-[15px] text-ink focus:outline focus:outline-2 focus:outline-offset-1';

export default function FormField({
  label,
  id,
  as = 'input',
  type = 'text',
  placeholder,
  rows,
  children,
  className,
  required,
  error,
  registration,
  autoFocus,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const fieldClasses = cn(
    baseFieldClasses,
    error ? 'border-red-500 focus:outline-red-500' : 'border-border focus:outline-indigo'
  );
  const sharedProps = {
    id,
    className: cn(fieldClasses, as === 'textarea' && 'h-auto resize-y py-3.5'),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    autoFocus,
    ...registration,
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-bold">
        {label}
        {required && (
          <span className="text-pink" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {as === 'select' && <select {...sharedProps}>{children}</select>}
      {as === 'textarea' && <textarea rows={rows} placeholder={placeholder} {...sharedProps} />}
      {as === 'input' && <input type={type} placeholder={placeholder} {...sharedProps} />}
      {error && (
        <p id={errorId} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
