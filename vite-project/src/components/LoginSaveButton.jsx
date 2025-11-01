import React from "react";

export default function LoginSaveButton({ isLoggedIn, onSave, isSaved }) {
  return (
    <button className="button-primary" style={{background:isSaved?'#62bb72':undefined}} onClick={onSave} disabled={!isLoggedIn}>
      {isLoggedIn ? (isSaved ? "تم الحفظ" : "حفظ للمفضلة") : "سجّل أولاً للحفظ"}
    </button>
  );
}
