"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";

export default function UserAccountNavbar({ username }: any) {
    return (
        <>
        <h2 className="text-white text-3xl font-semibold tracking-wide shadow-lg bg-gradient-to-r px-4 py-2 rounded-lg"> {username} </h2>
        <Button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`
        })} variant='destructive'> Sign Out
        </Button>
        </>
    )
}