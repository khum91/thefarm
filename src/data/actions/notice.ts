'use server';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Notice from '@/data/models/notice';

connect()
const Schema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }).trim(),
  date: z.string({ required_error: "Please select a expiary date" }).date(),
  message: z.string().min(1, { message: "Message is required" }).max(150, { message: "Message should be maximun 100 characters" }).trim(),
  status: z.enum(['active', 'inactive'], { invalid_type_error: 'Please choose one state' }),
});

const Add = Schema.omit({ id: true, status: true });
const Update = Schema.omit({ id: true });
export type State = {
  errors?: {
    name?: string[];
    date?: string[];
    message?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export type updateState = {
  errors?: {
    name?: string[];
    date?: string[];
    message?: string[];
    status?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function add(prevState: State, formData: FormData) {
  const validatedFields = Add.safeParse({
    name: formData.get('iname'),
    date: formData.get('date'),
    message: formData.get('message')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const { name, date, message } = validatedFields.data;
    const newItem = new Notice({ name, date, message });
    await newItem.save()
    revalidatePath('/dashboard/market/minced');
    return ({
      message: "Notice message added successfully",
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

export async function fetchFilteredItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await Notice.countDocuments({ name: { $regex: '(?i)' + query } })
    const result = await Notice.find({ name: { $regex: '(?i)' + query } })
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

export async function deleteNotice(id: string) {
  try {
    const response = await Notice.findByIdAndDelete(id)
    if (!response) {
      throw { Status: 404, message: 'Notice does not exixts' }
    }
    revalidatePath('/dashboard/notice');
    redirect('/dashboard/notice');
  } catch (error) {
    throw error
  }
}

export async function fetchById(id: string) {
  try {
    const data = await Notice.findOne({ _id: id })
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function fetchNotice() {
  try {
    const today = new Date()
    const data = await Notice.find({ date: { $gt: today }, status:'active'})
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active notice data.');
  }
}

export async function update(
  id: string,
  prevState: updateState,
  formData: FormData,
) {

  const validatedFields = Update.safeParse({
    name: formData.get('iname'),
    date: formData.get('date'),
    message: formData.get('message'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const { name, date, message, status } = validatedFields.data;
    const newItem = ({ name, date, message, status });
    await Notice.findByIdAndUpdate(id, newItem)
    revalidatePath('/dashboard/notice');
    return ({
      message: "Notice updated successfully",
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

// export async function fetchItem() {
//   connect()
//   try {
//     const result = await Minced.find();
//     if (!result) {
//       throw { status: 404, message: 'item not found' }
//     }
//     return result
//   } catch (e) {
//     throw e
//   }
// }
