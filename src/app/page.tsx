import GoatList from "@/components/home/goatlist";
import MeatList from "@/components/home/meatlist";
import FooterC from "@/components/home/footer";
import NavBar from "@/components/home/navbar";
import CarouselHome from "@/components/home/carousel";

export default async function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <header className="w-full">
        <NavBar />
        <CarouselHome />
      </header>
      <main >
        <div id="i1" className=" bg-white m-4 p-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 pb-2">Alive Goats</h2>
          <GoatList />
        </div>
        <div id="i1" className=" bg-white m-4 p-4">
          <h2 className="mx-4 text-2xl font-bold tracking-tight text-gray-900 pb-2">Minced Meat</h2>
          <MeatList />
        </div>
      </main>
      <footer>
        <FooterC />
      </footer>
    </div>

  );
}
