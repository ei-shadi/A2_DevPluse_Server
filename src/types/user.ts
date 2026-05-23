export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export type TRole = typeof USER_ROLE[keyof typeof USER_ROLE]

export type TUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TRole;
  created_at: Date;
  updated_at: Date;
}

export type TAuthUser = Omit<TUser, "id" | "created_at" | "updated_at">;
