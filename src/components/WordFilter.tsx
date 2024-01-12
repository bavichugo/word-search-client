import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { WordContext } from "../context/WordContext";
import { useTranslation } from "react-i18next";
import { TOOLTIP_CONTENT } from "../data/tooltipContent";
import { isEmptyObject, uniqueId } from "../helper/helper_functions";
import { helix } from "ldrs";

const WordFilter = () => {
  const {
    fetchInitialWords,
    resetFilter,
    words,
    filterState,
    isFetchingWords,
  } = WordContext();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hasEdited, setHasEdited] = useState<boolean>(false);
  const { t } = useTranslation();
  helix.register();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasEdited(false);
    fetchInitialWords();
  };

  const onInputChange =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setHasEdited(true);
    };

  const onResetHandler = () => {
    resetFilter();
    setHasEdited(false);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center max-w-xl w-full gap-4 m-auto px-4 sm:px-16"
      >
        <div className="w-full grid grid-cols-2 grid-rows-3 gap-4">
          <FormInput
            value={filterState.letters}
            onChange={onInputChange(filterState.setLetters)}
            placeholder={t("letters_filter")}
            tooltipType={"Letters"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
          <FormInput
            value={filterState.absentLetters}
            onChange={onInputChange(filterState.setAbsentLetters)}
            placeholder={t("absent_letters_filter")}
            tooltipType={"Absent Letters"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
          <FormInput
            value={filterState.startsWith}
            onChange={onInputChange(filterState.setStartsWith)}
            placeholder={t("starts_with_filter")}
            tooltipType={"Starts With"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
          <FormInput
            value={filterState.endsWith}
            onChange={onInputChange(filterState.setEndsWith)}
            placeholder={t("ends_with_filter")}
            tooltipType={"Ends With"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
          <FormInput
            value={filterState.pattern}
            onChange={onInputChange(filterState.setPattern)}
            placeholder={t("pattern_filter")}
            tooltipType={"Pattern"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
          <FormInput
            value={filterState.size}
            onChange={onInputChange(filterState.setSize)}
            type="number"
            placeholder={t("size_filter")}
            tooltipType={"Size"}
            activeTooltip={activeTooltip}
            toggleTooltip={setActiveTooltip}
          />
        </div>
        <button
          className={`${
            !hasEdited ? "bg-[#29c8e87f]" : "bg-[#29C9E8] hover:bg-[#29c8e8c6]"
          } w-full max-w-60 rounded-2xl py-3 text-[#111827]`}
          type="submit"
          disabled={!hasEdited}
        >
          {t("search_filter")}
        </button>
      </form>

      {!isEmptyObject(words) && !isFetchingWords && (
        <button
          onClick={onResetHandler}
          className="bg-[#29C9E8] hover:bg-[#29c8e8c6] text-[#111827] w-fit rounded-full px-6 py-1"
        >
          {t("reset_filter")}
        </button>
      )}

      {isFetchingWords && (
        <div className="mx-auto my-auto flex items-center">
          <l-helix size="45" speed="2.5" color="#29C9E8"></l-helix>
          <span>{t("searching")}</span>
        </div>
      )}
    </div>
  );
};

type TooltipType =
  | "Letters"
  | "Absent Letters"
  | "Starts With"
  | "Ends With"
  | "Pattern"
  | "Size";

interface InputProps {
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
  value: string;
  tooltipType: TooltipType;
  activeTooltip: string | null;
  toggleTooltip: Dispatch<SetStateAction<string | null>>;
}

const FormInput: React.FC<InputProps> = ({
  placeholder,
  type,
  onChange,
  value,
  tooltipType,
  activeTooltip,
  toggleTooltip,
}) => {
  const { isTipsOn } = WordContext();
  const { t } = useTranslation();

  return (
    <div className="relative">
      <input
        className="border mb-1 w-full border-[#29C9E8] rounded-2xl bg-[#24334E] px-4 py-3"
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onClick={() => toggleTooltip(tooltipType)}
        onChange={(e) => onChange(e.target.value)}
      />
      {isTipsOn && (
        <dialog
          className="absolute z-10 max-w-xl w-full rounded-xl"
          open={activeTooltip === tooltipType}
        >
          <div className="flex flex-col">
            <div className="flex justify-between w-full px-2 py-1 border-b-2">
              <span className="text-black">
                {t(TOOLTIP_CONTENT[tooltipType].title)}
              </span>
              <button
                className="text-black bg-[#EF4444] hover:bg-[#d54242] rounded px-2"
                onClick={() => toggleTooltip(null)}
                type="button"
              >
                {t("close_tooltip")}
              </button>
            </div>
            <div className="flex flex-col gap-2 my-2">
              {TOOLTIP_CONTENT[tooltipType].messages.map((item) => {
                if (item.type === "ul") {
                  return (
                    <ul
                      key={uniqueId()}
                      className="list-disc list-inside border-[#29C9E8] border-t-2 border-b-2 w-full"
                    >
                      {item.items?.map((text) => (
                        <li key={uniqueId()} className="px-2 text-black m-auto">
                          {t(text)}
                        </li>
                      ))}
                    </ul>
                  );
                }
                // type "span" or any other
                return (
                  <span key={uniqueId()} className="text-black text-center">
                    {t(item.content!)}
                  </span>
                );
              })}
            </div>
            <div className="flex justify-between w-full px-2 py-1">
              <span className="text-black">{t("tooltip_close")}</span>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default WordFilter;
