import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  darkSrc?: string;
}

const Image: FC<ImageProps> = (props) => {
  const { src, darkSrc, className } = props;

  return (
    <>
      <img src={src} className={clsx("dark:hidden", className)} />
      <img
        src={darkSrc ?? src.replace("light", "dark")}
        className={clsx("hidden dark:block", className)}
      />
    </>
  );
};

export default Image;
