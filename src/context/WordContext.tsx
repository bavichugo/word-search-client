import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useFilter, {
  IFilterState,
  defaultFilterState,
} from "../hooks/useFilter";
import { useTranslation } from "react-i18next";
import { api_url, lastWord } from "../helper/helper_functions";

interface AppContextType {
  words: Record<number, string[]>;
  language: string;
  setLanguage: (language: string) => void;
  fetchInitialWords: () => void;
  resetFilter: () => void;
  isTipsOn: boolean;
  setIsTipsOn: (value: boolean) => void;
  filterState: IFilterState;
  fetchNextWords: () => void;
  previousPage: () => void;
  page: number;
  isFetchingWords: boolean;
}

const AppContext = createContext<AppContextType>({
  words: {},
  language: "",
  setLanguage: () => {},
  fetchInitialWords: () => {},
  resetFilter: () => {},
  isTipsOn: true,
  setIsTipsOn: () => {},
  filterState: defaultFilterState,
  fetchNextWords: () => {},
  previousPage: () => {},
  page: 0,
  isFetchingWords: false,
});

export const WordsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("ENGLISH");
  const [words, setWords] = useState<Record<number, string[]>>({});
  const [isTipsOn, setIsTipsOn] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const filterState = useFilter();
  const { i18n } = useTranslation();
  const [isFetchingWords, setIsFetchingWords] = useState<boolean>(false);

  // Setting language and isTipsOn intial values based
  // on previous user selection
  useEffect(() => {
    if (localStorage.getItem("language")) {
      setLanguage(JSON.parse(localStorage.getItem("language")!));
    }

    if (localStorage.getItem("isTipsOn")) {
      setIsTipsOn(JSON.parse(localStorage.getItem("isTipsOn")!));
    }
  }, []);

  useEffect(() => {
    if (language === "PORTUGUESE") {
      i18n.changeLanguage("pt");
    } else {
      i18n.changeLanguage("en");
    }
  }, [language]);

  const previousPage = () => {
    setPage((p) => p - 1);
  };

  const fetchInitialWords = async () => {
    try {
      setIsFetchingWords(true);
      const response = await fetch(api_url(language, filterState.filter));

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setWords({ 0: data });
      setPage(0);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    } finally {
      setIsFetchingWords(false);
    }
  };

  const fetchNextWords = async () => {
    try {

      // Prevents refetching a page that has already being fetched
      if (page + 1 in words) {
        setPage(page + 1);
        return;
      }

      setIsFetchingWords(true);
      const response = await fetch(
        api_url(language, filterState.filter, lastWord(words))
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const newPage = Object.keys(words).length;
      setWords({ ...words, [newPage]: data });
      setPage(newPage);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log(error);
    } finally {
      setIsFetchingWords(false);
    }
  };

  const resetFilter = () => {
    filterState.resetFilter();
    setWords([]);
  };

  return (
    <AppContext.Provider
      value={{
        words,
        language,
        setLanguage,
        fetchInitialWords,
        resetFilter,
        isTipsOn,
        setIsTipsOn,
        filterState,
        fetchNextWords,
        previousPage,
        page,
        isFetchingWords
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const WordContext = () => {
  return useContext(AppContext);
};
