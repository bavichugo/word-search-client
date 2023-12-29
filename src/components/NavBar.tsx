import Toggle from "./Toggle";
import Select from "./Select";
import { WordContext } from "../context/WordContext";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { setLanguage, language, isTipsOn, setIsTipsOn } = WordContext();
  const { t } = useTranslation();

  const selectOptions = [
    { value: "ENGLISH", i18nlanguage: "en", label: "🇺🇸" },
    { value: "PORTUGUESE", i18nlanguage: "pt", label: "🇧🇷" },
  ];

  const handleToggleTips = (value: boolean) => {
    localStorage.setItem('isTipsOn', JSON.stringify(value));
    setIsTipsOn(value);
  };

  const handleSelectLanguage = (selectedValue: string) => {
    localStorage.setItem('language', JSON.stringify(selectedValue));
    setLanguage(selectedValue);
  };

  return (
    <div className="flex justify-between w-full h-16 items-center">
      <span>{t('website_name')}</span>
      <div className="flex gap-2 sm:gap-4">
        <div className="flex gap-2 sm:gap-4 items-center">
          <span>{t('tips')}</span>
          <Toggle onToggle={handleToggleTips} value={isTipsOn} />
        </div>
        <div className="flex gap-2 sm:gap-4 items-center">
          <span>{t('language')}</span>
          <Select value={language} options={selectOptions} onChange={handleSelectLanguage} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
