import { fetchPublished } from "@/data/actions/meatMarket"
import formatToNepaliCurrency from "../lib/currencyformat"
import Link from "next/link"
export default async function ProductList() {
  let Meat: any = await fetchPublished()
  const l = Meat.length
  return (
    <div id="m" className="grid grid-cols-5 gap-4">
      {
        (l > 0) ? <>
          {Meat && Meat.map((meat: any) => (
            <div key={meat.id} className="box-border hover:box-content border-2 border-green-200 group relative">
              <Link href={`/product/meat/${meat.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={meat.image}
                    src={`/uploads/meatitems/${meat.item.image}`}
                    className="object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="p-2">
                  <p className="text-center font-bold">{meat.item.name}</p>
                  <p className="text-center">Kill Date: {meat.killdate.toDateString()}</p>
                  <p className="text-center text-l font-bold tracking-tight text-gray-900">{formatToNepaliCurrency(meat.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </> : <>
          <div className="bg-red-300">
            <p>Nothing for Sale</p>
          </div>
        </>
      }
    </div>
  )
}