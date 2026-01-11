import { fetchNoteById } from "@/lib/api";
import css from "./page.module.css";
import Modal from "@/components/Modal/Modal";

type Prop = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Prop) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
        <div className={css.container}>
    <div className={css.item}>
      <h2 className={css.header}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{note.createdAt}</p>
      <p className={css.tag}>{note.tag}</p>
    </div>
</div>
    </Modal>
  );
}
