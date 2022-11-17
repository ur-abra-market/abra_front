import httpService from './http.service'
import cookieService from './cookie.service'

const access = cookieService.getAccesToken()

const userFetch = {
  uploadLogoImage: async (img) => {
    let formData = new FormData()
    formData.append('file', img)

    const { data } = await httpService.post(
      'users/upload_logo_image/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': access
        }
      }
    )
    return data
  }
}

export default userFetch
