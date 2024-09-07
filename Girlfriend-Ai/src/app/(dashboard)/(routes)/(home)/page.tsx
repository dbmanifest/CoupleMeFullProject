import Categories from "@/components/dashboard/categories";
import { Companions } from "@/components/dashboard/companions";
import FAQ from "@/components/parts/faq";
import GenderDialog from "@/components/parts/gender-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const Home = async ({ searchParams }: RootPageProps) => {
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
  return (
    <div>
      {/* <GenderDialog /> */}
      {/* <div className="my-4 md:hidden w-full flex items-center justify-center">
        <SliderToggle />
      </div> */}
      <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6 mt-1 md:mt-0">
        <div className=" w-full flex flex-col my-8 lg:items-center justify-center">
          <div className="w-full items-center flex flex-col">
            <h4 className="text-3xl font-bold">
              <span className="text-primary">Explore</span> AI Characters
            </h4>
          </div>
          {/* <div className="mt-5 md:mt-8">
            <Categories data={categories} />
          </div> */}
        </div>
        <Companions data={data} />
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
