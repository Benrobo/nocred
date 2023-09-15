import Link from "next/link";
import React from "react";
import { DiGithubBadge } from "react-icons/di";

function Topbar() {
  return (
    <div className="w-full flex items-center justify-between relative">
      <Link
        href="/"
        className="w-auto px-4 py-3 flex items-center justify-start"
      >
        <img
          src="/logo.png"
          width={0}
          height={0}
          className="w-[50px] "
          alt="nocred logo"
          placeholder="empty"
        />
        <h1 className="text-green-200 font-ppB ">Nocred</h1>
      </Link>
      <a
        target="_blank"
        href="https://github.com/benrobo/nocred"
        className="font-ppB underline ml-2"
      >
        <DiGithubBadge className="text-white-100" size={20} />
      </a>
    </div>
  );
}

export default Topbar;
