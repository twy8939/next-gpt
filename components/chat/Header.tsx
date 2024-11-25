import React from "react";
import MobileMenu from "./MobileMenu";
import ModelSelect from "./ModelSelect";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center p-2 bg-white">
      {/* 모바일 메뉴 영역 */}
      <MobileMenu>
        <Sidebar />
      </MobileMenu>
      {/* 모델 선택 영역 */}
      <ModelSelect />
    </div>
  );
}
