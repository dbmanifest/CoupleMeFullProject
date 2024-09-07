import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "MyAI - couple.me",
  description:
    "Enjoy the ultimate AI girlfriend and boyfriend experience online."
};
const MyAIPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center md:items-start w-full bg-popover md:h-fit min-h-[calc(90dvh)] md:min-h-[90vh] rounded-3xl p-3 md:p-6 mb-6">
        <div className="w-full flex items-center justify-center">
          <h4 className="text-3xl font-bold">
            My <span className="text-primary">AI</span>
          </h4>
        </div>

        <Link href="/companion/new" className="mt-6 md:mt-10 w-full">
          <div className="w-full md:w-[20rem] h-[25rem] bg-accent hover:bg-primary transition-all rounded-2xl flex flex-col items-center justify-center">
            <PlusCircle height={60} width={60} />
            <p className="mt-4 font-medium text-lg">Create new AI</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyAIPage;
