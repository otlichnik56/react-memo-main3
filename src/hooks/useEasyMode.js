import { useContext } from "react";
import { EasyModeContext } from "../contexts/EasyModeContext";

export const useEasyMode = () => {
  return useContext(EasyModeContext);
};