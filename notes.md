# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.81.96.130
Launching my AMI I initially put it on a private subnet. Even though it had a public IP address and the security group was right, I wasn't able to connect to it.

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

This was easy. I was careful to use the correct structural elements such as header, footer, main, nav, and form. The links between the three views work great using the `a` element.

The part I didn't like was the duplication of the header and footer code. This is messy, but it will get cleaned up when I get to React.

## CSS

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.

```html
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand">
            <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
            Calmer
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" href="play.html">Play</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
## Assignment 1 - Github setup
The diagrams and prompts helped me better understand how forks and cloning work on GitHub. I also learned different Markdown styling such as ***this right here***

## Midterm Review 

### HTML & CSS Basics

Breakdown of Each Section

Section + Purpose
- ```<!DOCTYPE html>```	Declares the document type and version (HTML5).
- ```<html>``	Root element that wraps the entire page.
- ```<head>```	Contains metadata—page title, links to CSS/JS, charset, viewport, etc.
- ```<body>```	Contains everything visible to users.
- ```<header>```	Top part of the page (title, logo, navigation).
- ```<nav>```	Navigation links to main sections.
- ```<main>```	The main content area (unique per page).
- ```<section>```	Logical divisions of content within <main>.
- ```<article>```	A self-contained piece of content (like a blog post).
- ```<aside>```	Side content (ads, related links, sidebar).
- ```<footer>```	Bottom part of the page (copyright, contact info).
- ```<script>```	Runs JavaScript at the bottom of the page (for performance).

```<link> element (in <head>)```
- Connects external resources—most often stylesheets.
- Key attrs: ```rel="stylesheet", href="styles.css", optional media="(min-width:…)".```
- Void element (no closing tag).
      
```<div>``` tag
- Generic block-level container with no built-in semantics.
- Used for layout/grouping; add meaning via classes, roles, ARIA.
- container element used to group other HTML elements together. It has no visual effect by itself, but helps structure the page for styling and layout using CSS. Commonly used for sections, wrappers, and layout blocks.

Link tag
It links an external resource (usually a CSS file) to the HTML document. 
Example: ```<link rel="stylesheet" href="styles.css">``` applies styles from styles.css to the page.

Wrap the ```&lt;img&gt;`` element with an ```&lt;a&gt;``` tag. Ensure the image file is in the correct folder (public or
images/) and the src path points to it.
Example:
```&lt;a href="https://example.com"&gt;
&lt;img src="images/logo.png" alt="Logo"&gt;
&lt;/a&gt;```
Folder scheme example:
project/
index.html
images/
logo.png
css/
styles.css
If using a framework, the image may need to be in a 'public' or 'static' folder so it is served directly
      
```#title``` vs .grid selector
- #title targets an id (unique per page, higher specificity).
- .grid targets a class (reusable, lower specificity).
  
Padding vs Margin
- Padding = space inside the border (between content and border).
- Margin = space outside the border (separates element from neighbors).
  
CSS Box Model (inside → out)
- content → padding → border → margin
- Padding increases size inside border; margin creates space between elements.

Use CSS to change all div elements to have a background of red
```div { background-color: red; }```
  
Default span display
- inline.
  
Change all <div> backgrounds to red
- div { background: red;}
  
Image with hyperlink
- ```<a href="https://example.com"> <img src="cat.jpg" alt="Cat"> </a>```
- ```<a href="https://www.example.com"> <img src="images/photo.jpg" alt="Example image"> </a>```
- project-folder/images/photo.jpg

Selecting trouble and not double
- ```<p>double <span id="trouble">trouble</span></p>```
  ```#trouble { color: green; }```
  
Padding shorthand
- padding: 10px; → all sides 10
- padding: 10px 20px; → top/bottom 10, left/right 20
- padding: 5px 10px 15px; → top 5, left/right 10, bottom 15
- padding: 1px 2px 3px 4px; → top/right/bottom/left (TRBL)
  
Flexbox: how images will display (general)
- In a flex container (display: flex), children (e.g., images) line up along the main axis (row by default), shrink or grow per flex and intrinsic size, wrap if flex-wrap: wrap.
- Alignment: justify-content (main axis), align-items (cross axis).
- Without extra rules, expect a row of images, height aligned by align-items (default stretch has no effect on intrinsic-sized images).
- Displayed in a row by default unless flex-direction: column is specified

### DOM & Selectors
What does ```getElementById``` + ```addEventListener``` do (general)
- ```document.getElementById('btn')``` returns the element with that id.
- ```.addEventListener('click', handler)``` runs handler when clicked.

“Using a # selector” (JS line)
- Likely ```document.querySelector('#someId'):``` returns the first element with that id.

Select element by id and make it green
```document.getElementById('byu').style.color = 'green';```
// or:
```document.querySelector('#byu').style.color = 'green';```

