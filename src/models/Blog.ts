import Model from './Model';
import Tag from './Tag';

interface Blog extends Model {
  title: string;
  tags?: Tag[];
  content: string;
}

export default Blog;
