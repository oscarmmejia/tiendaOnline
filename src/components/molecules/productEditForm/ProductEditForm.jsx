import { useEffect, useState, useRef } from "react";
import { isRequestCanceled } from "../../../services/httpClient";
import { fetchProductById, updateProduct } from "../../../services/productsApi";
import { uploadImageToCloudinary, isCloudinaryConfigured } from "../../../services/cloudinaryService";
import "./ProductEditForm.css";

const ProductEditForm = ({ productId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: 0,
    description: "",
    images: [],
  });
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const abortRef = useRef(null);
  const previewObjectUrlsRef = useRef([]);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const loadProduct = async () => {
      try {
        setStatus("loading");
        setErrorMessage("");
        const product = await fetchProductById(productId, controller.signal);
        setForm({
          title: product.title,
          slug: product.slug,
          price: product.price,
          description: product.description,
          images: product.images,
        });
        setCategoryInfo(product.category);
        setPreviewUrls(product.images);
        setStatus("ready");
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setErrorMessage(err.response?.data?.message || err.message || "No se pudo cargar el producto");
          setStatus("error");
        }
      }
    };

    if (productId) loadProduct();

    return () => controller.abort();
  }, [productId]);

  useEffect(() => {
    return () => {
      previewObjectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newObjectUrls = files.map((file) => URL.createObjectURL(file));
    previewObjectUrlsRef.current.push(...newObjectUrls);
    setPreviewUrls((prev) => [...prev, ...newObjectUrls]);
    setUploadError("");

    if (!isCloudinaryConfigured) {
      setUploadError("Cloudinary no configurado. Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET");
      return;
    }

    try {
      setIsUploading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const objectUrl = newObjectUrls[i];
        try {
          const controller = new AbortController();
          const secureUrl = await uploadImageToCloudinary(file, controller.signal);
          setForm((prev) => ({ ...prev, images: [...prev.images, secureUrl] }));
          setPreviewUrls((prev) => prev.map((url) => (url === objectUrl ? secureUrl : url)));
          URL.revokeObjectURL(objectUrl);
          previewObjectUrlsRef.current = previewObjectUrlsRef.current.filter((u) => u !== objectUrl);
        } catch (err) {
          if (!isRequestCanceled(err)) {
            setUploadError(err.response?.data?.error?.message || err.message || "Error al subir imagen");
            setPreviewUrls((prev) => prev.filter((url) => url !== objectUrl));
            URL.revokeObjectURL(objectUrl);
            previewObjectUrlsRef.current = previewObjectUrlsRef.current.filter((u) => u !== objectUrl);
          }
        }
      }
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const confirmed = window.confirm("¿Confirmas que quieres actualizar este producto?");
    if (!confirmed) return;

    try {
      setStatus("submitting");
      await updateProduct(productId, {
        title: form.title,
        slug: form.slug,
        price: Number(form.price),
        description: form.description,
        images: form.images,
      });
      setSubmitSuccess("Producto actualizado correctamente");
      setStatus("ready");
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || "No se pudo actualizar el producto");
      setStatus("ready");
    }
  };

  const handleCancel = () => {
    if (abortRef.current) abortRef.current.abort();
    onClose();
  };

  if (status === "loading") {
    return <p className="productEditFormStatus">Cargando datos del producto...</p>;
  }

  if (status === "error") {
    return (
      <div className="productEditFormStatus productEditFormStatusError">
        <p>{errorMessage}</p>
        <button type="button" className="productEditFormButton productEditFormButtonSecondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form className="productEditForm" onSubmit={handleSubmit} aria-label="Editar producto">
      <h2 className="productEditFormTitle">Editar producto</h2>

      {categoryInfo && (
        <p className="productEditFormCategory">
          Categoría: <strong>{categoryInfo.name}</strong> — solo lectura
        </p>
      )}

      <div className="productEditFormField">
        <label htmlFor="edit-title">Title</label>
        <input id="edit-title" name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="productEditFormField">
        <label htmlFor="edit-slug">Slug</label>
        <input id="edit-slug" name="slug" value={form.slug} onChange={handleChange} required />
      </div>

      <div className="productEditFormField">
        <label htmlFor="edit-price">Price</label>
        <input id="edit-price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
      </div>

      <div className="productEditFormField">
        <label htmlFor="edit-description">Description</label>
        <textarea id="edit-description" name="description" value={form.description} onChange={handleChange} required rows={4} />
      </div>

      <div className="productEditFormField">
        <label htmlFor="edit-images">Images</label>
        <input id="edit-images" type="file" accept="image/*" multiple onChange={handleImagesChange} />
        {!isCloudinaryConfigured && (
          <p className="productEditFormHint">Cloudinary no configurado: define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env</p>
        )}
        {isUploading && <p className="productEditFormHint">Subiendo imágenes a Cloudinary...</p>}
        {uploadError && <p className="productEditFormError">{uploadError}</p>}
        {previewUrls.length > 0 && (
          <div className="productEditFormPreviewGrid">
            {previewUrls.map((url, idx) => (
              <img key={`${url}-${idx}`} src={url} alt={`Previsualización ${idx + 1}`} className="productEditFormPreviewImage" />
            ))}
          </div>
        )}
        {form.images.length > 0 && (
          <p className="productEditFormHint">Imágenes en formulario: {form.images.length}</p>
        )}
      </div>

      {submitError && <p className="productEditFormError">{submitError}</p>}
      {submitSuccess && <p className="productEditFormSuccess">{submitSuccess}</p>}

      <div className="productEditFormActions">
        <button type="button" className="productEditFormButton productEditFormButtonSecondary" onClick={handleCancel} disabled={status === "submitting" || isUploading}>
          Cancelar
        </button>
        <button type="submit" className="productEditFormButton productEditFormButtonPrimary" disabled={status === "submitting" || isUploading}>
          {status === "submitting" ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
};

export default ProductEditForm;
