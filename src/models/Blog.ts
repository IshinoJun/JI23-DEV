// eslint-disable-next-line import/no-cycle
import Category from './Category';
import ImageUr from './ImageUrl';
import Model from './Model';
import Tag from './Tag';

interface Blog extends Model {
  title: string;
  category: Category;
  tags?: Tag[];
  content: string;
  blogImage: ImageUr;
}

export default Blog;
