import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MODELS = ["gpt-3.5-turbo", "gpt-4", "gpt-4-4o"];

export default function ModelSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] border-none text-xl focus:ring-transparent">
        <SelectValue placeholder="모델 선택" />
      </SelectTrigger>
      <SelectContent>
        {MODELS.map((model) => (
          <SelectItem key={model} value={model}>
            {model}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
