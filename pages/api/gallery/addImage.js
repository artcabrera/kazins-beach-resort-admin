import Gallery from "../../../models/Gallery";
import dbconnect from "../../../lib/dbconnect";

export default async function handler(req, res) {
  const { category } = req.query;
  const { newPhotoUrl } = req.body;
  await dbconnect();

  const newImage = new Gallery({
    type: category,
    image: newPhotoUrl,
  });
  await newImage.save();
  res.json({ message: "OK" });
}
