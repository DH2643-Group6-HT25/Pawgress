import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoReducer";
import userReducer from "./user/userReducer";
import petReducer from "./pet/petReducer";
import streakReducer from "./streak/streakReducer";
import affirmationReducer from "./affirmation/affirmationReducer";
import journalReducer from "./journal/journalReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
    pet: petReducer,
    streak: streakReducer,
    affirmation: affirmationReducer,
    journal: journalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
