"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder, Minus } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import ListAction from "./list-action";

interface ListItemProps {
  item: IFolderAndFile;
}

const ListItem = ({ item }: ListItemProps) => {
  const { user } = useUser();
  const { name, size } = item;
  const truncatedFileName =
    size && name.length > 12 ? `${name.slice(0, 6)}...${name.slice(-6)}` : name;

  return (
    <TableRow className="group cursor-pointer">
      <TableCell>
        <div className="flex items-center space-x-1" role="button">
          {size ? (
            <File className="w-4 h-4 text-blue-500" />
          ) : (
            <Folder className="w-4 h-4 text-gray-500 fill-gray-500" />
          )}
          <span>{truncatedFileName}</span>
        </div>
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span className="opacity-75">me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), "dd MMM, yyyy")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center space-x-2">
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  );
};

export default ListItem;
