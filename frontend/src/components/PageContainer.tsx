import React from "react";
import styles from "./page-container.module.css";

type Props = Readonly<{
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}>;

export default function PageContainer({
  title,
  subtitle,
  actions,
  aside,
  className = "",
  children,
}: Props) {
  return (
    <div className={`${styles.container} ${className}`.trim()}>
      {(title || subtitle || actions) && (
        <header className={styles.header}>
          <div>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>

          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}

      <div className={styles.bodyWrap}>
        <main className={styles.content}>{children}</main>
        {aside && <aside className={styles.aside}>{aside}</aside>}
      </div>
    </div>
  );
}
