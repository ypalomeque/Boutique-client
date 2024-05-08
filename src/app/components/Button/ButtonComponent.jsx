import React from "react";
import { Button } from "reactstrap";
export const ButtonComponent = ({ title, icon, classButton }) => {
  return (
    <Button className={classButton}>
      {icon}
      {title}
    </Button>
  );
};
