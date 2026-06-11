export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: 'cakes' | 'pastries' | 'cookies' | 'sculptural';
  image: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Beginner' | 'Artisanal' | 'Master Baker';
  yieldText: string;
  tag: string;
  ingredients: { name: string; amount: number; unit: string }[];
  steps: string[];
}

export interface SpongeOption {
  id: string;
  name: string;
  description: string;
  price: number;
  colorCode: string;
}

export interface FrostingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  colorCode: string;
}

export interface FillingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  colorCode: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface SizeOption {
  id: string;
  name: string;
  sizeInches: number;
  priceMultiplier: number;
  servingEstimate: string;
}

export interface CustomCakeSelections {
  sponge: SpongeOption;
  frosting: FrostingOption;
  filling: FillingOption;
  toppings: ToppingOption[];
  size: SizeOption;
  tierCount: 1 | 2 | 3;
  writingText: string;
}

export interface CartItem {
  cartId: string;
  type: 'menu' | 'custom';
  menuItem?: MenuItem;
  customDetails?: CustomCakeSelections;
  quantity: number;
  itemPrice: number;
  notes?: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  isGift: boolean;
  giftMessage: string;
  waxSealType: 'rose' | 'heart' | 'signature' | 'none';
}

export interface Order {
  id: string;
  timestamp: number;
  status: 'Received' | 'Baking' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  shipping: ShippingDetails;
  totalPrice: number;
}

export interface BakerSecret {
  title: string;
  category: string;
  readTime: string;
  secretText: string;
}
