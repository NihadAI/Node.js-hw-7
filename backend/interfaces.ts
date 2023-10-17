import { Request } from "express";

export interface IPost {
    id: string;
    title: string;
    text: string;
    genre: 'Politic' | 'Business' | 'Sport' | 'Other';
    isPrivate: boolean;
    createdAt: string;
}

export interface IUsers {
    id: number;
    email: string;
    password: string;
  
}

export interface IPageOptions {
    size: number;
    page: number;
}

export interface IPagedPosts {
    pageOptions: IPageOptions;
    total: number;
    results: IPost[];
}
  
export interface ExtRequest extends Request {
    pageOptions?: IPageOptions;
  }
  