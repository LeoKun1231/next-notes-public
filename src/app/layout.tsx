import { ThemeProvider } from '@/components/common/theme-provider/theme-provider'
import Sider from '@/components/sider/sider'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import MainContent from '@/components/main-content/main-content'
import './globals.css'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Next Notes',
  description: 'A simple note-taking app built with Next.js and Supabase.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans  antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex h-screen">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={20} maxSize={50} minSize={20} className="shadow-2xl shadow-slate-300 ">
                <Sider />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className="  bg-[#f5f7fb] dark:bg-[#0f172a]" defaultSize={80}>
                <MainContent>{children}</MainContent>
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
