"use client";

import { Category } from "@prisma/client/edge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className="gap-2 w-full flex flex-row overflow-x-auto">
      <Button
        onClick={() => onClick(undefined)}
        className={cn(
          `
      
      `,
          !categoryId
            ? "bg-primary text-primary-foreground h-11 md:h-12"
            : "bg-secondary text-secondary-foreground h-11 md:h-12"
        )}
        variant="secondary"
      >
        All Models
      </Button>
      {data.map((item) => {
        return (
          <Button
            onClick={() => onClick(item.id)}
            key={item.id}
            className={cn(
              `
      
            `,
              item.id === categoryId
                ? "bg-primary text-primary-foreground h-11 md:h-12"
                : "bg-secondary text-secondary-foreground h-11 md:h-12"
            )}
            variant="secondary"
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default Categories;
