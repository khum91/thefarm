'use server';
import Alive from '@/data/models/aliveModel';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import aliveMarket from '@/data/models/market/aliveMarket';
import { filename } from '@/components/lib/randomString';
import { auth } from '@/auth'
import { addFile, deleteFile, makePath } from '@/components/lib/filemanage';

connect()
const AliveMarketSchema = z.object({
  id: z.string(),
  tag: z.string().min(1, { message: "Tag is required" }).trim(),
  price: z.coerce.number().gt(0, { message: 'Please enter price in Npr.' }),
  image: z.string().min(1, { message: "Image is required" }).trim(),
  status: z.enum(['active', 'inactive'], { invalid_type_error: 'Please choose one state' }),
});

const Add = AliveMarketSchema.omit({ id: true, status: true });
const Update = AliveMarketSchema.omit({ id: true, tag: true, image: true });

export type State = {
  errors?: {
    tag?: string[];
    price?: string[];
    image?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export type updateState = {
  errors?: {
    price?: string[];
    status?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addAliveMarket(prevState: State, formData: FormData) {

  var iname = ''
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    iname = filename(file)
  }

  const validatedFields = Add.safeParse({
    tag: formData.get('tag'),
    price: formData.get('price'),
    image: iname,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  makePath('./public/uploads/market/goats')
  try {
    const { tag, price, image } = validatedFields.data;
    const newItem = new aliveMarket({ tag, price, image });
    await newItem.save()
    await addFile(`${process.cwd()}/public/uploads/market/goats/${iname}`, file)
    revalidatePath('/dashboard/market');
    return ({
      message: "AliveMarket added successfully",
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
        message: 'Database Error: Failed to add.',
      }
    }
  }
}

export async function fetchFilteredAliveMarketItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await aliveMarket.countDocuments({ status: { $regex: '(?i)' + query } })
    const result = await aliveMarket.find({ status: { $regex: '(?i)' + query } })
      .populate('tag', ['tag', 'group', 'breed', 'color', 'age', 'weight'])
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

export async function DeleteItem(id: string, iname: string) {
  try {
    const response = await aliveMarket.findByIdAndDelete(id)
    if (!response) {
      throw { Status: 404, message: 'AliveMarket item does not exixts' }
    }
    deleteFile(`${process.cwd()}/public/uploads/market/goats/${iname}`)
    revalidatePath('/dashboard/market/alive');
    redirect('/dashboard/market/alive');
  } catch (error) {
    throw error
  }
}

export async function fetchById(id: string) {
  try {
    const data = await aliveMarket.findOne({ _id: id })
      .populate('tag', ['tag', 'group', 'breed', 'color', 'age', 'weight'])
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function fetchPublished() {
  try {
    const data = await aliveMarket.find({ status: "active" })
      .populate('tag', ['tag', 'group', 'breed', 'color', 'age', 'weight'])
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active banner data.');
  }
}

export async function update(
  id: string,
  oldimage: string,
  prevState: State,
  formData: FormData,
) {
  var image = oldimage
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    image = filename(file)
  }

  const validatedFields = Update.safeParse({
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
    const user: any = await auth()
    const { price, status } = validatedFields.data;
    const newItem = ({ price, image, status });
    await aliveMarket.findByIdAndUpdate(id, newItem)
    if (file && file.size > 0) {
      deleteFile(`${process.cwd()}/public/uploads/market/goats/${oldimage}`)
      await addFile(`${process.cwd()}/public/uploads/market/goats/${image}`, file)
    }
    revalidatePath('/dashboard/market/alive');
    return ({
      message: "Alive Market updated successfully",
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

export async function fetchAliveItem() {
  connect()
  try {
    const result = await Alive.find();
    if (!result) {
      throw { status: 404, message: 'item not found' }
    }
    return result
  } catch (e) {
    throw e
  }
}
