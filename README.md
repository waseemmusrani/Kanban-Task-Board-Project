# Kanban Task Board

A simple Kanban-style task board built with HTML, CSS, and vanilla JavaScript. It helps organize tasks across three workflow columns.

## Features

- Add tasks with a title and description
- Move tasks between **To Do**, **In Progress**, and **Completed** using drag and drop
- Delete tasks
- View task counts for each column
- Save tasks in the browser using `localStorage`, so they remain after a page refresh in the same browser
- Dark-themed interface

## Technologies

- HTML5
- CSS3
- JavaScript (Vanilla)
- Browser `localStorage` API

## Run Locally

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Add tasks and drag them between the columns.

No backend or package installation is required.

## Project Structure

```text
Kanban-Task-Board-Project/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Notes

Tasks are stored locally in the browser where the app is opened. They are not synced between different browsers or devices.
