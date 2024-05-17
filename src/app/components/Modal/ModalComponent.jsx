import React from "react";

import { Modal, ModalBody, ModalHeader } from "reactstrap";

export const ModalComponent = ({ open, w100Modal, children }) => {
  return (
    <div>
      <Modal isOpen={open} className={w100Modal}>
        {children}
      </Modal>
    </div>
  );
};
