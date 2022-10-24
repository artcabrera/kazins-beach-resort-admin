import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Frame from "../components/Frame";

const RoomCottage = () => {
  return (
    <Frame path={"rooms"}>
      <div className="fixed left-[16.666667%] top-32 py-8 h-full w-1/5">
        <div className="font-semibold space-y-4 h-full">
          <div className="flex items-center">
            <ChevronDownIcon className="h-3 w-3 text-gray-400 mr-3" />
            Rooms &amp; Cottages
          </div>
          <div className="border-l ml-1 h-full pl-6 font-normal text-gray-600 flex flex-col space-y-4">
            <Link href="/rooms-and-cottages">
              <a className="text-black">&bull;&nbsp;&nbsp;Manage</a>
            </Link>
            <Link href="/add-new-room-cottage">
              <a className="hover:text-black">
                &bull;&nbsp;&nbsp;Add New Room/Cottage
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="text-5xl mb-8 font-bold">Rooms & Cottages</div>
      </div>
    </Frame>
  );
};

export default RoomCottage;
