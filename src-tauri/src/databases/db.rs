use rusqlite::Connection;
use std::fmt::Debug;

#[derive(Debug)]
pub enum DatabaseError {
    Sqlite(rusqlite::Error),
}

impl From<rusqlite::Error> for DatabaseError {
    fn from(e: rusqlite::Error) -> Self {
        DatabaseError::Sqlite(e)
    }
}

pub trait DatabaseConnection: Debug {
    fn open_connection(&self, path: &str) -> Result<Self, DatabaseError>
    where
        Self: Sized;
}

#[derive(Debug)]
pub struct SqlConnection(pub Connection);

impl DatabaseConnection for SqlConnection {
    fn open_connection(&self, path: &str) -> Result<Self, DatabaseError> {
        let conn = Connection::open(path)?;
        Ok(SqlConnection(conn))
    }
}

pub fn db_connection<T>(db: T) -> T
where
    T: DatabaseConnection,
{
    let path = crate::user_data_dir();
    let db =
        db.open_connection(&(path + "/.mozilla/firefox/4477k5au.default-release/places.sqlite"));
    match db {
        Ok(v) => v,
        Err(e) => panic!("couldn't open database connection: {:?}", e),
    }
}
