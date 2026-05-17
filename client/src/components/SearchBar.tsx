import { Search, X } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useLocation } from "wouter";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim().length === 0) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(results);
    setIsOpen(true);
  };

  const handleResultClick = (result: SearchResult) => {
    setLocation(`/cardapio/${encodeURIComponent(result.category)}`);
    setQuery("");
    setSearchResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setSearchResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4">
      <div className="relative">
        <div className="flex items-center bg-white border-2 border-gray-300 rounded-lg px-4 py-3 hover:border-black transition-colors">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchResults.length > 0 && setIsOpen(true)}
            className="flex-1 outline-none text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors flex items-center gap-3"
              >
                {result.image && (
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{result.name}</p>
                  <p className="text-sm text-gray-500">{result.category}</p>
                </div>
                <p className="font-bold text-black">R$ {result.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        )}

        {isOpen && query.trim().length > 0 && searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center">
            <p className="text-gray-500">Nenhum produto encontrado para "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
