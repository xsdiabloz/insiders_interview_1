import React from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";
import { type TTabs } from "../tabsArray/tabsArray";

type Props = {
  tab: TTabs;
  active: boolean;
  onClick: () => void;
  onPin: () => void;
  onClose: () => void;
  icon: React.ReactNode;
};

export default function SortableTab({
  tab,
  active,
  onClick,
  onPin,
  onClose,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 8px",
        border: "1px solid #ccc",
        borderBottom: active ? "2px solid blue" : "1px solid #ccc",
        background: active ? "#e0f0ff" : "#fff",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {tab.icon && <span>{tab.icon}</span>}

      <span>{tab.title}</span>

      <span
        style={{ marginLeft: "auto", cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onPin();
        }}
      >
        <PushPinIcon fontSize="small" />
      </span>

      <span
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <CloseIcon fontSize="small" />
      </span>
    </div>
  );
}
