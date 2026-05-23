import { useMemo } from 'react';
import { Select, type SelectOption } from '@/components/ui/Select';
import {
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  PRICE_OPTIONS,
  type TeacherFilters,
} from '@/types/teacher';
import styles from './Filters.module.css';

interface Props {
  value: TeacherFilters;
  onChange: (next: TeacherFilters) => void;
  availableLanguages?: string[];
}

export const Filters = ({ value, onChange, availableLanguages }: Props) => {
  const languageOptions = useMemo<SelectOption[]>(() => {
    const source = availableLanguages && availableLanguages.length > 0
      ? availableLanguages
      : LANGUAGE_OPTIONS;
    return [
      { label: 'All', value: '' },
      ...source.map((lang) => ({ label: lang, value: lang })),
    ];
  }, [availableLanguages]);

  const levelOptions = useMemo<SelectOption[]>(
    () => [
      { label: 'All', value: '' },
      ...LEVEL_OPTIONS.map((lvl) => ({ label: lvl, value: lvl })),
    ],
    [],
  );

  const priceOptions = useMemo<SelectOption[]>(
    () => [
      { label: 'All', value: '' },
      ...PRICE_OPTIONS.map((p) => ({ label: p, value: p })),
    ],
    [],
  );

  return (
    <div className={styles.filters}>
      <Select
        label="Languages"
        value={value.language}
        options={languageOptions}
        onChange={(language) => onChange({ ...value, language })}
        width={221}
      />
      <Select
        label="Level of knowledge"
        value={value.level}
        options={levelOptions}
        onChange={(level) => onChange({ ...value, level })}
        width={198}
      />
      <Select
        label="Price"
        value={value.price}
        options={priceOptions}
        onChange={(price) => onChange({ ...value, price })}
        formatTrigger={(v) => (v ? `${v} $` : 'All')}
        width={124}
      />
    </div>
  );
};
