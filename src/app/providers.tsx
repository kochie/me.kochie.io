'use client'
import { ThemeProvider } from '@/components/Theme'

export default function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
