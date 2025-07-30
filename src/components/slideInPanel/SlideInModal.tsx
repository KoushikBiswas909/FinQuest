import React from "react";
import { ImCross } from "react-icons/im";

interface SlideInModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const SlideInModal: React.FC<SlideInModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Left hazy background */}
        <div
          className="flex-grow bg-black/20 backdrop-blur-[1px]"
          onClick={onClose}
        ></div>

        {/* Right spacer equal to panel width */}
        <div style={{ width: "50vw" }} />
      </div>

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
        style={{ width: "50vw" }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-black font-semibold">{title || "Modal"}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black focus:outline-none"
            aria-label="Close"
          >
            <ImCross />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </>
  );
};

export default SlideInModal;
