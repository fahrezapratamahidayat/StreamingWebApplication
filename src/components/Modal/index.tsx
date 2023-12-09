import { MouseEventHandler, useEffect, useRef, useState } from "react";

export default function Modal({
  children,
  slug,
  title,
  season,
  episodes,
  onClose,
}: {
  children: React.ReactNode;
  slug: string;
  title: string | undefined;
  season: string;
  episodes: number;
  onClose: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(true);
  const overlay: any = useRef(null);

  useEffect(() => {
    // Add event listener to handle the Escape key press
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener to handle clicking outside the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (overlay.current && !overlay.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listeners when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <div
      ref={overlay}
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/10 z-50 ${
        modalOpen ? "modal-open" : ""
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 bottom-0 flex items-center justify-center z-50 rounded shadow-md">
        {children}
      </div>
    </div>
  );
}
