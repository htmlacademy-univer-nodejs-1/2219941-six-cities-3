export const OfferDTOValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  city: {
    invalidCity: 'Field city must be one of the options: \'Paris\', \'Cologne\', \'Brussels\',' +
      '\'Amsterdam\', \'Hamburg\', \'Dusseldorf\'',
  },
  imagePreview: {
    maxLength: 'Maximum image length must be 50',
  },
  offerImages: {
    invalidFormat: 'Field offerImages must be an array',
    invalidType: 'offerImages must consist of strings',
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'Field isFavorite must be a boolean',
  },
  rating: {
    min: 'Minimum rating value must be 1',
    max: 'Maximum rating value must be 5',
    invalidFormat: 'Field rating must be a number'
  },
  housingType: {
    invalidFormat: 'Field housingType must be apartment, house, room or hotel',
  },
  roomNumber: {
    min: 'Minimum roomNumber value must be 1',
    max: 'Maximum roomNumber value must be 8',
    invalidFormat: 'Field roomNumber must be an integer'
  },
  guestNumber: {
    min: 'Minimum roomNumber value must be 1',
    max: 'Maximum roomNumber value must be 10',
    invalidFormat: 'Field guestNumber must be an integer'
  },
  price: {
    min: 'Minimum price value must be 100',
    max: 'Maximum price value must be 100000',
    invalidFormat: 'Field price must be an integer'
  },
  conveniences: {
    invalidFormat: 'Field conveniences must be an array',
    invalidType: 'Conveniences must consist of either option from the list: Breakfast, Air conditioning,' +
      'Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  user: {
    invalidFormat: 'Field user must be a MongoId',
  },
  commentsNumber: {
    invalidFormat: 'Field commentsNumber must be an integer',
  },
  coordinates: {
    invalidFormat: 'Field coordinates must be an array',
    invalidType: 'Coordinates must consist of strings',
  },
} as const;
