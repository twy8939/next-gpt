import React from "react";
import { Button, ButtonProps } from "../ui/button";

export default function Submit({ children, ...others }: ButtonProps) {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
