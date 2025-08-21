import { create } from 'zustand';
import {Song} from "@/types/song";

interface MusicState {
    playlist: Song[];
    currentSong: Song | null;
    currentIndex: number;
    progress: number; // in milliseconds
    isLoading: boolean;

    setPlaylist: (playlist: Song[]) => void;
    setCurrentSong: (song: Song | null) => void;
    setCurrentIndex: (index: number) => void;
    setProgress: (progress: number) => void;
    setIsLoading: (isLoading: boolean) => void;

    nextSong: () => Song | null;
}

export const useMusicStore = create<MusicState>((set, get) => ({
    playlist: [],
    currentSong: null,
    currentIndex: 0,
    progress: 0,
    isLoading: false,

    setPlaylist: (playlist: Song[]) => set({ playlist }),
    setCurrentSong: (song: Song | null) => set({ currentSong: song }),
    setCurrentIndex: (index: number) => set({ currentIndex: index }),
    setProgress: (progress: number) => set({ progress }),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    nextSong: (): Song | null => {
        const { playlist, currentIndex } = get();
        if (playlist.length === 0) return null;

        const nextIndex: number = (currentIndex + 1) % playlist.length;
        const nextSong: Song = playlist[nextIndex];

        set({
            currentIndex: nextIndex,
            currentSong: nextSong,
            progress: 0
        });

        return nextSong;
    }
}));