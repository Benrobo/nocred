import React from "react";
import { DiGithubBadge } from "react-icons/di";

function Footer() {
  return (
    <div className="w-full bg-dark-200">
      <p className="w-full flex items-center justify-between gap-3 py-7">
        <div className="w-auto flex items-center justify-between">
          <span className="text-white-300 text-[13px] flex items-center justify-center ">
            Created by{" "}
            <a
              target="_blank"
              href="https://github.com/benrobo"
              className="font-ppB underline ml-2"
            >
              benrobo
            </a>
          </span>
        </div>
        <div className="w-auto flex items-center justify-between">
          <a
            target="_blank"
            href="https://github.com/benrobo/nocred"
            className="font-ppB underline ml-2"
          >
            <DiGithubBadge className="text-white-100" size={20} />
          </a>
        </div>
      </p>
    </div>
  );
}

export default Footer;
