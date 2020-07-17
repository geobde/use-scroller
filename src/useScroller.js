import { useState, useRef, useLayoutEffect } from 'react';

export default function useScroller( moreContent, initialPagination = 0 ) {
    const [page, setPage] = useState(initialPagination);
    const containerRef = useRef();
    const loaderRef = useRef();
    const chart = {
        prevY: -1,
        previousRatio: -1,
        bottomLine:false,
        observerOptions: {
          root: containerRef.current,
          threshold: 1.0
        },
        callback: (entries) =>  {
              entries.forEach(({ isIntersecting, intersectionRatio, boundingClientRect = {} }) => {
                const { y } = boundingClientRect;
                if ( isIntersecting && intersectionRatio >= chart.previousRatio && (!chart.prevY || y < chart.prevY) ) {
                  setPage(page => page + 1);
                }
                chart.prevY = y;
                chart.previousRatio = intersectionRatio;
              },
          );
        }
    };

    useLayoutEffect(() => {
        if ( !containerRef.current || !loaderRef.current || !moreContent ) {
          return;
    };

    const observer = new IntersectionObserver(chart.callback, chart.observerOptions);
    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [moreContent]);

  return [page, 
          loaderRef, 
          containerRef
  ];
};