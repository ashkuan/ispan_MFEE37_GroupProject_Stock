import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = (props) => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photopath, setPhotopath] = useState("");

  return (
    <UserContext.Provider
      value={{
        uid,
        setUid,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        photopath,
        setPhotopath,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
