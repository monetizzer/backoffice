import { useNavigate } from "react-router-dom";
import { ProductEntity } from "../types/product";

export default function Product({ product }: { product: ProductEntity }) {
	const navigate = useNavigate();

	return (
		<div style={{ border: '1px solid black'}}>
			<ul>
				<li>
					<strong>productId:</strong> {product.productId}
				</li>
				<li>
					<strong>storeId:</strong> {product.storeId}
				</li>
				<li>
					<strong>type:</strong> {product.type}
				</li>
				<li>
					<strong>name:</strong> {product.name}
				</li>
				<li>
					<strong>description:</strong> {product.description}
				</li>
				<li>
					<strong>status:</strong> {product.status}
				</li>
				<li style={{ backgroundColor: product.color }}>
					<strong>color:</strong> {product.color}
				</li>
				<li>
					<strong>deliveryMethod:</strong> {product.deliveryMethod}
				</li>
				<li>
					<strong>price:</strong> {product.price}
				</li>

				<strong>Images</strong>

				<br />

				{product.previewImagesUrls.map(img => (
					<img key={img} src={img} style={{ maxWidth: '1000px', maxHeight: '1000px' }} />
				))}
			</ul>

			<button onClick={() => navigate(`/products/${product.productId}`)}>See contents</button>
		</div>
	)
}