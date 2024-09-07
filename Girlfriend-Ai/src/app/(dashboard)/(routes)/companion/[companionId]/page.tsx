import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CompanionForm } from "./components/companion-form";
import Wizard from "./components/Wizard"

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Create Your Companion  - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // const validSubscription = await checkSubscription();

  // if (!validSubscription) {
  //   return redirect("/");
  // }


  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;

  return <Wizard />
};

export default CompanionIdPage;
