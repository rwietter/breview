import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FolderIcon } from "../domains/ui/icons/FolderIcon";
import Layout from "../domains/ui/components/Layout";
import { Separator } from "../domains/ui/components/Separator";
import { GoBack } from "../domains/ui/icons/GoBack";
import { Button } from "../domains/ui/components/Button";

const Folder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const folder = location.state?.folder;

  const folders = folder.children?.filter((bookmark: any) => bookmark.type === "folder");
  const bookmarks = folder.children?.filter((bookmark: any) => bookmark.type === "url");

  return (
    <>
      <nav className="px-2 py-4 fixed top-0 backdrop:blur-sm backdrop-blur-sm bg-white/30 shadow-md h-16 w-full flex justify-between">
        <Button type="button" onClick={() => navigate(-1)} className="bg-transparent shadow-none hover:bg-transparent">
          <GoBack /> <span className="text-black font-normal">Go Back</span>
        </Button>
      </nav>
      <ul className="flex flex-wrap pt-20">
        {folders?.map((bookmark: any) => {
          if (bookmark.type === "folder") {
            return (
              <Link
                to={`/directory/${bookmark.name}`}
                state={bookmark}
                key={bookmark.id}
                className="h-32 w-40 bg-gray-50 border-[1px] hover:border-gray-300 m-4 rounded-md p-4 flex items-center justify-center flex-col"
              >
                <div className="justify-end flex items-center flex-col pb-2">
                  <FolderIcon />
                  <h2 className="text-base text-gray-900 pt-1">{bookmark.name}</h2>
                </div>
              </Link>
            );
          }
        })}
      </ul>

      {folders.length > 0 && bookmarks.length > 0 && <Separator className="m-3" color="#f1f1f1" />}

      <ul className="flex flex-wrap">
        {bookmarks?.map((bookmark: any) => {
          const regex = /https?:\/\/(www.)?/g;
          const url = bookmark.url.replace(regex, "").split("/")[0];

          return (
            <article key={bookmark.id} className="h-auto bg-gray-50 m-4 p-2 flex flex-wrap justify-start">
              <div className="flex flex-col flex-wrap">
                <div className="w-[200px] h-[100px] bg-cyan-100" />
                <div className="flex justify-between flex-col">
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
                </div>
              </div>
            </article>
          );
        })}
      </ul>
    </>
  );
};

export default Folder;
