import { useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Folders } from "./views/Folders";
import Layout from "./domains/ui/components/Layout";
import "./App.css";
import { useBrowser } from "./stores/browser";

type Bookmarks = {
  bookmark_bar: {
    children: [];
    id: string;
    name: string;
    type: string;
  };
  other: {
    children: [];
    id: string;
    name: string;
    type: string;
  };
  synced: {
    children: [];
    id: string;
    name: string;
    type: string;
  };
};

const initialBookmarks: Bookmarks = {
  bookmark_bar: {
    children: [],
    id: "",
    name: "",
    type: "",
  },
  other: {
    children: [],
    id: "",
    name: "",
    type: "",
  },
  synced: {
    children: [],
    id: "",
    name: "",
    type: "",
  },
};

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(initialBookmarks);
  const { browser } = useBrowser();

  async function fetchBookmarks() {
    const bookmarks: string = await invoke("get_bookmarks", { browser });
    const obj = JSON.parse(bookmarks);
    setBookmarks(obj.roots);
    return;
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useMemo(async () => {
    await fetchBookmarks();
  }, [browser]);

  const values = Object.values(bookmarks);

  return (
    <Layout>
      {values.map((folder) => (
        <Folders bookmarks={folder} />
      ))}
    </Layout>
  );
}

export default App;
