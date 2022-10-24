const { default: Frame } = require("../components/Frame");
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const BookingManagement = () => {
  return (
    <>
      <Frame path={"booking"}>
        <div className="fixed left-[16.666667%] top-32 py-8 h-full w-1/5">
          <div className="font-semibold space-y-4 h-full">
            <div className="flex items-center">
              <ChevronDownIcon className="h-3 w-3 text-gray-400 mr-3" />
              Booking
            </div>
            <div className="border-l ml-1 h-full pl-6 font-normal text-gray-600 flex flex-col space-y-4">
              <Link href="/booking-inquiries">
                <a className="hover:text-black">&bull;&nbsp;&nbsp;Inquiries</a>
              </Link>
              <Link href="/booking-management">
                <a className="text-black">&bull;&nbsp;&nbsp;Management</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-fit">
          <div className="text-5xl mb-8 font-bold">Management</div>
        </div>
      </Frame>
    </>
  );
};

export default BookingManagement;
