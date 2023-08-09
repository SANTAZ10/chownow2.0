import Menu from "@/components/Menu";
import Hero from "@/components/Hero"
import Layout from "@/components/Layout"
import Services from '@/components/Services'



export default function Home() {
  return (
    <Layout>
      <main>
      <Hero/>
      <Services/>
      <Menu/>
    </main>
    </Layout>
  );
}
