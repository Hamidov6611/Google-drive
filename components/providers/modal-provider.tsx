import React from "react";
import FolderModal from "../modals/folder-modal";

const ModalProvider = () => {
  return (
    <div className="fixed inset-0">
      <FolderModal />
    </div>
  );
};

export default ModalProvider;
