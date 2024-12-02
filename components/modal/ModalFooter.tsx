import React from "react";
import { Button } from "../ui/button";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ModalFooter({ onCancel, onConfirm }: Props) {
  return (
    <>
      <Button variant={"destructive"} onClick={onConfirm}>
        삭제
      </Button>
      <Button onClick={onCancel}>취소</Button>
    </>
  );
}
