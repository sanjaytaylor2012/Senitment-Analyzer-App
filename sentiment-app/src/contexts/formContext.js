import React, { useContext, useState } from "react";

const formContext = React.createContext();

export function useForms() {
  return useContext(formContext);
}

export const FormProvider = ({ children }) => {
  const [text, setText] = useState("");

  const [input, setInput] = useState("");

  function setterInput(inp) {
    setInput(inp);
  }

  function setterText(inp) {
    setText(inp);
  }

  return (
    <formContext.Provider value={{ input, setterInput, setterText, text }}>
      {children}
    </formContext.Provider>
  );
};
