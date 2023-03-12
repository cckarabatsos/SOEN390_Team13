import i18n from "i18next";
import React from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import App from "./App";
import "./index.css";
import translationEN from "./locales/EN.json";
import translationFR from "./locales/FR.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// const root = ReactDOM.createRoot(document.getElementById("root"));
createRoot(document.getElementById("root")).render(<App />);
// root.render(
//   <React.StrictMode>
//     <I18nextProvider i18n={i18n}>
//       <App />
//     </I18nextProvider>
//   </React.StrictMode>
// );
