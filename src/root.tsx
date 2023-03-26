// @refresh reload
import { Suspense } from "solid-js";
import { A, Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title } from "solid-start";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart Testing</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="min-h-screen bg-gray-700 text-white">
        <Suspense>
          <ErrorBoundary>
            <header class="mb-10">
              <nav>
                <ul class="mx-auto flex w-[min(80%,44rem)] justify-around gap-10 py-2.5">
                  <li class="text-lg hover:underline">
                    <A href="/">Home</A>
                  </li>
                  <li class="text-lg hover:underline">
                    <A href="/cards">Cards</A>
                  </li>
                </ul>
              </nav>
            </header>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
