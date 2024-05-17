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
  color?: 'Black' | 'White';
  size?: 'XS' | 'S' | 'M' | 'L' | 'XL';
}

type ModalProps = {
  isActive: boolean;
  close: () => void;
}