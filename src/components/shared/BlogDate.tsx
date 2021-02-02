import React from 'react';
import Blog from '../../models/Blog';
import { formatDate } from '../../utils/FormatUtils';
import style from './BlogDate.module.scss';

interface Props {
  blog: Blog;
}

const BlogDate: React.FC<Props> = (props) => {
  const { blog } = props;

  return (
    <div className={style.date}>
      {blog.revisedAt && (
        <time itemProp="dateModified">
          {formatDate(new Date(blog.revisedAt))}
        </time>
      )}
    </div>
  );
};

export default BlogDate;
