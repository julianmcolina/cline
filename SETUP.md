# Cline Extension Development Setup

This guide will help you set up the Cline extension for local development after cloning the repository.

---

## 1. Clone the Repository

```
git clone <repo-url>
cd cline
```

---

## 2. Install Dependencies

Install all required dependencies for both the main extension and the webview UI:

```
npm run install:all
```

---

## 3. Build the Extension

Compile the TypeScript source and bundle the extension:

```
npm run compile
```

This will generate the `dist/extension.js` file required by VS Code.

---

## 4. (Optional) Enable Webview Hot Module Reloading (HMR)

If you are developing the webview UI and want live reloading:

```
npm run dev:webview
```

> **Note:** If you do not run this, the extension will use the last built (bundled) assets for the webview. You will see a warning, but the extension will still work.

---

## 5. Launch the Extension in VS Code

1. Open the project in VS Code.
2. Press `F5` to launch the Extension Development Host.
3. If you see errors about missing activation, try opening a source file or creating an empty `evals.env` file in the project root.

---

## 6. Troubleshooting

- **Error: `Cannot find module '.../dist/extension.js'`**
  - Run `npm run compile` to build the extension.

- **Error: `command 'cline.openInNewTab' not found`**
  - Make sure the extension is activated (open a source file, or add `evals.env` to the root).
  - Ensure you have built the extension (`npm run compile`).

- **Warning: `Local webview dev server is not running, HMR will not work...`**
  - Run `npm run dev:webview` if you want live UI reloading.

---

## 7. Useful Commands

- **Install all dependencies:**
  ```
  npm run install:all
  ```
- **Build the extension:**
  ```
  npm run compile
  ```
- **Start webview dev server (for HMR):**
  ```
  npm run dev:webview
  ```

---

For more information, see the project README or ask in the team chat! 