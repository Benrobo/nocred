import Topbar from "@/components/Topbar";
import env from "@/config/env";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function NocredId({ response }) {
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [extentionInstalled, setExtensionInstalled] = useState(false);

  useEffect(() => {
    if (response?.error) {
      setIsError(true);
      setErrorMsg(response?.msg);
      localStorage.removeItem("@nocred_ext");
    } else {
      setIsError(false);
      setErrorMsg(null);
      setSessionId(response?.sessionId);
      localStorage.setItem("@nocred_ext", response?.sessionId);
    }
  }, [response]);

  useEffect(() => {
    const cookie = document.cookie;
    const splittedCookie = cookie.split(" ");
    splittedCookie.forEach((c) => {
      const content = c.split("=");
      if (content[0] === "Nocred_Ext_Installed") {
        const value = Boolean(content[1]);
        setExtensionInstalled(value);
      }
    });
  });

  return (
    <div className="w-full h-screen bg-dark-200 flex flex-col items-center justify-start">
      <Topbar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-auto text-center flex flex-col items-center justify-center">
          {isError ? (
            <ErrorComp message={errorMsg} />
          ) : (
            <SuccessComp
              sessionId={sessionId}
              extInstalled={extentionInstalled}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NocredId;

function SuccessComp({ sessionId, extInstalled }) {
  const domain = "elearn.nou.edu.ng";
  const NOUN_ELEARN_URL = "https://elearn.nou.edu.ng";
  const COOKIE_KEY = "MoodleSession";

  function redirectUser() {
    if (!sessionId || sessionId === null) {
      window.alert("Session is missing.");
      return;
    }
    // redirect
    window.location.href = NOUN_ELEARN_URL;
  }

  return (
    <div className="w-full flex items-center justify-center text-center flex-col">
      <h1 className="text-white-100 font-ppB text-2xl sm:text-1xl ">
        Use this <span className="bg-green-405 font-ppReg px-2">Nocred</span>{" "}
        URL to automatically get access to{" "}
      </h1>
      <br />
      <h1 className="text-green-400 font-ppB ">{domain}</h1>
      <br />
      {extInstalled ? (
        <a
          href={NOUN_ELEARN_URL}
          className="w-auto px-6 py-3 rounded-[30px] bg-green-405 hover:bg-green-600 border-solid border-[2px] border-transparent hover:border-green-200 transition-all scale-[.90] hover:scale-[.95] text-white-100 font-ppReg flex items-center justify-center"
          onClick={redirectUser}
        >
          Get access to {domain}
        </a>
      ) : (
        <Link
          href="/"
          className="w-auto px-7 py-3 rounded-[30px] bg-green-600 hover:bg-green-600 border-solid border-[2px] border-green-200 transition-all scale-[.90] hover:scale-[.95] text-white-100 font-ppReg flex items-center justify-center"
          onClick={redirectUser}
        >
          🧩 Add Extention to Chrome
        </Link>
      )}
      <p className="text-white-300 mt-2 font-ppReg text-[13px] ">
        🔐 Nocred encrypt session using{" "}
        <a
          href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
          target="_blank"
          className="text-green-200 px-1 font-ppB underline"
        >
          AES
        </a>
      </p>
    </div>
  );
}

function ErrorComp({ message }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center gap-2">
      <span className="text-4xl text-red-305">⚠️</span>
      <h1 className="text-white-100 font-ppB text-2xl md:text-3xl ">
        An Error Occured!
      </h1>
      <p className="text-white-300 font-ppReg">{message}</p>
      <p className="text-white-400 max-w-[250px] text-[13px] font-ppReg">
        If this error persist, please DM me on{" "}
        <a
          href="https://x.com/benaiah_al"
          target="_blank"
          className="text-white-100 underline"
        >
          twitter
        </a>
      </p>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { url_id } = query;
  let response = {
    error: false,
    sessionId: null,
    msg: null,
  };
  try {
    const url = `${env.api}/url/${url_id}`;
    const res = await fetch(url);
    const resp = await res.json();

    if (resp.errorStatus) {
      response["error"] = true;
      response["msg"] = resp?.message;
    } else {
      response["error"] = false;
      response["sessionId"] = resp?.data?.sessionId;
    }
  } catch (e) {
    response["error"] = true;
    response["msg"] = e?.message;
  }

  return {
    props: {
      response,
    },
  };
}
