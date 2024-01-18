import { useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Folders } from "./views/Folders";
import Layout from "./domains/ui/components/Layout";

function App() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  async function fetchBookmarks() {
    const bookmarks: string = await invoke("get_bookmarks");
    //!TODO: enviar JSON com o serde e não string
    const obj = JSON.parse(bookmarks);
    const bookmark_bar = obj.roots.bookmark_bar.children;
    setBookmarks(bookmark_bar);
    return;
  }

  useMemo(async () => {
    await fetchBookmarks();
  }, [])

  return (
    <Folders bookmarks={bookmarks} />
  )
}

export default App;
