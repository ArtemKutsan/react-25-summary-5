// src/components/RegistrationForm/index.jsx
import styles from './RegistrationForm.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  usernameRules,
  emailRules,
  firstNameRules,
  lastNameRules,
  passwordRules,
  confirmPasswordRules,
  ageRules,
  phoneRules,
  agreementRules,
} from './validationRules';

const API_BASE_URL = 'https://699eb24878dda56d396b04ab.mockapi.io/api/v1';
const USERS_URL = `${API_BASE_URL}/users`;

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid, isValidating },
  } = useForm({
    mode: 'onChange',
  });

  const password = watch('password');
  const username = watch('username');

  const checkUserName = async (newUsername) => {
    try {
      const response = await axios.get(USERS_URL);

      return response.data.some((user) => user.username === newUsername) ? 'Логин уже занят' : true;
    } catch (error) {
      return 'Ошибка проверки логина';
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.post(USERS_URL, data);

      console.log('Пользователь зарегистрирован!');
      reset();
    } catch (error) {
      console.log('Ошибка регистрации:', error);
    }
  };

  useEffect(() => {
    if (!username || username.length < 4) {
      clearErrors('username');
      return;
    }

    const timeoutId = setTimeout(() => {
      checkUserName(username).then((result) => {
        if (result !== true) {
          setError('username', { message: result });
        } else {
          clearErrors('username');
        }
      });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [username, setError, clearErrors]);

  return (
    <>
      <h3>Регистрация</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="text" placeholder="Логин" {...register('username', usernameRules)} />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}

        <input type="email" placeholder="Email" {...register('email', emailRules)} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <input type="text" placeholder="Имя" {...register('firstName', firstNameRules)} />
        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}

        <input type="text" placeholder="Фамилия" {...register('lastName', lastNameRules)} />
        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}

        <input type="password" placeholder="Пароль" {...register('password', passwordRules)} />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <input
          type="password"
          placeholder="Повторите пароль"
          {...register('confirmPassword', confirmPasswordRules(password))}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}

        <input type="number" placeholder="Возраст" {...register('age', ageRules)} />
        {errors.age && <span className={styles.error}>{errors.age.message}</span>}

        <input type="text" placeholder="+65XXXXXX XX-XX" {...register('phone', phoneRules)} />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}

        <label className={styles.checkbox}>
          <input type="checkbox" {...register('agreement', agreementRules)} />Я согласен с правилами
        </label>
        {errors.agreement && <span className={styles.error}>{errors.agreement.message}</span>}

        <button type="submit" disabled={!isValid || isValidating}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
