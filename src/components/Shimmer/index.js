import React from 'react';

import { Container, Placeholder, Shimmering } from './styles';

export default function Shimmer({ loading, children }) {
  function RenderPlaceholders() {
    // eslint-disable-next-line prefer-const
    let shimmers = [];
    for (let i = 0; i <= children.length; i++) {
      shimmers.push(
        <Shimmering
          width={300}
          duration={800}
          visible={!loading}
          height={20}
          key={`loading-${i}`}
        />
      );
    }
    return <Placeholder>{shimmers}</Placeholder>;
  }

  return loading ? <Container>{RenderPlaceholders()}</Container> : children;
}
