import { createContext, useState, ReactNode } from "react";

interface NavbarContextProps {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContextProps>({
  showNavbar: localStorage.getItem("sidebar") === "true" ? true : false,
  setShowNavbar: () => {},
});

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState(localStorage.getItem("sidebar") === "true" ? true : false);
  const data = localStorage.getItem("nextauth.message");
  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;
