"use client";
import { useAuth } from "@/context/ContextAuth";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.user_id) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user?.user_id) {
    return null;
  }

  return <>{children}</>;
};
