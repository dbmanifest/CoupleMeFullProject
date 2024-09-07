import React from "react";
// import axios from "axios";
import ClientDiscoverPage from "./ClientDiscoverPage";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

// async function fetchData(categoryId: string) {
//   const response = await axios.get("http://localhost:3000/api/discover", {
//     params: { categoryId },
//   });
//   return response.data;
// }

const DiscoverPage = async ({ searchParams }: RootPageProps) => {
  // const data = await fetchData(searchParams.categoryId);
  const data = await prismadb.companion.findMany({
    where: {
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
    },
  });
  const categories = await prismadb.category.findMany();

  return (
    <ClientDiscoverPage
      initialData={data}
      initialCategories={categories}
      initialCategoryId={searchParams.categoryId}
    />
  );
};

export default DiscoverPage;
