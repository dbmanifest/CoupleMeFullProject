"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {dasboardNavigation.slice(0, 2).map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}


          {dasboardNavigation.slice(2, 20).map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
