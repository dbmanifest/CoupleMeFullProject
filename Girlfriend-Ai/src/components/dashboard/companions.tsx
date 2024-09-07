import { Companion } from "@prisma/client/edge";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";
import { isBase64Image } from "@/lib/utils"; // Add this import

interface CompanionProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionProps) => {
  if (data.length === 0) {
    return (
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
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-10 pt-5 md:pt-10 md:pb-5">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-muted rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground h-fit">
              <div className="relative w-full h-[210px] lg:h-[250px] xl:h-[280px] 2xl:h-[350px]">
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
              <p className="text-[15px] md:text-[16px] font-light text-muted-foreground min-h-[50px]">
                {item.description}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};
