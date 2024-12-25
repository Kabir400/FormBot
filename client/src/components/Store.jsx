import React, { useState, createContext, useEffect } from "react";

export const utilityContext = createContext();
export const dataContext = createContext();

function Store({ children }) {
  const utility = useState({
    theme: "dark",
    createFolderPopup: false,
    createFormPopup: false,
    DeleteFolderPopup: false,
    DeleteFormPopup: false,
    DeleteFolderId: null,
    DeleteFormId: null,
    isDisabledShare: true,
    isCopied: false,
    validationError: {},
  });

  const data = useState({
    folders: [],
    forms: [],
    selectedFolderId: null,
    filterdForms: [],
    formContent: [],
    formTitle: "",
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && ["dark", "light"].includes(theme)) {
      utility[1]({ ...utility[0], theme });
    }
  }, []);

  useEffect(() => {
    const forms = data[0].forms.filter(
      (form) => form.folderId === data[0].selectedFolderId
    );
    data[1]({ ...data[0], filterdForms: forms });
  }, [data[0].forms]);

  return (
    <utilityContext.Provider value={utility}>
      <dataContext.Provider value={data}>{children}</dataContext.Provider>
    </utilityContext.Provider>
  );
}

export default Store;
