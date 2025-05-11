"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  Trash2,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import type { TOrder } from "@/models/order.model";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Status badge component
const StatusBadge = ({ status }: { status: TOrder["status"] }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200",
    "in delivery": "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    returned: "bg-red-100 text-red-800 border-red-200",
    exchange: "bg-orange-100 text-orange-800 border-orange-200",
  };

  return (
    <Badge className={`${statusStyles[status]} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Action components
const DeleteOrderDialog = ({ orderId }: { orderId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/order/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Order deleted successfully");
        setIsOpen(false);
        // Refresh the page to update the table
        window.location.reload();
      } else {
        throw new Error("Failed to delete order");
      }
    } catch (error) {
      toast.error("Failed to delete the order");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ChangeStatusDialog = ({ order }: { order: TOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<TOrder["status"]>(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/order/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success("Status updated successfully");
        setIsOpen(false);
        // Refresh the page to update the table
        window.location.reload();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update the status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Order Status</DialogTitle>
          <DialogDescription>
            Update the status for order #{order._id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TOrder["status"])}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in delivery">In Delivery</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="exchange">Exchange</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleStatusChange} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddTransactionDialog = ({ order }: { order: TOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionId, setTransactionId] = useState(order.transactionId || "");
  const [deliveryPayment, setDeliveryPayment] = useState(
    order.deliveryPayment || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddTransaction = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/order/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          deliveryPayment,
        }),
      });

      if (response.ok) {
        toast.success("Transaction added successfully");
        setIsOpen(false);
        // Refresh the page to update the table
        window.location.reload();
      } else {
        throw new Error("Failed to add transaction");
      }
    } catch (error) {
      toast.error("Failed to add transaction");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <CreditCard className="w-4 h-4 text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction Details</DialogTitle>
          <DialogDescription>
            Add payment information for order #{order._id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="transactionId" className="text-right">
              Transaction ID
            </Label>
            <Input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="deliveryPayment" className="text-right">
              Delivery Payment
            </Label>
            <Select value={deliveryPayment} onValueChange={setDeliveryPayment}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash on Delivery</SelectItem>
                <SelectItem value="online">Online Payment</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTransaction} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save Transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<TOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div className="font-medium">
        {(row.getValue("_id") as string).substring(0, 8)}...
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt")
        ? new Date(row.getValue("createdAt"))
        : new Date();
      return <div>{format(date, "MMM dd, yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <ChangeStatusDialog order={order} />
          <AddTransactionDialog order={order} />
          <DeleteOrderDialog orderId={order._id} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order._id)}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View order details</DropdownMenuItem>
              <DropdownMenuItem>View customer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
