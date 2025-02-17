# Project Finder - VS Code Extension

A simple and efficient VS Code extension that helps you quickly find and open projects within a configured directory.

## Features

- **Search Projects**: Finds all project directories within a specified path.
- **Quick Pick UI**: Presents the found projects in a list with project name and path.
- **Automatic Cache**: Displays cached results first for a fast response and updates them asynchronously.
- **Customizable Search Path**: Configure the search directory in `settings.json`.

## Installation

1. Open **VS Code**.
2. Go to the **Extensions Marketplace** (`Ctrl+Shift+X`).
3. Search for `Project Finder`.
4. Click **Install**.

## Usage

1. Open **Command Palette** (`Ctrl+Shift+P`).
2. Run `Project Finder: Open Project`.
3. Select a project from the list.
4. The selected folder will open as a new workspace.

## Configuration

You can set the search directory in **VS Code settings (`settings.json`)**:

```json
"projectFinder.workspacePath": "~/projects"
```

- Default: `~/dev`
- Can be any absolute path.
- Supports `~` for the user's home directory.

## Known Issues

- If the search path is invalid, an error message will be displayed.
- Performance depends on the number of directories in the search path.

## Contributing

1. **Fork** the repository.
2. Clone your fork: `git clone https://github.com/yusufakdenizxd/project-finder.git`
3. Install dependencies: `npm install`
4. Run in development mode: `F5` in VS Code.
5. Submit a **pull request**!

## License

[MIT License](LICENSE)

## Author

Developed by **Yusuf Akdeniz**. Contributions are welcome!

---

Enjoy using **Project Finder**? Leave a ⭐ on [GitHub](https://github.com/your-repo)!

