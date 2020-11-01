import Model from './Model';
import Tag from './Tag';

interface Blog extends Model {
  title: string;
  introduction: string;
  date: string;
  tags?: Tag[];
  content: string;
}

export default Blog;
