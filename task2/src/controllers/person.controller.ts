import { ServerResponse } from "http";
import { ServerRequest } from "../types";
import { IPerson, Person } from "../db/person.schema";
import { getBody, parseURL, sendResponse } from "../lib/utils";

export async function getPeople(req: ServerRequest, res: ServerResponse) {
  try {
    const people = await Person.find().lean();
    return sendResponse(res, 200, people);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}

export async function createPerson(req: ServerRequest, res: ServerResponse) {
  try {
    const body = (await getBody(req)) as IPerson;
    const { name, age, gender, mobile_number }: IPerson = body;

    const person = new Person({
      name,
      age,
      gender,
      mobile_number,
    });

    await person.save();

    return sendResponse(res, 201, "Created Person");
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}

export async function updatePerson(req: ServerRequest, res: ServerResponse) {
  try {
    const params = req.params;
    if (!params?.id) {
      return sendResponse(res, 400, "Please provide a _id");
    }

    const body = (await getBody(req)) as Partial<IPerson>;

    const didUpdate = await Person.updateOne(
      {
        _id: params.id,
      },
      body
    );
    return sendResponse(res, 200, didUpdate);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}

export async function deletePerson(req: ServerRequest, res: ServerResponse) {
  try {
    const params = req.params;
    if (!params?.id) {
      return sendResponse(res, 400, "Please provide a _id");
    }

    const didDelete = await Person.deleteOne({
      _id: params.id,
    });
    return sendResponse(res, 200, didDelete);
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, "Something went wrong");
  }
}
