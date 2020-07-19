import Model from "./Model";
import CmsImage from "./CmsImage";

interface Portfolio extends Model {
  name: string;
  date: string;
  introduction: string;
  image: CmsImage;
  githubLink: string;
  siteLink: string;
}

export default Portfolio;
