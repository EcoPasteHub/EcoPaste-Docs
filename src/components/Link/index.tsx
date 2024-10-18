import clsx from "clsx";
import React, { FC, HTMLAttributes, useEffect } from "react";
import styles from "./index.module.scss";

const Link: FC<HTMLAttributes<HTMLAnchorElement>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <a {...rest} className={clsx(styles.root, className)}>
      {children}
    </a>
  );
};

export default Link;
