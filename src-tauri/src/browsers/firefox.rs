use crate::{
    bookmarks::browser_bookmarks::bookmarks,
    databases::db::{db_connection, SqlConnection},
};

use super::error::BrowserError;

pub fn firefox() -> Result<String, BrowserError> {
    let sqlite =
        rusqlite::Connection::open_in_memory().expect("couldn't open sqlite connection in memory");
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

    let bookmarks = serde_json::to_string(&bookmarks)?;
    Ok(bookmarks)
}
