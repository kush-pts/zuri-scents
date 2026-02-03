import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 bg-gray-100 aspect-square flex items-center justify-center text-gray-400">
          [Image: {product.name}]
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-serif mb-2">{product.name}</h1>
          <p className="text-xl text-parfumerie-gold mb-6">${product.price}</p>
          <p className="mb-6">{product.description}</p>


          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
