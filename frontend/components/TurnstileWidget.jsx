"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function TurnstileWidget({
  resetKey,
  onTokenChange,
  onWidgetError,
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const previousResetKeyRef = useRef(resetKey);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => {
        onWidgetError("");
        onTokenChange(token);
      },
      "expired-callback": () => {
        onTokenChange("");
      },
      "error-callback": () => {
        onTokenChange("");
        onWidgetError("Turnstile gagal dimuat. Silakan coba lagi.");
      },
    });

    return () => {
      if (widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, onWidgetError, scriptReady]);

  useEffect(() => {
    if (previousResetKeyRef.current === resetKey) return;
    previousResetKeyRef.current = resetKey;
    onTokenChange("");

    if (widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [onTokenChange, resetKey]);

  if (!siteKey) {
    return (
      <p role="alert" className="mb-4 text-sm text-error">
        Konfigurasi NEXT_PUBLIC_TURNSTILE_SITE_KEY belum diisi.
      </p>
    );
  }

  return (
    <div className="mb-5">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => onWidgetError("Skrip Turnstile gagal dimuat.")}
      />
      <div ref={containerRef} />
      {!scriptReady && (
        <p className="mt-2 text-sm text-on-surface-variant" role="status">
          Memuat verifikasi...
        </p>
      )}
    </div>
  );
}
