import { sql } from "../../db";
import type { IAuthUser } from "../../types/user.types";
import bcrypt from "bcrypt";

const registerUserIntoDB = async (payload: IAuthUser) =>  {
  const {name, email, password, role} = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await sql`
    SELECT email FROM users WHERE email = ${email}
  `;

  if (existingUser.length > 0) {
    throw new Error("Email is already registered. Please try with another one.");
  }

  const result = await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${hashedPassword}, COALESCE(${role}, 'contributor'))
    RETURNING id, name, email, role, created_at, updated_at
  `;

  return result[0];

}



export const authService = {
  registerUserIntoDB,
}