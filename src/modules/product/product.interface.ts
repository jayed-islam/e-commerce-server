export type VariantType = {
  type: string;
  value: string;
};

export type InventoryType = {
  quantity: number;
  inStock: boolean;
};

export interface IProductTypes {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: VariantType[];
  inventory: InventoryType;
}
