import {create} from "zustand";
import {persist} from "zustand/middleware";

interface Feedback {
    id: string;
    type: "song" | "moderator";
    text: string;
    createdAt: number;
}

interface FeedbackState {
    feedbacks: Feedback[];
    addFeedback: (type: "song" | "moderator", text: string) => void;
    clearFeedbacks: () => void;
}

export const useFeedbackStore = create<FeedbackState>()(
 persist (
     (set) => ({
          feedbacks: [],
             addFeedback: (type: "song" | "moderator", text: string) =>
                 set((state) => ({
                     feedbacks: [
                         ...state.feedbacks,
                         {
                             id: Math.random().toString(36).substring(2, 9),
                             type,
                             text,
                             createdAt: Date.now(),
                         },
                     ],
                 })),
              clearFeedbacks: () => set({feedbacks:[]}),
         }),
     {name: "feedback-storage"} //gespeichert in AsyncStorage
 )
);