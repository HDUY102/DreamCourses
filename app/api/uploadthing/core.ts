import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

  // Fake auth function
const auth = (req: Request) => ({ id: "fakeId" });
 
export const ourFileRouter = {
    courseImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
        // .middleware(()=>auth())
        .onUploadComplete(()=>{}),
    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .onUploadComplete(()=>{}),
    chapterVideo: f({video: {maxFileCount:1, maxFileSize: "512GB"}})
        .onUploadComplete(()=>{})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;