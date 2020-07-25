import React, { useState, useEffect } from "react";
import Images from "../models/Images";
import DevClient from "../pages/api/DevClient";
import { GetStaticProps } from "next";

interface Props {
  images: Images;
}

const ImageContext = React.createContext<Images>({} as Images);

const useContextImageContext = (): Images => {
  return React.useContext(ImageContext);
};

export { useContextImageContext, ImageContext };
