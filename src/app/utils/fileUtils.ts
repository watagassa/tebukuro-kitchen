// つかわなくなったかも
export function getFileExtension(file: File): string | null {
  const fileName = file.name;
  const extension = fileName.split(".").pop(); // 拡張子を取得
  return extension ? extension.toLowerCase() : null; // 小文字に変換して返す
}
