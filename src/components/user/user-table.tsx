"use client"

import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, MoreHorizontal, Search, UserCheck } from "lucide-react"
import { IUser } from "@/models/user.model"
import { deleteUser, fetchUsers, updateUserRole } from "@/actions"

// Extended user interface with _id for frontend use
interface UserWithId extends IUser {
  _id: string
}

export function UserTable() {
  const [users, setUsers] = useState<UserWithId[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState("all")

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  useEffect(() => {
    // Apply role filter
    if (roleFilter !== "all") {
      setColumnFilters([
        {
          id: "role",
          value: roleFilter,
        },
      ])
    } else {
      setColumnFilters([])
    }
  }, [roleFilter])

  const handleRoleChange = async (userId: string, newRole: "user" | "admin") => {
    try {
      await updateUserRole(userId, newRole)

      // Update local state
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? { ...user, role: newRole } : user)))
    } catch (error) {
      console.error("Failed to update user role:", error)
    }
  }

  const handleDeleteUser = async () => {
    if (!userToDelete) return

    try {
      await deleteUser(userToDelete)

      // Update local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete))

      setUserToDelete(null)
      setDeleteDialogOpen(false)
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId)
    setDeleteDialogOpen(true)
  }

  const columns: ColumnDef<UserWithId>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Role
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return <Badge variant={role === "admin" ? "default" : "outline"}>{role}</Badge>
      },
      filterFn: (row, id, value) => {
        return value === row.getValue(id)
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleRoleChange(user._id, user.role === "admin" ? "user" : "admin")}>
                {user.role === "admin" ? "Set as User" : "Set as Admin"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => confirmDelete(user._id)}
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return <div className="py-10 text-center">Loading users...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">{table.getFilteredRowModel().rows.length} user(s)</div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account and remove their data from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
