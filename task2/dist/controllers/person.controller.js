var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { Person } from "../db/person.schema.js";
import { getBody, sendResponse } from "../lib/utils.js";
export function getPeople(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const people = yield Person.find().lean();
      return sendResponse(res, 200, people);
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, "Something went wrong");
    }
  });
}
export function createPerson(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const body = yield getBody(req);
      const { name, age, gender, mobile_number } = body;
      const person = new Person({
        name,
        age,
        gender,
        mobile_number,
      });
      yield person.save();
      return sendResponse(res, 201, "Created Person");
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, "Something went wrong");
    }
  });
}
export function updatePerson(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const params = req.params;
      if (!(params === null || params === void 0 ? void 0 : params.id)) {
        return sendResponse(res, 400, "Please provide a _id");
      }
      const body = yield getBody(req);
      const didUpdate = yield Person.updateOne(
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
  });
}
export function deletePerson(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const params = req.params;
      if (!(params === null || params === void 0 ? void 0 : params.id)) {
        return sendResponse(res, 400, "Please provide a _id");
      }
      const didDelete = yield Person.deleteOne({
        _id: params.id,
      });
      return sendResponse(res, 200, didDelete);
    } catch (error) {
      console.log(error);
      return sendResponse(res, 500, "Something went wrong");
    }
  });
}
