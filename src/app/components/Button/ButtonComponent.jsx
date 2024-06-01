import React from "react";
import { Button } from "reactstrap";
export const ButtonComponent = ({ title, icon, classButton, handle, style, disable }) => {
  return (
    <Button onClick={handle} className={classButton} style={style} disabled={disable}>
      {icon}
      {title}
    </Button>
  );
};
