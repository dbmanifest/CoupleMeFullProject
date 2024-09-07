import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CompanionInfo from "@/components/dashboard/section/CompanionInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { currentUser } from "@clerk/nextjs/server";


export const metadata = {
  title: "CoupleMe - Admin",
};

export default async function page() {
  const user = await currentUser();

  return (
    <>
      {user?.privateMetadata.secret === process.env.ADMIN_SECRET ? (<>
        <MobileNavigation2 />
        <DashboardLayout>
          <CompanionInfo />
        </DashboardLayout>
      </>
      ) : (
        <>
          <div className="flex items-center justify-center h-screen">
            <p className="text-8xl text-red-600">
              Not Authorised
            </p>
          </div>
        </>
      )}
    </>
  );
}
