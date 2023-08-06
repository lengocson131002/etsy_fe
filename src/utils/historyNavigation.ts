import { NavigateFunction, NavigationType } from "react-router-dom"

interface HistoryNavigationType {
  navigate?: any,
  location?: any
}

export const historyNavigation = {
  navigate: null,
  location: null
} as HistoryNavigationType;
