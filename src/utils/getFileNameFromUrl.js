export default function getFileNameFromUrl(url){
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const segments = pathname.split('/')
  const filename = segments[segments.length -1 ]
  return filename
}
