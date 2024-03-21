import React, { memo } from "react";
import Styles from "./header-styles.scss";
import Logo from "@/presentation/components/logo/logo";

const Header: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>gotech.education</h1>
    </header>
  );
};

export default memo(Header);
