import { httpClient } from './httpClient'

const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

export const ALL_CATEGORIES = 'all'

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

const PLACEHOLDER_IMAGE =
  /placehold|placeimg|via\.placeholder|dummyimage|example\.(com|org)|img\.example|picsum/i

const MIN_DESCRIPTION_LENGTH = 60

const cleanImageUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string') {
    return ''
  }

  const imageUrl = rawUrl.replace(/["[\]\s]/g, '')

  return imageUrl.startsWith('http') ? imageUrl : ''
}

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
  const { data } = await httpClient.get(`${API_BASE_URL}${endpoint}`, { signal })

  return data
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

export const fetchTopProducts = async (limit, signal) => {
  const products = await fetchProducts(signal)

  return [...products].sort(byPriceDesc).slice(0, limit)
}
