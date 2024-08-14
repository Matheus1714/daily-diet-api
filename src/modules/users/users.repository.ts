import { CreateUserBody } from "./users.schema";
import { knex } from "../../database";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";
import { env } from "../../env";

export async function createUserRepository({
  name,
  email,
  password,
}: CreateUserBody) {
  const hash = await bcrypt.hash(password, env.SALT_ROUNDS);
  await knex("users").insert({
    code: randomUUID(),
    name,
    email,
    hash,
  });
}

export async function findUserByEmail(email: string) {
  return await knex("users").where("email", email).select().first();
}

export async function findUserByCode(code: string) {
  return await knex("users").where("code", code).first();
}
