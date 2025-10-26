"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sessions() {
  const router = useRouter()
  return (
    <div className="p-5 ">
      <header className="pb-10 text-xl font-mono">
        Ready To Start A New Session ?
      </header>
      <Button
        onClick={() => {
          router.push("/user/sessions/new")
        }}
        variant={"secondary"}>New Session <Plus /></Button>
    </div >
  );
}
