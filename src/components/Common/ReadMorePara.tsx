'use client';
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

type Props = {
  lines: number;
  children: React.ReactNode;
  className?: string;
};

const ReadMorePara = ({ lines, children, className }: Props) => {
  const [readMore, setReadMore] = useState(false);
  const contentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(getComputedStyle(contentRef.current).lineHeight, 10);
      const maxHeight = lineHeight * lines;
      const contentHeight = contentRef.current.clientHeight;
      if (contentHeight > maxHeight) {
        setReadMore(true);
      }
    }
  }, [lines]);

  console.log(readMore)

  return (
    <p className={classNames(className, 'space-x-2')}>
      <span ref={contentRef} className={classNames({ 'line-clamp-3': !readMore })}>
        {children}
      </span>

      <span onClick={() => setReadMore(!readMore)} className="font-semibold cursor-pointer">
        {readMore ? 'Read Less' : 'Read More'}
      </span>
    </p>
  );
};

export default ReadMorePara;