The DOM—what’s true (quick facts)
- It’s a live, tree-structured in-memory representation of the page.
- You can read & modify it (create/remove nodes, edit attributes/styles).
- It’s not always identical to the original HTML source (scripts can change it).
- ```querySelector(All)``` uses CSS selectors; ```querySelectorAll``` returns a static NodeList; ```getElementsBy*``` returns live collections.

### HTML Structure & Doctype

Opening tags
- Paragraph: ```<p>```
- Ordered list: ```<ol>```
- Unordered list: ```<ul>```
- Headings: ```<h1>, <h2>, <h3>```

Declare HTML5 doctype
- ```<!DOCTYPE html>```

### JavaScript Essentials

Arrow function (declaration)
- ```const add = (a, b) => a + b;```
// Concise syntax returns the expression result.

Array .map() output (general)
- Transforms each element; returns a new array, same length.
```[1,2,3].map(x => x * 2); // [2,4,6]```

getElementById + addEventListener—sample output
- ```document.getElementById('btn').addEventListener('click', () => {```
  ```console.log('clicked');```
```});```
// Clicking #btn logs "clicked"

General if/else/for/while/switch syntax
```if (cond) { ... } else { ... }
for (let i = 0; i < n; i++) { ... }
while (cond) { ... }
switch (value) {
  case 'x': ...; break;
  default: ...
}
```

What will the following code output when executed using a for loop and console.log?
```for (let i = 0; i < 3; i++) { console.log(i); }```
This initializes i=0, checks i<3 each loop, runs body and increments i++ after each iteration

Create an object; add properties
```const obj = { a: 1 };```
```obj.b = 2;```
// Yes, you can add new props dynamically.


Include JavaScript in HTML
```
<script src="app.js" defer></script>
```
<!-- or inline -->
```
<script>
  console.log('hi');
</script>
```

Change text “animal” to “crow” (leaving “fish” alone)
```
<p id="animal">animal</p>
<p>fish</p>
document.getElementById('animal').textContent = 'crow';
```

JSON—what it is
- Text data-interchange format (JavaScript-like literals).
- Keys must be in double quotes; supports objects, arrays, numbers, strings, booleans, null.
- Language-agnostic; commonly UTF-8.
- JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs. Example: {
"name": "John", "age": 25 }

For-loop + console.log output (general)
```for (let i = 0; i < 3; i++) console.log(i);```
- // 0
- // 1
- // 2

Promises & output order (general)
- Promise executor runs immediately; .then callbacks run as microtasks after current call stack.
- So sync logs first, then .then logs.

Many possibilities depending on promise behavior. Examples:
1) ```Promise.resolve('Done').then(console.log)``` -> 'Done'
2) ```Promise.reject('Error').catch(console.error)``` -> 'Error'
3) ```new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log)``` -> 'Hi' after 1s
4) Async function returns value -> printed when awaited or .then
5) Promise chain: ```Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log)``` -> 5
6) Reject handled -> shows error via catch.

Arrow functions are a compact function syntax. (a, b) => a + b means a function with parameters a and b that
returns a+b.

map() transforms every element of an array and returns a new array without mutating the original.
Examples:
```const nums = [1,2,3];```
```const doubled = nums.map(n => n * 2); // [2,4,6]```

Example of getElementByID and addEventListener
Typical pattern:
```const btn = document.getElementById('btn');```
```btn.addEventListener('click', () => console.log('Clicked!'));```
Behavior: When user clicks the element with id 'btn', the callback runs and prints 'Clicked!'.

```document.querySelector('#title')``` selects the first element that matches the CSS selector #title (element querySelector accepts any CSS selector (classes, attributes, pseudos).

### Networking, DNS, Security, Ports

Domain parts: banana.fruit.bozo.click
- TLD: click
- Root (registered) domain: bozo.click
- Subdomain: banana.fruit (a nested/stacked subdomain)

HTTPS certificate
- Required on the server to establish a proper HTTPS (TLS) connection.

DNS A record
- Maps a name → IPv4 address.
- It does not point to another A record (for name → name, use CNAME).

Ports
- 443: HTTPS
- 80: HTTP
- 22: SSH

### Unix / Shell Commands
- chmod – change file/dir permissions.
- pwd – print working directory.
- cd – change directory.
- ls – list files.
- vim / nano – text editors.
- mkdir – make directory.
- mv – move/rename files.
- rm – remove files (careful!).
- man – manual pages (help).
- ssh – remote shell session.
- ps – show processes.
- wget – download files.
- sudo – run command as superuser.

ls -la truth
- -l: long format (permissions, owner, size, date)
- -a: includes hidden files (dotfiles)

### Flex Quick Ref (images example)
```
.container {
  display: flex;          /* row by default */
  flex-wrap: wrap;        /* allow wrapping */
  gap: 1rem;              /* space between items */
  justify-content: flex-start; /* horizontal alignment */
  align-items: center;    /* vertical alignment on cross-axis */
}
.container img { max-width: 100%; height: auto; }
```
- Items line up in a row, wrap if needed, spacing via gap.
