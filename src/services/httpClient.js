import axios from "axios";

/**
 * Cliente HTTP compartido por todos los servicios. Tenerlo centralizado deja un
 * unico sitio donde configurar cabeceras, tokens o interceptores mas adelante.
 */
export const httpClient = axios.create();

/**
 * Al abortar una peticion, axios lanza un CanceledError en lugar del AbortError
 * que lanzaba fetch. Este helper permite distinguirlo sin que los hooks tengan
 * que saber que por debajo hay axios.
 */
export const isRequestCanceled = (error) => axios.isCancel(error);
