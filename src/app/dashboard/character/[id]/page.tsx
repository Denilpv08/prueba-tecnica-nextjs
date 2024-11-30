import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const character = await getCharacter(params.id);

    return {
      title: `#${character.id} - ${character.name}`,
      description: `Página del pokémon ${character.name}`,
    };
  } catch (error) {
    return {
      title: "Pokemon Page",
      description: "SEO Pokemon",
    };
  }
}

const getCharacter = async (id: string) => {
  try {
    // Realizamos la solicitud con axios
    const response = await axios.get(`${process.env.API_URL}/${id}`, {
      headers: {
        "Cache-Control": "no-cache", // Puedes ajustar según tu caso
      },
    });

    const character = response.data;

    console.log("Se cargó", character.name);

    return character;
  } catch (error) {
    notFound();
  }
};

export default async function CharacterPage({ params }: Props) {
  const character = await getCharacter(params.id);
  // console.log(character.episode.length);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{character.id} {character.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={character.image ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${character.name}`}
              className="mb-5"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Especie</p>
            <div className="text-base font-medium text-navy-700 flex">
              <p className="mr-2 capitalize">{character.species}</p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Género</p>
            <span className="text-base font-medium text-navy-700 flex">
              {character.gender}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Episodios</p>
            <span className="text-base font-medium text-navy-700 flex">
              {character.episode.length}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Estado</p>
            <span className="text-base font-medium text-navy-700 flex">
              {character.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
