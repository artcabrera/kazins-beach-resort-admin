import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  type: String,
  image: String,
});

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
