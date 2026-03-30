import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String }, // e.g., "Diwali Special Collection"
  link: { type: String, default: "/collections" }, // Where it goes when clicked
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);