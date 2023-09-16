import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import Head from "next/head";

export default function Home() {
  const nocredExtRelease =
    "https://github.com/Benrobo/nocred/releases/tag/latest";

  return (
    <>
      <div className="w-full h-screen bg-dark-200 flex flex-col items-center justify-center overflow-y-scroll hideScrollBar scroll-smooth">
        <div className="w-full h-screen md:max-w-[800px] px-5 ">
          <Topbar />
          <br />
          <div className="w-full flex flex-col items-start justify-start px-5">
            <h1 className="text-white-100 font-ppB text-2xl md:text-4xl ">
              Nocred: Secure E-Portal Access Without Credentials.
            </h1>
            <p className="text-white-300 font-ppReg mt-2 text-[15px] ">
              Securely Grant other students access to your noun{" "}
              <a
                href="https://elearn.nou.edu.ng"
                target="_blank"
                className="text-white-100 underline"
              >
                elearn
              </a>{" "}
              portal without sharing credentials.
            </p>
          </div>

          <br />
          <div className="w-full mt-9 flex flex-col items-start justify-start px-5">
            <p className="text-white-300 text-[13px] font-ppReg">
              First and foremost
            </p>
            <h1 className="text-white-100 font-ppB text-2xl md:text-4xl ">
              Why I built this?
            </h1>
            <br />
            <div className="w-full flex flex-col items-start justify-start gap-3">
              <p className="text-white-200 text-[14px] font-ppReg">
                Many Noun students I've met have faced issues when they share
                their eLearn portal login details with other students or
                vendors. They do this to solve problems, access Tutor Marked
                Assessments (TMA), or for other reasons.
              </p>
              <p className="text-white-200 text-[14px] font-ppReg">
                As a result, some students have had their login details stolen,
                and others have experienced unauthorized access to their
                assessments. Some have even entered exam halls only to find a
                message saying "Exam Submitted by you!" without their knowledge,
                causing distress and regret later on.
              </p>
              <p className="text-white-200 text-[14px] font-ppReg">
                Recognizing this problem, I took the initiative to create a
                secure application. This app allows students to access the
                eLearn platform of their peers without having to share their
                matriculation number or password with anyone else.
              </p>
            </div>
            <br />
            <br />
            <h1 className="text-white-100 font-ppB text-2xl md:text-4xl ">
              Is This Secure ?
            </h1>
            <div className="w-full mt-2 flex flex-col items-start justify-start gap-3">
              <p className="text-white-200 text-[14px] font-ppReg">
                To some extent, <span className="text-white-100">Yes</span>. The
                generated link has an expiration period, which can be set to
                30min, 1hr, or 1day, as indicated in the extension.
              </p>
              <p className="text-white-200 text-[14px] font-ppReg">
                Additionally, the session data collected from the logged-in user
                is securely encrypted using the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard"
                  target="_blank"
                  className="text-green-400 font-ppB underline"
                >
                  AES
                </a>{" "}
                encryption algorithm and a secret key stored on the server
                before storage. However, it's important to note that even with
                these security measures, there is still a potential risk. If you
                grant access to your portal and someone copies your logged-in
                session ID, they could potentially use it later, especially if
                they have some technical knowledge.
              </p>
              <p className="text-white-200 text-[14px] font-ppReg">
                As a precaution, I would recommend generating a nocred URL with
                a 30min expiration to minimize the risk of the link being used
                beyond the intended timeframe.{" "}
                <span className="text-white-100 font-ppB">
                  Use at your own risk
                </span>
              </p>
            </div>
            <br />
            <br />

            <h1
              id="getstarted"
              className="text-white-100 font-ppB text-2xl md:text-4xl "
            >
              Get Started
            </h1>
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              Using this extention is as easy as possible. All you have to do is
              follow the instruction below:
            </p>
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">
                Download Extention:{" "}
              </span>
              Nocred extention can be downloaded from this{" "}
              <a
                target="_blank"
                href={nocredExtRelease}
                className="text-green-400 underline"
              >
                github release
              </a>
              . After downloading, Open your default PC browser, for me, it
              brave. Navigate to the puzzle icon at top right corner of the
              browser, click on that icon and select{" "}
              <span className="text-white-100">Managed Extentions</span> as seen
              in the picture below
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/1.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">
                Load Downloaded Extention:{" "}
              </span>
              Navigate to the section where is says{" "}
              <span className="text-white-100">Load unpacked</span> as shown in
              the image below. You also need to make sure{" "}
              <span className="text-white-100">Developer mode</span> is enabled.
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/2.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">
                Upload Downloaded Assets:{" "}
              </span>
              You would be prompted to upload the downloaded extention assets.
              Note!! You have to unzip the assets before uploading to
              chrome.After that simply select the extracted extensions folder as
              seen below
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/3.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">View Extention: </span>
              Once it has been uploaded and loaded correctly without no errors,
              it should look as the picture shown below
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/4.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">Pin Extention: </span>
              To make the extention more assessible, you can pin the extention
              by following the picture guide below
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/5.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <p className="text-white-200 text-[14px] font-ppReg">
              <span className="text-white-100 font-ppB">Use Extention: </span>
              If all instructions have been followed correctly,The extention
              should be available to use. Simply navigate to your noun e-learn
              platform.{" "}
              <span className="text-white-100">
                You must be loggedIn for this to work correctly.
              </span>
            </p>
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/6.png"
              alt=""
              className="w-full mt-8"
            />
            <br />
            <br />
            <blockquote className="w-full px-4 py-3 bg-dark-100 font-ppReg border-l-solid border-l-[3px] border-l-green-400 text-white-300 text-[13px] ">
              The recipient at which nocred link would be sent to also need to
              have the extention available for use, otherwise the image below
              would be shown.
            </blockquote>
            <br />
            <br />
            <img
              src="https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/7.png"
              alt=""
              className="w-full mt-8 bg-dark-100 border-solid border-[2px] border-white-600 rounded-[10px] "
            />
          </div>
          <div className="h-[100px] "></div>
          <Footer />
        </div>
      </div>
    </>
  );
}
