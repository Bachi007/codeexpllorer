import { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleSelect = (lang) => {
    setSelectedLanguage(lang);
    onSelect(lang);
  };

  return (
    <div className="ml-2 mb-4">
      <Label className="mb-2 text-lg">Language:</Label>
      <DropdownMenu>
        <DropdownMenuTrigger className="btn">
          {selectedLanguage}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#110c1b]">
          {languages.map(([lang, version]) => (
            <DropdownMenuItem
              key={lang}
              className={`${lang === selectedLanguage ? ACTIVE_COLOR : ""} ${lang === selectedLanguage ? "bg-gray-900" : "bg-transparent"} hover:${ACTIVE_COLOR} hover:bg-gray-900`}
              onClick={() => handleSelect(lang)}
            >
              {lang}
              &nbsp;
              <span className="text-gray-600 text-sm">
                ({version})
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
