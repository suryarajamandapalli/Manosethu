import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import React from "react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F7F5] px-6 text-[#12263A]">
      <div className="max-w-md text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#2B9C91]">404 Not Found</span>
        <h1 className="mt-2 text-3xl font-bold text-[#173B63]">Page Not Found</h1>
        <p className="mt-3 text-sm text-[#4A5E73]">
          The resource you are looking for is not available or has been relocated.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#173B63] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#12263A]"
        >
          Return to Manosethu
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F7F5] px-6 text-[#12263A]">
      <div className="max-w-md text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C94C4C]">System Notice</span>
        <h1 className="mt-2 text-2xl font-bold text-[#173B63]">Unable to load content</h1>
        <p className="mt-3 text-sm text-[#4A5E73]">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#173B63] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#12263A]"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MANOSETHU — Understanding Distress Before It Becomes a Crisis" },
      {
        name: "description",
        content:
          "ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.",
      },
      { property: "og:title", content: "MANOSETHU — Understanding Distress Before It Becomes a Crisis" },
      {
        property: "og:description",
        content:
          "Intelligent, privacy-conscious platform for continuous emotional wellbeing monitoring, distress assessment, early risk identification and human-centred support.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MANOSETHU" },
      { property: "og:image", content: "/logos/manosethu-logo.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MANOSETHU — Understanding Distress Before It Becomes a Crisis" },
      {
        name: "twitter:description",
        content:
          "Intelligent, privacy-conscious platform for continuous emotional wellbeing monitoring, distress assessment, early risk identification and human-centred support.",
      },
      { name: "twitter:image", content: "/logos/manosethu-logo.svg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logos/manosethu-mark.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#F6F7F5]">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
