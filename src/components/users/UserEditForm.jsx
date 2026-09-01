import { useEffect, useState, useRef } from "react";
import { isRequestCanceled } from "../../services/httpClient";
import { fetchUserById, updateUser } from "../../services/userService";
import { uploadImageToCloudinary, isCloudinaryConfigured } from "../../services/cloudinaryService";
import "./UserEditForm.css";

const UserEditForm = ({ userId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    avatar: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("loading"); // loading | ready | error | submitting | success
  const [errorMessage, setErrorMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const abortRef = useRef(null);
  const previewObjectUrlRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const loadUser = async () => {
      try {
        setStatus("loading");
        setErrorMessage("");
        const user = await fetchUserById(userId, controller.signal);
        setForm({
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          avatar: user.avatar,
        });
        setPreviewUrl(user.avatar);
        setStatus("ready");
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setErrorMessage(err.response?.data?.message || err.message || "No se pudo cargar el usuario");
          setStatus("error");
        }
      }
    };

    if (userId) loadUser();

    return () => controller.abort();
  }, [userId]);

  // Limpia object URLs al desmontar o cambiar preview
  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview inmediata local
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    previewObjectUrlRef.current = objectUrl;
    setPreviewUrl(objectUrl);
    setUploadError("");

    if (!isCloudinaryConfigured) {
      setUploadError("Cloudinary no configurado. Configura VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET");
      return;
    }

    try {
      setIsUploading(true);
      const controller = new AbortController();
      const secureUrl = await uploadImageToCloudinary(file, controller.signal);
      // Reemplaza preview por la URL de Cloudinary
      setForm((prev) => ({ ...prev, avatar: secureUrl }));
      setPreviewUrl(secureUrl);
      // Liberamos objectUrl anterior ya no necesario
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = null;
      }
    } catch (err) {
      if (!isRequestCanceled(err)) {
        setUploadError(err.response?.data?.error?.message || err.message || "Error al subir imagen");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const confirmed = window.confirm("¿Confirmas que quieres actualizar este usuario?");
    if (!confirmed) return;

    try {
      setStatus("submitting");
      // Si preview es objectUrl y aún no se subió a cloudinary, avatar seguirá con valor anterior (ya en form.avatar)
      await updateUser(userId, {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        avatar: form.avatar,
      });
      setSubmitSuccess("Usuario actualizado correctamente");
      setStatus("ready");
      if (onSuccess) onSuccess();
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || "No se pudo actualizar el usuario");
      setStatus("ready");
    }
  };

  const handleCancel = () => {
    if (abortRef.current) abortRef.current.abort();
    onClose();
  };

  if (status === "loading") {
    return <p className="userEditFormStatus">Cargando datos del usuario...</p>;
  }

  if (status === "error") {
    return (
      <div className="userEditFormStatus userEditFormStatusError">
        <p>{errorMessage}</p>
        <button type="button" className="userEditFormButton userEditFormButtonSecondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <form className="userEditForm" onSubmit={handleSubmit} aria-label="Editar usuario">
      <h2 className="userEditFormTitle">Editar usuario #{userId}</h2>

      <div className="userEditFormField">
        <label htmlFor="edit-name">Nombre</label>
        <input id="edit-name" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="userEditFormField">
        <label htmlFor="edit-email">Email</label>
        <input id="edit-email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className="userEditFormField">
        <label htmlFor="edit-password">Contraseña</label>
        <input id="edit-password" name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>

      <div className="userEditFormField">
        <label htmlFor="edit-role">Rol</label>
        <select id="edit-role" name="role" value={form.role} onChange={handleChange}>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <div className="userEditFormField">
        <label htmlFor="edit-avatar-file">Avatar (imagen)</label>
        <input id="edit-avatar-file" type="file" accept="image/*" onChange={handleAvatarFileChange} />
        {!isCloudinaryConfigured && (
          <p className="userEditFormHint">Cloudinary no configurado: define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env</p>
        )}
        {isUploading && <p className="userEditFormHint">Subiendo imagen a Cloudinary...</p>}
        {uploadError && <p className="userEditFormError">{uploadError}</p>}
        {previewUrl && (
          <div className="userEditFormPreview">
            <img src={previewUrl} alt="Previsualización avatar" className="userEditFormPreviewImage" />
          </div>
        )}
        {/* Campo oculto/visible para debug: valor real de avatar que se enviará */}
        <input type="hidden" name="avatar" value={form.avatar} />
        {form.avatar && <p className="userEditFormHint userEditFormAvatarUrl">{form.avatar}</p>}
      </div>

      {submitError && <p className="userEditFormError">{submitError}</p>}
      {submitSuccess && <p className="userEditFormSuccess">{submitSuccess}</p>}

      <div className="userEditFormActions">
        <button type="button" className="userEditFormButton userEditFormButtonSecondary" onClick={handleCancel} disabled={status === "submitting" || isUploading}>
          Cancelar
        </button>
        <button type="submit" className="userEditFormButton userEditFormButtonPrimary" disabled={status === "submitting" || isUploading}>
          {status === "submitting" ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
};

export default UserEditForm;
