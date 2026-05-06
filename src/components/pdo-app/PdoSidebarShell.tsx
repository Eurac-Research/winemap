"use client";

import { type ReactNode } from "react";
import styles from "@/styles/Home.module.css";

interface PdoSidebarShellProps {
  top: ReactNode;
  body: ReactNode;
}

export function PdoSidebarShell({ top, body }: PdoSidebarShellProps) {
  return (
    <div className={styles.panelFrame}>
      <div className={styles.sidebarShell}>
        <div className={styles.filterBarContent}>{top}</div>
        <div className={styles.sidebarBody}>{body}</div>
      </div>
    </div>
  );
}
