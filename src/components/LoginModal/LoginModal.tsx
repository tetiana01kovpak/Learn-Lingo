import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearError, loginUser } from '@/store/authSlice';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icons';
import formStyles from '@/components/Modal/forms.module.css';

interface FormValues {
  email: string;
  password: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
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

export const LoginModal = ({ open, onClose }: Props) => {
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
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success(`Welcome back, ${result.payload.name}!`);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Log in">
      <h2 className={formStyles.title}>Log In</h2>
      <p className={formStyles.subtitle}>
        Welcome back! Please enter your credentials to access your account and continue your search for a teacher.
      </p>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
            autoComplete="current-password"
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
            {showPassword ? <EyeIcon width={20} height={20} /> : <EyeOffIcon width={20} height={20} />}
          </button>
          {errors.password && <span className={formStyles.error}>{errors.password.message}</span>}
        </div>

        {apiError && <span className={formStyles.error}>{apiError}</span>}

        <button type="submit" className={formStyles.submit} disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </Modal>
  );
};
