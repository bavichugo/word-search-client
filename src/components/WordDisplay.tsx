import { useTranslation } from "react-i18next";
import { WordContext } from "../context/WordContext";
import { isEmptyObject } from "../helper/helper_functions";

const WordDisplay = () => {
  const { words, fetchNextWords, page, previousPage } = WordContext();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 border border-[#24334E] rounded-xl justify-center p-4">
        {!isEmptyObject(words) && words[page].length ? (
          words[page].map((word) => (
            <span key={word} className="bg-[#24334E] px-4 py-2 rounded-lg">
              {word}
            </span>
          ))
        ) : (
          <span className="bg-[#24334E] px-4 py-2 rounded-lg">
            {t('no_words_found')}
          </span>
        )}
      </div>
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={previousPage}
          disabled={page === 0}
          type="button"
          className={`${
            page === 0 ? "bg-[#29c8e87f]" : "bg-[#29C9E8] hover:bg-[#29c8e8c6]"
          } text-[#111827] w-full max-w-[6rem] min-w-fit rounded-full px-6 py-1`}
        >
          {t('previous')}
        </button>
        <button
          onClick={fetchNextWords}
          disabled={words[page].length < 100}
          type="button"
          className={`${
            words[page].length < 100
              ? "bg-[#29c8e87f]"
              : "bg-[#29C9E8] hover:bg-[#29c8e8c6]"
          } text-[#111827] w-full max-w-[6rem] min-w-fit rounded-full px-6 py-1`}
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default WordDisplay;
