import Navigation from '@/components/organisms/Navigation'
import Hero from '@/components/organisms/Hero'
import About from '@/components/organisms/About'
import Services from '@/components/organisms/Services'
import Portfolio from '@/components/organisms/Portfolio'
import Blogs from '@/components/organisms/Blogs'
import Contact from '@/components/organisms/Contact'
import Footer from '@/components/organisms/Footer'
import AdminLoginButton from '@/components/molecules/AdminLoginButton'

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