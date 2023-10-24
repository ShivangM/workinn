'use client';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  lines: number;
  children: React.ReactNode;
  className?: string;
};

const ReadMorePara = ({ lines, children, className }: Props) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <p className={classNames(className, 'space-x-2')}>
      <span className={readMore ? '' : `line-clamp-3`}>{children}</span>
      <span
        onClick={() => setReadMore(!readMore)}
        className="font-semibold cursor-pointer"
      >
        {readMore ? 'Read Less' : 'Read More'}
      </span>
    </p>
  );
};

export default ReadMorePara;
