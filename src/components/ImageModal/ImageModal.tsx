import React, { useEffect } from "react";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  image: string | null;
  title?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClose,
  image,
  title,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

        <img
          src={image}
          alt={title ?? "Preview"}
          className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
        />

        
      </div>
    </div>
  );
};

export default ImageModal;