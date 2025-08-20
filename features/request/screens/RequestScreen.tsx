import {Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import React, { useState } from "react";

type Song = {
    id: number;
    title: string;
    artist: string;
    album: string;
};

type QueueSong = Song & {count: number};

export default function RequestScreen() {
    const [searchTerm, setSearchTerm] = useState("");
    const [result, setResult] = useState<Song[]>([]);
    const [queue, setQueue] = useState<QueueSong[]>([]);
    const [showResults, setShowResults] = useState(false);


        // DummyDaten
    const allSongs: Song[] = [
        { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera" },
        { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV" },
        { id: 3, title: "Hotel California", artist: "Eagles", album: "Hotel California" },
        { id: 4, title: "Imagine", artist: "John Lennon", album: "Imagine" },
        { id: 5, title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind" },
        { id: 6, title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: "Appetite for Destruction" },
        { id: 7, title: "Hey Jude", artist: "The Beatles", album: "Hey Jude" },
        { id: 8, title: "Billie Jean", artist: "Michael Jackson", album: "Thriller" },
        { id: 9, title: "Like a Rolling Stone", artist: "Bob Dylan", album: "Highway 61 Revisited" },
        { id: 10, title: "Wonderwall", artist: "Oasis", album: "(What's the Story) Morning Glory?" },
        { id: 11, title: "Shape of You", artist: "Ed Sheeran", album: "÷ (Divide)" },
        { id: 12, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
        { id: 13, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special" },
        { id: 14, title: "Rolling in the Deep", artist: "Adele", album: "21" },
        { id: 15, title: "Someone Like You", artist: "Adele", album: "21" },
        { id: 16, title: "Shake It Off", artist: "Taylor Swift", album: "1989" },
        { id: 17, title: "Halo", artist: "Beyoncé", album: "I Am... Sasha Fierce" },
        { id: 18, title: "Lose Yourself", artist: "Eminem", album: "8 Mile Soundtrack" },
        { id: 19, title: "Let It Be", artist: "The Beatles", album: "Let It Be" },
        { id: 20, title: "All of Me", artist: "John Legend", album: "Love in the Future" },
        { id: 21, title: "Hallelujah", artist: "Leonard Cohen", album: "Various Positions" },
        { id: 22, title: "Viva La Vida", artist: "Coldplay", album: "Viva La Vida or Death and All His Friends" },
        { id: 23, title: "Bad Guy", artist: "Billie Eilish", album: "When We All Fall Asleep, Where Do We Go?" },
        { id: 24, title: "Counting Stars", artist: "OneRepublic", album: "Native" },
        { id: 25, title: "Thunderstruck", artist: "AC/DC", album: "The Razors Edge" },
        { id: 26, title: "Enter Sandman", artist: "Metallica", album: "Metallica" },
        { id: 27, title: "Take On Me", artist: "a-ha", album: "Hunting High and Low" },
        { id: 28, title: "I Will Always Love You", artist: "Whitney Houston", album: "The Bodyguard Soundtrack" },
        { id: 29, title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", album: "Vida" },
        { id: 30, title: "Chandelier", artist: "Sia", album: "1000 Forms of Fear" },
        { id: 31, title: "Happy", artist: "Pharrell Williams", album: "G I R L" },
        { id: 32, title: "Firework", artist: "Katy Perry", album: "Teenage Dream" },
        { id: 33, title: "Royals", artist: "Lorde", album: "Pure Heroine" },
        { id: 34, title: "Call Me Maybe", artist: "Carly Rae Jepsen", album: "Kiss" },
        { id: 35, title: "Sugar", artist: "Maroon 5", album: "V" },
        { id: 36, title: "Wake Me Up", artist: "Avicii", album: "True" },
        { id: 37, title: "Girls Like You", artist: "Maroon 5 ft. Cardi B", album: "Red Pill Blues" },
        { id: 38, title: "Señorita", artist: "Shawn Mendes & Camila Cabello", album: "Shawn Mendes (Deluxe)" },
        { id: 39, title: "Perfect", artist: "Ed Sheeran", album: "÷ (Divide)" },
        { id: 40, title: "Believer", artist: "Imagine Dragons", album: "Evolve" },
        { id: 41, title: "Cheap Thrills", artist: "Sia", album: "This Is Acting" },
        { id: 42, title: "All About That Bass", artist: "Meghan Trainor", album: "Title" },
        { id: 43, title: "Can't Stop the Feeling!", artist: "Justin Timberlake", album: "Trolls Soundtrack" },
        { id: 44, title: "Rockstar", artist: "Post Malone ft. 21 Savage", album: "Beerbongs & Bentleys" },
        { id: 45, title: "Bad Romance", artist: "Lady Gaga", album: "The Fame Monster" },
        { id: 46, title: "Hey Ya!", artist: "OutKast", album: "Speakerboxxx/The Love Below" },
        { id: 47, title: "No Tears Left to Cry", artist: "Ariana Grande", album: "Sweetener" },
        { id: 48, title: "Shallow", artist: "Lady Gaga & Bradley Cooper", album: "A Star Is Born Soundtrack" },
        { id: 49, title: "Dance Monkey", artist: "Tones and I", album: "The Kids Are Coming" },
        { id: 50, title: "Radioactive", artist: "Imagine Dragons", album: "Night Visions" },
    ];

    const searchSongs = (query: string) => {
        const filtered = allSongs.filter((song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
        );
        setResult(filtered);
        setShowResults(true);
    };

    const goBackToQueue = () => {
        setShowResults(false);
    };

    const addToQueue = (song: Song) => {
        setQueue((prev: QueueSong[]) => {
            //Prüfen, ob Song schon in Queue ist
            const existingIndex = prev.findIndex((s) => s.id === song.id);

            if (existingIndex >=0) {
                //Song existiert bereits -> Count erhöhen
                const updated = [...prev];
                updated[existingIndex].count +=1;
                //Queue nach count absteigend sortieren
                updated.sort((a, b) => b.count - a.count);
                return updated;
            } else {
                //Song noch nicht in Queue -> Count = 1 setzen
                return [...prev, { ...song, count: 1}];
            }
        });

        setSearchTerm("");
        setResult([]);
        setShowResults(false);
    };

    return (
    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
     >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 p-4 bg-background">
            {/* Suchleiste */}
            <View className="flex-row mb-3">
                <TextInput
                    className="flex-1 border border-text-secondary px-3 py-2 rounded-2xl text-text-primary"
                    placeholder="Search Song..."
                    placeholderTextColor="#cdcdcd"
                    value={searchTerm}
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        if (text.trim() === "") {
                            setShowResults(false);
                            setResult([]);
                        } else {
                            const filtered = allSongs.filter((song) =>
                                song.title.toLowerCase().includes(text.toLowerCase()) ||
                                song.artist.toLowerCase().includes(text.toLowerCase()) ||
                                song.album.toLowerCase().includes(text.toLowerCase())
                            );
                            setResult(filtered);
                            setShowResults(true);
                        }
                    }}
                    onBlur={() => {
                        if (searchTerm === "") {
                            setShowResults(false);
                        }
                    }}
                    />
                {(searchTerm.trim() === "" && !showResults) ? (
                    //Fall: nichts angegeben + keine Ergebnisse sichtbar -> Search Button
                    <TouchableOpacity className="ml-2 px-4 py-2 bg-primary rounded-2xl" onPress={() => searchSongs(searchTerm)}>
                        <Text className="text-text-on-primary">Search</Text>
                    </TouchableOpacity>
                ) : (
                    //Fall: entweder etwas eingegeben ODER alle Songs werden angezeigt -> Back Button
                    <TouchableOpacity className="ml-2 px-4 py-2 bg-primary rounded-2xl" onPress={goBackToQueue}>
                        <Text className="text-text-on-primary">Back</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/* Suchergebnisse oder Queue abhängig vom State*/}
            {showResults ? (
             <>
            <View>
                <Text className="text-lg font-bold text-text-primary mt-4 mb-2">Result</Text>
            </View>
            {result.length === 0 ? (
                <View className="flex-row justify-between">
                    <Text className="text-text-secondary">No results</Text>
                    <TouchableOpacity className=" max-w-[50px] px-3 py-1 bg-primary rounded-2xl" onPress={goBackToQueue}>
                        <Text className="text-text-on-primary" >Back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={result}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center mt-2">
                            <Text className="text-text-primary flex-1 mr-2">
                                Titel: {item.title} - Artist: {item.artist} - Album: {item.album}
                                </Text>
                                <TouchableOpacity className="px-3 py-1 bg-primary rounded-2xl" onPress={() => addToQueue(item)}>
                                    <Text className="text-text-on-primary">Add</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </>
            ) : (
                <>
                {/* Warteschlange */}
                <Text className="text-lg font-bold text-text-primary mt-4 mb-2">Next Songs in the Queue</Text>
                {queue.length === 0 ? (
                    <Text className="text-text-secondary">No songs in queue</Text>
                ) : (
                    <FlatList
                    data={queue}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <Text className="text-text-primary">
                            {index + 1}. {item.title} - {item.artist}
                        </Text>
                      )}
                    />
                )}
               </>
            )}
            </View>
           </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}