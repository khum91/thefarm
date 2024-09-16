'use server';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Meat from '@/data/models/market/mincedMarket';
import Minced from '../models/mincedModel';

connect()
const AliveMarketSchema = z.object({
  id: z.string(),
  item: z.string().min(1, { message: "Item is required" }).trim(),
  killdate: z.string({ required_error: "Please select a kill date" }).date(),
  price: z.coerce.number().gt(0, { message: 'Please enter price in Npr.' }),
  status: z.enum(['active', 'inactive'], { invalid_type_error: 'Please choose one state' }),
});

const Add = AliveMarketSchema.omit({ id: true, status: true });
const Update = AliveMarketSchema.omit({ id: true, item: true });
export type State = {
  errors?: {
    item?: string[];
    killdate?: string[];
    price?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export type updateState = {
  errors?: {
    killdate?: string[];
    price?: string[];
    status?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addMeat(prevState: State, formData: FormData) {
  const validatedFields = Add.safeParse({
    item: formData.get('item'),
    killdate: formData.get('killdate'),
    price: formData.get('price')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const { item, killdate, price } = validatedFields.data;
    const newItem = new Meat({ item, killdate, price });
    await newItem.save()
    revalidatePath('/dashboard/market/minced');
    return ({
      message: "Minced Meat added successfully",
      info: true,
    })
  } catch (error: any) {
    if (+error.code === 11000) {
      return ({
        message: 'Duplicate field ' + JSON.stringify(error.keyValue)
      })
    } else {
      return {
        message: 'Database Error: Failed to add.',
      }
    }
  }
}

export async function fetchFilteredItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await Meat.countDocuments({ status: { $regex: '(?i)' + query } })
    const result = await Meat.find({ status: { $regex: '(?i)' + query } })
      .populate('item', ['name', 'part', 'unit', 'life', 'image'])
      .sort({ _id: 'desc' })
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
    if (!result) {
      throw { status: 404, message: 'item not found' }
    }
    return {
      f1: count,
      f2: result
    };
  } catch (e) {
    throw e
  }
}

export async function DeleteItem(id: string) {
  try {
    const response = await Meat.findByIdAndDelete(id)
    if (!response) {
      throw { Status: 404, message: 'Meat item does not exixts' }
    }
    revalidatePath('/dashboard/market/minced');
    redirect('/dashboard/market/minced');
  } catch (error) {
    throw error
  }
}

export async function fetchById(id: string) {
  try {
    const data = await Meat.findOne({ _id: id })
      .populate('item', ['name', 'part', 'unit', 'life', 'image'])
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function fetchPublished() {
  try {
    const data = await Meat.find({ status: "active" })
    .populate('item', ['name', 'part', 'unit', 'life', 'image'])
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active banner data.');
  }
}

export async function update(
  id: string,
  prevState: updateState,
  formData: FormData,
) {

  const validatedFields = Update.safeParse({
    killdate: formData.get('killdate'),
    price: formData.get('price'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const { killdate, price, status } = validatedFields.data;
    const newItem = ({ killdate, price, status });
    await Meat.findByIdAndUpdate(id, newItem)
    revalidatePath('/dashboard/market/minced');
    return ({
      message: "Minced Meat updated successfully",
      info: true,
    })
  } catch (error: any) {
    console.log(error)
    if (+error.code === 11000) {
      return ({
        message: 'Duplicate field ' + JSON.stringify(error.keyValue)
      })

    } else {
      return {
        message: 'Database Error: Failed to update.',
      }
    }
  }
}

export async function fetchItem() {
  connect()
  try {
    const result = await Minced.find();
    if (!result) {
      throw { status: 404, message: 'item not found' }
    }
    return result
  } catch (e) {
    throw e
  }
}
