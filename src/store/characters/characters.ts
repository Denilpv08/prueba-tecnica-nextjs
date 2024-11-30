import { Result } from "@/characters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharactersState {
  favorite: { [key: string]: Result };
}

const initialState: CharactersState = {
  favorite: {},
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setFavoriteCharacter(
      state,
      action: PayloadAction<{ [key: string]: Result }>
    ) {
      state.favorite = action.payload;
    },

    toggleFavorite(state, action: PayloadAction<Result>) {
      const character = action.payload;
      const { id } = character;

      if (!!state.favorite[id]) {
        delete state.favorite[id];
      } else {
        state.favorite[id] = character;
      }

      localStorage.setItem(
        "favorite-characters",
        JSON.stringify(state.favorite)
      );
    },
  },
});

export const { toggleFavorite, setFavoriteCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
