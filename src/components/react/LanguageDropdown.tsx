import React, { useState, useEffect, useRef } from "react";
import { LANGUAGES } from "../../config";

const Dropdown = () => {
  const [currentLanguage, setCurrentLanguage] = useState("-");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setIsOpen(false);
    if (lang === currentLanguage) return;
    if (lang === "-") {
      window.location.href = "/";
    } else {
      window.location.href = `/${lang}`;
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const language = window.location.pathname.split("/")[1] || "-";
    if (LANGUAGES.includes(language)) {
      setCurrentLanguage(language);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        className="inline-flex justify-start items-center bg-transparent px-4 py-2 text-sm font-medium text-slate-400 focus:outline-none"
        onClick={toggleDropdown}
      >
        {currentLanguage}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8 9h8l-4 7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-20 origin-top-right rounded-md bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="py-1">
            <button
              className="text-slate-400 inline-block px-4 py-2 text-sm hover:bg-slate-800 w-full"
              onClick={() => handleLanguageChange("-")}
            >
              -
            </button>
          </div>
          {LANGUAGES.map((lang) => (
            <div className="py-1">
              <button
                className="text-slate-400 inline-block px-4 py-2 text-sm hover:bg-slate-800 w-full"
                onClick={() => handleLanguageChange(lang)}
              >
                {lang}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
