// src/components/RegistrationForm/index.jsx
import styles from './RegistrationForm.module.css';
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

        <button type="submit" disabled={!isValid || isValidating}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
