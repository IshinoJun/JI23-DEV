import { CmsImage, Model, Tag } from '.';

export interface Portfolio extends Model {
  name: string;
  date: string;
  introduction: string;
  image: CmsImage;
  githubLink: string;
  siteLink: string;
  tags?: Tag[];
}
