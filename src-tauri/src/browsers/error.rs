use rusqlite::Error as RusqliteError;
use serde_json::Error as SerdeJsonError;

#[derive(Debug)]
pub enum BrowserError {
    SQLiteError(RusqliteError),
    ParseError(SerdeJsonError),
}

impl From<RusqliteError> for BrowserError {
    fn from(e: RusqliteError) -> Self {
        BrowserError::SQLiteError(e)
    }
}

impl From<SerdeJsonError> for BrowserError {
    fn from(e: SerdeJsonError) -> Self {
        BrowserError::ParseError(e)
    }
}
