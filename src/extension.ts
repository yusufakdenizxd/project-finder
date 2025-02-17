import * as vscode from "vscode";
import { exec } from "child_process";
import * as os from "os";
import * as path from "path";

const CACHE_KEY = "projectManagerFoldersCache";

export function activate(context: vscode.ExtensionContext) {
  const folderIcon = new vscode.ThemeIcon("folder");

  const disposable = vscode.commands.registerCommand(
    "project-finder.openProject",
    async () => {
      const workspacePath = vscode.workspace
        .getConfiguration("projectFinder")
        .get("workspacePath") as string;

      const expandedPath = workspacePath.replaceAll("~", os.homedir());

      const cachedData = context.globalState.get<string[]>(CACHE_KEY) || [];

      const quickPick = vscode.window.createQuickPick();
      quickPick.items = cachedData.map((folder) => ({
        label: path.basename(folder),
        description: folder,
        iconPath: folderIcon,
      }));
      quickPick.placeholder = "Select a folder...";
      quickPick.show();

      const command = `find ${expandedPath} -mindepth 1 -maxdepth 1 -type d`;

      exec(command, (err, stdout) => {
        if (err) {
          vscode.window.showErrorMessage(
            "Error finding directories: " + err.message
          );
          return;
        }

        const folders = stdout
          .split("\n")
          .filter((folder) => folder.trim().length > 0);

        if (folders.length === 0) {
          vscode.window.showInformationMessage(
            `No projects found in ${workspacePath}.`
          );
          return;
        }

        context.globalState.update(CACHE_KEY, folders);

        quickPick.items = cachedData.map((folder) => ({
          label: path.basename(folder),
          description: folder,
          iconPath: folderIcon,
        }));
      });

      quickPick.onDidAccept(() => {
        const selected = quickPick.selectedItems[0]?.description;
        if (selected) {
          vscode.commands.executeCommand(
            "vscode.openFolder",
            vscode.Uri.file(selected),
            false
          );
        }
        quickPick.hide();
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
