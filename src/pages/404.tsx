import React from "react";
import { NextPage } from "next";
import Error from "./_error";

const Custom404: NextPage = () => {
  return <Error statusCode={404} />;
};

export default Custom404;
