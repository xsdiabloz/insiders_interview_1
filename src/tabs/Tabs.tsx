import React, { useEffect, useState, useRef } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { tabsArray } from "../tabsArray/tabsArray";
import { type TTabs } from "../tabsArray/tabsArray";
import SortableTab from "./sortableTab/SortableTab";
import styles from "./tabs.module.css";

export default function Tabs() {
  const [tabs, setTabs] = useState<TTabs[]>(tabsArray);
  const [activeId, setActiveId] = useState<string>(tabsArray[0].id);
  const [showPinned, setShowPinned] = useState(false);

  const [visibleNormal, setVisibleNormal] = useState<TTabs[]>(tabsArray);
  const [overflowNormal, setOverflowNormal] = useState<TTabs[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTabs = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      let total = 0;
      const visible: TTabs[] = [];
      const overflow: TTabs[] = [];

      tabs
        .filter((t) => !t.pinned)
        .forEach((tab) => {
          const tabWidth = 120;
          if (total + tabWidth <= containerWidth) {
            visible.push(tab);
            total += tabWidth;
          } else overflow.push(tab);
        });

      setVisibleNormal(visible);
      setOverflowNormal(overflow);
    };

    updateTabs();
    window.addEventListener("resize", updateTabs);
    return () => window.removeEventListener("resize", updateTabs);
  }, [tabs]);

  const handleClick = (tab: TTabs) => {
    setActiveId(tab.id);
    window.history.pushState({}, "", tab.url);
  };

  const duplicatePin = (tab: TTabs) => {
    if (!tab.originalId) {
      const pinnedId = tab.id + "-pinned";
      if (!tabs.find((t) => t.id === pinnedId)) {
        setTabs((prev) => [
          ...prev,
          { ...tab, id: pinnedId, pinned: true, originalId: tab.id },
        ]);
      }
    } else {
      setTabs((prev) => prev.filter((t) => t.id !== tab.id));
    }
  };

  const closeTab = (id: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeId === id && tabs.length > 1) setActiveId(tabs[0].id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTabs((prev) => {
      const pinned = prev.filter((t) => t.pinned);
      const normal = prev.filter((t) => !t.pinned);

      const oldIndex = normal.findIndex((t) => t.id === active.id);
      const newIndex = normal.findIndex((t) => t.id === over.id);
      const moved = arrayMove(normal, oldIndex, newIndex);

      return [...pinned, ...moved];
    });
  };

  const pinnedTabs = tabs.filter((t) => t.pinned);

  return (
    <div className={styles.container}>
      <DndContext onDragEnd={handleDragEnd}>
        <div ref={containerRef} className={styles.tabsWrapper}>
          <SortableContext
            items={visibleNormal.map((t) => t.id)}
            strategy={horizontalListSortingStrategy}
          >
            {visibleNormal.map((tab) => (
              <SortableTab
                key={tab.id}
                tab={tab}
                icon={tab.icon}
                active={tab.id === activeId}
                onClick={() => handleClick(tab)}
                onPin={() => duplicatePin(tab)}
                onClose={() => closeTab(tab.id)}
              />
            ))}
          </SortableContext>

          {overflowNormal.length > 0 && (
            <div className={styles.overflowWrapper}>
              <button className={styles.overflowButton}>More ▼</button>
              <div className={styles.overflowMenu}>
                {overflowNormal.map((tab) => (
                  <div
                    key={tab.id}
                    className={`${styles.overflowItem} ${
                      tab.id === activeId ? styles.overflowItemActive : ""
                    }`}
                    onClick={() => handleClick(tab)}
                  >
                    {tab.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {pinnedTabs.length > 0 && (
          <div className={styles.pinnedWrapper}>
            <button
              className={styles.pinnedButton}
              onClick={() => setShowPinned((prev) => !prev)}
            >
              Pinned ▼
            </button>
            {showPinned && (
              <div className={styles.pinnedMenu}>
                {pinnedTabs.map((tab) => (
                  <SortableTab
                    key={tab.id}
                    tab={tab}
                    icon={tab.icon}
                    active={tab.id === activeId}
                    onClick={() => handleClick(tab)}
                    onPin={() => duplicatePin(tab)}
                    onClose={() => closeTab(tab.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </DndContext>
    </div>
  );
}
