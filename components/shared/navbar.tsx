import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { HelpCircle, Settings } from "lucide-react";
import UserBox from "./user-box";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Navbar = () => {
  const { userId } = auth();
  console.log(userId);

  return (
    <div className="h-[10vh] fixed flex items-center top-0 right-0 z-30 border-b  bg-[#F6F9FC] w-full dark:bg-[#1F1F1F]">
      <div className="w-full flex items-center justify-between my-4 mx-6">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width={40} height={40} priority />
            <span className="pl-2 text-[22px] opacity-75 dark:text-white">
              Drive
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          <ModeToggle />
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <HelpCircle className="h-5 w-5 " />
          </div>
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <Settings className="h-5 w-5 " />
          </div>
          {userId ? (
            <UserBox />
          ) : (
            <Avatar className="cursor-pointer">
              <AvatarFallback>HD</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
