export async function uploadToCDN(filePath) {
  // TODO: Реальная интеграция с AWS S3 / Cloudinary
  const fileName = filePath.split('/').pop();
  return `https://cdn.example.com/multis/${fileName}`;
}