"use server";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData) => {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  //check validation
  const err: string[] = [];
  if (!title || title.trim().length === 0) {
    err.push("Title is required");
  }
  if (!content || content.trim().length === 0) {
    err.push("Content is required");
  }

  if (!image) {
    err.push("Image is required");
  }

  if (err.length > 0) {
    return { err };
  }

  //generate slug
  const slug = slugify(title);

  //get datetime now
  const now = new Date();
  const isoString = now.toISOString();

  const extension = image.name.split(".").pop();
  const fileName = `/image/${slug}.${extension}`;

  const filePath = path.join(process.cwd(), "public", fileName);

  //check file path system
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  //storage image to file system
  const stream = fs.createWriteStream(filePath);
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (e) => {
    if (e) {
      throw new Error("Saving image failed");
    }
  });

  const post: IPost = {
    id: uuidv4(),
    image_url: fileName,
    title: title,
    content: content,
    created_at: isoString,
    user_id: uuidv4(),
  };
  console.log(post);
  await fetch("http://localhost:8000/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });
  revalidatePath("/feed");
  redirect("/feed");
};
