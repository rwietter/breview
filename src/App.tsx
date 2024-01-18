import { useMemo, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Tabs } from "@mantine/core";


function App() {
  const [bookmarks, setBookmarks] = useState<any>('');

  async function fetchBookmarks() {
    const bookmarks: string = await invoke("getBookmarks");
    const obj = JSON.parse(bookmarks);
    const bookmark_bar = obj.roots.bookmark_bar.children;
    setBookmarks(bookmark_bar);
    return;
  }

  useMemo(async () => {
    await fetchBookmarks();
  }, [])

  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<div />}>
          Favorites
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery">
        <div className="p-8 grid grid-cols-3">
          {bookmarks[0] && bookmarks.map((folder: any) => {
            if (folder.type === 'url') return;
            return (
              <a href={`/directory/${folder.name}`} key={folder.name} className="h-28 w-15 bg-black m-4 rounded-md p-2" >
                <h2 className="text-2xl text-white">{folder.name}</h2>
                <h2 className="text-white">{folder.type}</h2>
                {/* <ul>
                  {folder.children && folder.children.map((bookmark: any) => (
                    <li key={bookmark.id}>
                      <a href={bookmark.url}>{bookmark.name}</a>
                    </li>
                  ))}
                </ul> */}
              </a>
            )
          })}
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        Messages tab content
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Settings tab content
      </Tabs.Panel>
    </Tabs>


  )
}

export default App;

