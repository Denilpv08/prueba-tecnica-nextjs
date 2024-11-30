import { CharacterGrid, CharacterSearch, Result } from "@/characters";
import axios from "axios";

export const metadata = {
  title: "Home Character",
  description: "SEO Home",
};

const getCharacters = async (): Promise<Result[]> => {
  try {
    const response = await axios.get(process.env.API_URL || "");
    const data = response.data;
    console.log(data.results);

    return data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw new Error("No se pudo cargar el personaje");
  }
};

export default async function HomePage() {
  const characters = await getCharacters();

  return (
    <div className="flex flex-col">
      <span className="text-4xl my-2">
        Listado de Personajes{" "}
        <small className="text-green-500">Rick and Morty</small>
      </span>
      <CharacterSearch character={characters} />
      {/* <CharacterGrid characters={characters} /> */}
    </div>
  );
}
