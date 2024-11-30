import { FavoriteCharacter } from "@/characters/components/FavoriteCharacter";

export const metadata = {
  title: "Favorites",
  description: "SEO Favorites",
};

export default function FavoritesPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Personajes Favoritos{" "}
        <small className="text-green-500">Global State</small>
      </span>
      <FavoriteCharacter />
    </div>
  );
}
