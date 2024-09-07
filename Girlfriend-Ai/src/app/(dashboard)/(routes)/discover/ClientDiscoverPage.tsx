"use client";

import { useState, useEffect } from "react";
import { Companions } from "@/components/dashboard/companions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

interface ClientDiscoverPageProps {
  initialData: any[];
  initialCategories: any[];
  initialCategoryId: string;
}

const ClientDiscoverPage = ({
  initialData,
  initialCategories,
  initialCategoryId,
}: ClientDiscoverPageProps) => {
  const [data, setData] = useState(initialData);
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);

  useEffect(() => {
    if (selectedCategory !== initialCategoryId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/discover`, {
            params: {
              categoryId: selectedCategory,
            },
          });
          setData(response.data.data);
          setCategories(response.data.categories);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [selectedCategory, initialCategoryId]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      <div className="flex flex-col w-full bg-popover md:h-fit rounded-3xl p-3 md:p-6 mb-6">
        <div className="w-full flex flex-col my-8 items-center justify-center">
          <h4 className="text-3xl font-bold">
            <span className="text-primary">Discover</span> All AI Characters
          </h4>

          <div className="flex flex-row gap-2 items-center mt-4">
            {categories.map((category: any) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div>
            <Skeleton className="w-full h-[28rem]"></Skeleton>
            <Skeleton className="w-full h-[28rem]"></Skeleton>
          </div>
        ) : (
          <Companions data={data} />
        )}
      </div>
    </div>
  );
};

export default ClientDiscoverPage;
