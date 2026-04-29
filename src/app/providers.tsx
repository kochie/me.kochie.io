'use client'
import { ThemeProvider } from '@/components/Theme'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
