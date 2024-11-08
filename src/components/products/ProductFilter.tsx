"use client";


import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Option } from "../ui/multi-select";
import { categories, genderOptions, priceFilter } from "@/lib/variables";
import MultiFilter from "./MultiFilter";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FilterState {
  priceFilter: string;
  category: string;
  gender: string;
}
const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      searchTerm ? params.set("search", searchTerm) : params.delete("search");
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, router]);

  return (
    <div className="flex items-center bg-white rounded-md">
      <SearchIcon size={18} className="ml-2" />
      <Input
        className="bg-white border-white focus-visible:ring-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name"
      />
    </div>
  );
};





const ProductFilterDialog = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterState>({
    priceFilter: searchParams.get("priceFilter") || "default",
    category: searchParams.get("category") || "",
    gender: searchParams.get("gender") || "",
  });

  const handleSave = () => {
    const params = new URLSearchParams(searchParams);
    
    // Update price filter
    filters.priceFilter === "default"
      ? params.delete("priceFilter")
      : params.set("priceFilter", filters.priceFilter);
    
    // Update category
    filters.category
      ? params.set("category", filters.category)
      : params.delete("category");
    
    // Update gender
    filters.gender
      ? params.set("gender", filters.gender)
      : params.delete("gender");

    router.push(`?${params.toString()}`);
    setOpen(false);
  };

  const handleCategory = (options: Option[]) => {
    const categoryString = options.map(opt => opt.value).join(",");
    setFilters(prev => ({ ...prev, category: categoryString }));
  };

  const handleGender = (options: Option[]) => {
    const genderString = options.map(opt => opt.value).join(",");
    setFilters(prev => ({ ...prev, gender: genderString }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" >
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Filter by price</Label>
            <Select
              value={filters.priceFilter}
              onValueChange={(value) => 
                setFilters(prev => ({ ...prev, priceFilter: value }))
              }
            >
              <SelectTrigger className="bg-white focus-visible:ring-0">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                {priceFilter.map((item, i) => (
                  <SelectItem key={i} value={item.value}>
                    {item.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <MultiFilter
            handlefunc={handleCategory}
            placeholder="category"
            label="Filter by category"
            option={categories}
            param={filters.category}
          />

          <MultiFilter
            handlefunc={handleGender}
            placeholder="gender"
            label="Filter by gender"
            option={genderOptions}
            param={filters.gender}
          />
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-red-500" onClick={handleSave}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProductFilter = () => {
  return (
    <div className="w-full rounded-xl p-2 bg-red-500 space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput />
        </div>
        <ProductFilterDialog />
      </div>
    </div>
  );
};

export default ProductFilter;