# chrome-ext

Why chrome extensions:

- create apps for the browser
- you have more power on the browser
- automate tools based on your requirements
- can monetize

### References:

- Chrome developer documentation: https://developer.chrome.com/docs/extensions/

- Manifest file reference: https://developer.chrome.com/docs/extensions/mv3/manifest/

- Chrome extension APIs reference: https://developer.chrome.com/docs/extensions/reference/

- Service worker primer: https://developers.google.com/web/fundamentals/primers/service-workers

- MDN service worker registration notifications reference: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification

#### Manifest.json

[ ] Required fields

- "name": "", name of the ext
- "version": "", ext version
- "manifest_version": 3, manifest version

[ ] Extra

- "description":"" add description about the ext
- icons: object with diff icons based on screen size

```
{
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
}
```

- actions : {} You can use the chrome.action API to control the toolbar button for your extension in Chrome's UI.
