'use server';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Minced from '@/data/models/mincedModel';
import { filename } from '@/components/lib/randomString';
import { addFile, deleteFile, makePath } from '@/components/lib/filemanage';

const MincedSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required" }).trim(),
  part: z.string().min(1, { message: "Part name is required" }).trim(),
  unit: z.enum(['kg', 'gm'], { invalid_type_error: 'Please choose one unit' }),
  life: z.coerce.number().gt(0, { message: 'Please enter life' }),
  image: z.string().min(1, { message: "Image is required" }).trim(),
});

const Add = MincedSchema.omit({ id: true });
const Update = MincedSchema.omit({ id: true, image: true });
export type State = {
  errors?: {
    name?: string[];
    part?: string[];
    unit?: string[];
    life?: string[];
    image?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export type updateState = {
  errors?: {
    name?: string[];
    part?: string[];
    unit?: string[];
    life?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addMinced(prevState: State, formData: FormData) {
  var iname = ''
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    iname = filename(file)
  }

  // Validate form using Zod
  const validatedFields = Add.safeParse({
    name: formData.get('name'),
    part: formData.get('part'),
    unit: formData.get('unit'),
    life: formData.get('life'),
    image: iname,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  makePath('./public/uploads/meatitems')
  connect()
  try {
    const { name, part, unit, life, image } = validatedFields.data;
    const newItem = new Minced({ name, part, unit, life, image });
    const saveItem = await newItem.save()
    await addFile(`${process.cwd()}/public/uploads/meatitems/${iname}`, file)
    revalidatePath('/dashboard/minced');
    return ({
      message: "Minced added successfully",
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

export async function fetchFilteredMincedItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  connect()
  try {
    const count = await Minced.countDocuments({ name: { $regex: '(?i)' + query } })
    const result = await Minced.find({ name: { $regex: '(?i)' + query } })
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

export async function DeleteMincedItem(id: string, iname: string) {
  try {
    const response = await Minced.findByIdAndDelete(id)

    if (!response) {
      throw { Status: 404, message: 'Minced item does not exixts' }
    }
    deleteFile(`${process.cwd()}/public/uploads/meatitems/${iname}`)
    revalidatePath('/dashboard/minced');
    redirect('/dashboard/minced');
  } catch (error) {
    throw error
  }
}

export async function fetchMincedById(id: string) {
  try {
    const data = await Minced.findOne({ _id: id })
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function updateMinced(
  id: string,
  oldimage: string,
  prevState: updateState,
  formData: FormData,
) {
  var image = oldimage
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    image = filename(file)
  }

  const validatedFields = Update.safeParse({
    name: formData.get('name'),
    part: formData.get('part'),
    unit: formData.get('unit'),
    life: formData.get('life'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const { name, part, unit, life } = validatedFields.data;
    const data = ({ name, part, unit, life, image })
    const response = await Minced.findByIdAndUpdate(id, data)
    if (file && file.size > 0) {
      deleteFile(`${process.cwd()}/public/uploads/meatitems/${oldimage}`)
      await addFile(`${process.cwd()}/public/uploads/meatitems/${image}`, file)
    }
    revalidatePath('/dashboard/minced/add');
    return ({
      message: "Minced updated successfully",
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

