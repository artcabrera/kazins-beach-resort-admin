import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Frame from "../components/Frame";

const Gallery = () => {
  const router = useRouter();
  const { query } = router;
  const [images, setImages] = useState([]);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await axios.post("/api/utils/imageUpload", formData);
      if (data && data.url) {
        const { data: res } = await axios.post(
          `/api/gallery/addImage?category=${query.category}`,
          {
            newPhotoUrl: data.url,
          }
        );
        console.log(res);
        if (res) {
          getImages();
        }
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const getImages = async () => {
    setImages([]);
    const { data } = await axios.get(
      `/api/gallery/getImages?category=${query.category}`
    );
    if (data && data.result) {
      console.log(data.result);
      setImages(data.result);
    }
  };

  useEffect(() => {
    query.category ? getImages() : router.push("?category=rooms");
  }, [query.category]);
  return (
    <Frame path="gallery" noSidebar>
      <section id="startsection" className="relative h-fit w-full">
        <div className="flex flex-col items-center justify-center pb-12">
          <div className="grid grid-cols-2 gap-8 px-16 lg:grid-cols-4 lg:px-24">
            <Link href="?category=rooms#startsection">
              <a
                className={`col-span-1 border border-gray-800 px-8 py-4 text-center tracking-widest ${
                  query.category === "rooms" && "bg-gray-800 text-white"
                }`}
              >
                ROOMS
              </a>
            </Link>
            <Link href="?category=cottages#startsection">
              <a
                className={`col-span-1 border border-gray-800 px-8 py-4 text-center tracking-widest ${
                  query.category === "cottages" && "bg-gray-800 text-white"
                }`}
              >
                COTTAGES
              </a>
            </Link>
            <Link href="?category=nature#startsection">
              <a
                className={`col-span-1 border border-gray-800 px-8 py-4 text-center tracking-widest ${
                  query.category === "nature" && "bg-gray-800 text-white"
                }`}
              >
                NATURE
              </a>
            </Link>
            <Link href="?category=moments#startsection">
              <a
                className={`col-span-1 border border-gray-800 px-8 py-4 text-center tracking-widest ${
                  query.category === "moments" && "bg-gray-800 text-white"
                }`}
              >
                MOMENTS
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full h-48 border relative group">
          <div className="w-full h-full flex flex-col justify-center group-hover:bg-black/40 items-center text-9xl font-thin">
            +<span className="text-xl font-normal">Add</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:cursor-pointer"
          ></input>
        </div>
        <div className="h-fit w-full columns-1 gap-8 px-4 pt-8 lg:columns-3 lg:px-16">
          {images &&
            images.length > 0 &&
            images.map((item) => (
              <figure key={item._id}>
                <button>
                  <div className="group relative mb-8">
                    <img
                      className="relative z-0"
                      src={item.image}
                      alt="image"
                    />
                    <div className="absolute bottom-0 left-0 z-10 flex h-full w-full transform items-center justify-center bg-black/40 opacity-0 transition-all duration-100 ease-in group-hover:opacity-100">
                      <figcaption className="text-base font-medium tracking-widest text-white">
                        &nbsp;
                      </figcaption>
                    </div>
                  </div>
                </button>
              </figure>
            ))}
        </div>
      </section>
    </Frame>
  );
};

export default Gallery;
