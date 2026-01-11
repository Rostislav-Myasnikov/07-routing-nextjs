'use client'

import css from "./Modal.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Prop = {
  children: React.ReactNode;
};

export default function Modal({children}:Prop) {
  const router = useRouter()
  const close = () => router.back();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
}

 useEffect(() => {
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      close();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
	
	  return () => {
	    document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
	  };
	}, [router]);

  return (
  <div className={css.backdrop} onClick={handleBackdropClick}>
  <div className={css.modal}>
    {children}
    <button onClick={close}>Close</button>
  </div>
  </div>
  )
}