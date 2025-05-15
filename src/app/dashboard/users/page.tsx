import { UserTable } from "@/components/user/user-table";

export default function UsersPage() {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">User Management</h1>
      <UserTable />
    </div>
  );
}
