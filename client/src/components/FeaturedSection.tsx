import { topProducts } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedSection() {
  return (
    <section id="favoritos" className="bg-[#1a1a1a] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2">
            OS FAVORITOS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Mais Pedidos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Os produtos que nossos clientes mais amam. Experimente você também!
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topProducts.filter((p): p is NonNullable<typeof p> => p !== undefined).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
