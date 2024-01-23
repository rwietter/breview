use serde::Serialize;

use crate::browsers;

pub mod bookmarks {
    use serde::Serialize;

    #[derive(Debug, Serialize)]
    pub struct BookmarkRoots {
        pub roots: Bookmarks,
    }

    #[derive(Debug, Serialize)]
    pub struct Bookmarks {
        pub bookmark_bar: BookmarkBar,
    }

    #[derive(Debug, Serialize)]
    pub struct BookmarkBar {
        pub children: Vec<Bookmark>,
        pub name: String,
    }

    #[derive(Debug, Serialize)]
    pub struct Bookmark {
        pub name: String,
        pub url: String,
        pub r#type: String,
    }
}

#[derive(Debug, Serialize)]
pub struct Response {
    pub bookmarks: Option<String>,
    pub is_error: bool,
    pub error: Option<&'static str>,
}

pub fn new(browser: &str) -> String {
    let path = crate::user_data_dir();

    match browser {
        "firefox" => match browsers::firefox() {
            Ok(bookmarks) => {
                let response = Response {
                    bookmarks: Some(bookmarks),
                    is_error: false,
                    error: None,
                };

                serde_json::to_string(&response).unwrap()
            }
            Err(e) => match e {
                browsers::error::BrowserError::ParseError(e) => {
                    let msg = "Sorry! One error occurred while parsing bookmarks";
                    eprintln!("{msg}: {}", e);
                    let response = Response {
                        bookmarks: None,
                        is_error: true,
                        error: Some(msg),
                    };
                    serde_json::to_string(&response).unwrap()
                }
                browsers::error::BrowserError::SQLiteError(e) => {
                    let msg = "Sorry! One error occurred while connecting to database";
                    eprintln!("{msg}: {}", e);
                    let response = Response {
                        bookmarks: None,
                        is_error: true,
                        error: Some(msg),
                    };

                    serde_json::to_string(&response).unwrap()
                }
            },
        },
        "chrome" | "chromium" | "google-chrome" => {
            match std::fs::read_to_string(path + "/.config/" + browser + "/Default/Bookmarks") {
                Ok(bookmarks) => {
                    let response = Response {
                        bookmarks: Some(bookmarks),
                        is_error: false,
                        error: None,
                    };
                    serde_json::to_string(&response).unwrap()
                }
                Err(e) => {
                    let msg = "Sorry! Couldn't read bookmarks from your browser";
                    eprintln!("{msg}: {}", e);
                    let response = Response {
                        bookmarks: None,
                        is_error: true,
                        error: Some(msg),
                    };
                    serde_json::to_string(&response).unwrap()
                }
            }
        }
        _ => {
            let msg = "Sorry! Your browser is not supported";
            eprintln!("{msg}");
            let response = Response {
                bookmarks: None,
                is_error: true,
                error: Some(msg),
            };
            serde_json::to_string(&response).unwrap()
        }
    }
}
