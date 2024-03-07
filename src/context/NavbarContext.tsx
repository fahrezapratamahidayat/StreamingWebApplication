import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface NavbarContextProps {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContextProps>({
  showNavbar: false,
  setShowNavbar: () => {},
});

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const storedShowNavbar = localStorage.getItem("sidebar");
    if (storedShowNavbar) {
      setShowNavbar(JSON.parse(storedShowNavbar));
    }
  }, []);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;