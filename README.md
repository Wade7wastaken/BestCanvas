# About

A Tampermonkey script that shows grade changes on Canvas. Requires the
BetterCanvas extension. Currently only works on FireFox.

![Screenshot](screenshot.png)

# Setup

Create a new Tampermonkey script and past the contents of the `dist/bundle.js`
into the script. The script will automatically load on any canvas page.

# Features

- Shows grade changes in the BetterCanvas GPA tile if it is enabled.
- Press "z" anywhere to go home.
- Hotkeys to switch to a new page within a course. Press the key corresponding
  to a page specifier to go to that page. See the page specifiers below.
- Hotkeys to switch to a new page within another course. Use the number keys
  1-9 + 0 to select a course in the order they are set on the home page, then
  press the key corresponding to a page specifier to go to that page on the
  selected course. See the page specifiers below.

### Page Specifiers

| Page           | Key | Path                    |
| -------------- | --- | ----------------------- |
| Home           | "h" | "/"                     |
| Announcements  | "n" | "/announcements"        |
| Modules        | "m" | "/modules"              |
| Pages          | "p" | "/pages"                |
| Files          | "f" | "/files"                |
| Assignments    | "a" | "/assignments"          |
| Grades         | "g" | "/grades"               |
| People         | "u" | "/users"                |
| Discussions    | "d" | "/discussion_topics"    |
| Collaborations | "c" | "/collaborations"       |
| Syllabus       | "s" | "/assignments/syllabus" |
