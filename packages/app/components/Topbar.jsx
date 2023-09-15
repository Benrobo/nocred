import Link from "next/link";
import React from "react";

function Topbar() {
  return (
    <Link href="/" className="w-full px-4 py-3 flex items-center justify-start">
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
  );
}

export default Topbar;
