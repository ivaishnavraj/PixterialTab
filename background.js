// background.js

// This file is required by Manifest V3 as a service worker.
// You can leave it empty unless you plan to run background logic.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Pixterial Tab extension installed.");
});
