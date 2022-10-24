import Rooms from "../../../models/Rooms";
import Cottages from "../../../models/Cottages";
import dbconnect from "../../../lib/dbconnect";

export default async function handler(req, res) {
  const { newType, newName, newPricing, newDescription, newPhotoUrl } =
    req.body;
  await dbconnect();
  if (newType === "room") {
    const newRoom = await new Rooms({
      name: newName,
      type: newType,
      description: newDescription,
      price: newPricing,
      images: [newPhotoUrl],
    });

    const result = await newRoom.save();
    console.log(result);
  } else if (newType === "cottage") {
    const newCottage = new Cottages({
      name: newName,
      type: newType,
      description: newDescription,
      price: newPricing,
      images: [newPhotoUrl],
    });
    await newCottage.save();
  }

  res.json({ message: "OK" });
}
