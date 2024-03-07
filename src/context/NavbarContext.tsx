import { createContext, useState, ReactNode, useEffect } from "react";

interface NavbarContextProps {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarContext = createContext<NavbarContextProps>({
  showNavbar: true,
  setShowNavbar: () => {},
});

const NavbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [showNavbar, setShowNavbar] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedShowNavbar = window.localStorage.getItem("UiSidebar.State");
      return storedShowNavbar ? JSON.parse(storedShowNavbar) : true;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localState = localStorage.getItem("UiSidebar.State");
      if (localState) {
        setShowNavbar(JSON.parse(localState));
      }
    }
  }, [showNavbar]);

  return (
    <NavbarContext.Provider value={{ showNavbar, setShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;