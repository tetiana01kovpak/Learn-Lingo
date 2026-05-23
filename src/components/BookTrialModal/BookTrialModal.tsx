import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import type { Teacher } from '@/types/teacher';
import formStyles from '@/components/Modal/forms.module.css';
import styles from './BookTrialModal.module.css';

interface FormValues {
  reason: string;
  fullName: string;
  email: string;
  phone: string;
}

const reasons = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby',
];

const schema: yup.ObjectSchema<FormValues> = yup.object({
  reason: yup.string().required('Please choose a reason'),
  fullName: yup.string().required('Full name is required').min(2, 'Name is too short'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^\+?[0-9\s\-()]{7,}$/, 'Enter a valid phone number'),
});

interface Props {
  open: boolean;
  onClose: () => void;
  teacher: Teacher;
}

export const BookTrialModal = ({ open, onClose, teacher }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { reason: reasons[0] },
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!open) reset({ reason: reasons[0], fullName: '', email: '', phone: '' });
  }, [open, reset]);

  const onSubmit = (data: FormValues) => {
    toast.success(
      `Trial lesson with ${teacher.name} ${teacher.surname} booked! We'll contact ${data.email}.`,
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Book trial lesson" wide>
      <h2 className={formStyles.title}>Book trial lesson</h2>
      <p className={formStyles.subtitle}>
        Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={styles.teacher}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.teacherAvatar}
        />
        <div className={styles.teacherMeta}>
          <span className={styles.teacherLabel}>Your teacher</span>
          <span className={styles.teacherName}>
            {teacher.name} {teacher.surname}
          </span>
        </div>
      </div>

      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className={styles.question}>
            What is your main reason for learning {teacher.languages[0] ?? 'a language'}?
          </legend>
          <div className={styles.options}>
            {reasons.map((r) => (
              <label key={r} className={styles.radioWrap}>
                <input
                  type="radio"
                  value={r}
                  className={styles.radioInput}
                  {...register('reason')}
                />
                <span className={styles.radio} aria-hidden="true" />
                <span>{r}</span>
              </label>
            ))}
          </div>
          {errors.reason && <span className={formStyles.error}>{errors.reason.message}</span>}
        </fieldset>

        <div className={formStyles.field}>
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            {...register('fullName')}
            className={formStyles.input}
          />
          {errors.fullName && <span className={formStyles.error}>{errors.fullName.message}</span>}
        </div>

        <div className={formStyles.field}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
            className={formStyles.input}
          />
          {errors.email && <span className={formStyles.error}>{errors.email.message}</span>}
        </div>

        <div className={formStyles.field}>
          <input
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
            className={formStyles.input}
          />
          {errors.phone && <span className={formStyles.error}>{errors.phone.message}</span>}
        </div>

        <button type="submit" className={formStyles.submit} disabled={isSubmitting}>
          {isSubmitting ? 'Booking…' : 'Book'}
        </button>
      </form>
    </Modal>
  );
};
