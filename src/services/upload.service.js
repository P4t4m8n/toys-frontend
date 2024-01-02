import { httpService } from "./http.service"

export const uploadService = {
  uploadImg
}



async function uploadImg(file) {
  const CLOUD_NAME = "dpnevk8db"
  const UPLOAD_PRESET = "k0lgk29w"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', file)

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })

    // const data = {
    //   method: 'POST',
    //   body: formData
    // }
    // const res = httpService.post(UPLOAD_URL, formData)
    // console.log("res:", res)
    const imgUrl = await res.json()
    return imgUrl.url
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

