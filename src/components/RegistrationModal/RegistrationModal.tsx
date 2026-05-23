import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearError, registerUser } from '@/store/authSlice';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icons';
import formStyles from '@/components/Modal/forms.module.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name is too short'),
  email: yup.string().required('Email is required').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.auth.status);
  const apiError = useAppSelector((s) => s.auth.error);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!open) {
      reset();
      setShowPassword(false);
      dispatch(clearError());
    }
  }, [open, reset, dispatch]);

  const onSubmit = async (data: FormValues) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      toast.success(`Welcome, ${result.payload.name}!`);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Registration">
      <h2 className={formStyles.title}>Registration</h2>
      <p className={formStyles.subtitle}>
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
      </p>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={formStyles.field}>
          <input
            type="text"
            placeholder="Name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
            className={formStyles.input}
          />
          {errors.name && <span className={formStyles.error}>{errors.name.message}</span>}
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
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            {...register('password')}
            className={`${formStyles.input} ${formStyles.inputPassword}`}
          />
          <button
            type="button"
            className={formStyles.passwordToggle}
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeIcon width={22} height={22} /> : <EyeOffIcon width={22} height={22} />}
          </button>
          {errors.password && <span className={formStyles.error}>{errors.password.message}</span>}
        </div>

        {apiError && <span className={formStyles.error}>{apiError}</span>}

        <button type="submit" className={formStyles.submit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>
    </Modal>
  );
};
