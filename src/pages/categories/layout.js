import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <div lang="en" className={inter.className}>
      {children}
    </div>
  )
}
