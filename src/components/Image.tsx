import React, { FC } from "react";

interface ImageProps {
  src: string;
  darkSrc?: string;
}

const Image: FC<ImageProps> = (props) => {
  const { src, darkSrc } = props;

  return (
    <>
      <img src={src} className="dark:hidden" />
      <img
        src={darkSrc ?? src.replace("light", "dark")}
        className="hidden dark:block"
      />
    </>
  );
};

export default Image;
