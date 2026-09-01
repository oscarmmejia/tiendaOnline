import { httpClient } from './httpClient'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

/**
 * Sube una imagen a Cloudinary usando upload preset sin firma (unsigned).
 * Sigue la convención de los otros servicios: usa httpClient y soporta AbortSignal.
 * @param {File} file
 * @param {AbortSignal} [signal]
 * @returns {Promise<string>} secure_url de la imagen subida
 */
export const uploadImageToCloudinary = async (file, signal) => {
	if (!isCloudinaryConfigured) {
		throw new Error('Cloudinary no configurado. Define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET')
	}

	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)

	const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

	const { data } = await httpClient.post(url, formData, {
		signal,
	})

	return data.secure_url
}
