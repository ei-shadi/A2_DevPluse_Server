import config from "../../config";
import { sql } from "../../db";
import { USER_ROLE, type TAuthUser, type TUser } from "../../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registration Service
const registerUserIntoDB = async (payload: TAuthUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await sql`
    SELECT email FROM users WHERE email = ${email}
  `;

  if (existingUser.length > 0) {
    throw new Error(
      "Email is already registered. Please try with another one.",
    );
  }

  if (!role || USER_ROLE[role] === undefined) {
    throw new Error("Invalid role provided. Please try with valid role.");
  }

  const result = await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${hashedPassword}, COALESCE(${role}, 'contributor'))
    RETURNING id, name, email, role, created_at, updated_at
  `;

  return result[0];
};

// Login Service
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  // TODO: User email Validation
  const existingUser = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existingUser.length === 0) {
    throw new Error("Invalid Email. Please try with a registered email.");
  }

  const { password: hashedPassword, ...user } = existingUser[0] as TUser;

  // TODO: Password Validation
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid Password. Please try again.");
  }

  //TODO: JWT Token Generation
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret_key, {
    expiresIn: "1d",
  });

  return { token, user };
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
