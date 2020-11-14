import * as React from 'react';
import style from './BlogContents.module.scss';

interface Props {
  contents: HTMLHeadingElement[];
}

const BlogContents: React.FC<Props> = (props) => {
  const { contents } = props;

  return (
    <aside className={style.contents}>
      <h2>Contents</h2>
      <div className={style.list}>
        <ol className={style.tocList}>
          {contents.map((content) => (
            <li key={content.id}>
              <a href={`#${content.id}`}>{content.innerText}</a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default BlogContents;
