"use client";

import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

type NavMessages = {
  home: string;
  generate: string;
  templates: string;
  pricing: string;
  account: string;
  startCreate: string;
};

interface MobileNavProps {
  items: { label: string; href: string }[];
  user: any;
  isDashboard: boolean;
  t: NavMessages;
}

export function MobileNav({ items, user, isDashboard, t }: MobileNavProps) {
  const labelMap: Record<string, keyof NavMessages> = {
    "/": "home",
    "/homes": "generate",
    "/generate": "generate",
    "/templates": "templates",
    "/product/about": "pricing",
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <span>{item.label}</span>{" "}
              <span>{t[labelMap[item.href] || "home"]}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          {user ? (
            <div className="flex flex-col gap-2">
              {user.email && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
              {!isDashboard && (
                <>
                  <Button asChild variant="default" className="w-full">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              )}
              <form action={signOutAction} className="w-full">
                <Button type="submit" variant="outline" className="w-full">
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild variant="default" className="w-full">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
