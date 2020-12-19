// eslint-disable-next-line import/no-cycle
import Category from './Category';
import Model from './Model';
import Tag from './Tag';

interface Blog extends Model {
  title: string;
  category: Category;
  tags?: Tag[];
  content: string;
}

export default Blog;
