import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getFeaturedProducts } from "@/lib/firebase-service";
import { ProductCard } from "@/components/shop/product-card";
import { SizeSelectorAndCart } from "@/components/shop/size-selector-cart";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProductById(params.id);
  const featuredProducts = await getFeaturedProducts();

  if (!product) {
    notFound();
  }

  const thumbnails = [
    product.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600",
    "https://images.unsplash.com/photo-1615397323192-3580521e6490?q=80&w=300",
    "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=300",
    "https://images.unsplash.com/photo-1623086856891-87b7aa94dbef?q=80&w=300",
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-10 pb-20 font-sans">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/5] md:aspect-square w-full bg-[#111] rounded-2xl overflow-hidden relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800"}')` }}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-xl overflow-hidden relative cursor-pointer ${idx === 0 ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100 transition-opacity"
                    }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${thumb}')` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col py-4 gap-6">

            {/* Header */}
            <div>
              <span className="inline-block bg-[#111] text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm mb-4">
                EXCLUSIVE COLLECTION
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>Eau de Parfum</span>
                <span className="text-white/20">•</span>
                <span>Unisex</span>
                <span className="text-white/20">•</span>
                <span>{product.brand}</span>
              </div>
            </div>

            {/* Scent Profile */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Scent Profile</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "TOP NOTE", note: product.notes?.top?.[0] || "Bergamot", desc: "Fresh citrus opening with a bright, zesty character." },
                  { label: "HEART NOTE", note: product.notes?.heart?.[0] || "Rose", desc: "Voluptuous floral core that adds a sophisticated depth." },
                  { label: "BASE NOTE", note: product.notes?.base?.[0] || "Sandalwood", desc: "Creamy, woody finish that lingers throughout the day." },
                ].map(({ label, note, desc }) => (
                  <div key={label}>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">{label}</span>
                    <span className="block font-bold text-sm mb-1 text-white">{note}</span>
                    <p className="text-[11px] text-white/50 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Description</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector + Cart (Client Component) */}
            <SizeSelectorAndCart product={product as any} />

            {/* Shipping Info */}
            <div className="flex flex-col sm:flex-row gap-4 text-[10px] text-white/50 uppercase tracking-wider pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">local_shipping</span>
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">verified</span>
                <span>100% Authentic Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-32">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl font-bold text-white">You may also like</h2>
            <Link href="/shop" className="text-primary text-sm font-bold hover:text-white transition-colors">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={{ ...item, imageUrl: item.image || "" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
