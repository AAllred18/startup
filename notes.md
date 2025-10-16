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

## Midterm Review Answers

### HTML & CSS Basics

```<link> element (in <head>)```
- Connects external resources—most often stylesheets.
- Key attrs: ```rel="stylesheet", href="styles.css", optional media="(min-width:…)".```
- Void element (no closing tag).
      
```<div>``` tag
- Generic block-level container with no built-in semantics.
- Used for layout/grouping; add meaning via classes, roles, ARIA.
      
```#title``` vs .grid selector
- #title targets an id (unique per page, higher specificity).
- .grid targets a class (reusable, lower specificity).
  
Padding vs Margin
- Padding = space inside the border (between content and border).
- Margin = space outside the border (separates element from neighbors).
  
CSS Box Model (inside → out)
- content → padding → border → margin
  
Default span display
- inline.
  
Change all <div> backgrounds to red
- div { background: red;}
  
Image with hyperlink
- ```<a href="https://example.com"> <img src="cat.jpg" alt="Cat"> </a>```

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
}```

Create an object; add properties
```const obj = { a: 1 };```
```obj.b = 2;```
// Yes, you can add new props dynamically.


Include JavaScript in HTML
```<script src="app.js" defer></script>```
<!-- or inline -->
```<script>
  console.log('hi');
</script>```

Change text “animal” to “crow” (leaving “fish” alone)
```<p id="animal">animal</p>
<p>fish</p>
document.getElementById('animal').textContent = 'crow';```

JSON—what it is
- Text data-interchange format (JavaScript-like literals).
- Keys must be in double quotes; supports objects, arrays, numbers, strings, booleans, null.
- Language-agnostic; commonly UTF-8.

For-loop + console.log output (general)
```for (let i = 0; i < 3; i++) console.log(i);```
// 0
// 1
// 2

Promises & output order (general)
- Promise executor runs immediately; .then callbacks run as microtasks after current call stack.
- So sync logs first, then .then logs.
