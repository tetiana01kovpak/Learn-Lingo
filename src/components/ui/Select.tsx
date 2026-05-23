import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from './icons';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  formatTrigger?: (value: string) => string;
  width?: number;
}

export const Select = ({
  label,
  value,
  options,
  onChange,
  formatTrigger,
  width,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const display =
    value === ''
      ? options[0]?.label ?? ''
      : formatTrigger
        ? formatTrigger(value)
        : options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className={styles.wrapper} style={width ? { minWidth: width, width } : undefined} ref={wrapperRef}>
      <span className={styles.label}>{label}</span>
      <div className={styles.control}>
        <button
          type="button"
          className={clsx(styles.trigger, open && styles.triggerOpen)}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{display}</span>
          <ChevronDownIcon className={clsx(styles.chevron, open && styles.chevronOpen)} />
        </button>
        {open && (
          <ul className={styles.options} role="listbox">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  className={clsx(styles.option, opt.value === value && styles.optionActive)}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={opt.value === value}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
