use after;

pub fn sqlite_conn() -> rusqlite::Connection {
    let path = after::user_data_dir();
    let conn = rusqlite::Connection::open(
        path + "/.mozilla/firefox/4477k5au.default-release/places.sqlite",
    );
    match conn {
        Ok(v) => v,
        Err(e) => panic!("couldn't open sqlite connection: {}", e),
    }
}
