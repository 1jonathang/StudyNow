import { getAuthSession } from "@/lib/nextauth";
import React from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

// make server component, will be ran once on the server and generate html that will be sent directly to the client
const Navbar = async (props: Props) => {
  // getting the users session, when the navbar will be ran it will call this
  const session = await getAuthSession();
  //   if (session?.user) {
  //     return <pre>{JSON.stringify(session.user, null, 2)}</pre>
  //   } else {
  //     return <div>Not signed in</div>
  //   }

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-[#020817] z-[10] h-fit border-b border-zinc-300 dark:border-slate-500 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* {Logo} */}
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-[#020817] dark:border-slate-500 px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:text-slate-300">
            StudyNow
          </p>
        </Link>
        <div className="flex items-center">
          <ThemeToggle className="mr-4"/>
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton text="Sign In" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
