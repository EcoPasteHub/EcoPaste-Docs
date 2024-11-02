import React, { FC, AnchorHTMLAttributes } from "react";

const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const { children, ...rest } = props;

  return (
    <a
      {...rest}
      className="font-medium text-[var(--rp-c-link)] hover:border-b hover:border-[var(--rp-c-brand)] hover:opacity-85"
    >
      {children}
    </a>
  );
};

export default Link;
