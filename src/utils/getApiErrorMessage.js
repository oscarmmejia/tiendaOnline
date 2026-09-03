export const getApiErrorMessage = (error, fallbackMessage) => {
  const apiMessage = error?.response?.data?.message
  const uploadMessage = error?.response?.data?.error?.message

  if (Array.isArray(apiMessage)) {
    return apiMessage.join('. ')
  }

  if (typeof apiMessage === 'string' && apiMessage) {
    return apiMessage
  }

  if (typeof uploadMessage === 'string' && uploadMessage) {
    return uploadMessage
  }

  return error?.message || fallbackMessage
}
