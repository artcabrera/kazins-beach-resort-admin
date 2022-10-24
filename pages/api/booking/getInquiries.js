import BookingInquiry from "../../../models/BookingInquiry";
import dbconnect from "../../../lib/dbconnect";

export default async function handler(req, res) {
  await dbconnect();

  const inquiries = await BookingInquiry.find();

  res.json({ inquiries });
}
