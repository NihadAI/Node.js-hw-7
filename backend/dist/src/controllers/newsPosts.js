"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
const newsPosts_1 = require("../models/newsPosts");
const getAllPosts = async (req, res) => {
    try {
        const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
        const posts = await newsPostsTable.getAll();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
};
exports.getAllPosts = getAllPosts;
const getPostById = async (req, res) => {
    try {
        const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
        const post = await newsPostsTable.getById(req.params.id);
        res.json(post);
    }
    catch (error) {
        res.status(404).json({ error: 'Post not found.' });
    }
};
exports.getPostById = getPostById;
const createPost = async (req, res) => {
    try {
        const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
        const newPost = await newsPostsTable.create(req.body);
        res.json(newPost);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
        const updatedPost = await newsPostsTable.update(req.params.id, req.body);
        res.json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const newsPostsTable = await newsPosts_1.FileDB.getTable('newspost');
        const deletedPost = await newsPostsTable.delete(req.params.id);
        res.json(deletedPost);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
};
exports.deletePost = deletePost;
