"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
// import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { convertBase64ToImage } from "@/lib/base64";
import ImageLoader from "@/components/Image/ImageLoader";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@/lib/subscription";
import { getWalletInfo } from "@/lib/tokens";
import { isBase64Image } from "@/lib/utils"; // Add this import

interface ClientGenerateImageProps {
  data: any[];
}

const ClientGenerateImage = ({ data }: ClientGenerateImageProps) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [defaultPrompt, setDefaultPrompt] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<any>(null);
  const [imageBeingGenerated, setImageBeingGenerated] = useState(false);
  const [tabs] = useState(['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5']);
  const [tabContents] = useState([
    [{ prompt: "Prompt 1", text: "Option 1" }, { prompt: "Prompt 2", text: "Option 2" }],
    [{ prompt: "Prompt 3", text: "Option 3" }, { prompt: "Prompt 4", text: "Option 4" }],
    // Add more arrays for each tab
  ]);
  const [imageUuid, setImageUuid] = useState<string | null>(null);

  const isSubscribed = useSubscription();

  const handleGenerate = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // if (!isSubscribed) {
    //   router.push("/subscriptions");
    //   return;
    // }

    if (tokenBalance <= -10000) {
      router.push("/tokens");
      return;
    }

    // Deduct a token
    setTokenBalance(prev => prev - 1);
    // You might want to update this on the server as well
    // await axios.post('/api/subtracttokens', { amount: 1 });

    const imageResponse = await axios.get(selectedItem.baseImageOne, {
      responseType: "arraybuffer",
    });
    let fileImage;
    setGeneratedImages(null);
    setImageUuid(null);
    if (defaultPrompt && selectedItem) {
      const result = {
        positive_prompt: defaultPrompt,
        char_name: selectedItem.name,
        charId: selectedItem.id,
        companion: selectedItem,
      };

      setImageBeingGenerated(true);
      try {
        const response = await axios.post('/api/generate_consistent_character', result);
        setImageUuid(response.data.image_uuid);
        pollForImage(response.data.image_uuid);
      } catch (error) {
        console.error("Error generating images:", error);
        setImageBeingGenerated(false);
      }
    }
  };

  const pollForImage = async (uuid: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`/api/poll-image?uuid=${uuid}`);
        if (response.status === 200) {
          setGeneratedImages(response.data.image_data);
          setImageBeingGenerated(false);
          clearInterval(pollInterval);
        } else if (response.status === 202) {
          // Image is still being generated, continue polling
        } else {
          console.error("Error polling for image:", response.data.error);
          setImageBeingGenerated(false);
          pollForImage(uuid);
        }
      } catch (error) {
        console.error("Error polling for image:", error);
        setImageBeingGenerated(false);
        pollForImage(uuid);
      }
    }, 2000); // Poll every 2 seconds
  };

  const handleCardClick = (item: any) => {
    setSelectedItem(item);
  };

  function handlePromptClick(prompt: string): void {
    setDefaultPrompt(prompt);
    console.log(defaultPrompt);
    console.log(tabContents);
    console.log(tabContents[activeTabIndex]);
    console.log(tabContents[activeTabIndex].find((item: { prompt: string; text: string }) => item.prompt === prompt));
  }

  return (
    <div>
      <div className="flex items-center justify-center mb-7">
        <h1 className="text-3xl text-white font-bold leading-10 ml-3">
          Generate Image
        </h1>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="hidden mr-0 xl:mr-7 xl:flex xl:flex-col xl:flex-initial xl:w-[478px] h-[800px] 2xl:w-[580px] xl:items-center xl:justify-center bg-popover xl:border border-grey-dark rounded-[10px] mb-5 xl:mb-0"
          data-generate-image-target="generatedImage"
        >
          <div id="image-loader-container">
            {generatedImages ? (
                <ImageLoader key={0} d={generatedImages} height={768} width={512} prompt={Math.random()} />
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-[20px] text-grey-light text-center font-semibold mt-4">
                  {imageBeingGenerated ? (
                    <>Generating...<br /><br />{defaultPrompt}</>
                  ) : (
                    `Enter a prompt and click "Generate"`
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-1 w-full xl:w-2/3">
          <div
            className="flex flex-0 items-center flex-col rounded-[10px] bg-popover border border-grey-dark w-full p-5 2xl:p-7"
            data-generate-image-target="chooseCharacterContainer"
          >
            <span className="text-sm leading-[30px] text-grey-light font-bold sm:text-[20px] sm:font-semibold">
              Choose Character*
            </span>

            {data.length === 0 ? (
              <div className="pt-10 md:pt-20 md:pb-20 flex flex-col items-center justify-center space-y-3 md:space-y-0">
                <div className="relative w-[11rem] md:w-[12rem] h-[11rem] md:h-[12rem]">
                  <Image
                    fill
                    className="grayscale"
                    alt="Empty"
                    src="/img/not_found.svg"
                  />
                </div>
                <p className="text-lg md:text-lg text-muted-foreground">
                  No companions found under category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pb-10 pt-5 md:pt-10 md:pb-5">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    className={`bg-muted rounded-xl cursor-pointer hover:opacity-75 transition border-0 ${
                      selectedItem?.id === item.id ? "bg-gray-700" : ""
                    }`}
                    onClick={() => handleCardClick(item)}
                  >
                    <CardHeader className="flex items-center justify-center text-center text-muted-foreground h-fit">
                      <div className="relative w-full h-[110px] lg:h-[150px] xl:h-[80px] 2xl:h-[150px]">
                        <Image
                          src={isBase64Image(item.src) ? `data:image/png;base64,${item.src}` : item.src}
                          fill
                          className="rounded-t-xl object-cover object-top"
                          alt="Companion"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="">
                      <p className="font-medium text-[16px] md:text-[22px] text-white">
                        {item.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 items-left flex-col rounded-[10px] bg-popover border border-grey-dark w-full mt-7 p-5 md:p-7 md:py-5">
            <div className="flex flex-col mb-[10px]">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-grey-default md:text-[20px] leading-[30px] md:leading-[40px]"
              >
                Default Prompt*
              </label>
              <textarea
                value={defaultPrompt}
                onChange={(e) => setDefaultPrompt(e.target.value)}
                className="block w-full h-[56px] min-h-[100px] resize-none rounded-lg border border-grey-dark bg-muted p-3 shadow-sm sm:text-[16px] text-white leading-[30px] md:leading-[40px] md:text-[20px] lg:text-[20px]"
                placeholder="Enter a prompt here..."
              ></textarea>
            </div>
            {/* <div className="grid grid-cols-5 gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTabIndex(index)}
                  className={`py-2 px-3 rounded-lg text-white ${
                    activeTabIndex === index ? "bg-grey-dark" : "bg-grey-light"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div> */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
              {tabContents[activeTabIndex]?.map((item: { prompt: string; text: string }, index: number) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(item.prompt)}
                  className="py-2 px-3 rounded-lg bg-grey-light text-white"
                >
                  {item.text}
                </button>
              ))}
            </div> */}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGenerate}
              className="py-2 px-4 bg-[#FC768A] text-white rounded-lg"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientGenerateImage;