'use server';
import { z } from 'zod';
import { connect } from "@/data/dbConfig";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Banner from '@/data/models/bannerModel';
import { filename } from '@/components/lib/randomString';
import { auth } from '@/auth'
import { addFile, deleteFile, makePath } from '@/components/lib/filemanage';

connect()
const BannerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Banner name is required" }).trim(),
  status: z.enum(['active', 'inactive'], { invalid_type_error: 'Please choose one state' }),
  link: z.string().url(),
  image: z.string().min(1, { message: "Image is required" }).trim(),
});

const Add = BannerSchema.omit({ id: true });
const Update = BannerSchema.omit({ id: true, image: true });

export type State = {
  errors?: {
    name?: string[];
    status?: string[];
    link?: string[];
    image?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export type updateState = {
  errors?: {
    name?: string[];
    status?: string[];
    link?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addBanner(prevState: State, formData: FormData) {

  var iname = ''
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    iname = filename(file)
  }

  const validatedFields = Add.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
    link: formData.get('link'),
    image: iname,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  makePath('./public/uploads/banners')
  try {
    const user: any = await auth()
    const { name, status, link, image } = validatedFields.data;
    const newItem = new Banner({ name, status, link, image });
    newItem.createdBy = user.user?.email
    await newItem.save()
    await addFile(`${process.cwd()}/public/uploads/banners/${iname}`, file)
    revalidatePath('/dashboard/banner');
    return ({
      message: "Banner updated successfully",
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

export async function fetchFilteredBannerItem(
  query: string,
  currentPage: number | 1,
) {
  const ITEMS_PER_PAGE = 4;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const count = await Banner.countDocuments({ name: { $regex: '(?i)' + query } })
    const result = await Banner.find({ name: { $regex: '(?i)' + query } })
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

export async function DeleteBannerItem(id: string, iname: string) {
  try {
    const response = await Banner.findByIdAndDelete(id)
    if (!response) {
      throw { Status: 404, message: 'Banner item does not exixts' }
    }
    deleteFile(`${process.cwd()}/public/uploads/banners/${iname}`)
    revalidatePath('/dashboard/banner');
    redirect('/dashboard/banner');
  } catch (error) {
    throw error
  }
}

export async function fetchBannerById(id: string) {
  try {
    const data = await Banner.findOne({ _id: id })
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item data.');
  }
}

export async function fetchPublishedBanner() {
  try {
    const data = await Banner.find({ status: "active" })
    return data
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch active banner data.');
  }
}

export async function updateBanner(
  id: string,
  prevState: State,
  formData: FormData,
) {
  var iname = ''
  const file = formData.get('image') as File
  if (file && file.size > 0) {
    iname = filename(file)
  }

  const validatedFields = Update.safeParse({
    name: formData.get('name'),
    status: formData.get('status'),
    link: formData.get('link'),
    image: iname,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  try {
    const user: any = await auth()
    const { name, status, link } = validatedFields.data;
    const createdBy = user.user?.email
    const newItem = ({ name, status, link, iname, createdBy });
    await Banner.findByIdAndUpdate(id, newItem)
    if (file && file.size > 0) {
      deleteFile(`${process.cwd()}/public/uploads/banners/${iname}`)
      await addFile(`${process.cwd()}/public/uploads/banners/${iname}`, file)
    }
    revalidatePath('/dashboard/banner');
    return ({
      message: "Banner updated successfully",
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
