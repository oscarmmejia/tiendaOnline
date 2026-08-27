const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

export const ALL_CATEGORIES = 'all'

/**
 * Catalogo real de la tienda, en el orden en que se muestra en el filtro.
 *
 * Se indexa por id y no por nombre porque la API es un sandbox publico donde
 * cualquiera puede editar: la categoria 1 ("Clothes") esta renombrada ahora
 * mismo a "updated-category-name". Los ids, en cambio, no cambian.
 */
const CATALOG_CATEGORIES = [
  { id: 1, name: 'Ropa', image: 'https://i.imgur.com/QkIa5tT.jpeg' },
  { id: 3, name: 'Muebles', image: 'https://i.imgur.com/Qphac99.jpeg' },
  { id: 4, name: 'Zapatos', image: 'https://i.imgur.com/qNOjJje.jpeg' },
  { id: 2, name: 'Electrónica', image: 'https://i.imgur.com/ZANVnHE.jpeg' },
  { id: 5, name: 'Misceláneos', image: 'https://i.imgur.com/BG8J0Fj.jpg' },
]

const catalogIds = CATALOG_CATEGORIES.map(({ id }) => id)

const findCatalogCategory = (categoryId) =>
  CATALOG_CATEGORIES.find(({ id }) => id === categoryId)

/** Servicios de imagen de relleno que usan los productos de prueba. */
const PLACEHOLDER_IMAGE =
  /placehold|placeimg|via\.placeholder|dummyimage|example\.(com|org)|img\.example|picsum/i

/** Los productos reales rondan los 250 caracteres; los de prueba traen "asd". */
const MIN_DESCRIPTION_LENGTH = 60

/**
 * Hay productos con la imagen envuelta en comillas o como array serializado.
 */
const cleanImageUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string') {
    return ''
  }

  const imageUrl = rawUrl.replace(/["[\]\s]/g, '')

  return imageUrl.startsWith('http') ? imageUrl : ''
}

/**
 * Descarta los productos de prueba que otros usuarios publican en el sandbox:
 * los que cuelgan de una categoria inventada, los que apuntan a una imagen de
 * relleno y los que no traen una descripcion de verdad.
 */
const isCatalogProduct = ({ category, images, description }) => {
  if (!catalogIds.includes(category?.id)) {
    return false
  }

  const imageUrl = cleanImageUrl(images?.[0])

  if (!imageUrl || PLACEHOLDER_IMAGE.test(imageUrl)) {
    return false
  }

  return (description ?? '').trim().length >= MIN_DESCRIPTION_LENGTH
}

const normalizeProduct = ({ id, title, description, price, images, category }) => ({
  id,
  title,
  description,
  price,
  imageUrl: cleanImageUrl(images?.[0]),
  categoryId: category.id,
  categoryName: findCatalogCategory(category.id).name,
})

/**
 * A la categoria 1 le cambiaron la imagen por una de placeimg.com, un servicio
 * que ya no existe. Cuando la que llega no sirve se usa la original.
 */
const normalizeCategory = ({ id, image }) => {
  const category = findCatalogCategory(id)
  const imageUrl = cleanImageUrl(image)
  const isUsable = imageUrl && !PLACEHOLDER_IMAGE.test(imageUrl)

  return {
    id,
    name: category.name,
    image: isUsable ? imageUrl : category.image,
  }
}

const byCatalogOrder = (categoryA, categoryB) =>
  catalogIds.indexOf(categoryA.id) - catalogIds.indexOf(categoryB.id)

const requestJson = async (endpoint, signal) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal })

  if (!response.ok) {
    throw new Error(`La API respondió ${response.status}`)
  }

  return response.json()
}

export const fetchProducts = async (signal) => {
  const products = await requestJson('/products', signal)

  return products.filter(isCatalogProduct).map(normalizeProduct)
}

export const fetchCatalogCategories = async (signal) => {
  const categories = await requestJson('/categories', signal)

  return categories
    .filter(({ id }) => catalogIds.includes(id))
    .sort(byCatalogOrder)
    .map(normalizeCategory)
}

const byPriceDesc = (productA, productB) => productB.price - productA.price

/**
 * Los productos mas caros del catalogo, de mayor a menor precio.
 *
 * @param {number} limit cuantos productos devolver
 */
export const fetchTopProducts = async (limit, signal) => {
  const products = await fetchProducts(signal)

  return [...products].sort(byPriceDesc).slice(0, limit)
}
