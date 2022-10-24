import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Frame from "../components/Frame";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";

const BookingInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInquiries = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/booking/getInquiries");
    if (data) {
      setInquiries(data.inquiries);
    }
    setLoading(false);
  };

  const handleDelete = async (itemId) => {
    await axios.post("/api/booking/deleteInquiry", { itemId });
    getInquiries();
  };

  useEffect(() => {
    getInquiries();
  }, []);

  return (
    <>
      <Frame path={"booking"}>
        <div className="fixed left-[16.666667%] top-40 h-full w-64">
          <div className="font-semibold space-y-4 h-full">
            <div className="flex items-center">
              <ChevronDownIcon className="h-3 w-3 text-gray-400 mr-3" />
              Booking
            </div>
            <div className="border-l ml-1 h-full pl-6 font-normal text-gray-600 flex flex-col space-y-4">
              <Link href="/booking-inquiries">
                <a className="text-black">&bull;&nbsp;&nbsp;Inquiries</a>
              </Link>
              <Link href="/booking-management">
                <a className="hover:text-black">&bull;&nbsp;&nbsp;Management</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-fit pb-16">
          <div className="text-5xl mb-8 font-bold">Booking Inquiries</div>
          {loading && (
            <div className="w-full h-80 flex items-center justify-center">
              <svg
                className="h-8 w-8 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {!loading && inquiries.length > 0
            ? inquiries
                .slice(0)
                .reverse()
                .map((item, index) => (
                  <div className="w-full mt-4 h-fit group flex-col rounded relative bg-gray-100 border py-4 px-8 text-sm">
                    <div className="w-full h-fit flex text-gray-800">
                      <div className="relative w-fit h-24 aspect-video">
                        <Image
                          draggable="false"
                          src={item.racInquiry.images[0]}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col pl-4 space-y-2">
                        <div>
                          From: {item.firstName}&nbsp;{item.lastName}
                        </div>
                        <div>Unit: {item.racInquiry.name}</div>
                        <div>
                          Phone:{" "}
                          <Link href={`tel:${item.phone}`}>
                            <a className="relative z-10 hover:underline">
                              {item.phone}
                            </a>
                          </Link>
                        </div>
                        <div>
                          Email:{" "}
                          <Link href={`mailto:${item.email}`}>
                            <a className="relative z-10 hover:underline">
                              {item.email}
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="pt-8">{item.messages}</div>
                    <div className="absolute right-8 top-4 text-gray-500">
                      {moment(item.dateSent).format("lll")}
                    </div>
                    <div className="hidden w-full h-full absolute top-0 left-0 justify-end items-end p-4 bg-black/25 rounded pointer-events-auto group-hover:flex">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-white"
                      >
                        <TrashIcon className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                ))
            : !loading && (
                <div className="w-full rounded bg-gray-100 h-40 flex items-center justify-center">
                  No new inquiries
                </div>
              )}
        </div>
      </Frame>
    </>
  );
};

export default BookingInquiries;
