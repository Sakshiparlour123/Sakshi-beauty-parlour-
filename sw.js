/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "d71724e0bad1481e00f381c8e4dc10c1"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d71724e0bad1481e00f381c8e4dc10c1"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0780302ff2dcc662c9b32ba7129b408f"
  }, {
    "url": "index.html",
    "revision": "3b8b2562baf53bb8f5dc32c9827464e4"
  }, {
    "url": "icon.svg",
    "revision": "2c85dfbe279c5fa1bde263f10c555679"
  }, {
    "url": "favicon.png",
    "revision": "bf90099b82dc8d567b35ab66aca3b169"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "e05a3d1471275ea629b808f8c50ddf67"
  }, {
    "url": "assets/index-dneQz9IB.css",
    "revision": null
  }, {
    "url": "assets/index-B5JvQWeS.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "e05a3d1471275ea629b808f8c50ddf67"
  }, {
    "url": "favicon.png",
    "revision": "bf90099b82dc8d567b35ab66aca3b169"
  }, {
    "url": "icon.svg",
    "revision": "2c85dfbe279c5fa1bde263f10c555679"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0780302ff2dcc662c9b32ba7129b408f"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d71724e0bad1481e00f381c8e4dc10c1"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "d71724e0bad1481e00f381c8e4dc10c1"
  }, {
    "url": "manifest.webmanifest",
    "revision": "cf5459b05ce8b773f886232140ed8591"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
