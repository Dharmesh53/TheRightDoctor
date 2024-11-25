import { IncomingMessage, ServerResponse } from "http";
import { Person } from "../db/person.schema";
import { getBody, parseURL, sendResponse } from "../lib/utils";

export async function getPeople(req: IncomingMessage, res: ServerResponse) {
  try {
    const people = await Person.find().lean();
    return sendResponse(res, 200, people);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}

export async function createPerson(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = getBody(req);
    console.log(body);
    return sendResponse(res, 200, "Created something");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}

export async function updatePerson() {}
export async function deletePerson() {}
