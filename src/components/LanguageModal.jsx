import { useTranslation } from "react-i18next";

const LanguageModal = ({ visible, onClose }) => {
  const { i18n } = useTranslation();
  if (!visible) return null;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("mealex_lang_selected", lng);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Choose Language</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => changeLanguage("en")}
            className="border rounded py-2 text-red-500 cursor-pointer hover:bg-gray-100 transition"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("hi")}
            className="border rounded py-2 text-green-500 cursor-pointer hover:bg-gray-100 transition"
          >
            हिन्दी
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
