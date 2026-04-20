export const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL || // Automatically set by Vercel
    "http://localhost:3000";

  // Make sure to include `https://` when not localhost
  url = url.includes("http") ? url : `https://${url}`;
  
  // Remove trailing slash if present for consistency
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  
  return url;
};

export const getDisplayURL = () => {
  const url = getURL();
  return url.replace(/^https?:\/\//, "");
};
