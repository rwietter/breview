<<<<<<< Updated upstream
pub mod bookmarks {
    use serde::{Deserialize, Serialize};

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
}
=======
pub mod bookmarks;
pub mod browsers;
pub mod databases;
>>>>>>> Stashed changes

pub fn user_data_dir() -> String {
    let path = std::env::var("HOME");
    match path {
        Ok(v) => v,
        Err(e) => panic!("couldn't interpret HOME: {}", e),
    }
}
