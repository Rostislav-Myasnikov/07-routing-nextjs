"use client"

import css from "./notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import AddNoteModal from "@/components/AddNoteModal/AddNoteModal";
import { Toaster } from "react-hot-toast";


function NotesClient() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isModal, setIsModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes(query, page),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            setQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
          />
          {data && data?.totalPages > 1 && <Pagination totalPages={data.totalPages} page={page} setPage={setPage} />}
          <button onClick={() => setIsModal(true)} className={css.button}>
            Create note +
          </button>
        </header>
        {data && <NoteList data={data?.notes} />}
      </div>
      {isModal && <AddNoteModal closeModal={() => setIsModal(false)} />}
      <Toaster />
    </>
  );
}

export default NotesClient;
