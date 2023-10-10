import { useEffect, useState } from "react";
import AuthLayout from "../layouts/auth";
import { useAuthContext } from "../context/auth";
import { ProductEntity } from "../types/product";
import Product from "../components/Product";

export default function Products() {
  const [productsToReview, setProductsToReview] = useState<Array<ProductEntity>>([])
  const { accessToken } = useAuthContext();

  useEffect(() => {
    const f = async () => {
      if (!accessToken) return;

      const results = await fetch(`${import.meta.env['VITE_API_URL']}/products/review`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(r => r.json())

      if (Array.isArray(results?.data)) {
        setProductsToReview(results.data)
      }
    }

    f();
  }, [accessToken])

  return (
    <AuthLayout>
      <main>
        Products
        {
          productsToReview.map(product => (
            <Product key={product.productId} product={product} />
          ))
        }
      </main>
    </AuthLayout>
  )
}
