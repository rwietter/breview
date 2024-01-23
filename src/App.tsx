import { useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Folders } from "./views/Folders";
import Layout from "./domains/ui/components/Layout";
import "./App.css";
import { useBrowser } from "./stores/browser";

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>(initialBookmarks);
  const { browser } = useBrowser();

  async function fetchBookmarks() {
    const response: string = await invoke("get_bookmarks", { browser });
    const obj = JSON.parse(response);

    if (obj.is_error) {
      setBookmarks({ is_error: obj.is_error, error: obj.error, bookmarks: null });
      return;
    }

    setBookmarks({ bookmarks: JSON.parse(obj.bookmarks).roots, is_error: false, error: null});
    return;
  }
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useMemo(async () => {
    await fetchBookmarks();
  }, [browser]);

  if (bookmarks.is_error || bookmarks.bookmarks === null) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-base">{bookmarks.error}</p>
        </div>
      </Layout>
    );
  }

  const values = Object.values(bookmarks.bookmarks);

  return (
    <Layout>
      {values.map((folder) => (
        <Folders bookmarks={folder} />
      ))}
    </Layout>
  );
}

export default App;

type Bookmarks = {
  bookmarks: {
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
      }
  } | null;
  is_error: boolean;
  error: string | null;
};

const initialBookmarks: Bookmarks = {
  bookmarks: {
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
      }
  },
  is_error: false,
  error: "",
};

