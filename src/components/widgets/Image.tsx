import { ComponentProps, useEffect, useState } from "react";

type BaseProps = Omit<ComponentProps<"img">, "placeholder">;

interface ImageProps {
  src: string;
  fallback?: string;
  placeholder?: any;
}

const previouslyLoaded: string[] = [];

const Image = ({
  src,
  fallback,
  placeholder,
  ...props
}: ImageProps & BaseProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (previouslyLoaded.includes(src)) return setLoading(false);

    const image = new window.Image();

    image.onload = () => {
      previouslyLoaded.push(src);
      setLoading(false);
    };

    image.onerror = () => {
      setError(true);
      setLoading(false);
    };

    image.src = src;

    return () => {
      setError(false);
      setLoading(true);

      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <>
      {loading && placeholder}
      {!loading && (
        <img src={error ? fallback : src} loading="lazy" {...props} />
      )}
    </>
  );
};

export default Image;
