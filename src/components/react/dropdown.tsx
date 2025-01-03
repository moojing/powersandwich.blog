import React, { useState, useEffect, useRef } from "react";

const Dropdown = () => {
  // State to manage the current language
  const [currentLanguage, setCurrentLanguage] = useState("en");
  // State to manage the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  // Ref to track the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle language change
  const handleLanguageChange = (lang: string) => {
    console.log("lang:", lang);
    setCurrentLanguage(lang); // Update the current language
    setIsOpen(false); // Close the dropdown menu
    window.location.href = `/${lang}`; // Redirect to the selected language's path
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener for clicks
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
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
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
              onClick={() => handleLanguageChange("en")}
            >
              en
            </button>
            <button
              className="text-slate-400 inline-block px-4 py-2 text-sm hover:bg-slate-800 w-full"
              onClick={() => handleLanguageChange("zh")}
            >
              zh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
