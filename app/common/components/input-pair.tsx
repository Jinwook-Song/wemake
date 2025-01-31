import type { InputHTMLAttributes } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function InputPair({
  label,
  description,
  textArea = false,
  rows = 8,
  ...rest
}: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string;
  description: string;
  textArea?: boolean;
  rows?: number;
}) {
  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={rest.id} className='flex flex-col gap-1'>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      {textArea ? (
        <Textarea {...rest} rows={rows} className='resize-none' />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}
