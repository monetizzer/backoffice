import { DeliveryMethodEnum } from "./enums/delivery-method";
import { ProductStatusEnum } from "./enums/product-status";
import { ProductTypeEnum } from "./enums/product-type";

interface ProductHistoryItem {
  timestamp: Date;
  status: ProductStatusEnum;
  message?: string;
  markedContentIds?: Array<string>;
  reviewerId?: string;
}

export interface ProductEntity {
  productId: string;
  storeId: string;
  type: ProductTypeEnum;
  status: ProductStatusEnum;
  history: Array<ProductHistoryItem>;
  name: string;
  description: string;
  color?: string;
  price: number; // Int, multiplied by 100 ($1 = 100, $0.30 = 30)
  previewImagesUrls: Array<string>;
  deliveryMethod: DeliveryMethodEnum;
  createdAt: Date;
}
