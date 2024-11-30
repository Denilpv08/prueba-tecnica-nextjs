"use client";
import Image from "next/image";
import Link from "next/link";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { Result } from "../interfaces/character";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/characters/characters";
import { motion } from "framer-motion";

interface Props {
  character: Result;
}

export const CharacterCard = ({ character }: Props) => {
  const { id, name } = character;
  const isFavorite = useAppSelector((state) => !!state.characters.favorite[id]);
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch(toggleFavorite(character));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Comienza con opacidad 0 y un pequeño desplazamiento hacia abajo
      animate={{ opacity: 1, y: 0 }} // Se anima a opacidad 1 y posición original
      exit={{ opacity: 0, y: 20 }} // Al salir, la tarjeta se desvanece y se desplaza hacia abajo
      transition={{ duration: 0.5 }}
      className="mx-auto right-0 mt-2 w-60"
    >
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
            priority={false}
            width={100}
            height={100}
            key={id}
            alt="Avatar"
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>
          <div className="mt-5">
            <Link
              href={`/dashboard/character/${id}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más Información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <motion.div
            onClick={onToggle}
            whileTap={{ scale: 1.2 }} // Animación de escala al hacer clic
            transition={{ type: "spring", stiffness: 300 }}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
          >
            <div className="text-green-600">
              {/* <IoHeartOutline /> */}
              {isFavorite ? <IoHeart /> : <IoHeartOutline />}
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {isFavorite ? "Favorito" : "No es favorito"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
