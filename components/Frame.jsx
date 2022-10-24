import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Frame = ({ path, children, noSidebar }) => {
  return (
    <>
      <Head>
        <title>Admin | Kazin&apos;s Beach Resort</title>
      </Head>
      <div className="w-full h-fit min-h-screen">
        <nav className="fixed top-0 left-0 z-50 w-full h-24 border-b flex justify-center backdrop-blur-sm bg-white/80 backdrop-saturate-150">
          <div className="w-8/12 flex justify-between items-center">
            <div className="w-1/6 h-fit">
              <Link href="/">
                <a>
                  <div className="w-20 h-12 relative">
                    <Image
                      src="/assets/images/logo.png"
                      layout="fill"
                      objectFit="contain"
                      alt="logo"
                    />
                  </div>
                </a>
              </Link>
            </div>
            <div className="w-4/6 h-fit text-sm space-x-6">
              <Link href="/booking-inquiries">
                <a
                  className={`${
                    path.includes("booking")
                      ? "font-semibold text-blue-500"
                      : "text-gray-500 hover:text-black font-medium"
                  }`}
                >
                  Booking
                </a>
              </Link>
              <Link href="/rooms-and-cottages">
                <a
                  className={`${
                    path.includes("rooms")
                      ? "font-semibold text-blue-500"
                      : "text-gray-500 hover:text-black font-medium"
                  }`}
                >
                  Rooms &amp; Cottages
                </a>
              </Link>
              <Link href="/gallery">
                <a
                  className={`${
                    path.includes("gallery")
                      ? "font-semibold text-blue-500"
                      : "text-gray-500 hover:text-black font-medium"
                  }`}
                >
                  Gallery
                </a>
              </Link>
            </div>
            <div className="w-1/6 h-fit flex justify-end">
              <Link href={process.env.NEXT_PUBLIC_MAIN_WEBSITE}>
                <a className="text-sm p-2 border rounded hover:border-black">
                  Main Website
                </a>
              </Link>
            </div>
          </div>
        </nav>
        <div className="pt-40 h-fit w-full flex justify-center">
          <div className={`w-8/12 h-fit pl-64 ${noSidebar && "pl-0"}`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Frame;
