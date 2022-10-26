
import { Outlet } from "react-router-dom";

import Header from './header'
import HeaderMobile from './header/mobile'
import Footer from './footer'

const MainLayout = () => {
  return(
    <section className='layout'>
      <aside className='sidebar' />
      <section className="bg-ktn-body">
        <div className="lg:hidden">
          <HeaderMobile />
        </div>
        <div className="hidden lg:block">
           <Header />
        </div>
        <main>
          <Outlet />
        </main>
        <Footer />
      </section>
    </section>
  )
}

export default MainLayout;