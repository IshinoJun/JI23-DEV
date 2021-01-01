interface BlogsQuery {
  tagId?: string;
  categoryId?: string;
  keyword?: string;
  limit?: string;
  offset?: string;
  ids?: string[];
}

export default BlogsQuery;
