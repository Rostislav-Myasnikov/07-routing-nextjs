'use client'

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteByTag } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NoteFilterClient() {

    const {slug} = useParams<{slug: string[]}>();
    const category = slug[0] === 'all' ? undefined : slug[0];
    const {data: note} = useQuery({
        queryKey: ['noteTag', category],
        queryFn: () => fetchNoteByTag(category),
        refetchOnMount: false,
    });
    if (!note || note?.notes.length === 0) {
            return <p>No notes found.</p>
        }
        
        return <NoteList data={note.notes} />

}