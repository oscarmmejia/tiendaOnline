const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

export const ALL_CATEGORIES = 'all'

/**
 * La API expone 42 categorias, pero solo estas cinco forman el catalogo real:
 * el resto son pruebas que cualquiera puede publicar en el sandbox publico.
 * El orden de las claves es el orden en que se muestran en el filtro.
 */
const CATALOG_CATEGORY_LABELS = {
  clothes: 'Ropa',
  furniture: 'Muebles',
  shoes: 'Zapatos',
  electronics: 'Electrónica',
  miscellaneous: 'Misceláneos',
}

const catalogSlugs = Object.keys(CATALOG_CATEGORY_LABELS)

const isCatalogCategory = ({ slug }) => catalogSlugs.includes(slug)

const byCatalogOrder = (categoryA, categoryB) =>
  catalogSlugs.indexOf(categoryA.slug) - catalogSlugs.indexOf(categoryB.slug)

/**
 * Al ser una API abierta hay productos con la imagen envuelta en comillas o en
 * un array serializado, asi que se limpia antes de pintarla.
 */
const cleanImageUrl = (rawUrl) => {
  if (typeof rawUrl !== 'string') {
    return ''
  }

  const imageUrl = rawUrl.replace(/["[\]\s]/g, '')

  return imageUrl.startsWith('http') ? imageUrl : ''
}

const normalizeProduct = ({ id, title, description, price, images, category }) => ({
  id,
  title,
  description,
  price,
  imageUrl: cleanImageUrl(images?.[0]),
  categorySlug: category?.slug ?? '',
  categoryName: CATALOG_CATEGORY_LABELS[category?.slug] ?? category?.name ?? 'Sin categoría',
})

const normalizeCategory = ({ id, slug }) => ({
  id,
  slug,
  name: CATALOG_CATEGORY_LABELS[slug],
})

const requestJson = async (endpoint, signal) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal })

  if (!response.ok) {
    throw new Error(`La API respondió ${response.status}`)
  }

  return response.json()
}

export const fetchProducts = async (signal) => {
  const products = await requestJson('/products', signal)

  return products.map(normalizeProduct)
}

export const fetchCatalogCategories = async (signal) => {
  const categories = await requestJson('/categories', signal)

  return categories.filter(isCatalogCategory).sort(byCatalogOrder).map(normalizeCategory)
}
