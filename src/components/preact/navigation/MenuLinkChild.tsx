import { useEffect, useRef, useState, useCallback } from "preact/hooks";
import clsx from 'clsx';

interface BaseProps {
  url: string;
  title?: string;
  isActive?: boolean;
}

const defaultClasses = 'px-fluid-2xs py-fluid-3xs text-content hover:bg-line hover:text-content-shout focus:bg-line block text-base outline-hidden transition-all duration-300';

export default function MenuLinkChild({
  url,
  title,
  isActive = false,
}: BaseProps) {

  const linkClass = clsx(
    defaultClasses,
    isActive && 'border-l-tight border-l-primary text-content-shout',
  );

  return (
    <a href={url} className={linkClass} {...isActive && { 'data-state': 'active' }}>
      <span class="line-clamp-2" >{title}</span>
    </a>
  );
}
