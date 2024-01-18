// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn user_data_dir() -> String {
    let path = std::env::var("HOME");
    match path {
        Ok(v) => v,
        Err(e) => panic!("couldn't interpret HOME: {}", e),
    }
}

#[tauri::command]
fn get_bookmarks() -> String {
    let path = user_data_dir();
    let bookmarks = match std::fs::read_to_string(path + "/.config/chromium/Default/Bookmarks") {
        Ok(v) => v,
        Err(e) => panic!("couldn't read bookmarks: {}", e),
    };
    bookmarks
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
        .invoke_handler(tauri::generate_handler![greet, get_bookmarks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
