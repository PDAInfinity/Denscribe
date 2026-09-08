import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import Page_0 from "./pages/about.tsx";
import PageLayout_0 from "./pages/about.pageLayout.tsx";
import Page_1 from "./pages/login.tsx";
import PageLayout_1 from "./pages/login.pageLayout.tsx";
import Page_2 from "./pages/_index.tsx";
import PageLayout_2 from "./pages/_index.pageLayout.tsx";
import Page_3 from "./pages/account.tsx";
import PageLayout_3 from "./pages/account.pageLayout.tsx";
import Page_4 from "./pages/billing.tsx";
import PageLayout_4 from "./pages/billing.pageLayout.tsx";
import Page_5 from "./pages/dictate.tsx";
import PageLayout_5 from "./pages/dictate.pageLayout.tsx";
import Page_6 from "./pages/privacy.tsx";
import PageLayout_6 from "./pages/privacy.pageLayout.tsx";
import Page_7 from "./pages/invoices.tsx";
import PageLayout_7 from "./pages/invoices.pageLayout.tsx";
import Page_8 from "./pages/proposal.tsx";
import PageLayout_8 from "./pages/proposal.pageLayout.tsx";
import Page_9 from "./pages/schedule.tsx";
import PageLayout_9 from "./pages/schedule.pageLayout.tsx";
import Page_10 from "./pages/settings.tsx";
import PageLayout_10 from "./pages/settings.pageLayout.tsx";
import Page_11 from "./pages/dashboard.tsx";
import PageLayout_11 from "./pages/dashboard.pageLayout.tsx";
import Page_12 from "./pages/templates.tsx";
import PageLayout_12 from "./pages/templates.pageLayout.tsx";
import Page_13 from "./pages/follow-ups.tsx";
import PageLayout_13 from "./pages/follow-ups.pageLayout.tsx";
import Page_14 from "./pages/install.$token.tsx";
import PageLayout_14 from "./pages/install.$token.pageLayout.tsx";
import Page_15 from "./pages/client-relations.tsx";
import PageLayout_15 from "./pages/client-relations.pageLayout.tsx";
import Page_16 from "./pages/visits.$visitId.review.tsx";
import PageLayout_16 from "./pages/visits.$visitId.review.pageLayout.tsx";
import Page_17 from "./pages/clients.$clientId.setup.tsx";
import PageLayout_17 from "./pages/clients.$clientId.setup.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    setTimeout(cb, 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/about.tsx","/about"],["./pages/login.tsx","/login"],["./pages/_index.tsx","/"],["./pages/account.tsx","/account"],["./pages/billing.tsx","/billing"],["./pages/dictate.tsx","/dictate"],["./pages/privacy.tsx","/privacy"],["./pages/invoices.tsx","/invoices"],["./pages/proposal.tsx","/proposal"],["./pages/schedule.tsx","/schedule"],["./pages/settings.tsx","/settings"],["./pages/dashboard.tsx","/dashboard"],["./pages/templates.tsx","/templates"],["./pages/follow-ups.tsx","/follow-ups"],["./pages/install.$token.tsx","/install/:token"],["./pages/client-relations.tsx","/client-relations"],["./pages/visits.$visitId.review.tsx","/visits/:visitId/review"],["./pages/clients.$clientId.setup.tsx","/clients/:clientId/setup"]]);
const fileNameToComponent = new Map([
    ["./pages/about.tsx", Page_0],
["./pages/login.tsx", Page_1],
["./pages/_index.tsx", Page_2],
["./pages/account.tsx", Page_3],
["./pages/billing.tsx", Page_4],
["./pages/dictate.tsx", Page_5],
["./pages/privacy.tsx", Page_6],
["./pages/invoices.tsx", Page_7],
["./pages/proposal.tsx", Page_8],
["./pages/schedule.tsx", Page_9],
["./pages/settings.tsx", Page_10],
["./pages/dashboard.tsx", Page_11],
["./pages/templates.tsx", Page_12],
["./pages/follow-ups.tsx", Page_13],
["./pages/install.$token.tsx", Page_14],
["./pages/client-relations.tsx", Page_15],
["./pages/visits.$visitId.review.tsx", Page_16],
["./pages/clients.$clientId.setup.tsx", Page_17],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    for (const component of components) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // Back/forward: keep browser-like behavior
    if (navType === "POP") return;

    // Hash links: let the browser scroll to the anchor
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash, navType]);

  return null;
}

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <ScrollManager />
      <GlobalContextProviders>
        <Routes>
          {toElement({ trie: buildLayoutTrie({
"./pages/about.tsx": PageLayout_0,
"./pages/login.tsx": PageLayout_1,
"./pages/_index.tsx": PageLayout_2,
"./pages/account.tsx": PageLayout_3,
"./pages/billing.tsx": PageLayout_4,
"./pages/dictate.tsx": PageLayout_5,
"./pages/privacy.tsx": PageLayout_6,
"./pages/invoices.tsx": PageLayout_7,
"./pages/proposal.tsx": PageLayout_8,
"./pages/schedule.tsx": PageLayout_9,
"./pages/settings.tsx": PageLayout_10,
"./pages/dashboard.tsx": PageLayout_11,
"./pages/templates.tsx": PageLayout_12,
"./pages/follow-ups.tsx": PageLayout_13,
"./pages/install.$token.tsx": PageLayout_14,
"./pages/client-relations.tsx": PageLayout_15,
"./pages/visits.$visitId.review.tsx": PageLayout_16,
"./pages/clients.$clientId.setup.tsx": PageLayout_17,
}), fileNameToRoute, makePageRoute })} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
