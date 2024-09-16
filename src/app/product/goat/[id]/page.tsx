import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchById } from "@/data/actions/aliveMarket";
import formatToNepaliCurrency from "@/components/lib/currencyformat";
import Order from "@/components/home/orderbutton";


export const metadata: Metadata = {
    title: 'Healthy Goats',
};
export default async function Product({ params }: { params: { id: string } }) {
    const id = params.id
    const result = await fetchById(id);
    const data = JSON.parse(JSON.stringify(result))
    if (!result) {
        notFound();
    }
return (
    <>
        <div className="flex bg-white border border-gray-200 shadow-lg overflow-hidden m-4 p-4">
            <div >
                <img className="w-full h-64 object-cover" src={`/uploads/market/goats/${data.image}`} alt={data.image} />
                <Order />
            </div>
            <div>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-medium text-gray-800">A healthy {data.tag.group} straight from our farm to you</h2>
                <div>
                    <p>&#8680;<span className="font-bold">Breed: </span>{data.tag.breed}</p>
                    <p>&#8680;<span className="font-bold">Color: </span> {data.tag.color}</p>
                    <p>&#8680;<span className="font-bold">Age: </span>{data.tag.age} Months</p>
                    <p>&#8680;<span className="font-bold">Weight: </span>{data.tag.weight} Kg.</p>
                </div>
                <p className="mt-5 text-gray-900 text-xl font-bold">{formatToNepaliCurrency(data.price)}</p>
            </div>
        </div>
    </>
)
}