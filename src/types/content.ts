import { MediaTypeEnum } from "./enums/media-type";

export interface ContentEntity {
  contentId: string;
  storeId: string;
  productId: string;
  type: MediaTypeEnum;
  mediaUrl: string;
  createdAt: Date;
}
