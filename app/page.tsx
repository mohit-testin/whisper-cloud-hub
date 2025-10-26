"use client";
import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from 'next/image'
export default function Home() {
  return (
    <div className="grid grid-cols-2  h-full place-items-center">
      <Tabs defaultValue="tab-1" className="items-left ">
        <TabsList className="h-auto  bg-transparent ">
          <TabsTrigger
            value="tab-1"
            className="relative rounded-none px-5 py-3  border-b-0"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative rounded-none px-5 py-3 border-b-0"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <SignIn />
        </TabsContent>
        <TabsContent value="tab-2">
          <SignUp />
        </TabsContent>
      </Tabs>
      {/* image section */}
      <section className="h-full w-full flex justify-center items-center border-l">
        <Image
          src="/absWalk.png"
          width={600}
          height={600}
          alt="Picture of the author"
        />
      </section>
    </div>
  );
}
