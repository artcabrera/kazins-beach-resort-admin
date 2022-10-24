import { Listbox } from "@headlessui/react";
import {
  ArrowUpOnSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Frame from "../components/Frame";

const types = ["room", "cottage"];

const AddNew = () => {
  const [newType, setNewType] = useState(types[0]);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPricing, setNewPricing] = useState(null || "");
  const [newPhoto, setNewPhoto] = useState("");
  const [newFile, setNewFile] = useState("");

  const handlePreview = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file) return setNewPhoto("");
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
    setNewFile(file);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!newFile) return;

    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const { data } = await axios.post("/api/utils/imageUpload", formData);
      if (data && data.url) {
        const { data: res } = await axios.post(
          "/api/roomcottage/newRoomCottage",
          {
            newPhotoUrl: data.url,
            newName,
            newPricing,
            newDescription,
            newType,
          }
        );
        console.log(res);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

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
              <a className="hover:text-black">&bull;&nbsp;&nbsp;Manage</a>
            </Link>
            <Link href="/add-new-room-cottage">
              <a className="text-black">
                &bull;&nbsp;&nbsp;Add New Room/Cottage
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="text-5xl mb-8 font-bold">Add New</div>
        <form onSubmit={handleSave} className="pb-16">
          <div className="flex w-full space-x-8">
            <div className="w-1/3">
              <label className="text-sm font-medium text-gray-500">TYPE</label>
              <Listbox
                className="relative"
                as="div"
                value={newType}
                onChange={setNewType}
              >
                <Listbox.Button
                  as="button"
                  className="border uppercase border-gray-200 rounded w-full h-14 flex justify-between items-center px-4"
                >
                  <span>{newType}</span>
                  <span>
                    <ChevronDownIcon className="h-5 text-gray-600 w-5" />
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  as="div"
                  className="absolute top-14 border rounded shadow-md w-full z-10 py-2 bg-white"
                >
                  {types.map((item, index) => (
                    <Listbox.Option
                      className={({ active, selected }) =>
                        `p-2 select-none uppercase cursor-default ${
                          active ? "bg-gray-100 text-black" : "text-gray-700"
                        } `
                      }
                      as="div"
                      key={index}
                      value={item}
                    >
                      {item}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            <div className="w-2/3 relative h-14">
              <label className="text-sm font-medium text-gray-500">NAME</label>
              <input
                required
                type="text"
                name="newName"
                id="newName"
                value={newName}
                placeholder="Room 1A"
                onChange={(event) => setNewName(event.target.value)}
                className="border px-4 border-gray-200 flex items-center rounded w-full h-full focus:outline-none peer"
              />
            </div>
          </div>
          <div className="w-full h-fit pt-8">
            <label className="text-sm font-medium text-gray-500">
              DESCRIPTION
            </label>
            <textarea
              value={newDescription}
              placeholder="Say something about this..."
              onChange={(event) => setNewDescription(event.target.value)}
              className="h-40 w-full border border-gray-200 p-4 rounded focus:outline-none"
            ></textarea>
          </div>
          <div className="w-full h-fit py-8 flex space-x-8">
            <div className="h-14 w-1/4 relative">
              <label className="text-sm font-medium text-gray-500">
                PRICING
              </label>
              <input
                required
                type="text"
                name="newPricing"
                id="newPricing"
                value={newPricing}
                placeholder="250.00"
                onChange={(event) => setNewPricing(event.target.value)}
                className="border pr-4 pl-14 border-gray-200 flex items-center rounded w-full h-full focus:outline-none peer"
              />
              <div className="absolute -bottom-2 left-4">PHP</div>
            </div>
            <div className="w-3/4 h-14">
              <label className="text-sm font-medium text-gray-500">
                PHOTOS
              </label>
              <div className="border px-4 border-gray-200 flex items-center rounded w-full h-full focus:outline-none peer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePreview}
                  className="bg-transparent text-red-500"
                />
              </div>
            </div>
          </div>
          {newPhoto && (
            <div className="w-full h-96 pt-8">
              <div className="relative w-full h-full">
                <Image
                  src={newPhoto}
                  layout="fill"
                  objectFit="contain"
                  alt="newPhoto"
                />
              </div>
            </div>
          )}
          <button
            disabled={newPhoto ? false : true}
            className="w-full h-14 mt-8 rounded bg-black hover:bg-black/90 text-white disabled:bg-black/75 disabled:text-white/75"
          >
            SAVE
          </button>
        </form>
      </div>
    </Frame>
  );
};

export default AddNew;
