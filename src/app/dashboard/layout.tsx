import { Inter } from 'next/font/google'
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/themeprovider';
import Header from '@/components/dashboard-components/header';
import PageWrapper from '@/components/dashboard-components/pagewrapper';
import { SideBar } from '@/components/dashboard-components/sidebar';
import localFont from '@next/font/local';
import '../globals.css';
import { ToastProvider } from '@/components/ui/toast';
const inter = Inter({
  weight: ["400"],
  subsets: ['latin'],
  variable: '--font-inter'
});


const brenetRegular = localFont({ src: "../../../fonts/brenet/Brenat Regular.otf", weight: "400", variable: '--font-brenet-regular' })
const brenetShadow = localFont({ src: "../../../fonts/bequest/Bequest-Personal.otf", weight: "700", variable: '--font-brenet-shadow' })

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          themes={['dark', 'custom', 'light']}
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <SideBar />
            <div className="flex flex-col h-full w-full">
              <Header />
              <ToastProvider>
              <PageWrapper children={children} />
              </ToastProvider>
            </div>
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}