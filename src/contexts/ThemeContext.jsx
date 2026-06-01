/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { T as lightT, GRAD as lightGRAD } from "../constants/tokens";

const ThemeContext = createContext({
  T: lightT,
  GRAD: lightGRAD,
});

export const ThemeProvider = ({ children }) => {
  const T    = lightT;
  const GRAD = lightGRAD;
  return (
    <ThemeContext.Provider value={{ T, GRAD }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
