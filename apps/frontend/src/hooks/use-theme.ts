import { ThemeProviderContext } from "@/theme/theme-context";
import { useContext } from "react";

export const useTheme = () => {
  const theme = useContext(ThemeProviderContext);
  return theme;
};
