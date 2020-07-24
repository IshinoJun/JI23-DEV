import Tag from "./Tag";

interface Blog {
  id: string;
  title: string;
  introduction: string;
  date: string;
  tags?: Tag[];
  ogp: { url: string };
  ogpTitle: string;
  content: string;
}

export default Blog;
