use serde::{Deserialize, Serialize};

use crate::databases::db::{db_connection, SqlConnection};

#[derive(Debug, Serialize, Deserialize)]
pub struct BookmarkRoots {
    pub roots: Bookmarks,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Bookmarks {
    pub bookmark_bar: BookmarkBar,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BookmarkBar {
    pub children: Vec<Bookmark>,
    pub name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Bookmark {
    pub name: String,
    pub url: String,
    pub r#type: String,
}

pub fn new(browser: &str) -> String {
    let path = crate::user_data_dir();

    match browser {
        "firefox" => {
            let sqlite = rusqlite::Connection::open_in_memory()
                .expect("couldn't open sqlite connection in memory");
            let conn = db_connection(SqlConnection(sqlite));
            let mut stmt = conn
                .0
                .prepare(
                    "SELECT place.id, bookmark.title, place.url
                      FROM moz_bookmarks bookmark
                      JOIN moz_places place ON bookmark.fk = place.id;",
                )
                .unwrap();

            let rows = stmt
                .query_map([], |row| {
                    Ok(Bookmark {
                        name: row.get(1)?,
                        url: row.get(2)?,
                        r#type: "url".to_string(),
                    })
                })
                .unwrap();

            let mut bookmarks = Vec::new();
            for bookmark in rows {
                if let Ok(book) = bookmark {
                    bookmarks.push(book);
                    continue;
                }
            }

            let bookmarks = BookmarkRoots {
                roots: Bookmarks {
                    bookmark_bar: BookmarkBar {
                        children: bookmarks,
                        name: "Bookmarks Bar".to_string(),
                    },
                },
            };

            let bookmarks = serde_json::to_string(&bookmarks).unwrap();
            bookmarks
        }
        _ => {
            let bookmarks = match std::fs::read_to_string(
                path + "/.config/" + browser + "/Default/Bookmarks",
            ) {
                Ok(v) => v,
                Err(e) => panic!("couldn't read bookmarks: {}", e),
            };
            bookmarks
        }
    }
}
