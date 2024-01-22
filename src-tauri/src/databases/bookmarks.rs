use super::db;
use after::bookmarks;

// !TODO: load this after the browser is selected
#[tauri::command]
pub fn get_bookmarks(browser: &str) -> String {
    let path = after::user_data_dir();

    match browser {
        "firefox" => {
            let conn = db::sqlite_conn();
            let mut stmt = conn
                .prepare(
                    "SELECT place.id, bookmark.title, place.url
                    FROM moz_bookmarks bookmark
                    JOIN moz_places place ON bookmark.fk = place.id;",
                )
                .unwrap();

            let rows = stmt
                .query_map([], |row| {
                    Ok(bookmarks::Bookmark {
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

            let bookmarks = bookmarks::BookmarkRoots {
                roots: bookmarks::Bookmarks {
                    bookmark_bar: bookmarks::BookmarkBar {
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
