import {JSONSchemaType} from "ajv"
import { IUsers } from "../../interfaces";
import FileDB from "../dal/FileDB";

const usersSchema: JSONSchemaType<IUsers> = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        email: { type: 'string', format:"email"},
        password: { type: 'string', minLength: 1},
    },
    additionalProperties: true,
    required: [ 'email', 'password',],
};

FileDB.registerSchema('users', usersSchema)

export default usersSchema;
  