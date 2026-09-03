import { httpClient } from './httpClient'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim()
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim()

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

export const uploadImageToCloudinary = async (file, signal) => {
	if (!isCloudinaryConfigured) {
		throw new Error('Cloudinary is not configured. Define VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET')
	}

	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)

	const { data } = await httpClient.post(CLOUDINARY_UPLOAD_URL, formData, {
		signal,
	})

	return data.secure_url
}
