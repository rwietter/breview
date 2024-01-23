pub mod bookmarks;
pub mod browsers;
pub mod databases;

pub fn user_data_dir() -> String {
    let path = std::env::var("HOME");
    match path {
        Ok(v) => v,
        Err(e) => panic!("couldn't interpret HOME: {}", e),
    }
}
