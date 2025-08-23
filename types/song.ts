export type Song = {
    id: string;
    title: string;
    album?: string;
    artist: string;
    duration: number; // Duration in milliseconds
    genre: string;
    coverUrl: string;
}