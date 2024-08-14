import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: number;
      code: string;
      name: string;
      email: string;
      hash: string;
      created_at?: string;
      updated_at?: string;
    };
  }
}
