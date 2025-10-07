import bcrypt from "bcrypt";
import * as usersRepo from "../repository/usersRepo";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existing = await usersRepo.findUserByEmail(email);
  if (existing) throw new Error("Email already in use");
  const passwordHash = await bcrypt.hash(password, 10);
  return usersRepo.createUser({ name, email, passwordHash });
}

export async function loginUser(email: string, password: string) {
  const user = await usersRepo.findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid email or password");
  return user;
}


