export default function generateUrl(urlString: string): string[] {
  try {
    const pathParts = urlString.split("/").filter((part) => part !== "");
    // console.log('asd' + pathParts)
    return pathParts;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
