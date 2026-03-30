import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // 🟢 CHANGE: Use a single image config for the Hero Banner
  imageUploader: f({ 
    image: { 
      maxFileSize: "34MB", 
      maxFileCount: 1 
    } 
  })
    .middleware(async ({ req }) => {
      // 🟢 FIX: Ensure middleware returns a valid object, not undefined
      return { userId: "admin_aishwarya" }; 
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("✅ UPLOAD SUCCESS:", file.url);
      // This return value is what goes to 'onClientUploadComplete'
      return { url: file.url };
    }),
};