import * as React from 'react';
import style from './BlogContents.module.scss';

interface Props {
  contents: HTMLHeadingElement[];
}

const BlogContents: React.FC<Props> = (props) => {
  const { contents } = props;

  return (
    <div className={style.contents}>
      <div className={style.warp}>
        <h2>Contents</h2>
        <div className={style.list}>
          <ol className={style.tocList}>
            {contents.map((content, i) => (
              <li key={content.id} className={i + 1 >= 10 ? style.noZero : ''}>
                <a href={`#${content.id}`}>{content.innerText}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BlogContents;
