import React, { createContext, useState, useEffect, useMemo } from "react";
import ky from "ky";
import { API_URL } from "../config";
import type { Character, Info } from "../types/RickAndMorty.types";

type AppData = {
  id: number;
  getNextCharacter: () => void;
  getPrevCharacter: () => void;
  isLoading: boolean;
  character: {
    id: Character["id"];
    name: Character["name"];
    status: Character["status"];
    gender: Character["gender"];
    episodes: number;
    imageUrl: string;
  } | null;
};

export const AppDataContext = createContext<AppData>({
  id: 1,
  getNextCharacter: () => {},
  getPrevCharacter: () => {},
  isLoading: true,
  character: null,
});

export const AppDataContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [id, setId] = useState<AppData["id"]>(1);
  const [charactersCount, setCharactersCount] = useState<number | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<AppData["isLoading"]>(false);
  const [characterData, setCharacterData] =
    useState<AppData["character"]>(null);

  const getNextCharacter = () => {
    setIsLoading(true);
    setId((next) => (charactersCount === next ? 1 : next + 1));
  };

  const getPrevCharacter = () => {
    setIsLoading(true);
    setId((prev) =>
      prev === 1 ? (charactersCount ? charactersCount : prev) : prev - 1
    );
  };

  const appData: AppData = useMemo(() => {
    return {
      id,
      getNextCharacter,
      getPrevCharacter,
      isLoading,
      character: characterData,
    };
  }, [isLoading, characterData, id]);

  useEffect(() => {
    (async () => {
      const response: Info<Character[]> = await ky
        .get(`${API_URL}/character`)
        .json();

      const charactersCount = response.info?.count;
      setCharactersCount(charactersCount);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response: Character = await ky
        .get(`${API_URL}/character/${id}`)
        .json();

      const nextCharacterData: AppData["character"] = {
        id: response.id,
        name: response.name,
        status: response.status,
        gender: response.gender,
        episodes: response.episode?.length,
        imageUrl: response.image,
      };

      setCharacterData(nextCharacterData);
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <AppDataContext.Provider value={appData}>
      {children}
    </AppDataContext.Provider>
  );
};
