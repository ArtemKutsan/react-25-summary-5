export const usernameRules = {
  required: 'Введите логин',
  minLength: { value: 4, message: 'Минимум 4 символа' },
  maxLength: { value: 20, message: 'Максимум 20 символов' },
  pattern: {
    value: /^[A-Za-z0-9_]+$/,
    message: 'Только латиница, цифры и _',
  },
};

export const emailRules = {
  required: 'Введите email',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Некорректный email',
  },
};

export const firstNameRules = {
  required: 'Введите имя',
  minLength: { value: 2, message: 'Минимум 2 буквы' },
  pattern: {
    value: /^[A-Za-zА-Яа-яЁё]+$/,
    message: 'Только буквы',
  },
};

export const lastNameRules = firstNameRules;

export const passwordRules = {
  required: 'Введите пароль',
  minLength: { value: 6, message: 'Минимум 6 символов' },
  validate: {
    hasUpper: (v) => /[A-Z]/.test(v) || 'Нужна хотя бы одна заглавная буква',
    hasDigit: (v) => /\d/.test(v) || 'Нужна хотя бы одна цифра',
  },
};

export const confirmPasswordRules = (password) => ({
  required: 'Повторите пароль',
  validate: (v) => v === password || 'Пароли не совпадают',
});

export const ageRules = {
  required: 'Введите возраст',
  min: { value: 18, message: 'Минимум 18' },
  max: { value: 100, message: 'Максимум 100' },
};

export const phoneRules = {
  required: 'Введите телефон',
  pattern: {
    value: /^\+65\d{6}\s?\d{2}-\d{2}$/,
    message: 'Формат: +65XXXXXX XX-XX',
  },
};

export const agreementRules = {
  required: 'Необходимо согласие',
};
