import { getDocs, collection } from 'firebase/firestore';
import { ref, set, get, DatabaseReference } from 'firebase/database';
import { firestoreDb, realtimeDb } from '@/firebaseConfig';
import { useMusicStore } from '@/stores/musicStore';
import {Song} from "@/types/song";

interface CurrentSongData {
    song: Song;
    index: number;
    startedAt: number; // Timestamp when song started playing
    timestamp: number; // When this data was last updated
}

class MusicService {
    private progressInterval: number | null = null;
    private readonly currentSongRef: DatabaseReference;

    constructor() {
        this.currentSongRef = ref(realtimeDb, 'currentlyPlayedSong');
    }

    async initialize(): Promise<void> {
        const store = useMusicStore.getState();

        try {
            store.setIsLoading(true);

            // Fetch songs from Firestore
            const playlist: Song[] = await this.fetchPlaylist();
            store.setPlaylist(playlist);

            if (playlist.length === 0) {
                console.log('No songs found in playlist');
                store.setIsLoading(false);
                return;
            }

            // Check if there's already a current song in Realtime DB
            const existingSong = await this.getCurrentSongFromDB();

            if (existingSong && this.isValidSongData(existingSong)) {
                const calculatedProgress: number = Date.now() - existingSong.startedAt;
                const songDuration: number = existingSong.song.duration || 180000;

                if (calculatedProgress >= songDuration) {
                    console.log('Existing song should have finished, starting next song');
                    this.startWithFirstSong(playlist);
                } else {
                    store.setCurrentSong(existingSong.song);
                    store.setCurrentIndex(existingSong.index);
                    store.setProgress(calculatedProgress);
                    this.startProgressTracking(calculatedProgress);
                }
            } else {
                this.startWithFirstSong(playlist);
            }

            store.setIsLoading(false);
            console.log('Radio initialized successfully');

        } catch (error) {
            console.error('Failed to initialize radio:', error);
            store.setIsLoading(false);
        }
    }

    private async fetchPlaylist(): Promise<Song[]> {
        const snapshot = await getDocs(collection(firestoreDb, 'songs'));
        const songs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Song[];

        console.log(`Fetched ${songs.length} songs from Firestore`);
        return songs;
    }

    private async getCurrentSongFromDB(): Promise<CurrentSongData | null> {
        try {
            const snapshot = await get(this.currentSongRef);
            return snapshot.exists() ? snapshot.val() as CurrentSongData : null;
        } catch (error) {
            console.error('Error getting current song from DB:', error);
            return null;
        }
    }

    private isValidSongData(data: any): data is CurrentSongData {
        return data &&
            data.song &&
            typeof data.index === 'number' &&
            typeof data.startedAt === 'number';
    }

    private startWithFirstSong(playlist: Song[]): void {
        const store = useMusicStore.getState();
        const firstSong = playlist[0];
        const now = Date.now();

        store.setCurrentSong(firstSong);
        store.setCurrentIndex(0);
        store.setProgress(0);

        this.saveCurrentSong(firstSong, 0, now);
        this.startProgressTracking(0);
    }

    // Save current song to Realtime DB
    private async saveCurrentSong(song: Song, index: number, startedAt: number): Promise<void> {
        try {
            const data: CurrentSongData = {
                song,
                index,
                startedAt,
                timestamp: Date.now()
            };

            await set(this.currentSongRef, data);
        } catch (error) {
            console.error('Error saving current song:', error);
        }
    }

    // Start progress tracking
    private startProgressTracking(initialProgress: number = 0): void {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }

        const store = useMusicStore.getState();
        const { currentSong } = store;

        if (!currentSong) return;

        const songDuration = currentSong.duration;
        const songStartTime = Date.now() - initialProgress; // When the song actually started

        this.progressInterval = setInterval(() => {
            const currentProgress = Date.now() - songStartTime;

            useMusicStore.getState().setProgress(currentProgress);

            // Move to next song when current one finishes
            if (currentProgress >= songDuration) {
                console.log(`Song "${currentSong.title}" finished! Moving to next song.`);
                this.moveToNextSong();
            }
        }, 1000) as number;
    }

    private moveToNextSong(): void {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }

        const store = useMusicStore.getState();
        const nextSong = store.nextSong();

        if (nextSong) {
            const now = Date.now();
            this.saveCurrentSong(nextSong, store.currentIndex, now);
            // Restart progress tracking for new song
            this.startProgressTracking(0);
        } else {
            console.log('No next song available');
        }
    }

    cleanup(): void {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
}

export const musicService = new MusicService();