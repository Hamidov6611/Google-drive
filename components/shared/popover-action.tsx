"use client";
import { FileUp, Folder, FolderUp } from "lucide-react";
import React, { ElementRef } from "react";
import { Separator } from "../ui/separator";
import { useFolder } from "@/hooks/use-folder";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { timeStamp } from "console";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PopoverActions = () => {
  const inputRef = React.useRef<ElementRef<"input">>(null);
  const { onOpen } = useFolder();
  const { user } = useUser();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];

    let image = "";

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (e) => {
      image = e.target?.result as string;
    };

    const promise = addDoc(collection(db, "files"), {
      name: file.name,
      type: file.type,
      size: file.size,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = ref(storage, `files/${docs.id}`);
      uploadString(refs, image, "data_url").then(() => {
        const imageUrl = getDownloadURL(refs).then((url) => {
          updateDoc(doc(db, "files", docs.id), {
            image: url,
          }).then(() => {
            router.refresh();
          })
        });
      });
    });

    toast .promise(promise, {
      loading: "Loading...",
      success: "File uploaded",
      error: "Failed to upload file",
    });
  };
  return (
    <>
      <div
        onClick={onOpen}
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <Folder className="w-4 h-4" />
        <span>New folder</span>
      </div>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FileUp className="w-4 h-4" />
          <span>File upload</span>
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
      <Separator />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FolderUp className="w-4 h-4" />
          <span>Folder upload</span>
        </div>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default PopoverActions;
