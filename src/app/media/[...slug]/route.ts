import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const filename = params.slug[params.slug.length - 1];

  // Map file extension to content type
  let contentType = "image/jpeg";
  if (filename.endsWith(".png")) contentType = "image/png";
  else if (filename.endsWith(".webp")) contentType = "image/webp";
  else if (filename.endsWith(".avif")) contentType = "image/avif";
  else if (filename.endsWith(".svg")) contentType = "image/svg+xml";
  else if (filename.endsWith(".mp4")) contentType = "video/mp4";

  // Check in images
  const imagePath = path.join(process.cwd(), "public", "assets", "images", filename);
  if (fs.existsSync(imagePath)) {
    const fileBuffer = fs.readFileSync(imagePath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Check in videos
  const videoPath = path.join(process.cwd(), "public", "assets", "videos", filename);
  if (fs.existsSync(videoPath)) {
    const fileBuffer = fs.readFileSync(videoPath);
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Fallback: proxy from upstream sources and cache locally
  const fallbackUrls = [
    `https://puppy.instabizweb.com/media/${params.slug.join("/")}`,
    `https://static.wixstatic.com/media/${filename.replace("-mv2.", "~mv2.")}`,
    `https://static.wixstatic.com/media/${filename}`,
  ];

  for (const url of fallbackUrls) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Cache to disk
        try {
          fs.writeFileSync(imagePath, buffer);
        } catch {}
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            "Content-Type": res.headers.get("content-type") || contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      }
    } catch {}
  }

  return new NextResponse("Not Found", { status: 404 });
}
