import * as React from 'react';

const previouslyLoaded: string[] = [];

interface ImageProps {
  src: string;
  alt?: string;
  placeholder?: any;
}

const Image = ({
  src,
  alt = '',
  placeholder = <React.Fragment />,
}: ImageProps) => {
  const [pending, setPending] = React.useState(true);

  React.useEffect(() => {
    if (previouslyLoaded.includes(src)) {
      setPending(false);
    } else {
      const image = new window.Image();

      image.src = src;

      image.addEventListener('load', () => {
        previouslyLoaded.push(src);
        setPending(false);
      });
    }

    return () => setPending(true);
  }, [src]);

  return (
    <React.Fragment>
      {pending && placeholder}
      {!pending && <img src={src} alt={alt} />}
    </React.Fragment>
  );
};

export default Image;
