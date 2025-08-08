class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
  }
}

export const notFoundError = (id: number): CustomError => new CustomError(
  'NotFound',
  `News with id ${id} not found.`
);

export const conflictError = (title: string): CustomError => new CustomError(
  'Conflict',
  `News with title ${title} already exist`
);

export const minCharactersError = (): CustomError => new CustomError(
  'BadRequest',
  `The news text must be at least 500 characters long.`
);

export const invalidDateError = (): CustomError => new CustomError(
  'BadRequest',
  `The publication date cannot be in the past.`
);