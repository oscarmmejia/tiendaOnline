import { useEffect, useRef, useState } from 'react'
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from '../../../services/cloudinaryService'
import { isRequestCanceled } from '../../../services/httpClient'
import { createProduct } from '../../../services/productsApi'
import './ProductCreateForm.css'

const minimumDescriptionLength = 60

const initialProductForm = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: [],
}

const getRequestErrorMessage = (error, fallbackMessage) => {
  const apiMessage = error.response?.data?.message

  if (Array.isArray(apiMessage)) {
    return apiMessage.join('. ')
  }

  return typeof apiMessage === 'string'
    ? apiMessage
    : error.message || fallbackMessage
}

const revokeObjectUrls = (objectUrls) => {
  objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
}

const ProductCreateForm = ({
  categories,
  initialCategoryId,
  onCancel,
  onSuccess,
}) => {
  const [form, setForm] = useState(() => ({
    ...initialProductForm,
    categoryId: String(initialCategoryId ?? categories[0]?.id ?? ''),
  }))
  const [previewUrls, setPreviewUrls] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const uploadControllerRef = useRef(null)
  const requestControllerRef = useRef(null)
  const previewObjectUrlsRef = useRef([])

  useEffect(() => {
    return () => {
      uploadControllerRef.current?.abort()
      requestControllerRef.current?.abort()
      revokeObjectUrls(previewObjectUrlsRef.current)
    }
  }, [])

  const releasePreviewObjectUrls = () => {
    revokeObjectUrls(previewObjectUrlsRef.current)
    previewObjectUrlsRef.current = []
  }

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setSubmitError('')
  }

  const handleImagesChange = async (event) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''

    if (files.length === 0) {
      return
    }

    if (files.some((file) => !file.type.startsWith('image/'))) {
      setUploadError('Todos los archivos seleccionados deben ser imágenes.')
      return
    }

    uploadControllerRef.current?.abort()
    uploadControllerRef.current = null
    releasePreviewObjectUrls()

    const objectUrls = files.map((file) => URL.createObjectURL(file))
    previewObjectUrlsRef.current = objectUrls
    setPreviewUrls(objectUrls)
    setForm((currentForm) => ({ ...currentForm, images: [] }))
    setUploadError('')
    setSubmitError('')
    setIsUploading(false)

    if (!isCloudinaryConfigured) {
      setUploadError(
        'Cloudinary no está configurado. Define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.',
      )
      return
    }

    const controller = new AbortController()
    uploadControllerRef.current = controller

    try {
      setIsUploading(true)
      const uploadedImageUrls = []

      for (const file of files) {
        uploadedImageUrls.push(
          await uploadImageToCloudinary(file, controller.signal),
        )
      }

      if (!controller.signal.aborted) {
        setForm((currentForm) => ({
          ...currentForm,
          images: uploadedImageUrls,
        }))
        setPreviewUrls(uploadedImageUrls)
        releasePreviewObjectUrls()
      }
    } catch (error) {
      if (!isRequestCanceled(error)) {
        setUploadError(
          getRequestErrorMessage(error, 'No se pudieron subir las imágenes.'),
        )
      }
    } finally {
      if (uploadControllerRef.current === controller) {
        uploadControllerRef.current = null
        setIsUploading(false)
      }
    }
  }

  const handleRemoveImage = (imageIndex) => {
    setForm((currentForm) => ({
      ...currentForm,
      images: currentForm.images.filter((_, index) => index !== imageIndex),
    }))
    setPreviewUrls((currentUrls) => (
      currentUrls.filter((_, index) => index !== imageIndex)
    ))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const price = Number(form.price)
    const description = form.description.trim()

    if (!Number.isFinite(price) || price <= 0) {
      setSubmitError('El precio debe ser un número mayor que cero.')
      return
    }

    if (description.length < minimumDescriptionLength) {
      setSubmitError(
        `La descripción debe tener al menos ${minimumDescriptionLength} caracteres.`,
      )
      return
    }

    if (!form.categoryId) {
      setSubmitError('Selecciona una categoría.')
      return
    }

    if (form.images.length === 0) {
      setSubmitError(
        'Selecciona al menos una imagen y espera a que termine de subirse.',
      )
      return
    }

    const controller = new AbortController()
    requestControllerRef.current = controller

    try {
      setIsSubmitting(true)
      const createdProduct = await createProduct({
        title: form.title.trim(),
        price,
        description,
        categoryId: Number(form.categoryId),
        images: form.images,
      }, controller.signal)

      onSuccess(createdProduct)
    } catch (error) {
      if (!isRequestCanceled(error)) {
        setSubmitError(
          getRequestErrorMessage(error, 'No se pudo crear el producto.'),
        )
      }
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null
        setIsSubmitting(false)
      }
    }
  }

  const handleCancel = () => {
    uploadControllerRef.current?.abort()
    requestControllerRef.current?.abort()
    releasePreviewObjectUrls()
    onCancel()
  }

  const isBusy = isUploading || isSubmitting

  return (
    <form
      className="productCreateForm"
      onSubmit={handleSubmit}
      aria-label="Crear producto"
    >
      <h2 className="productCreateFormTitle">Crear producto</h2>

      <div className="productCreateFormField">
        <label htmlFor="createProductTitle">Título</label>
        <input
          id="createProductTitle"
          name="title"
          value={form.title}
          onChange={handleChange}
          disabled={isBusy}
          required
        />
      </div>

      <div className="productCreateFormField">
        <label htmlFor="createProductPrice">Precio</label>
        <input
          id="createProductPrice"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          value={form.price}
          onChange={handleChange}
          disabled={isBusy}
          required
        />
      </div>

      <div className="productCreateFormField">
        <label htmlFor="createProductDescription">Descripción</label>
        <textarea
          id="createProductDescription"
          name="description"
          rows="5"
          minLength={minimumDescriptionLength}
          value={form.description}
          onChange={handleChange}
          disabled={isBusy}
          required
        />
        <span className="productCreateFormCharacterCount">
          {form.description.trim().length}/{minimumDescriptionLength} caracteres mínimos
        </span>
      </div>

      <div className="productCreateFormField">
        <label htmlFor="createProductCategory">Categoría</label>
        <select
          id="createProductCategory"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          disabled={isBusy}
          required
        >
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>

      <div className="productCreateFormField">
        <label htmlFor="createProductImages">Selecciona imágenes</label>
        <input
          id="createProductImages"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          disabled={isBusy}
        />
        <p className="productCreateFormHint">
          Puedes seleccionar varias imágenes. Una nueva selección sustituirá la anterior.
        </p>
        {!isCloudinaryConfigured && (
          <p className="productCreateFormHint">
            Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.
          </p>
        )}
        {isUploading && (
          <p className="productCreateFormHint" aria-live="polite">
            Subiendo imágenes a Cloudinary...
          </p>
        )}
        {uploadError && (
          <p className="productCreateFormError" role="alert">{uploadError}</p>
        )}

        {previewUrls.length > 0 && (
          <div className="productCreateFormPreviewGrid">
            {previewUrls.map((previewUrl, index) => (
              <div className="productCreateFormPreview" key={`${previewUrl}-${index}`}>
                <img
                  className="productCreateFormPreviewImage"
                  src={previewUrl}
                  alt={`Previsualización del producto ${index + 1}`}
                />
                {!isUploading && form.images[index] && (
                  <button
                    type="button"
                    className="productCreateFormRemoveImage"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`Eliminar imagen ${index + 1}`}
                    disabled={isSubmitting}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {form.images.length > 0 && (
          <p className="productCreateFormHint" aria-live="polite">
            {form.images.length} {form.images.length === 1 ? 'imagen lista' : 'imágenes listas'}.
          </p>
        )}
      </div>

      {submitError && (
        <p className="productCreateFormError" role="alert">{submitError}</p>
      )}

      <div className="productCreateFormActions">
        <button
          type="button"
          className="productCreateFormButton productCreateFormButtonSecondary"
          onClick={handleCancel}
          disabled={isBusy}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="productCreateFormButton productCreateFormButtonPrimary"
          disabled={isBusy || form.images.length === 0 || !form.categoryId}
        >
          {isUploading
            ? 'Subiendo imágenes...'
            : isSubmitting
              ? 'Creando...'
              : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductCreateForm
