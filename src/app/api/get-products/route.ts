import path from "path";
import { promises as fs } from "fs";

export async function GET(request: Request) {
  try {
    // Read the JSON file from the data directory
    // join the current working directory with the path to the data directory
    const jsonDirectory = path.join(process.cwd(), "src", "data");
    const filePath = path.join(jsonDirectory, "mock-data.json");
    console.log("File path:", filePath);
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);

    return Response.json({
      success: true,
      message: "Products loaded successfully",
      data: data.products,
      error: null,
    });
  } catch (error) {
    console.error("Error loading products:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to load products",
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
