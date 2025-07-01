
import axios from "axios";
import { Note } from "../types/note";


const API_KEY = process.env.NEXT_PUBLIC_TOKEN;
if (!API_KEY) throw new Error("API token is not defined");


axios.defaults.baseURL = `https://notehub-public.goit.study/api`;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;


const PER_PAGE = 12;


export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

export interface CreateNoteValues {
    title: string;
    content?: string;
    tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

interface SearchParams {
    page: number;
    perPage: number;
    search?: string;
}


export const fetchNotes = async (tag?: string): Promise<Note[]> => {
    const url = tag ? `/api/notes?tag=${tag}` : '/api/notes';
    const res = await axios.get<Note[]>(url);
    return res.data;
};
export const getNoteById = async (id: string): Promise<Note> => {
    const res = await axios.get<Note>(`/api/notes/${id}`);
    return res.data;
};

export async function createNote({
    title,
    content,
    tag,
}: CreateNoteValues): Promise<Note> {
    try {
        const res = await axios.post<Note>("/notes", {
            title,
            content,
            tag,
        });
        return res.data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw new Error("Failed to create note. Please check your input.");
    }
}


export async function deleteNote(id: number): Promise<Note> {
    try {
        const res = await axios.delete<Note>(`/notes/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error deleting note with ID ${id}:`, error);
        throw new Error("Failed to delete note. It may not exist.");
    }
}


export async function fetchNoteById(id: number): Promise<Note> {
    try {
        const res = await axios.get<Note>(`/notes/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching note with ID ${id}:`, error);
        throw new Error("Failed to fetch note details.");
    }
}

export type Category = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export const getCategories = async () => {
    const res = await axios<Category[]>('/categories');
    return res.data;
};