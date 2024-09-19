import * as React from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/themeprovider";
import { Karla } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
});

export const metadata: Metadata = {
  title: "Courses"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      themes={['dark', 'custom', 'light']}
      attribute="class"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col h-full w-full">              
        <div className="w-full px-4 py-2">
          <BreadcrumbNav courseId="course-id-placeholder" />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
}

function BreadcrumbNav({ courseId }: { courseId: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="font-brenet-regular text-primary" href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="font-brenet-regular text-primary" href="/dashboard/courses">Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="font-brenet-regular text-primary" href={`/dashboard/courses/course-enroll/${courseId}`}>Course Enroll</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
