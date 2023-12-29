import NavBar from "./components/NavBar";
import WordDisplay from "./components/WordDisplay";
import WordFilter from "./components/WordFilter";
import { WordContext } from "./context/WordContext";
import { useTranslation } from "react-i18next";
import { isEmptyObject } from "./helper/helper_functions";

const App = () => {
  const { words } = WordContext();
  const { t } = useTranslation();

  return (
    <div className="h-full w-full bg-[#111827] flex flex-col items-center gap-4 px-2 sm:px-4">
      <NavBar />
      <span className="text-lg">{t('use_the_filters')}</span>
      <WordFilter />
      {!isEmptyObject(words) && <WordDisplay />}
    </div>
  );
}

export default App;
