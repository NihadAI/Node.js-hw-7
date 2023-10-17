import express from 'express'
import { Service } from 'typedi';
import NewsPostsService from '../bll/NewsPosts.service';
import { ExtRequest } from '../../interfaces';
import pageOptionsMiddleware from '../middleware/pageOptionsMiddleware';
import Ajv from 'ajv';
import addFormats  from 'ajv-formats';
import newsPostSchema from '../models/newsPostsSchema';
import { HttpCode, ValidationError } from '../utils/customError';
import auth from '../middleware/passportMiddleware';

@Service()
class NewsController {
  private router:  express.Router;
  private postValidator: any;

  constructor(private newsPostsService: NewsPostsService) {
    this.router = express.Router(); 
    this.initializeValidators()
    this.initializeRoutes();
  }

  private initializeValidators() {
    const ajv = new Ajv({allErrors: true})
    addFormats(ajv)
    this.postValidator = ajv.compile(newsPostSchema)
  }

  private initializeRoutes() {
    this.router.get('/newsposts/error', this.testError);
    this.router.get('/newsposts', pageOptionsMiddleware(), auth.required, this.getAllPostsQuery);
    this.router.get('/newsposts/:id', auth.required, this.getPostById);
    this.router.post('/newsposts', auth.required, this.createPost);
    this.router.put('/newsposts/:id', auth.required, this.updatePost);
    this.router.delete('/newsposts/:id', auth.required, this.deletePost);
  }
  
  getAllPosts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const posts = await this.newsPostsService.getAll()
      res.send(posts);
    } catch (error) {
      next(error)
    }
  };

  getAllPostsQuery = async (req: ExtRequest, res: express.Response, next: express.NextFunction) => {
    try {
     const params = req.pageOptions;
     if (!params) {
      throw new ValidationError({name: "NewspostsServiceError", message: "No params found!", httpCode: HttpCode.NOT_FOUND});
    }
     const posts = await this.newsPostsService.getAllPostsPaged(params);
     res.send(posts);
    } catch (error) {
      next(error)
    }
   };

  getPostById = async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const post = await this.newsPostsService.getById(req.params.id);
      res.send(post);
    } catch (error) {
      next(error)
    } 
  };

  createPost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const post = req.body;
      const isValid = this.postValidator(post);  
      if (!isValid) {
        throw new ValidationError({name: "ValidationError", message: this.postValidator.errors.map((e: { message: string; }) => e.message)});
      }
      const newPost = await this.newsPostsService.create(post);
      res.send(newPost);
    } catch (error) {
      next(error);
    }
  };

  updatePost = async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const post = req.body;
      const isValid = this.postValidator(post);
      if (!isValid) {
        throw new ValidationError({name: "ValidationError", message: this.postValidator.errors.map((e: { message: string; }) => e.message)});
      }
      const updatedPost = await this.newsPostsService.update(req.params.id, req.body);
      res.send(updatedPost);
    } catch (error) {
     next(error)
    } 
  };

  deletePost = async  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const deletedPost = await this.newsPostsService.delete(req.params.id);
      res.send(deletedPost);
    } catch (error) {
        next(error)
    }
  }

  testError = (_req: express.Request, _res: express.Response, next: express.NextFunction) => {
    try {
      throw new ValidationError({ name: 'NewspostsServiceError', message: 'Test', httpCode: HttpCode.INTERNAL_SERVER_ERROR });
    } catch (error) {
      next(error);
    }
  };
}

export default NewsController