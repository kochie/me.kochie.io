'use client'
import { ThemeProvider } from '@/components/Theme/context'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
