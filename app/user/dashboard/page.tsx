import { authClient } from "@/lib/auth-client";

import { headers } from "next/headers";
export default async function DashboardPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      throw: true,
    },
  });

  return (
    <header className="p-5 text-2xl font-mono">
      {"\u{1F44B}"} Hello, {session?.user.name}
    </header>
  );
}
