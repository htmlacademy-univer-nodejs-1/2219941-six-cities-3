export const CreateCommentValidationMessage = {
  text: {
    minLength: 'Minimum text length must be 5',
    maxLength: 'Maximum description length must be 1024',
  },
  userId: {
    invalidFormat: 'Field userId must be a MongoId',
  },
  offerId: {
    invalidFormat: 'Field offerId must be a MongoId',
  },
} as const;
