"use client"

import css from "./page.module.css";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";


export default function NotePreviewClient() {

  const { id } = useParams<{ id: string }>();
  const {
    data: note
  } = useQuery({
    queryKey: ["notePrevie", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <h2 className={css.header}>{note?.content}</h2>
          <p className={css.content}>{note?.content}</p>
          <p className={css.date}>{note?.createdAt}</p>
          <p className={css.tag}>{note?.tag}</p>
        </div>
      </div>
    </Modal>
  );
}
