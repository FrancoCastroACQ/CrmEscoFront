// src/components/AsyncSelect.tsx
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export interface OptionType {
  id: string | number;
  label: string;
}

export interface AsyncSelectProps<T extends OptionType> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  fetchOptions: () => Promise<T[]>;
  getOptionLabel?: (option: T) => string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

const AsyncSelect = <T extends OptionType>({
  label,
  value,
  onChange,
  fetchOptions,
  getOptionLabel = (option: T) => option.label,
  className,
  required = false,
}: AsyncSelectProps<T>) => {
  const [options, setOptions] = useState<T[]>([]);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  useEffect(() => {
    fetchOptions()
      .then((data) => {
        setOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching options:', error);
      });
  }, [fetchOptions]);

  useEffect(() => {
    if (value) {
      const found = options.find(opt => opt.id.toString() === value);
      setSelectedOption(found || null);
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  return (
    <Autocomplete
      className={className}
      options={options}
      getOptionLabel={getOptionLabel}
      value={selectedOption}
      onChange={(_event, newValue) => {
        onChange(newValue ? newValue.id.toString() : '');
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" margin="none" size="small" required={required}/>
      )}
    />
  );
};

export default AsyncSelect;
