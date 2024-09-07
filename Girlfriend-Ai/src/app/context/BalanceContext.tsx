// context/BalanceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BalanceContextType {
  balance: number | null;
  // setBalance: (balance: number | null) => void;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>;

}

const BalanceContext = createContext<BalanceContextType>({
  balance: null,
  setBalance: () => {},
});

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number | null>(null);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
