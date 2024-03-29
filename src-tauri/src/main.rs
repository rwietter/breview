// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use after::bookmarks;
use tauri::{CustomMenuItem, Menu};

#[tauri::command]
fn get_bookmarks(browser: &str) -> String {
    bookmarks::new(browser)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let menu = Menu::new().add_item(quit).add_item(close);

    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "quit" => {
                std::process::exit(0);
            }
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![get_bookmarks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
