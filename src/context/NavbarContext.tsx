import { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextProps {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContextProps>({
  showNavbar: false,
  setShowNavbar: () => {},
});

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;
