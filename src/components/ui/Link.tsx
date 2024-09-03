import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  to: string;
  linkText: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, linkText, children, ...props }) => {
  return (
    <Link to={to} {...props}>
      {linkText || children}
    </Link>
  );
};

export default NavLink;
