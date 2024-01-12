import { useTranslation } from "react-i18next";
import { WordContext } from "../context/WordContext";
import { isEmptyObject } from "../helper/helper_functions";

const WordDisplay = () => {
  const { words, page } = WordContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 border border-[#24334E] rounded-xl justify-center p-4">
      {!isEmptyObject(words) && words[page].length ? (
        words[page].map((word) => (
          <span key={word} className="bg-[#24334E] px-4 py-2 rounded-lg">
            {word}
          </span>
        ))
      ) : (
        <span className="bg-[#24334E] px-4 py-2 rounded-lg">
          {t("no_words_found")}
        </span>
      )}
    </div>
  );
};

export default WordDisplay;
