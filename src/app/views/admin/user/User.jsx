import React from "react";
import { memo } from "react";
import { Button } from "reactstrap";

const User = () => {
  return (
    <div>
      <Button className="button-ppal">Producto</Button>
    </div>
  );
};

export default memo(User);
