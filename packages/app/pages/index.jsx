import Topbar from "@/components/Topbar";
import Head from "next/head";

export default function Home() {
  return (
    <div className="w-full h-screen bg-dark-200 flex flex-col items-center justify-center">
      <div className="w-full h-screen  md:max-w-[800px] px-5 ">
        <Topbar />
      </div>
    </div>
  );
}
