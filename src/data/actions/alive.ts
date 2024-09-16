'use server';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Alive from '@/data/models/aliveModel';

const AliveSchema = z.object({
  id: z.string(),
  tag: z.string().min(1, { message: "Tag is required" }).trim(),
  group: z.string({ invalid_type_error: "Group is required" }),
  breed: z.string({ invalid_type_error: "Breed name is required" }),
  color: z.string({ invalid_type_error: "Color pattern is required" }),
  age: z.coerce.number().gt(0, { message: 'Please enter age in months' }),
  weight: z.coerce.number().gt(0, { message: 'Please enter expected weight ' }),
});

const Add = AliveSchema.omit({ id: true });

export type State = {
  errors?: {
    tag?: string[];
    group?: string[];
    breed?: string[];
    color?: string[];
    age?: string[];
    weight?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addAlive(prevState: State, formData: FormData) {
  const validatedFields = Add.safeParse({
    tag: formData.get('tag'),
    group: formData.get('group'),
    breed: formData.get('breed'),
    color: formData.get('color'),
    age: formData.get('age'),
    weight: formData.get('weight')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }

  connect()
  try {
    const { tag, group, breed, color, age, weight } = validatedFields.data;
    const newItem = new Alive({ tag, group, breed, color, age, weight });
    const saveItem = await newItem.save()
    revalidatePath('/dashboard/alive');
    return ({
      message: "Alive added successfully",
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

export async function fetchFilteredAliveItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  connect()
  try {
    const count = await Alive.countDocuments({ tag: { $regex: '(?i)' + query } })
    const result = await Alive.find({ tag: { $regex: '(?i)' + query } })
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

export async function DeleteAliveItem(id: string) {
  try {
    const response = await Alive.findByIdAndDelete(id)
    if (!response) {
      throw { Status: 404, message: 'Alive item does not exixts' }
    }
    revalidatePath('/dashboard/alive');
    redirect('/dashboard/alive');
  } catch (error) {
    throw error
  }
}

export async function fetchAliveById(id: string) {
  try {
    const data = await Alive.findOne({ _id: id })
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function updateAlive(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = Add.safeParse({
    tag: formData.get('tag'),
    group: formData.get('group'),
    breed: formData.get('breed'),
    color: formData.get('color'),
    age: formData.get('age'),
    weight: formData.get('weight')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update this item.',
    };
  }
  connect()
  try {
    const { tag, group, breed, color, age, weight } = validatedFields.data;
    const data = ({ tag, group, breed, color, age, weight });
    console.log(data)
    const response = await Alive.findByIdAndUpdate(id, data)
    revalidatePath('/dashboard/alive');
    return ({
      message: "Alive updated successfully",
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

export async function fetchAlive() {
  connect()
  try {
    const result = await Alive.aggregate([{ $group: { _id: '$group', pop: { $sum: 1 } } }])
    if (!result) {
      throw { status: 404, message: 'item not found' }
    }
    return result
  } catch (e) {
    throw e
  }
}

export async function fetchBreed() {
  connect()
  try {
    const result = await Alive.aggregate([{ $group: { _id: '$breed', pop: { $sum: 1 } } }])
    if (!result) {
      throw { status: 404, message: 'item not found' }
    }
    return result
  } catch (e) {
    throw e
  }
}
