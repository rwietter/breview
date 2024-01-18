import { Link } from "react-router-dom";
import { FolderIcon } from "../domains/ui/icons/FolderIcon";
import { Divider } from "@mantine/core";

export const Folders = ({ bookmarks }: { bookmarks: any[] }) => {
  const folders = bookmarks.filter((bookmark: any) => bookmark.type === 'folder');
  const urls = bookmarks.filter((bookmark: any) => bookmark.type === 'url');

  return (
    <section className="p-2 flex flex-wrap justify-start">
      {folders.length ? folders.map((folder: any) => {
        return (
          <Link
            to={`/directory/${folder.name}`}
            state={{ folder }}
            key={folder.id}
            className="h-32 w-40 bg-gray-50 border-[1px] hover:border-gray-300 m-4 rounded-md p-4 flex items-center justify-center flex-col" >
            <section className="justify-end flex items-center flex-col pb-2">
              <FolderIcon />
              <h2 className="text-base text-gray-900 pt-1">{folder.name}</h2>
            </section>
          </Link>
        )
      }) : <span />}

      {folders.length > 0 && urls.length > 0 && <Divider className='m-3' color='#f1f1f1' />}

      <ul className='flex flex-wrap'>
        {urls && urls.map((bookmark: any) => {
          let regex = /https?:\/\/(www.)?/g;
          let url = bookmark.url.replace(regex, '').split('/')[0];

          return (
            <article
              key={bookmark.id}
              className="h-auto bg-gray-50 m-4 p-2 flex flex-wrap justify-start" >
              <div className="flex flex-col flex-wrap">
                <section className='w-[200px] h-[100px] bg-cyan-100'>

                </section>
                <section className='flex justify-between flex-col'>
                  <a
                    href={bookmark.url}
                    target='_blank'
                    rel="noopener noreferrer"
                    className='block text-blue-600 px-2 py-4 w-[200px] line-clamp-3 text-lg'>
                    {bookmark.name || url}
                  </a>
                  <span className='px-2 text-sm text-gray-400 block w-[200px] line-clamp-1 truncate justify-end'>
                    {bookmark.url}
                  </span>
                </section>
              </div>
            </article>
          )
        })}
      </ul>
    </section>
  )
}