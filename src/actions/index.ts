"use server";
import { auth, signIn, signOut } from "@/auth";
import { connectToDatabase } from "@/configs/mongoose";
import { ProductModel, TProduct } from "@/models/product.model";
import UserModel, { IUser } from "@/models/user.model";
import { cookies, headers } from "next/headers";

export const getProducts = async () => {
  await cookies(); //added because its prevent caching by default
  await connectToDatabase();

  const result = await ProductModel.find();
  console.log(result);

  return result;
};

export const addProduct = async (
  payload: Omit<TProduct, "isDeleted" | "_id">
) => {
  try {
    const userData = await auth();
    if (userData?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    await connectToDatabase();
    const result = await ProductModel.create(payload);
    console.log(result);
    const plainResult = {
      ...result.toObject(),
      _id: result._id.toString(), // Convert ObjectId to a string
    };
    return plainResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const SignIn = async () => {
  await signIn("google");
};
export const SignOut = async () => {
  await signOut();
};

type UserWithId = IUser & {
  _id: string;
};

export async function fetchUsers(): Promise<UserWithId[]> {
  try {
    const userData = await auth();
    if (userData?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    await connectToDatabase();
    const users = await UserModel.find({}).lean<IUser[]>();

    // Convert Mongoose documents to plain objects with string IDs
    return (users as UserWithId[]).map((user) => ({
      ...user,
      _id: user._id.toString(), // Convert ObjectID to string
    })) as UserWithId[];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function updateUserRole(
  userId: string,
  newRole: "user" | "admin"
) {
  try {
    const userData = await auth();
    if (userData?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    await connectToDatabase();

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
}

export async function deleteUser(userId: string) {
  try {
    const userData = await auth();
    if (userData?.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }
    await connectToDatabase();

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}
