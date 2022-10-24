import BookingInquiry from "../../../models/BookingInquiry";
import dbconnect from "../../../lib/dbconnect";

export default async function handler(req, res) {
  const { itemId } = req.body;
  await dbconnect();

  await BookingInquiry.deleteOne({ itemId });
  res.json({ message: "OK" });
}
