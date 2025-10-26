import Profile from "@/components/auth/profile";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function Settings() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });
  if (!session?.user) {
    return
  }
  return (
    <div className="">
      <Profile user={session?.user} />
    </div>
  );
}
