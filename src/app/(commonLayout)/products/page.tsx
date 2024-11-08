import Container from "@/components/common/Container";
import ProductFilter from "@/components/products/ProductFilter";
import fakeimag from "@/assets/shoes 1.webp";
import ProductCard from "@/components/common/ProductCard";

export const fakeData = [
  {
    title: "Classic Sneakers",
    price: 80.0,
    comparePrice: 100.0,
    description: "Comfortable and stylish classic sneakers.",
    sizeQuantities: [
      { size: "7", quantity: 20 },
      { size: "8", quantity: 15 },
      { size: "9", quantity: 10 },
    ],
    thisIsFor: ["Men"],
    categories: ["Sneakers"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Beach Slides",
    price: 30.0,
    comparePrice: 40.0,
    description: "Comfortable slides for beach outings.",
    sizeQuantities: [
      { size: "6", quantity: 12 },
      { size: "7", quantity: 10 },
    ],
    thisIsFor: ["Unisex"],
    categories: ["Slides"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Formal Dress Shoes",
    price: 110.0,
    comparePrice: 130.0,
    description: "Elegant dress shoes for formal occasions.",
    sizeQuantities: [
      { size: "8", quantity: 10 },
      { size: "9", quantity: 8 },
    ],
    thisIsFor: ["Men"],
    categories: ["Formal"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Casual Keds",
    price: 50.0,
    comparePrice: 70.0,
    description: "Lightweight keds for everyday wear.",
    sizeQuantities: [
      { size: "7", quantity: 20 },
      { size: "8", quantity: 15 },
    ],
    thisIsFor: ["Women"],
    categories: ["Keds"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Hiking Boots",
    price: 140.0,
    comparePrice: 160.0,
    description: "Sturdy boots for hiking and outdoor activities.",
    sizeQuantities: [
      { size: "9", quantity: 12 },
      { size: "10", quantity: 8 },
      { size: "11", quantity: 5 },
    ],
    thisIsFor: ["Men"],
    categories: ["Boots"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Running Sports Shoes",
    price: 120.0,
    comparePrice: 140.0,
    description: "High-performance running shoes.",
    sizeQuantities: [
      { size: "8", quantity: 15 },
      { size: "9", quantity: 10 },
    ],
    thisIsFor: ["Men", "Women"],
    categories: ["Sports"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Fashion Accessories",
    price: 20.0,
    comparePrice: 25.0,
    description: "Trendy shoe accessories.",
    sizeQuantities: [],
    thisIsFor: ["Unisex"],
    categories: ["Accessories"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Casual Loafers",
    price: 60.0,
    comparePrice: 80.0,
    description: "Stylish loafers for everyday wear.",
    sizeQuantities: [
      { size: "8", quantity: 15 },
      { size: "9", quantity: 10 },
    ],
    thisIsFor: ["Men"],
    categories: ["Loafers"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Summer Sandals",
    price: 40.0,
    comparePrice: 50.0,
    description: "Light and airy sandals for summer.",
    sizeQuantities: [
      { size: "6", quantity: 10 },
      { size: "7", quantity: 8 },
    ],
    thisIsFor: ["Women"],
    categories: ["Sandals"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Casual Sneakers",
    price: 75.0,
    comparePrice: 95.0,
    description: "Relaxed-fit sneakers for daily wear.",
    sizeQuantities: [
      { size: "7", quantity: 12 },
      { size: "8", quantity: 10 },
    ],
    thisIsFor: ["Men", "Women"],
    categories: ["Casual"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
  {
    title: "Multi-purpose Shoes",
    price: 55.0,
    comparePrice: 70.0,
    description: "Versatile shoes suitable for different occasions.",
    sizeQuantities: [
      { size: "8", quantity: 10 },
      { size: "9", quantity: 12 },
    ],
    thisIsFor: ["Unisex"],
    categories: ["Other"],
    isDeleted: false,
    images: [{ img: fakeimag }],
    createdAt: "2024-11-08T00:00:00.000Z",
    updatedAt: "2024-11-08T00:00:00.000Z",
  },
];

const ClientProductPage = ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  console.log(searchParams);

  console.log("search", searchParams.search);

  return (
    <Container>
      <div className="flex gap-6">
        <div className="">
          <ProductFilter />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {fakeData.map((item, i) => (
              <ProductCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientProductPage;
