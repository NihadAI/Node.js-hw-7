import { Service } from "typedi";
import FileDB from "../dal/FileDB";
import { IPageOptions, IPagedPosts, IPost } from "../../interfaces";
import { v4 } from "uuid";

@Service()
class NewsPostsService {
    constructor(private newsPosts: FileDB<IPost>) {
        this.initializeNewsPosts();
    }

    private async initializeNewsPosts() {
        try {
            this.newsPosts = await FileDB.getTable('newsposts');
            console.log(this.newsPosts);
            
        } catch (error) {
            console.log(error);
        }
    }

    getAll = (): Promise<IPost[]> => {
        return this.newsPosts.getAll();
    }

    getAllPostsPaged = (params: IPageOptions): Promise<IPagedPosts> => {
        return this.newsPosts.getAllPostsPaged(params);
    }

    getById = async (id: string): Promise<IPost> => {
        const post = await this.newsPosts.getById(id, "id");
        if (!post) {
            throw new Error("Post not found"); 
        }
        return post;
    }

    create = (field: Omit<IPost, "id" | "createdAt">): Promise<IPost> => {
        const id = v4(); 
        const createdAt = new Date().toISOString()
    
        const post: IPost = {
            id,
            createdAt,
            ...field,
        };
        return this.newsPosts.create(post);
    }

    update = async (id: string, updatedFields: Omit<IPost, "id" | "createdAt">): Promise<IPost> => {
        const updatedPost = await this.newsPosts.update(id, updatedFields);
        if (!updatedPost) {
            throw new Error("Post not found"); 
        }
        return updatedPost; 
    }

    delete = async (id: string): Promise<IPost> => {
        const deletedPost = await this.newsPosts.delete(id);
        if (!deletedPost) {
            throw new Error("Post not found"); 
        }
        return deletedPost; 
    }
}

export default NewsPostsService;
