import { useEffect, useState } from "react";
import "./ProductsComponent.css";

const productsApiUrl = "https://api.escuelajs.co/api/v1/products";
const allowedCategoryNames = new Set([
  "Clothes",
  "Electronics",
  "Furniture",
  "Shoes",
  "Miscellaneous",
]);
const categoryNameById = new Map([
  [1, "Clothes"],
  [2, "Electronics"],
  [3, "Furniture"],
  [4, "Shoes"],
  [5, "Miscellaneous"],
]);
const categoryTranslations = Object.freeze({
  Clothes: "Ropa",
  Electronics: "Electrónica",
  Furniture: "Muebles",
  Shoes: "Calzado",
  Miscellaneous: "Misceláneos",
});
const placeholderImageHosts = new Set([
  "dummyimage.com",
  "placehold.co",
  "placehold.it",
  "placeimg.com",
  "via.placeholder.com",
]);

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const normalizeImageUrl = (imageUrl) => {
  if (typeof imageUrl !== "string") {
    return "";
  }

  const urlMatch = imageUrl.match(/https?:\/\/[^"'\\\]\s]+/i);

  return urlMatch?.[0].replace(/[),]+$/, "") ?? "";
};

const isUsableImageUrl = (imageUrl) => {
  try {
    const parsedUrl = new URL(imageUrl);
    const isWebUrl = ["http:", "https:"].includes(parsedUrl.protocol);
    const isPlaceholder =
      placeholderImageHosts.has(parsedUrl.hostname.toLowerCase()) ||
      parsedUrl.pathname.toLowerCase().includes("placeholder");

    return isWebUrl && !isPlaceholder;
  } catch {
    return false;
  }
};

const getProductImages = ({ images }) => {
  const imageList = Array.isArray(images) ? images : [];

  return [
    ...new Set(
      imageList.map(normalizeImageUrl).filter(isUsableImageUrl),
    ),
  ];
};

const getImageCandidates = (product) => {
  const productImages = getProductImages(product);
  const categoryImage = normalizeImageUrl(product.category?.image);

  return [
    ...new Set(
      [...productImages, categoryImage].filter(isUsableImageUrl),
    ),
  ];
};

const getCategoryName = ({ id, name } = {}) =>
  categoryNameById.get(id) ?? (allowedCategoryNames.has(name) ? name : "");

const translateCategoryName = (category) => {
  const categoryName = getCategoryName(category);

  return categoryTranslations[categoryName] ?? categoryName;
};

const filterProductsByCategory = (products) =>
  products.filter(({ category }) => Boolean(getCategoryName(category)));

const ProductItem = ({ product, index }) => {
  const productImages = getImageCandidates(product);
  const [imageIndex, setImageIndex] = useState(0);
  const image = productImages[imageIndex];
  const categoryName = translateCategoryName(product.category);
  const cardColorClass =
    index % 2 === 0 ? "productCardCyan" : "productCardPink";

  const showNextImage = () => {
    setImageIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <article className={`productCard ${cardColorClass}`}>
      <div className="productImageFrame">
        {image ? (
          <img
            className="productImage"
            src={image}
            alt={product.title}
            loading="lazy"
            onError={showNextImage}
          />
        ) : (
          <div
            className="productImageFallback"
            aria-label={`No image available for ${product.title}`}
          >
            <span className="productFallbackMark" aria-hidden="true">
              {categoryName.slice(0, 1)}
            </span>
            <span>{categoryName}</span>
          </div>
        )}
      </div>

      <div className="productMetadata">
        <span className="productCategory">{categoryName}</span>
        <span className="productPrice">
          {priceFormatter.format(product.price)}
        </span>
      </div>

      <h3 className="productName" title={product.title}>
        {product.title}
      </h3>
    </article>
  );
};

const ProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(productsApiUrl, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Products request failed with ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Products response must be an array");
        }

        setProducts(filterProductsByCategory(data));
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage("The products could not be loaded. Please try again.");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => abortController.abort();
  }, []);

  if (isLoading) {
    return (
      <section className="productsSection productsStatus" aria-live="polite">
        Loading products...
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section
        className="productsSection productsStatus productsError"
        role="alert"
      >
        {errorMessage}
      </section>
    );
  }

  return (
    <section className="productsSection" aria-labelledby="productsTitle">
      <h2 className="visuallyHidden" id="productsTitle">
        Products
      </h2>

      <div className="productsGrid">
        {products.map((product, index) => (
          <ProductItem key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductsComponent;
