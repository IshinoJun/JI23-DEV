import { Category, ImageUr, Model, Tag } from '.';

export interface Blog extends Model {
  title: string;
  category: Category;
  tags?: Tag[];
  content: string;
  blogImage: ImageUr;
}
