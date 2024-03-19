import Image from "next/image";
import React, { useState, useEffect } from "react";

const MarsHeroISection = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://source.unsplash.com/random/800x600/?mars");
        const imageUrl = response.url;
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div data-testid="hero-section" className={`h-64 my-4 ${!imageUrl && "border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600"}`}>
      <div className="relative overflow-hidden h-full w-full rounded-md">
        {imageUrl && (
          <Image className="block object-cover object-bottom w-full h-auto absolute top-0 left-0" src={imageUrl} alt="Mars Landscape" layout="fill" />
        )}
      </div>
    </div>
  );
};

export default MarsHeroISection;
