import fs from 'fs';

export const makePath = (path:string) => {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
          }
    } catch (error) {
        throw error
    }
}

export const addFile = async (path: string, file: File) => {
    try {
        const idata = await file.arrayBuffer()
        fs.writeFileSync(path, Buffer.from(idata))
    } catch (error) {
        throw error
    }
}

export const deleteFile = (path: string) => {
    try {
        fs.unlinkSync(path)
    } catch (error) {
        throw error
    }
}