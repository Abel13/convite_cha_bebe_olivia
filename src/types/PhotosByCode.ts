import { Database } from "./database.types";

export type PhotosByCode =
  Database["public"]["Functions"]["get_photos_by_code"]["Returns"][0];
