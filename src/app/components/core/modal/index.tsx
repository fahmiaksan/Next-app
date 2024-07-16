'use client';
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef(null);
  const close: MouseEventHandler = (e) => {
    if (e.target === ref.current) {
      router.back();
    }
  }

  return (
    <div
      className="fixed z-10 left-0 top-0 bottom-0 right-0 mx-auto bg-black/60 backdrop-blur-sm"
      onClick={close}
      ref={ref}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg">
        {children}
      </div>
    </div>
  );
}
