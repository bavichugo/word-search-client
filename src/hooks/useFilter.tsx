import { useState, useCallback } from "react";

export type IFilter = {
  letters?: string;
  absentLetters?: string;
  startsWith?: string;
  endsWith?: string;
  pattern?: string;
  size?: string;
};

export interface IFilterState {
  filter: IFilter;
  letters: string;
  setLetters: (value: string) => void;
  absentLetters: string;
  setAbsentLetters: (value: string) => void;
  startsWith: string;
  setStartsWith: (value: string) => void;
  endsWith: string;
  setEndsWith: (value: string) => void;
  pattern: string;
  setPattern: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
  resetFilter: () => void;
}

export const defaultFilterState: IFilterState = {
  filter: {},
  letters: "",
  setLetters: () => {},
  absentLetters: "",
  setAbsentLetters: () => {},
  startsWith: "",
  setStartsWith: () => {},
  endsWith: "",
  setEndsWith: () => {},
  pattern: "",
  setPattern: () => {},
  size: "",
  setSize: () => {},
  resetFilter: () => {}
};

// TODO: block the search button if the person has not typed anything on it
const useFilter = () => {
  const [letters, setLetters] = useState<string>("");
  const [absentLetters, setAbsentLetters] = useState<string>("");
  const [startsWith, setStartsWith] = useState<string>("");
  const [endsWith, setEndsWith] = useState<string>("");
  const [pattern, setPattern] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const resetFilter = useCallback(() => {
    setLetters("");
    setAbsentLetters("");
    setStartsWith("");
    setEndsWith("");
    setPattern("");
    setSize("");
  }, []);

  const filter: IFilter = {
    ...(letters && { letters }),
    ...(absentLetters && { absentLetters }),
    ...(startsWith && { startsWith }),
    ...(endsWith && { endsWith }),
    ...(pattern && { pattern }),
    ...(size && { size }),
  };

  return {
    filter,
    letters,
    setLetters,
    absentLetters,
    setAbsentLetters,
    startsWith,
    setStartsWith,
    endsWith,
    setEndsWith,
    pattern,
    setPattern,
    size,
    setSize,
    resetFilter,
  };
};

export default useFilter;
