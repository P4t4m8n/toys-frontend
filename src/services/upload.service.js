import { httpService } from "./http.service"

export const uploadService = {
  uploadImg
}
async function uploadImg(ev) {
  const CLOUD_NAME = "dpnevk8db"
  const UPLOAD_PRESET = "jpqjsi19"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })

    // const data = {
    //   method: 'POST',
    //   body: formData
    // }
    // const res = httpService.get(UPLOAD_URL, data)
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

