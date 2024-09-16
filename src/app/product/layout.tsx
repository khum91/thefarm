import SideNav from "@/components/dashboard/sidenav";
import FooterC from "@/components/home/footer";
import NavBar from "@/components/home/navbar";
export const experimental_ppr = true;
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <NavBar />
      <div className="flex bg-white border border-gray-200 shadow-lg overflow-hidden m-4 p-4">
        {children}
      </div>
      <FooterC />
    </div>

  );
}