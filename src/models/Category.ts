import Model from './Model';
// eslint-disable-next-line import/no-cycle
import Blog from './Blog';

interface Category extends Model {
  name: string;
  posts: Blog[];
}

export default Category;
