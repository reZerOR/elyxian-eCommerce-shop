"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileDown, Loader2 } from "lucide-react";
import type { TOrder } from "@/models/order.model";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/order/data-table";
import { columns } from "@/components/order/columns";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { toast } from "sonner";

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useSWR<TOrder[]>(
    "/api/order",
    fetcher,
    {
      onError: (err) => {
        toast.error("Error fetching orders");
      },
    }
  );

  // Handle CSV download
  const handleDownloadCSV = () => {
    // Convert orders to CSV format
    const headers = [
      "Order ID",
      "Name",
      "Email",
      "Phone",
      "Total",
      "Status",
      "Created At",
    ];
    const csvRows = [
      headers.join(","),
      ...orders.map((order) =>
        [
          order._id,
          order.name,
          order.email,
          order.phone,
          order.total,
          order.status,
          order.createdAt,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-10 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <Button
          onClick={handleDownloadCSV}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div>
          <DataTable columns={columns} data={orders} />
        </div>
      )}
    </div>
  );
}
