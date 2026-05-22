export const role = ["contributor", "maintainer"] as const;

export type TRole = typeof role[number];

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
