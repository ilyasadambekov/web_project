type ProductColor = 'Black' | 'White'

type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

type Product = {
  title: string;
  description: string;
  material: string;
  price: string;
  amount: number;
  sizes: any[];
  image: string;
  rating: number;
  id: string;
  color?: ProductColor;
  size?: ProductSize;
}

type ModalProps = {
  isActive: boolean;
  close: () => void;
}