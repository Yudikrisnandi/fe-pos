export default function getFileNameFromUrl(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const segments = pathname.split('/');
  const fileName = segments[segments.length - 1];
  return fileName;
}
