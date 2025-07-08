import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

interface PolaroidCardProps {
  path: string;
  caption: string;
  index?: number;
}

export async function PolaroidCard({
  path,
  caption,
  index = 0,
}: PolaroidCardProps) {
  const supabase = await createClient();
  const { data: imageUrl, error } = await supabase.storage
    .from("party")
    .createSignedUrl(path, 360);

  const rotation = [
    "rotate-[5deg]",
    "-rotate-[5deg]",
    "-rotate-[3deg]",
    "rotate-[3deg]",
  ];

  const shadow = [
    "shadow-[0_2.1rem_2rem_rgba(0,0,0,0.4)]",
    "shadow-[0_2.1rem_2rem_rgba(0,0,0,0.4)]",
    "shadow-[0_2.1rem_2rem_rgba(0,0,0,0.3)]",
    "shadow-[0_2.1rem_2rem_rgba(0,0,0,0.3)]",
  ];

  const rotationClass = rotation[index % rotation.length];
  const shadowClass = shadow[index % shadow.length];

  return (
    <div
      className={`relative inline-block w-60 md:w-96 m-4 md:grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105 ${rotationClass} hover:rotate-0`}
    >
      <div
        className={`bg-white p-4 shadow-lg relative after:content-[''] after:absolute after:h-[20%] after:w-[47%] after:bottom-[30px] after:-z-10 after:${
          index % 2 === 0 ? "right-3" : "left-3"
        } after:${shadowClass} after:transition-all after:duration-300 hover:after:rotate-0 hover:after:h-[90%] hover:after:w-[90%] hover:after:bottom-0 hover:after:right-[5%]`}
      >
        {imageUrl && (
          <img
            src={imageUrl.signedUrl}
            alt={caption}
            className="w-full h-auto object-cover"
            width={500}
            height={500}
          />
        )}

        <div
          className="text-xl mt-2 text-left"
          style={{ fontFamily: "var(--font-subtitle)" }}
        >
          {caption}
        </div>
      </div>
    </div>
  );
}
