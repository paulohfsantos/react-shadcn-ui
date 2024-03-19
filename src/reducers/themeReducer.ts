import type { Theme, ThemeProviderState } from "@/types/theme";

export function themeReducer(state: ThemeProviderState, action: { type: string; payload: Theme }): ThemeProviderState {
  switch (action.type) {
    case "setTheme":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}