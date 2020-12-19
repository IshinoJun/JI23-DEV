import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
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
      <CreateIcon />
      {blog.createdAt && (
        <time itemProp="dateCreated datePublished">
          {formatDate(new Date(blog.createdAt))}
        </time>
      )}
      <UpdateIcon />
      {blog.revisedAt && (
        <time itemProp="dateModified">
          {formatDate(new Date(blog.revisedAt))}
        </time>
      )}
    </div>
  );
};

export default BlogDate;
