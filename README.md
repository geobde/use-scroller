## useScroller.

React hook that automatically adds the next page, saving users from a full page load.

## Installation

```
npm i use-scroller
```

## Usage

### Example

```
import React from "react";
import { useScroller } from "use-scroller";

export default () => {
  const [moreContent, setMoreContent] = React.useState(false);
  const [page, loaderRef, scrollerRef] = useInfiniteScroll( moreContent );

    React.useEffect(() => {
     services.api.getData()
       .then((api:AxiosResponse<TestResponse>) =>   {
             setHasMore(true);
       });
  }, [page]);

  return (
      <div  ref={scrollerRef}>

      {data.map((item: any, index: number) => (
          <div>Infinite Scroll Item</div>
      ))};

      {hasMore && <div ref={loaderRef}></div>}
      <div>
  );
};

```
## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## License

MIT Licensed. Copyright (c) George Bardi 2020.
