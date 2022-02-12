import * as React from 'react';

const previouslyLoaded: string[] = [];

type BaseProps = Omit<
  React.ComponentProps<'img'>,
  'src' | 'alt' | 'placeholder'
>;

interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  placeholder?: any;
}

const Image = (props: ImageProps) => {
  const { src, placeholder = <React.Fragment />, ...all } = props;

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
      {pending ? placeholder : <img src={src} {...all} />}
    </React.Fragment>
  );
};

export default Image;
