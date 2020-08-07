# React hook for infinite-scrolling

React hook `useScroller()` that automatically adds the next page, saving users from a full page load, lightweight and with no other dependencies.

## Installation

Using `npm`:

```bash
npm i use-scroller --save
```

[Check the live DEMO](https://reactmoviestore.netlify.app/).

## Usage

Import the hook:

```javascript
import { useScroller } from "use-scroller";
```

### Full example

```
import React from "react";

export default () => {
  const [data, setData] = React.useState([]);
  const [moreContent, setMoreContent] = React.useState(false);
  const [page, loaderRef, scrollerRef] = useScroller( moreContent );

    React.useEffect(() => {
     
  }, [page]);

  return (
      <div  ref={scrollerRef}>
      {data.map((item, index) => (
          <div>Infinite Scroll Item</div>
      ))};
      {moreContent && <div ref={loaderRef}></div>}
      </div>
  );
};
```

## Specification

### `useScroller()` input

- `moreContent: boolean` - The custom hook runs only when is true.
- `pagination: number` - The initial pagination number

### `useScroller()` output

- `page: number` - The current pagination page (i.e. `1, 2, 3`),
- `loaderRef: number` - The element intersects either the device viewport or a specified element.
- `containerRef: number` - The element that is used as the viewport for checking visibility of the target.


## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## License

MIT Licensed. Copyright (c) George Bardi 2020.
