import { Database } from "./database.types";

export type PhotosByCode =
  Database["public"]["Functions"]["get_photos"]["Returns"][0];
