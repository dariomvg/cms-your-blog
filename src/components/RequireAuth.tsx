"use client";
import { useAuth } from "@/context/ContextAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (!user.user_id) {
    router.push("/");
  }
  return <>{children}</>;
};
