"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Filter, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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

const ProductFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const categoryParam = searchParams.get("category");
  const genderParam = searchParams.get("gender");
  useEffect(() => {
    const handler = setTimeout(() => {
      searchTerm ? params.set("search", searchTerm) : params.delete("search");
      router.push(`?${params.toString()}`);
    }, 300); // Delay of 300ms

    // Clear the timeout if the user changes the input before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, router]);

  const handleSelect = (value: string) => {
    value === "default"
      ? params.delete("priceFilter")
      : params.set("priceFilter", value);
    router.push(`?${params.toString()}`);
  };

  const handleCatgory = (option: Option[]) => {
    console.log(option);
    option.length
      ? params.set("category", option.map((item) => item.value).join(","))
      : params.delete("category");
    router.push(`?${params.toString()}`);
  };
  const handleGender = (option: Option[]) => {
    console.log(option);
    option.length
      ? params.set("gender", option.map((item) => item.value).join(","))
      : params.delete("gender");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="w-full rounded-xl p-2 bg-red-500 space-y-4">
      <div className="flex items-center bg-white rounded-md">
        <SearchIcon size={18} className="ml-2" />
        <Input
          className="bg-white border-white focus-visible:ring-0"
          defaultValue={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name"
        />
      </div>
      <div>
        <Label className="text-white">Filter by price</Label>
        <div className="flex items-center bg-white rounded-md">
          <Filter size={18} className="ml-2" />
          <Select
            onValueChange={handleSelect}
            defaultValue={searchParams.get("priceFilter") || "default"}
          >
            <SelectTrigger className="bg-white focus-visible:ring-0 border-white">
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
      </div>
      <MultiFilter
        handlefunc={handleCatgory}
        placeholder="category"
        label="Filter by category"
        option={categories}
        param={categoryParam}
      />
      <MultiFilter
        handlefunc={handleGender}
        placeholder="gender"
        label="Filter by gender"
        option={genderOptions}
        param={genderParam}
      />
    </div>
  );
};

export default ProductFilter;
