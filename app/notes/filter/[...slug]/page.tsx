import { fetchNoteByTag } from "@/lib/api"
import NoteList from "@/components/NoteList/NoteList";

type Prop = {
    params: Promise<{ slug: string[] }>
}

export default async function NotesFilterPage({ params }: Prop) { 
    const { slug } = await params
    const category = slug[0] === 'all' ? undefined : slug[0];
    
    const response = await fetchNoteByTag(category);
    
    
    if (!response || response.notes.length === 0) {
        return <p>No notes found.</p>
    }
    
    return <NoteList data={response.notes} />
}