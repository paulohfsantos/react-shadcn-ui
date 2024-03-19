import { themeReducer } from "@/reducers/themeReducer";
import { Theme, ThemeProviderProps, ThemeProviderState } from "@/types/theme";
import { createContext, useEffect, useReducer } from "react";

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => {},
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    const theme = storedTheme || defaultTheme;

    if (storedTheme) {
      dispatch({ type: "setTheme", payload: theme });
    }

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [state.theme, defaultTheme, storageKey]);

  const value = {
    theme: state.theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      dispatch({ type: "setTheme", payload: theme });
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
