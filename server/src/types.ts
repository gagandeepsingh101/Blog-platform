import { Model, ObjectId } from "mongoose"
import { Document } from "mongoose"

export interface ResponseBody {
    success: boolean,
    message: string
}
export interface RequestBody {
    success: boolean,
    message: string
}
export interface RegisterRequestBody {
    name: string,
    username: string,
    email: string,
    password: string
}
export interface LoginRequestBody {
    email: string,
    password: string
}
export interface LogOutRequestBody {
    _id: string,
}
export interface Blog {
    title: string,
    description: string,
    authorId: ObjectId
}
export interface BlogDocument extends Blog, Document { };
export interface BlogModelTypes extends Model<BlogDocument> { };

export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface UserDocument extends User, Document { }
export interface UserModelTypes extends Model<UserDocument> { }
