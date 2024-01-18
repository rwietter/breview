import { Divider } from '@mantine/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FolderIcon } from '../domains/ui/icons/FolderIcon';
import Layout from '../domains/ui/components/Layout';

const Folder: React.FC = () => {
  const location = useLocation();
  const folder = location.state && location.state.folder;

  let folders = folder.children && folder.children.filter((bookmark: any) => bookmark.type === 'folder');
  let bookmarks = folder.children && folder.children.filter((bookmark: any) => bookmark.type === 'url');

  return (
    <Layout className='p-4'>
      <ul className='flex flex-wrap'>
        {folders && folders.map((bookmark: any) => {
          if (bookmark.type === 'folder') {
            return (
              <Link
                to={`/directory/${bookmark.name}`}
                state={bookmark}
                key={bookmark.id}
                className="h-32 w-40 bg-gray-50 border-[1px] hover:border-gray-300 m-4 rounded-md p-4 flex items-center justify-center flex-col" >
                <div className="justify-end flex items-center flex-col pb-2">
                  <FolderIcon />
                  <h2 className="text-base text-gray-900 pt-1">{bookmark.name}</h2>
                </div>
              </Link>
            )
          }
        })}
      </ul>

      {folders.length > 0 && bookmarks.length > 0 && <Divider className='m-3' color='#f1f1f1' />}

      <ul className='flex flex-wrap'>
        {bookmarks && bookmarks.map((bookmark: any) => {
          let regex = /https?:\/\/(www.)?/g;
          let url = bookmark.url.replace(regex, '').split('/')[0];

          return (
            <article
              key={bookmark.id}
              className="h-auto bg-gray-50 m-4 p-2 flex flex-wrap justify-start" >
              <div className="flex flex-col flex-wrap">
                <div className='w-[200px] h-[100px] bg-cyan-100'>

                </div>
                <div className='flex justify-between flex-col'>
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
                </div>
              </div>
            </article>
          )
        })}
      </ul>

    </Layout>
  )
}

export default Folder;