export function getRandomObjects(array, count) {
  const result = [];
  const indices = new Set(); 
  while (indices.size < count) {
    const index = Math.floor(Math.random() * array.length);
    if (!indices.has(index)) {
      indices.add(index);
      result.push(array[index]);
    }
  }
  return result;
}
export function getBaseUrl() {
  const environment = import.meta.env.VITE_ENV;
  const apiUrl = import.meta.env.VITE_API_URL;
  const hostname = window.location.hostname;
  if (hostname === "localhost") {
    return import.meta.env.VITE_API_URL;
  } else if(environment==="development") {
    return `http://${hostname}:8090`;
  } else {
    return apiUrl
  }
}
