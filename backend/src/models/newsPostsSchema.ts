import {JSONSchemaType} from "ajv"
import { IPost } from "../../interfaces";
import FileDB from "../dal/FileDB";

const newsPostsSchema: JSONSchemaType<IPost> = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string', maxLength: 50 },
        text: { type: 'string', maxLength: 256 },
        genre: { type: 'string', enum: ['Politic', 'Business', 'Sport', 'Other'] },
        isPrivate: { type: 'boolean' },
        createdAt: { type: 'string'},
    },
    additionalProperties: false,
    required: [ 'title', 'text', 'genre', 'isPrivate'],
};


     FileDB.registerSchema('newsposts', newsPostsSchema)


export default newsPostsSchema;
  