"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

export default function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative inline-flex items-center gap-4">
      <Magnetic>
        <button
          type="button"
          onClick={copy}
          className={`inline-flex h-14 items-center bg-accent-fill px-7 font-medium text-on-accent transition-transform duration-200 active:scale-95 ${className}`}
        >
          {copied ? "Copiado" : "Copiar e-mail"}
        </button>
      </Magnetic>
      <span role="status" aria-live="polite" className="text-small text-muted">
        {copied ? "Está na sua área de transferência." : ""}
      </span>
    </div>
  );
}
