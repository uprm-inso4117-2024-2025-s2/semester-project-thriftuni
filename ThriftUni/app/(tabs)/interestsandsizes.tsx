import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const categories: { title: string; options: string[] }[] = [
  { title: "Outfit Styles", options: ["Casual", "Business Casual", "Formal", "Vintage", "Streetwear", "Minimalist", "Old Money", "Classic"] },
  { title: "Tops", options: ["T-shirts", "Blouses", "Sweaters", "Tank tops", "Button-up", "Hoodies"] },
  { title: "Bottoms", options: ["Jeans", "Leggings", "Joggers", "Cargo", "Shorts", "Skirts"] },
  { title: "Dresses & One-Pieces", options: ["Casual", "Jumpsuits", "Formal gowns", "Rompers"] },
  { title: "Footwear", options: ["Sneakers", "Sandals", "Loafers", "Boots", "Heels"] }
];

export default function InterestsSizes() {
  const [selectedTab, setSelectedTab] = useState<"Interests" | "Sizes">("Interests");
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

  const toggleSelection = (item: string) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      newSet.has(item) ? newSet.delete(item) : newSet.add(item);
      return newSet;
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <ArrowLeft className="w-6 h-6 cursor-pointer" />
        <h1 className="text-xl font-semibold flex-1 text-center">Interests and sizes</h1>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          className={`flex-1 px-4 py-2 rounded ${selectedTab === "Interests" ? "bg-black text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedTab("Interests")}
        >
          Interests
        </button>
        <button
          className={`flex-1 px-4 py-2 rounded ${selectedTab === "Sizes" ? "bg-black text-white" : "bg-gray-300"}`}
          onClick={() => setSelectedTab("Sizes")}
        >
          Sizes
        </button>
      </div>
      {selectedTab === "Interests" && (
        <div className="space-y-4">
          {categories.map(({ title, options }) => (
            <div key={title}>
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <div className="flex flex-wrap gap-2">
                {options.map((item) => (
                  <button
                    key={item}
                    className={`px-4 py-2 rounded-full ${selectedInterests.has(item) ? "bg-black text-white" : "bg-gray-300"}`}
                    onClick={() => toggleSelection(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
