import Header from "@/components/shared/header";
import Lists from "@/components/shared/lists";
import { db } from "@/lib/firebase";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";

const getData = async (uid: string, type: "files" | "folders") => {
  let data: any[] = [];
  const q = query(collection(db, type), where("uid", "==", uid), where("isArchive", "==", false));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({...doc.data(), id: doc.id});
  });
  return data;
};

const Home = async () => {
  const {userId} = auth()
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");
  console.log(files)
  return (
    <>
      <Header label={"My drive"} isHome />
      <Lists folders={JSON.parse(JSON.stringify(folders))} files={JSON.parse(JSON.stringify(files))}/>
    </>
  );
}

export default Home
