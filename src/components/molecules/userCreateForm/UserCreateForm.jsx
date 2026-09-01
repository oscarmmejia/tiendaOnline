import { useEffect, useRef, useState } from "react";
import {
  isCloudinaryConfigured,
  uploadImageToCloudinary,
} from "../../../services/cloudinaryService";
import { isRequestCanceled } from "../../../services/httpClient";
import { createUser } from "../../../services/userService";
import "./UserCreateForm.css";

const initialForm = {
  name: "",
  email: "",
  password: "",
  role: "customer",
  avatar: "",
};

const getSubmitErrorMessage = (error) => {
  const apiMessage = error.response?.data?.message;

  if (Array.isArray(apiMessage)) {
    return apiMessage.join(". ");
  }

  return apiMessage || error.message || "No se pudo crear el usuario";
};

const UserCreateForm = ({ onCancel, onSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const requestControllerRef = useRef(null);
  const uploadControllerRef = useRef(null);
  const previewObjectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
      uploadControllerRef.current?.abort();

      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const releasePreviewObjectUrl = () => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
  };

  const handleAvatarFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    uploadControllerRef.current?.abort();
    releasePreviewObjectUrl();

    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlRef.current = objectUrl;
    setPreviewUrl(objectUrl);
    setForm((currentForm) => ({ ...currentForm, avatar: "" }));
    setUploadError("");
    setSubmitError("");
    setIsUploading(false);

    if (!isCloudinaryConfigured) {
      setUploadError(
        "Cloudinary no está configurado. Define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.",
      );
      return;
    }

    const controller = new AbortController();
    uploadControllerRef.current = controller;

    try {
      setIsUploading(true);
      const secureUrl = await uploadImageToCloudinary(file, controller.signal);

      if (!controller.signal.aborted) {
        setForm((currentForm) => ({ ...currentForm, avatar: secureUrl }));
        setPreviewUrl(secureUrl);
        releasePreviewObjectUrl();
      }
    } catch (error) {
      if (!isRequestCanceled(error)) {
        setUploadError(
          error.response?.data?.error?.message
            || error.message
            || "No se pudo subir la imagen",
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsUploading(false);
      }

      if (uploadControllerRef.current === controller) {
        uploadControllerRef.current = null;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!form.avatar) {
      setSubmitError("Selecciona una imagen y espera a que termine de subirse.");
      return;
    }

    const controller = new AbortController();
    requestControllerRef.current = controller;

    try {
      setIsSubmitting(true);
      const createdUser = await createUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        avatar: form.avatar.trim(),
      }, controller.signal);

      onSuccess(createdUser);
    } catch (error) {
      if (!isRequestCanceled(error)) {
        setSubmitError(getSubmitErrorMessage(error));
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsSubmitting(false);
      }

      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }
    }
  };

  const handleCancel = () => {
    requestControllerRef.current?.abort();
    uploadControllerRef.current?.abort();
    onCancel();
  };

  const isBusy = isSubmitting || isUploading;

  return (
    <form className="userCreateForm" onSubmit={handleSubmit} aria-label="Crear usuario">
      <h2 className="userCreateFormTitle">Crear usuario</h2>

      <div className="userCreateFormField">
        <label htmlFor="createUserName">Nombre</label>
        <input
          id="createUserName"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="userCreateFormField">
        <label htmlFor="createUserEmail">Email</label>
        <input
          id="createUserEmail"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="userCreateFormField">
        <label htmlFor="createUserPassword">Contraseña</label>
        <input
          id="createUserPassword"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={4}
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="userCreateFormField">
        <label htmlFor="createUserRole">Rol</label>
        <select
          id="createUserRole"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div className="userCreateFormField">
        <label htmlFor="createUserAvatarFile">SELECCIONA UNA IMAGEN</label>
        <input
          id="createUserAvatarFile"
          type="file"
          accept="image/*"
          onChange={handleAvatarFileChange}
          required
        />
        {!isCloudinaryConfigured && (
          <p className="userCreateFormHint">
            Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.
          </p>
        )}
        {isUploading && (
          <p className="userCreateFormHint">Subiendo imagen a Cloudinary...</p>
        )}
        {uploadError && (
          <p className="userCreateFormError" role="alert">{uploadError}</p>
        )}
        {previewUrl && (
          <div className="userCreateFormPreview">
            <img
              className="userCreateFormPreviewImage"
              src={previewUrl}
              alt="Previsualización del avatar"
            />
          </div>
        )}
      </div>

      {submitError && (
        <p className="userCreateFormError" role="alert">{submitError}</p>
      )}

      <div className="userCreateFormActions">
        <button
          type="button"
          className="userCreateFormButton userCreateFormButtonSecondary"
          onClick={handleCancel}
          disabled={isBusy}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="userCreateFormButton userCreateFormButtonPrimary"
          disabled={isBusy || !form.avatar}
        >
          {isUploading
            ? "Subiendo imagen..."
            : isSubmitting
              ? "Creando..."
              : "Crear usuario"}
        </button>
      </div>
    </form>
  );
};

export default UserCreateForm;
