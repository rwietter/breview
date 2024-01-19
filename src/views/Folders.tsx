import { Link } from "react-router-dom";
import { FolderIcon } from "../domains/ui/icons/FolderIcon";
import { Separator } from "../domains/ui/components/Separator";

type Bookmarks = {
  bookmarks: {
    children: [];
    id: string;
    name: string;
    type: string;
  };
};

export const Folders = ({ bookmarks }: Bookmarks) => {
  const folders = bookmarks.children.filter((bookmark: any) => bookmark.type === "folder");
  const urls = bookmarks.children.filter((bookmark: any) => bookmark.type === "url");

  return (
    <section className="p-6">
      <p className="text-xl font-light">{bookmarks.name}</p>
      <div className="flex flex-wrap items-start justify-start">
        {folders.length ? (
          folders.map((folder: any) => {
            return (
              <Link
                to={`/directory/${folder.name}`}
                state={{ folder }}
                key={folder.id}
                className="h-32 w-40 bg-gray-50 border-[1px] hover:border-gray-300 m-4 rounded-md p-4 flex items-center justify-start flex-col"
              >
                <section className="justify-end flex items-center flex-col pb-2">
                  <FolderIcon />
                  <h2 className="text-base text-gray-900 pt-1">{folder.name}</h2>
                </section>
              </Link>
            );
          })
        ) : (
          <span />
        )}

        {folders.length > 0 && urls.length > 0 && <Separator className="m-3" color="#f1f1f1" />}

        <ul className="flex flex-wrap items-start justify-start">
          {urls?.map((bookmark: any) => {
            const regex = /https?:\/\/(www.)?/g;
            const url = bookmark.url.replace(regex, "").split("/")[0];

            return (
              <article key={bookmark.id} className="h-auto bg-gray-50 m-4 flex flex-wrap justify-start">
                <div className="flex flex-col flex-wrap">
                  <section className="w-[200px] h-[100px] bg-cyan-100" />
                  <section className="flex justify-between flex-col">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 px-2 py-4 w-[200px] line-clamp-3 text-lg"
                    >
                      {bookmark.name || url}
                    </a>
                    <span className="px-2 text-sm text-gray-400 block w-[200px] line-clamp-1 truncate justify-end">
                      {bookmark.url}
                    </span>
                  </section>
                </div>
              </article>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
