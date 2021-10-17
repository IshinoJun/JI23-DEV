import { Blog, Model } from '.';

export interface Category extends Model {
  name: string;
  posts: Blog[];
}
