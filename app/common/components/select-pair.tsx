import { useState } from 'react';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/common/components/ui/select';
export function SelectPair({
  label,
  description,
  name,
  required,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  name: string;
  required: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <Label className='flex flex-col' onClick={() => setOpen(true)}>
        {label}
        <small>{description}</small>
      </Label>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
