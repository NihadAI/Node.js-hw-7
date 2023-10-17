import fs from 'fs';
import path from 'path';
import { Service } from 'typedi';
import { IPageOptions } from '../../interfaces';

@Service()
class FileDB<T> {
  public schemaName: string;
  static schemas: Record<string, any> = {};
  private filePath: string;

  constructor(schemaName: string) {
    this.schemaName = schemaName;
    this.filePath = path.join(__dirname, `${schemaName}.json`);
  }

  private async readDatabase(): Promise<T[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async saveToFile(data: T[]): Promise<void> {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }

  static async registerSchema<T>(schemaName: string, schema: T): Promise<string> {
    this.schemas[schemaName] = schema;
    return schemaName;
  }

  static async getTable<T>(schemaName: string): Promise<FileDB<T>> {
    const schema = this.schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema: '${schemaName}' is not registered!`);
    }
    return new FileDB<T>(schemaName);
  }

  async getAll(): Promise<T[]> {
    try {
      const database = await this.readDatabase();
      return database;
    } catch (error) {
      throw error;
    }
  }

  async getAllPostsPaged({ page, size }: IPageOptions): Promise<any> {
    try {
      const database = await this.readDatabase();
      const results = database.slice(page * size, (page + 1) * size);
      return {
        pageOptions: { page, size },
        total: database.length,
        results,
      };
    } catch (error) {
      throw error;
    }
  }

  async getById(item: string, field: string): Promise<T> {
    try {
      const database = await this.readDatabase();
      const data = database.find((data) => (data as any)[field] === item);
      return data as T;
    } catch (error) {
      throw error;
    }
  }

  async create(newItem: T): Promise<T> {
    try {
      const database = await this.readDatabase();
      database.push(newItem);
      await this.saveToFile(database);
      return newItem;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatedFields: Partial<T>): Promise<T> {
    try {
      const database = await this.readDatabase();
      const index = database.findIndex((item) => (item as any).id === id);
      if (index === -1) {
        throw new Error("Post not found")
      }
      const updatedItem = {
        ...database[index],
        ...updatedFields,
      };
      database[index] = updatedItem;
      await this.saveToFile(database);
      return updatedItem as T;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<T> {
    try {
      const database = await this.readDatabase();
      const index = database.findIndex((item) => (item as any).id === id);
      if (index === -1) {
        throw new Error("Post not found")
      }
      const deletedItem = database.splice(index, 1)[0];
      await this.saveToFile(database);
      return deletedItem as T;
    } catch (error) {
      throw error;
    }
  }
}

export default FileDB;
