import { useTheme } from "next-themes";
import React from "react";
import Layout from "./Layout";
import Popular from "./Popular";
const Main = () => {
  // const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div>
        <Popular />
      </div>
    </Layout>
  );
};

export default Main;
