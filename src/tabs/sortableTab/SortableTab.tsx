import React from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import CloseIcon from "@mui/icons-material/Close";
import { type TTabs } from "../../tabsArray/tabsArray";
import styles from "./SortableTab.module.css";

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
      className={`${styles.tab} ${active ? styles.tabActive : ""}`}
      onClick={onClick}
    >
      {tab.icon && <span>{tab.icon}</span>}
      <span>{tab.title}</span>

      <span
        className={styles.iconWrapper}
        onClick={(e) => {
          e.stopPropagation();
          onPin();
        }}
      >
        <PushPinIcon fontSize="small" />
      </span>

      <span
        className={styles.closeIcon}
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
