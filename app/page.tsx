import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Blogs from '@/components/Blogs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AdminLoginButton from '@/components/AdminLoginButton'

export default function Home() {
  return (
    <main className="main-content">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Blogs />
      <Contact />
      <Footer />
      <AdminLoginButton />
    </main>
  )
} 