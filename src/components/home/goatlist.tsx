import { fetchPublished } from "@/data/actions/aliveMarket"
import formatToNepaliCurrency from "../lib/currencyformat"
import Link from "next/link"

export default async function GoatList() {
  let Goat: any = await fetchPublished()
  const l = Goat.length
  return (
    <div id="g" className="grid grid-cols-5 gap-4">
      {
        (l > 0) ? <>
          {Goat && Goat.map((goat: any) => (
            <div key={goat.id} className="box-border hover:box-content border-2 border-green-200 group relative">
              <Link href={`/product/goat/${goat.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={goat.image}
                    src={`/uploads/market/goats/${goat.image}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="p-2">
                  <p className="text-center">{goat.tag.breed} {goat.tag.group}</p>
                  <p className="text-center">{goat.tag.color} Color</p>
                  <p className="text-center text-l font-bold tracking-tight text-gray-900">{formatToNepaliCurrency(goat.price)}</p>
                </div>
              </Link>
            </div>
          ))}
        </> : <>

          <p>No more goats for sale.</p>
        </>
      }
    </div>
  )
}