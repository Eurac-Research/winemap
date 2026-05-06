"use client";

import Image, { type StaticImageData } from "next/image";
import styles from "@/styles/Home.module.css";

export interface DetailField {
  label: string;
  value: string | number | null;
  icon: StaticImageData;
}

interface DetailFieldListProps {
  fields: DetailField[];
}

export function DetailFieldList({ fields }: DetailFieldListProps) {
  return (
    <dl className={styles.detailGrid}>
      {fields.map((field) => (
        <div key={field.label} className={styles.detailItem}>
          <dt>
            <Image
              src={field.icon}
              alt=""
              width={22}
              height={22}
              className={styles.detailIcon}
            />
            <span>{field.label}</span>
          </dt>
          <dd>{field.value ?? "No data"}</dd>
        </div>
      ))}
    </dl>
  );
}
