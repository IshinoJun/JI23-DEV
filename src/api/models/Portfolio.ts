import Model from "./Model";
import cmsImage from "./cmsImage";

interface Portfolio extends Model {
  name: string;
  date: string;
  introduction: string;
  image: cmsImage;
  githubLink: string;
  siteLink: string;
}

export default Portfolio;
