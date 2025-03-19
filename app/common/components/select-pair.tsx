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
  defaultValue,
}: {
  label: string;
  description: string;
  name: string;
  required: boolean;
  placeholder: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='flex flex-col gap-1' onClick={() => setOpen(true)}>
        {label}
        <small className='text-muted-foreground'>{description}</small>
      </Label>
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
        defaultValue={defaultValue}
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
