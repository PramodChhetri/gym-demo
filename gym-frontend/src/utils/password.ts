import bcrypt from "bcrypt";

/**
 * Hashes a plaintext password using bcrypt.
 * @param password The plaintext password.
 * @returns The hashed password.
 */
export const saltAndHashPassword = (password: string): string => {
  const saltRounds = 10; // Define the number of salt rounds
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

/**
 * Compares a plaintext password with a hashed password.
 * @param password The plaintext password.
 * @param hash The hashed password.
 * @returns True if the password matches, otherwise false.
 */
export const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
