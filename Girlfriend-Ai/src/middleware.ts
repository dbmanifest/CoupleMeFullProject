import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/terms-of-service",
  "/privacy-policy",
  "/discover",
  "/companion/new",
  "/chat",
  "/my-ai",
  "/dmca-policy",
  "/cookies-policy",
  "/underage-policy",
  "/complaint-policy",
  "/content-removal-policy",
  "/blocked-content-policy",
  "/usc-exemption",
  "/community-guidelines",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next).*)", // Match all routes except those containing a dot or _next
//     "/", // Home page
//     "/(api|trpc)(.*)", // Match all API and TRPC routes
//   ],
// };
