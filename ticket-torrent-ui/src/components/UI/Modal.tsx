import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PropsWithChildren } from "react";

const Modal: React.FC<PropsWithChildren<{ onClose: () => void }>> = ({
  children,
  onClose,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Using useEffect to sync the Modal component with the DOM Dialog API
    // This code will open the native <dialog> via it's built-in API whenever the <Modal> component is rendered
    const modal = dialog.current;
    modal?.showModal();

    return () => {
      modal?.close(); // needed to avoid error being thrown
    };
  }, []);

  const handleClose = () => {
    ;
    onClose();
  };

  return createPortal(
    <dialog className="modal left-[7%] md:left-[16.5%] xl:left-[25%] w-[86%] md:w-2/3 xl:w-1/2 p-2 md:p-4 xl:p-8" ref={dialog} onClose={handleClose}>
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
};

export default Modal;
