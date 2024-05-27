import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ChildProps } from "@/types";
import React from "react";

const RootLayout = ({ children }: ChildProps) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1F1F1F] p-4">
        <div className="h-[85vh] bg-white dark:bg-black ml-4 rounded-md p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
