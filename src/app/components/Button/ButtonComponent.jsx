import React from "react";
import { Button } from "reactstrap";
export const ButtonComponent = ({ title, icon, classButton, handle, style }) => {
  return (
    <Button onClick={handle} className={classButton} style={style}>
      {icon}
      {title}
    </Button>
  );
};
