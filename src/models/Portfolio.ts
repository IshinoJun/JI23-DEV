import Model from './Model';
import CmsImage from './CmsImage';
import Tag from './Tag';

interface Portfolio extends Model {
  name: string;
  date: string;
  introduction: string;
  image: CmsImage;
  githubLink: string;
  siteLink: string;
  tags?: Tag[];
}

export default Portfolio;
