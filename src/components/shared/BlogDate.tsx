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
      {blog.createdAt && <time>{formatDate(new Date(blog.createdAt))}</time>}
      <UpdateIcon />
      {blog.updatedAt && <time>{formatDate(new Date(blog.updatedAt))}</time>}
    </div>
  );
};

export default BlogDate;
