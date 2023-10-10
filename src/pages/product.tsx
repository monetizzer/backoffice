import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthLayout from "../layouts/auth";
import { useAuthContext } from "../context/auth";
import { ProductEntity } from "../types/product";
import { ContentEntity } from "../types/content";

export default function Product() {
  const { productId } = useParams();
  const { accessToken } = useAuthContext();

  const [product, setProduct] = useState<ProductEntity | undefined>()
  const [contents, setContents] = useState<Array<ContentEntity>>([])

  const onApprove = async () => {
    await fetch(`${import.meta.env['VITE_API_URL']}/products/review`, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        approve: true,
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })

    window.alert('Success!')
  }

  const onReject = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const message = document.getElementById(`message-${productId}`)?.value;

    if (!message) {
      window.alert('Missing message!')

      return;
    }

    await fetch(`${import.meta.env['VITE_API_URL']}/products/review`, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        approve: false,
        message
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    })

    window.alert('Success!')
  }

  useEffect(() => {
    const f = async () => {
      if (!accessToken) return;

      const [productReq, contentsReq] = await Promise.all([
        fetch(`${import.meta.env['VITE_API_URL']}/products/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }).then(r => r.json()),
        fetch(`${import.meta.env['VITE_API_URL']}/contents/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        }).then(r => r.json()),
      ])

      if (typeof productReq.productId === 'string') {
        setProduct(productReq)
      }

      if (Array.isArray(contentsReq.data)) {
        setContents(contentsReq.data)
      }
    }

    f();
  }, [accessToken])

  return (
    <AuthLayout>
      <main>
        <ul>
          <li>
            <strong>productId:</strong> {product?.productId}
          </li>
          <li>
            <strong>storeId:</strong> {product?.storeId}
          </li>
          <li>
            <strong>type:</strong> {product?.type}
          </li>
          <li>
            <strong>name:</strong> {product?.name}
          </li>
          <li>
            <strong>description:</strong> {product?.description}
          </li>
          <li>
            <strong>status:</strong> {product?.status}
          </li>
          <li style={{ backgroundColor: product?.color }}>
            <strong>color:</strong> {product?.color}
          </li>
          <li>
            <strong>deliveryMethod:</strong> {product?.deliveryMethod}
          </li>
          <li>
            <strong>price:</strong> {product?.price}
          </li>
        </ul>

        <br/>

				{contents.map(({ contentId, mediaUrl }) => (
					<img key={contentId} src={mediaUrl} style={{ maxWidth: '1000px', maxHeight: '1000px' }} />
				))}

        <br />

        <textarea id={`message-${product?.productId}`} style={{ width: '500px' }} />

        <br />

        <button onClick={() => onApprove()} style={{ backgroundColor: 'green', color: 'white' }}>Approve</button>
        <button onClick={() => onReject()} style={{ backgroundColor: 'red' }}>Reprove</button>
      </main>
    </AuthLayout>
  )
}
