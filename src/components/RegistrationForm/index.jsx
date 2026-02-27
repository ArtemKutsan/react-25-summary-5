// src/components/RegistrationForm/index.jsx
import styles from './RegistrationForm.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_BASE_URL = 'https://699eb24878dda56d396b04ab.mockapi.io/api/v1';
const USERS_URL = `${API_BASE_URL}/users`;

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  return (
    <>
      <h3>Регистрация</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="text"
          placeholder="Логин"
          {...register('username', {
            required: 'Введите логин',
            minLength: { value: 4, message: 'Минимум 4 символа' },
            maxLength: { value: 20, message: 'Максимум 20 символов' },
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: 'Только латиница, цифры и _',
            },
            validate: checkUserName,
          })}
        />
        {errors.username && <span className={styles.error}>{errors.username.message}</span>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Введите email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Некорректный email',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <input
          type="text"
          placeholder="Имя"
          {...register('firstName', {
            required: 'Введите имя',
            minLength: { value: 2, message: 'Минимум 2 буквы' },
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/,
              message: 'Только буквы',
            },
          })}
        />
        {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}

        <input
          type="text"
          placeholder="Фамилия"
          {...register('lastName', {
            required: 'Введите фамилию',
            minLength: { value: 2, message: 'Минимум 2 буквы' },
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё]+$/,
              message: 'Только буквы',
            },
          })}
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}

        <input
          type="password"
          placeholder="Пароль"
          {...register('password', {
            required: 'Введите пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' },
            validate: {
              hasUpper: (v) => /[A-Z]/.test(v) || 'Нужна хотя бы одна заглавная буква',
              hasDigit: (v) => /\d/.test(v) || 'Нужна хотя бы одна цифра',
            },
          })}
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <input
          type="password"
          placeholder="Повторите пароль"
          {...register('confirmPassword', {
            required: 'Повторите пароль',
            validate: (v) => v === password || 'Пароли не совпадают',
          })}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword.message}</span>
        )}

        <input
          type="number"
          placeholder="Возраст"
          {...register('age', {
            required: 'Введите возраст',
            min: { value: 18, message: 'Минимум 18' },
            max: { value: 100, message: 'Максимум 100' },
          })}
        />
        {errors.age && <span className={styles.error}>{errors.age.message}</span>}

        <input
          type="text"
          placeholder="+65XXXXXX XX-XX"
          {...register('phone', {
            required: 'Введите телефон',
            pattern: {
              value: /^\+65\d{6}\s?\d{2}-\d{2}$/,
              message: 'Формат: +65XXXXXX XX-XX',
            },
          })}
        />
        {errors.phone && <span>{errors.phone.message}</span>}

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            {...register('agreement', {
              required: 'Необходимо согласие',
            })}
          />
          Я согласен с правилами
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
