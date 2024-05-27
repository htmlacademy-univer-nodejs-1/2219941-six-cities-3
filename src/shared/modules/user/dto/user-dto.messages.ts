export const UserDTOValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  email: {
    invalidFormat: 'Invalid email format',
  },
  avatar: {
    invalidFormat: 'Field avatar must be string'
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
  type: {
    invalidFormat: 'Field type must be pro or обычный',
  }
} as const;
