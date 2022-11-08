# &lt;stream-html&gt;

A tiny web component for streaming HTML fragments to any location on a web page.

TL;DR:
```html
<script src="https://unkpg.com/stream-html@1.0.0/stream-html.min.js"></script>
<stream-html src="/path/to/some.html"></stream-html>
```
## The problem

Techniques such as [TurboLinks](https://github.com/turbolinks/turbolinks) / [Turbo](https://turbo.hotwired.dev/) replace content fragments on a page without a full page refresh. This is a pretty powerful technique of having a simple single-page-app-like feel without the use of heavy JS frameworks.

However, these techniques usually suffer from a performance problem. They use `xhr` / `fetch` under the hood, and most implementations have to buffer the full response before they can put the content on the page. This behaviour is different from the browser's regular HTML parser, which can show the HTML even as it is streaming in.

The consequence of having to buffer the full response is that the user doesn't see any content for the entire loading period, and then suddenly the content pops in. It would be great if we did not artificially buffer the response, and instead showed what we have downloaded as we continue loading the rest. This doesn't speed up the loading time any, but ensures that we can show whatever content we have as soon as possible.

Famously, GitHub uses / used TurboLinks, and suffers / suffered from this very performance problem. This was so bad that it worked counter to the whole point of using the technique in the first place - a full page reload (thus using the browser's streaming HTML parser) actually "feels" faster than just replacing one section of the page.

[Here's an old video demonstrating the problem](https://www.youtube.com/watch?v=4zG0AZRZD6Q). Credit: Jake Archibald.

## The solution

[Jake and Bramus discussed the solution on a HTTP 203 episode](https://www.youtube.com/watch?v=LLRig4s1_yA) some time ago. This module packages that solution as a web component.

### Benefits

* Zero dependencies, library/framework agnostic
* Under 500 bytes in size - fits in 2 tweets
* Stupid simple API - just one attribute

### Installation

Use the script tag directly:

```html
<script src="https://unkpg.com/stream-html@1.0.0/stream-html.min.js"></script>
```

Or install it via `npm`:
```
npm install stream-html
```
and import it somewhere in your code:
```js
import 'stream-html';
```

### Usage

Use the web component in your HTML directly:
```html
<stream-html src="/path/to/some.html"></stream-html>
```

This will stream in the HTML from `<your origin>/path/to/some.html` to the location of the web component on the page.

To make this interesting though, you might want to dynamically replace the content of the web component. To do this, simply replace the `src` attribute value with a new one, using vanilla JS:

```js
document.querySelector('stream-html').setAttribute('src', '/path/to/new.html');
```
This will stream in the HTML to the child of the `stream-html` element.

I've used a crappy selector above; you might want to give the `stream-html` tag an `id` in your app.

### Browser support

Every modern browser, so not IE.

# Development

Clone this repo and run `npm install` to get the build dependency. `npm run build` creates the build.

I wasn't sure how to write an automated test for this, so testing is manual. Serve this directory through a web server, and load up the `index.html` page in a browser. Use the browser's dev-tools to throttle network requests to simulate bad network conditions.

Tested in Chrome, Firefox, desktop and iOS Safari (without network throttling).

# License

MIT