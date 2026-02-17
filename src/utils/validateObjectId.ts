import { ObjectId } from "mongodb";
import { BadRequestError } from "../errors/app-error";

export const validateObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new BadRequestError("invalid id format");
  }
};
