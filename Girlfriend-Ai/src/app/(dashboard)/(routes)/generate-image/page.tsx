import React from "react";
// import axios from "axios";
import ClientGenerateImage from "./ClientGenerateImage";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

// async function fetchData(categoryId: string) {
//   const response = await axios.get(
//     "http://localhost:3000/api/generate_consistent_character",
//     {
//       params: { categoryId },
//     }
//   );
//   return response.data.data;
// }

const GenerateImage = async ({ searchParams }: RootPageProps) => {
  // const data = await fetchData(searchParams.categoryId);
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    }
  });
  return <ClientGenerateImage data={data} />;
};

export default GenerateImage;
