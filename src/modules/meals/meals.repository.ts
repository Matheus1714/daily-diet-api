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

export async function deleteMealRepository(id: number) {
  await knex("meals").where("id", id).del();
}

export async function getUserMealsRepository(userCode: string) {
  const user = await findUserByCode(userCode);

  if (!user) return [];

  const meals = await knex("meals").where("user_id", user.id);

  return meals.map((meal) => ({
    id: meal.id,
    user_id: user.code,
    name: meal.name,
    description: meal.description,
    date: meal.date,
    diet: meal.diet,
    created_at: meal.created_at,
    updated_at: meal.updated_at,
  }));
}

export async function getMealRepository(id: number) {
  const meal = await knex("meals").where("id", id).first();

  if (!meal) throw new Error("Meal not found");

  const user = await knex("users").where("id", meal.user_id).first();

  return {
    id: meal.id,
    user_id: user!.code,
    name: meal.name,
    description: meal.description,
    diet: meal.diet,
    created_at: meal.created_at,
    updated_at: meal.updated_at,
  };
}
