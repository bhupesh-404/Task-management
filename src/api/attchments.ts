import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage"

export const uploadFile = async (file: File, taskId: string) => {
  try {
    const fileRef = ref(getStorage(), `tasks/${taskId}/${file.name}`)
    await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(fileRef)

    return { fileName: file.name, fileUrl: downloadURL }
  } catch (error) {
    console.error("Error uploading file:", error)
    return null
  }
}
