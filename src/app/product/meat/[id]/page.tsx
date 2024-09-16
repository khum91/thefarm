
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchById } from "@/data/actions/meatMarket";
import formatToNepaliCurrency from "@/components/lib/currencyformat";
import Order from "@/components/home/orderbutton";
import { expDate } from '@/components/lib/expiraydate';

export const metadata: Metadata = {
    title: 'Hygienic Goat Meat',
};
export default async function Product({ params }: { params: { id: string } }) {
    const id = params.id
    const data = await fetchById(id);
    if (!data) {
        notFound();
    }

    return (
        <>
            <div className="flex bg-white border border-gray-200 shadow-lg overflow-hidden m-4 p-4">
                <div >
                    <img className="w-full h-64 object-cover" src={`/uploads/meatitems/${data.item.image}`} alt={data.item.image} />
                    <Order />
                </div>
                <div>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-medium text-gray-800">Humanly Killed Hygienic Goat {data.item.name}</h2>
                    <div>
                        <p>&#8680;<span className="font-bold">Name: </span>Goat {data.item.name}</p>
                        <p>&#8680;<span className="font-bold">Part: </span> {data.item.part}</p>
                        <p>&#8680;<span className="font-bold">Kill Date: </span>{data.killdate.toLocaleDateString()}</p>
                        <p>&#8680;<span className="font-bold">Life: </span>{data.item.life} Days.</p>
                        <p>&#8680;<span className="font-bold">Expires On: </span>{expDate(data.killdate, data.item.life)}</p>
                    </div>
                    <p className="mt-5 text-gray-900 text-xl font-bold">{formatToNepaliCurrency(data.price)}</p>
                </div>
            </div>
        </>
    )
}