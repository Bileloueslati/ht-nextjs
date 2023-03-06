import { Intervention } from "@/__typescript";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";

export type InterventionsContextT = {
  interventions: Intervention[];
};

const GlobalDataContext = createContext<InterventionsContextT | null>(null);

export type GlobalDataContextProviderProps = PropsWithChildren & {
  interventions: Intervention[];
};

export const GlobalContextProvider: FunctionComponent<
  GlobalDataContextProviderProps
> = ({ interventions, children }) => (
  <GlobalDataContext.Provider value={{ interventions }}>
    {children}
  </GlobalDataContext.Provider>
);

export const useGlobalContext = () => {
  const context = useContext(GlobalDataContext);

  if (!context) {
    throw new Error("Wrappe your component inside <GlobalContextProvider />");
  }

  return context;
};
