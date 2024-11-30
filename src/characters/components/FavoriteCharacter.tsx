"use client";
import { IoHeartOutline } from "react-icons/io5";
import { CharacterGrid } from "./CharacterGrid";
import { useAppSelector } from "@/store";

export const FavoriteCharacter = () => {
  const favoritePokemons = useAppSelector((state) =>
    Object.values(state.characters.favorite)
  );

  return (
    <>
      {favoritePokemons.length == 0 ? (
        <NoFavorite />
      ) : (
        <CharacterGrid characters={favoritePokemons} />
      )}
    </>
  );
};

export const NoFavorite = () => {
  return (
    <div className="flex flex-col h-[5ovh] items-center justify-center">
      <IoHeartOutline size={100} className="text-green-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
