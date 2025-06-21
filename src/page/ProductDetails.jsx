import { getSingleProduct } from "@/api/product";
import PrimaryButton from "@/components/common/PrimaryButton";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(null);

  const fetchSingleProduct = async (id) => {
    try {
      const response = await getSingleProduct(id);
      console.log(response.data.product);
      setProduct(response.data.product);
      if (response.data.product.images?.length > 0) {
        setMainImage(
          typeof response.data.product.images[0] === "string"
            ? response.data.product.images[0]
            : response.data.product.images[0].url
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  // safely get features or empty array
  const features = Array.isArray(product.features) ? product.features : [];

  // get product images array of strings (urls)
  const images = (product.images || []).map((img) =>
    typeof img === "string" ? img : img.url
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <PrimaryButton
          text="Back"
          onClik={() => navigate("/products")}
          className=" mb-4"
          customWidth="w-[200px]"
        />
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            {/* Main image */}
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md mb-4"
                id="mainImage"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 rounded-lg mb-4 animate-pulse" />
            )}

            {/* Thumbnail images */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {images.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer transition-opacity duration-300 ${
                    imgSrc === mainImage
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(imgSrc)}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>

            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">${product.price}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Assuming product.description exists */}
            {product.description && (
              <p className="text-gray-700 mb-6">{product.description}</p>
            )}

            {product.category?.name && (
              <p className="text-gray-700 mb-6">
                <p className="font-semibold">
                  Category <br />
                </p>
                {product.category.name}
              </p>
            )}
            <p className="font-semibold">Stock</p>
            {product.stock ? (
              <p className="text-blue-500 mb-3">Available</p>
            ) : (
              <p className="text-red-500 mb-3">Stock Out</p>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              {features.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No features listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
