"use client";
import { useEffect, useState } from "react";
import { Result } from "../interfaces/character";
import { CharacterGrid } from "./CharacterGrid";

interface Props {
  character: Result[];
}

export const CharacterSearch = ({ character }: Props) => {
  const [characters, setCharacters] = useState<Result[]>([]); // Estado para almacenar los personajes
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para almacenar el término de búsqueda
  const [filteredCharacters, setFilteredCharacters] = useState<Result[]>([]); // Estado para los personajes filtrados

  useEffect(() => {
    const fetchData = async () => {
      setCharacters(character);
      setFilteredCharacters(character); // Inicialmente se muestran todos los personajes
    };

    fetchData();
  }, []);

  // Función que se ejecuta al hacer clic en el botón de búsqueda
  const handleSearch = () => {
    // Filtrar los personajes que coinciden con el término de búsqueda
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCharacters(filtered); // Actualizamos los personajes filtrados
  };

  return (
    <>
      {/* Input de búsqueda */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 rounded p-3 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        >
          Buscar
        </button>
      </div>

      <CharacterGrid characters={filteredCharacters} />
    </>
  );
};
