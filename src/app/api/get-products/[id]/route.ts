import path from "path";
import { promises as fs } from "fs";
import { Product } from "@/types/common-types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract both route params and query params
    const url = new URL(request.url);
    const queryId = url.searchParams.get("id");
    const pathId = url.pathname.split("/").pop(); // Extract ID from path

    // Determine which ID to use (query param takes precedence)
    const productId = queryId || pathId;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
          data: null,
          error:
            "Provide ID via path (/api/products/1) or query (/api/products?id=1)",
        },
        { status: 400 }
      );
    }

    // Validate ID parameter
    const numericId = Number(productId);
    if (isNaN(numericId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid product ID",
          data: null,
          error: "ID must be a number",
        },
        { status: 400 }
      );
    }

    // Read and parse the JSON file
    const jsonDirectory = path.join(process.cwd(), "src", "data");
    const filePath = path.join(jsonDirectory, "mock-data.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data: { products: Product[] } = JSON.parse(fileContents);

    // Find the product by ID
    const product = data.products.find((p: Product) => p.id === numericId);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
          data: null,
          error: null,
        },
        { status: 404 }
      );
    }

    // Ensure rating exists with default value
    const productWithDefaults = {
      ...product,
      rating: product.rating || 0,
    };

    return NextResponse.json({
      success: true,
      message: "Product loaded successfully",
      data: productWithDefaults,
      error: null,
    });
  } catch (error) {
    console.error("Error loading product:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load product",
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
