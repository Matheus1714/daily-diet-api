import { knex } from "../../database";
import { findUserByCode } from "../users/users.repository";
import { CreateMealBody, UpdateMealBody } from "./meals.schema";

export async function createMealRepository(
  { name, description, date, diet }: CreateMealBody,
  userCode: string
) {
  const user = await findUserByCode(userCode);

  await knex("meals").insert({
    name,
    description,
    date,
    diet,
    user_id: user?.id,
  });
}

export async function updateMealRepository(
  id: number,
  changes: UpdateMealBody
) {
  await knex("meals").where("id", id).update(changes);
}
