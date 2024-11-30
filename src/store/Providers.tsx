"use client";
import { Provider } from "react-redux";
import { store } from "./";
import { useEffect } from "react";
import { setFavoriteCharacter } from "./characters/characters";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favorite-characters") ?? "{}"
    );
    // console.log(favorites);
    store.dispatch(setFavoriteCharacter(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};
