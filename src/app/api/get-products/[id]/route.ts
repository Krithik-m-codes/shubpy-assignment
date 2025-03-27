import path from "path";
import { promises as fs } from "fs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Read the JSON file from the data directory
    const jsonDirectory = path.join(process.cwd(), "src", "data");
    const filePath = path.join(jsonDirectory, "mock-data.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Find the product by ID
    const product = data.products.find(
      (product: any) => product.id === Number(params.id)
    );

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
          data: null,
          error: null,
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Product loaded successfully",
      data: product,
      error: null,
    });
  } catch (error) {
    console.error("Error loading product:", error);
    return Response.json(
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
