/* MODULE 01 — How Modern Websites Work */
window.COURSE = window.COURSE || {};
COURSE.m1 = {
  id: "m1",
  title: "How Modern Websites Work",
  lessons: [
    /* ---------------------------------------------------------------- 1.1 */
    {
      id: "m1l1",
      title: "What a Website Actually Is",
      time: 7,
      objective: "Define a website, browser, frontend and backend, and distinguish a website from a web application.",
      intro: "You use websites every day, but most people have never looked at one properly. In this lesson you will build a simple, accurate mental model of what a website is made of.",
      script: `Let's start with a deceptively simple question. What is a website?

At its core, a website is a collection of files stored on a computer that is always connected to the internet. When you visit one, your browser asks that computer for the files, receives them, and assembles them into the page you see.

That's the whole idea. A browser asks. A server answers. Everything else is detail.

Let's name the parts. The browser is the program on your device, like Chrome, Safari or Firefox. Its job is to request files and turn them into something visual and interactive.

The frontend is everything that runs in the browser, everything you can see and click. That includes three technologies you will hear constantly. HTML provides the structure, the headings and paragraphs and buttons. CSS provides the style, colors and spacing and layout. And JavaScript provides behavior, things that respond to you, like menus that open or forms that check your input.

The backend is the part you cannot see. It lives on the server and handles things like saving an order, checking a password or fetching data from a database.

Think of a restaurant. The dining room is the frontend: the menu, the tables, the lighting. The kitchen is the backend: where the work happens out of sight. The waiter carrying orders back and forth is the connection between them.

One more distinction that matters. A simple website mostly displays information. A web application lets you do things: log in, create, edit, save. Gmail is an application. A restaurant brochure site is a website. Many projects sit somewhere between, and knowing where yours sits will shape every decision you make.

For NOVA, our coffee shop, we are building mostly a website with a tiny bit of application behavior for ordering. Keep that in mind.`,
      explain: [
        `<h3>The basic model</h3><p>A <strong>browser</strong> requests files from a <strong>server</strong>. The server responds. The browser assembles the files into a page. This request-and-response pattern is the foundation of the web.</p>`,
        `<h3>Frontend and backend</h3><p><strong>Frontend</strong> is everything delivered to and executed by the browser: HTML (structure), CSS (presentation) and JavaScript (behavior). <strong>Backend</strong> is the code and services on the server: handling forms, accounts, payments and data.</p>`,
        `<h3>Websites versus web applications</h3><p>A <strong>website</strong> is primarily content: pages to read. A <strong>web application</strong> is primarily tasks: interfaces where users create or change data. The line is blurry, but the question to ask is: <em>do users mostly read, or mostly do?</em></p>`,
        `<h3>Why this matters for AI-built sites</h3><p>If you do not know where the frontend ends and the backend begins, you cannot tell the AI what you need, and you cannot tell what it forgot. A contact form is a good example: the frontend collects data, but without a backend (or a form service) nothing is actually sent anywhere.</p>`
      ],
      examples: [
        `<h3>Three real examples</h3><ul><li><strong>A restaurant brochure site:</strong> almost entirely frontend. Pages, images, a map.</li><li><strong>An online store:</strong> frontend for browsing, backend for the cart, payments and orders.</li><li><strong>A project management tool:</strong> mostly application. Users log in and constantly create, edit and save.</li></ul>`
      ],
      activity: {
        type: "match",
        title: "Match each term to its job",
        prompt: "Choose the correct role for each technology or concept.",
        pairs: [
          { term: "HTML", def: "Provides the structure and meaning of the content", why: "HTML marks up headings, paragraphs, links, forms and more." },
          { term: "CSS", def: "Controls colors, spacing, fonts and layout", why: "CSS handles presentation, how the structure looks." },
          { term: "JavaScript", def: "Adds behavior that responds to the visitor", why: "JavaScript runs in the browser to react to clicks, input and events." },
          { term: "Backend", def: "Handles work on the server, such as saving orders", why: "The backend processes and stores data out of sight." }
        ]
      },
      quiz: [
        {
          q: "Which of these is most clearly a web application rather than a simple website?",
          opts: [
            "A page listing a bakery's opening hours",
            "An online spreadsheet where users create and edit files",
            "A photographer's gallery of finished work",
            "A conference page with a schedule"
          ],
          a: 1,
          why: "An online spreadsheet is built around users doing things: creating, editing, and saving data. The others are mainly content to read.",
          fb: ["This is content to read, which is a website.", "", "A gallery displays content, which makes it a website.", "A schedule page presents information. It is a website."]
        },
        {
          q: "A visitor fills out a contact form on a site built only with HTML, CSS and JavaScript. Nothing is configured to receive it. What happens to the message?",
          opts: [
            "It is automatically delivered to the site owner.",
            "It is stored in the visitor's browser forever.",
            "It is sent to the AI that built the site.",
            "It goes nowhere, because something on the server side must receive and process it."
          ],
          a: 3,
          why: "Collecting data is a frontend job, but receiving and handling it needs a backend or form service. This is a common gap in AI-generated sites.",
          fb: ["Messages are not delivered by magic. Something must receive them.", "Nothing is automatically stored for the owner.", "The AI is not part of the running website.", ""]
        },
        {
          q: "In the restaurant analogy, which part represents the backend?",
          opts: ["The menu", "The dining room lighting", "The kitchen", "The tables"],
          a: 2,
          why: "The kitchen works out of sight to fulfill orders, just as the backend processes requests behind the scenes.",
          fb: ["The menu is what visitors see, so it maps to the frontend.", "Lighting is visual atmosphere, which is frontend.", "", "Tables are part of the visible dining room."]
        }
      ],
      practice: {
        prompt: "Describe your idea (or the project you picked) in terms of frontend and backend. What would visitors see? What would need to happen behind the scenes?",
        min: 50
      },
      challenge: {
        prompt: "Choose a website you use daily. Is it mainly a website or a web application? List two things it does on the frontend and two that must happen on the backend.",
        min: 60
      },
      summary: "Browsers request, servers respond. The frontend is HTML, CSS and JavaScript running in the browser. The backend runs on the server. Websites present content, and web applications support tasks.",
      takeaways: [
        "A website is files delivered to a browser on request.",
        "HTML is structure, CSS is style, JavaScript is behavior.",
        "Forms need a backend or service to actually receive data."
      ],
      next: "Next: follow a request from the moment you type a URL to the moment the page appears."
    },
    /* ---------------------------------------------------------------- 1.2 */
    {
      id: "m1l2",
      title: "What Happens When You Type a URL",
      time: 8,
      objective: "Describe the sequence of events between entering a web address and seeing a page, including DNS, HTTPS, requests and responses.",
      intro: "It takes less than a second, but a lot happens between pressing Enter and seeing a page. Understanding this journey helps you diagnose slow sites, broken pages and security warnings.",
      script: `You type nova-coffee.com and press Enter. Less than a second later, a page appears. What just happened?

Let me walk you through it, because every step teaches you something you will use later.

Step one. Your browser has a name, nova-coffee.com, but computers on the internet find each other with numbers called IP addresses. So the browser needs a translator.

That translator is DNS, the Domain Name System. Think of it as the internet's phone book. Your browser asks a DNS server, "What is the address for nova-coffee.com?" and gets back a number.

Step two. The browser now knows where the server is, so it opens a connection. If the address starts with https, it also sets up encryption. That's the S, for secure. It means the data traveling between you and the server is scrambled so nobody in the middle can read or tamper with it. Browsers now warn visitors when a site does not have it, so you always want it.

Step three. The browser sends an HTTP request. Basically: "Please send me the home page."

Step four. The server finds or builds the page and sends back a response. The response includes a status code. You've seen one: 404, not found. The happy one is 200, which means okay.

Step five. The response usually contains HTML. As the browser reads it, it discovers more files it needs, like CSS, images, JavaScript and fonts, and it requests each of those too.

Step six. The browser assembles everything, applies the styles, runs the scripts and paints the page on your screen.

That whole journey is why performance matters. Every file is another request. A page with two hundred images and fifteen scripts is making hundreds of trips. We will optimize that in Module 08.

Now it's your turn. Put the steps in order.`,
      explain: [
        `<h3>The journey in six steps</h3><ol><li><strong>Enter the URL.</strong> The browser reads the protocol (https), domain and path.</li><li><strong>DNS lookup.</strong> The domain is translated into an IP address.</li><li><strong>Connection and HTTPS handshake.</strong> A connection is opened and encryption is established.</li><li><strong>HTTP request.</strong> The browser asks for the page.</li><li><strong>Server response.</strong> The server returns HTML and a status code.</li><li><strong>Render.</strong> The browser fetches CSS, JavaScript and images, then builds the page.</li></ol>`,
        `<h3>Status codes you should know</h3><table class="tbl"><tr><th>Code</th><th>Meaning</th></tr><tr><td>200</td><td>OK. The request succeeded.</td></tr><tr><td>301</td><td>Moved permanently. Follow the new address.</td></tr><tr><td>404</td><td>Not found. The page does not exist at that address.</td></tr><tr><td>500</td><td>Server error. Something failed on the server.</td></tr></table>`,
        `<h3>What can go wrong</h3><ul><li>A wrong DNS record means the domain points nowhere.</li><li>An expired or missing HTTPS certificate triggers a browser warning that scares visitors away.</li><li>Too many requests or large files make pages slow.</li></ul>`,
        `<h3>Inspect it yourself</h3><p>In Chrome, press F12 (or right-click, then Inspect) and open the <strong>Network</strong> tab. Reload any page. Every row is one request. This is your best tool for understanding speed and for checking AI-generated code.</p>`
      ],
      examples: [
        `<h3>A request in plain language</h3><pre><code>GET /menu HTTP/1.1
Host: nova-coffee.com

--&gt; 200 OK
Content-Type: text/html
(the HTML for the menu page follows)</code></pre><p>The request asks for the <code>/menu</code> page. The response says it succeeded (200) and returns HTML.</p>`
      ],
      activity: {
        type: "sequence",
        title: "Click what happens when you enter a URL",
        prompt: "Click each step in the order it happens after you type nova-coffee.com and press Enter.",
        steps: [
          { t: "The browser reads the URL", d: "It splits the address into protocol (https), domain (nova-coffee.com) and path." },
          { t: "DNS translates the domain into an IP address", d: "Like looking up a name in a phone book to find the number." },
          { t: "A secure HTTPS connection is established", d: "The browser and server agree on encryption so data cannot be read or altered in transit." },
          { t: "The browser sends an HTTP request", d: "It asks the server for the page, for example GET /." },
          { t: "The server sends back a response", d: "Usually HTML plus a status code such as 200 OK." },
          { t: "The browser fetches CSS, JavaScript and images", d: "While reading the HTML it discovers more files and requests each one." },
          { t: "The browser renders the page", d: "Styles are applied, scripts run and the page is drawn on screen." }
        ]
      },
      quiz: [
        {
          q: "A visitor sees 'Your connection is not private' on your new site. What is the most likely cause?",
          opts: [
            "The site has too many images.",
            "The HTTPS certificate is missing, expired or misconfigured.",
            "The CSS file is too large.",
            "The visitor's keyboard is not working."
          ],
          a: 1,
          why: "That warning appears when the secure connection cannot be established or verified. It is usually a certificate problem.",
          fb: ["Images affect speed, not security warnings.", "", "CSS size affects performance, not the security warning.", "This is unrelated to hardware."]
        },
        {
          q: "What is the role of DNS?",
          opts: [
            "It compresses images for faster loading.",
            "It stores the website's database.",
            "It translates a domain name into the IP address of a server.",
            "It writes the HTML for the page."
          ],
          a: 2,
          why: "DNS works like a phone book, converting human-friendly names into addresses computers use.",
          fb: ["Image compression is a separate optimization task.", "Databases live on servers, not in DNS.", "", "DNS does not produce page content."]
        },
        {
          q: "You open a page and the server returns status 404. What does that tell you?",
          opts: [
            "The server crashed.",
            "The page loaded successfully.",
            "The page was moved permanently.",
            "The server could not find anything at that address."
          ],
          a: 3,
          why: "404 means not found: the server is working, but nothing exists at the requested path.",
          fb: ["A crash is typically a 500-level error.", "Success is 200.", "A permanent move is 301.", ""]
        }
      ],
      practice: {
        prompt: "In your own words, explain to a friend what happens between typing a URL and seeing the page. Aim for four or five sentences, without using the word 'magic'.",
        min: 80
      },
      challenge: {
        prompt: "Open any website, press F12 and look at the Network tab after reloading. Write down three things you notice, such as the number of requests, the largest file or any status codes other than 200.",
        min: 60
      },
      summary: "Typing a URL triggers DNS lookup, a secure connection, an HTTP request, a server response and finally rendering. Each additional file adds another request.",
      takeaways: [
        "DNS translates domains to IP addresses.",
        "HTTPS encrypts the connection and builds visitor trust.",
        "Every CSS, JS and image file is another request, which is why performance matters."
      ],
      next: "Next: the three layers of the frontend (HTML, CSS and JavaScript) in a live editor."
    },
    /* ---------------------------------------------------------------- 1.3 */
    {
      id: "m1l3",
      title: "HTML, CSS and JavaScript: The Three Layers",
      time: 10,
      objective: "Explain what HTML, CSS and JavaScript each do, write and modify a small working example, and recognize semantic HTML.",
      intro: "Every page you will build with AI is made of the same three layers. Understanding them lets you read what the AI wrote, spot mistakes and make precise requests.",
      script: `Every website you have ever seen is built from three layers. Learn to see them, and AI-generated code stops looking like a wall of mystery.

Layer one is HTML. HyperText Markup Language. It describes what things are. This is a heading. This is a paragraph. This is a button. This is a navigation menu. HTML is about meaning and structure, not looks.

Layer two is CSS. Cascading Style Sheets. It describes how things look. The color of the heading, the space around the paragraph, whether the cards sit in a row or a column.

Layer three is JavaScript. It describes how things behave. When someone clicks this button, open the menu. When someone types in this field, check that it looks like an email.

A helpful way to remember: HTML is the skeleton, CSS is the skin and clothing, and JavaScript is the muscles.

Now, one idea I want you to take away early, because it will pay off in Module 07. Semantic HTML. That means choosing HTML elements that describe what the content is, not just how it looks.

Compare two ways of writing a page header. In one, everything is a generic div, a box with no meaning. In the other, you use header, nav, main and footer. To a human eye, they might look identical. But screen readers, search engines and AI tools can understand the second one. It's free quality.

So when you review AI-generated code, one of the first things to check is: did it use meaningful elements, or a sea of divs?

You're about to open a small live editor. Change the heading, change a color, and make the button do something. You'll see the three layers working together in real time. Don't be afraid to break it. That's the point.`,
      explain: [
        `<h3>The three layers</h3><table class="tbl"><tr><th>Layer</th><th>Question it answers</th><th>Example</th></tr><tr><td>HTML</td><td>What is this?</td><td><code>&lt;h1&gt;</code>, <code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code></td></tr><tr><td>CSS</td><td>How should it look?</td><td><code>color</code>, <code>padding</code>, <code>display: grid</code></td></tr><tr><td>JavaScript</td><td>What should it do?</td><td>Open a menu, validate a form</td></tr></table>`,
        `<h3>Semantic HTML</h3><p>Semantic elements describe their purpose: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;button&gt;</code>. They help screen readers, search engines and other developers (and AI) understand the page.</p><div class="compare"><div class="bad"><h4>Non-semantic</h4><pre><code>&lt;div class="top"&gt;
  &lt;div class="link"&gt;Menu&lt;/div&gt;
&lt;/div&gt;</code></pre></div><div class="good"><h4>Semantic</h4><pre><code>&lt;header&gt;
  &lt;nav&gt;
    &lt;a href="/menu"&gt;Menu&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;</code></pre></div></div>`,
        `<h3>A tiny example of all three</h3><pre><code>&lt;h1 id="title"&gt;NOVA&lt;/h1&gt;
&lt;button id="btn"&gt;Say hello&lt;/button&gt;

&lt;style&gt;
  h1 { color: #7a3e1d; }
&lt;/style&gt;

&lt;script&gt;
  document.getElementById("btn").onclick = function () {
    document.getElementById("title").textContent = "Hello!";
  };
&lt;/script&gt;</code></pre><p>HTML defines the heading and button. CSS colors the heading. JavaScript changes the heading when the button is clicked.</p>`,
        `<h3>What can go wrong</h3><ul><li>Using <code>div</code> for everything, which hurts accessibility and SEO.</li><li>Putting styles and scripts everywhere with no organization.</li><li>Trusting AI code without reading what each layer does.</li></ul>`
      ],
      examples: [
        `<h3>NOVA's header, semantically</h3><pre><code>&lt;header&gt;
  &lt;a href="/" aria-label="NOVA home"&gt;NOVA&lt;/a&gt;
  &lt;nav&gt;
    &lt;a href="/menu"&gt;Menu&lt;/a&gt;
    &lt;a href="/order"&gt;Order&lt;/a&gt;
    &lt;a href="/visit"&gt;Visit&lt;/a&gt;
  &lt;/nav&gt;
&lt;/header&gt;</code></pre>`
      ],
      activity: {
        type: "sandbox",
        title: "Live editor: change all three layers",
        prompt: "Edit the code on the left and watch the preview update. Complete all four tasks.",
        starter: `<h1 id="title">NOVA</h1>
<p>Premium coffee and bakery.</p>
<button id="btn">Say hello</button>

<style>
  body { font-family: Georgia, serif; padding: 24px; }
  h1 { color: #333; }
</style>

<script>
  document.getElementById("btn").onclick = function () {
    // Your code goes here: change the heading text
  };
</script>`,
        checks: [
          { re: "<h1[^>]*>(?!\\s*NOVA\\s*<)[^<]+</h1>", label: "Change the heading text to anything other than NOVA (HTML)" },
          { re: "h1\\s*\\{[^}]*(?:color\\s*:\\s*[^\\s;}#]|color\\s*:\\s*#(?!333\\b))", label: "Change the heading color to something other than #333 (CSS)" },
          { re: "getElementById\\(['\"]title['\"]\\)\\.textContent\\s*=", label: "Make the button change the heading's text (JavaScript)" },
          { re: "<(header|main|footer|nav|section)[\\s>]", label: "Wrap something in a semantic element such as main or header" }
        ]
      },
      quiz: [
        {
          q: "You want links in a navigation bar to turn brown when hovered. Which layer handles this?",
          opts: ["HTML", "A database", "CSS", "DNS"],
          a: 2,
          why: "Hover appearance is a presentation matter, which belongs to CSS using the :hover selector.",
          fb: ["HTML defines that the links exist, not how they look.", "Databases store data and have nothing to do with hover color.", "", "DNS translates domain names."]
        },
        {
          q: "Which choice is the best example of semantic HTML?",
          opts: [
            "A page where every section is a div with a class name like 'box1'",
            "A page where the top area is a header, links live in a nav, and the content is in a main element",
            "A page made entirely of images of text",
            "A page that uses only the br tag for spacing"
          ],
          a: 1,
          why: "Semantic elements describe purpose, which helps accessibility tools, search engines and future maintainers.",
          fb: ["Generic divs convey no meaning on their own.", "", "Images of text are inaccessible and cannot be searched.", "Using br for layout is a presentation hack and not structural."]
        },
        {
          q: "A menu opens when the visitor clicks a button. Which layer is primarily responsible for making it open?",
          opts: ["JavaScript", "CSS only, with no HTML", "The browser's address bar", "The web server's DNS record"],
          a: 0,
          why: "Responding to a click is behavior, which JavaScript provides. CSS can style the open and closed states, and HTML provides the button.",
          fb: ["", "CSS can style it, but event handling is JavaScript.", "The address bar does not control page behavior.", "DNS is unrelated."]
        }
      ],
      practice: {
        prompt: "Look at the live editor code. In your own words, explain what the HTML, CSS and JavaScript each did in that tiny example.",
        min: 60
      },
      challenge: {
        prompt: "In the editor, add a second button that changes the heading back to NOVA. Describe what you added and anything that went wrong along the way.",
        min: 50
      },
      summary: "HTML structures, CSS styles, JavaScript behaves. Semantic HTML adds meaning for assistive tools, search engines and maintainers.",
      takeaways: [
        "Skeleton (HTML), skin (CSS), muscles (JavaScript).",
        "Prefer header, nav, main and footer over generic divs.",
        "Reading AI code starts with identifying which layer you are in."
      ],
      next: "Next: servers, hosting, domains and HTTPS. Where a website actually lives."
    },
    /* ---------------------------------------------------------------- 1.4 */
    {
      id: "m1l4",
      title: "Servers, Hosting, Domains and HTTPS",
      time: 7,
      objective: "Explain how hosting, domains and HTTPS work together and choose suitable hosting for different types of site.",
      intro: "Building a site is half the job. It also needs to live somewhere, have an address and be secure. This lesson covers the infrastructure beneath every launch.",
      script: `Your website is built. Now, where does it live?

A server is simply a computer that stays on and answers requests. Hosting is the service of renting space and power on one. You do not usually run a server yourself. You rent hosting, the same way you rent a storage unit instead of building a warehouse.

A domain name is the human-friendly address, like nova-coffee.com. You buy it from a registrar and point it, using DNS records, at your hosting.

So three separate things, often bought together but conceptually different. A domain is the address. Hosting is the building. DNS is the signpost that connects them.

Then HTTPS. Most hosts now provide free certificates. For you, the job is mostly to make sure it is switched on and that every page, image and script loads securely.

Now, which hosting should you choose? It depends on what your site does.

If your site is mostly static, just HTML, CSS, images and a bit of JavaScript, like a brochure site or NOVA's first version, static hosting is simple, fast, cheap and often free. Think Netlify, Cloudflare Pages, GitHub Pages or Vercel.

If you need accounts, a database or dynamic features, you need hosting that can run backend code. That could be a platform service, a managed server or a cloud function.

And if you want a content management system so non-technical people can edit pages, you may use a managed platform built for that.

A good rule for beginners: choose the simplest hosting that satisfies your actual needs. Complexity is something you pay for every month, in time as much as money.

Let's match some situations to the right choice.`,
      explain: [
        `<h3>Three separate pieces</h3><table class="tbl"><tr><th>Piece</th><th>What it is</th><th>Analogy</th></tr><tr><td>Domain</td><td>The human-friendly address, bought from a registrar</td><td>Street address</td></tr><tr><td>Hosting</td><td>A server that stores and serves your files</td><td>The building</td></tr><tr><td>DNS</td><td>Records that point the domain to the host</td><td>The signpost</td></tr></table>`,
        `<h3>Types of hosting</h3><ul><li><strong>Static hosting:</strong> serves prebuilt files. Fast, inexpensive, ideal for brochure sites and landing pages.</li><li><strong>Platform or app hosting:</strong> runs backend code and databases. Needed for logins, dashboards, ordering.</li><li><strong>Managed CMS platforms:</strong> trade flexibility for ease of editing.</li></ul>`,
        `<h3>HTTPS</h3><p>HTTPS encrypts traffic and confirms you are talking to the right server. It is required for trust, and browsers flag sites without it. A frequent problem is <em>mixed content</em>: an HTTPS page that loads an image or script over plain HTTP, which can be blocked or flagged.</p>`,
        `<h3>When to use what</h3><p>Start simple. A static site is the best default for most small business sites. Add a backend only when a real requirement demands it, such as user accounts or stored orders.</p>`
      ],
      examples: [
        `<h3>NOVA's launch stack</h3><p><strong>Version 1:</strong> static hosting, a domain pointed with DNS, free HTTPS, and an order form handled by a form service. <strong>Later:</strong> add a small backend for online pre-order payments.</p>`
      ],
      activity: {
        type: "match",
        title: "Choose the right hosting",
        prompt: "Match each project to the most suitable hosting approach.",
        pairs: [
          { term: "A five-page brochure site for a bakery", def: "Static hosting", why: "No accounts or database are needed, so static hosting is simple, fast and inexpensive." },
          { term: "A customer portal where users log in and view invoices", def: "Platform hosting with backend and database", why: "Accounts and stored data require code running on a server and a database." },
          { term: "A site that non-technical staff must edit daily", def: "A managed CMS platform", why: "A content management system lets editors change content without touching code." }
        ]
      },
      quiz: [
        {
          q: "Which statement correctly describes the relationship between a domain and hosting?",
          opts: [
            "They are the same thing.",
            "A domain is the address, hosting stores the files, and DNS connects the two.",
            "Hosting is the address and the domain stores the files.",
            "DNS is the hosting provider."
          ],
          a: 1,
          why: "These are three separate pieces that work together: the address, the place, and the signpost between them.",
          fb: ["They are often sold together but remain distinct.", "", "It is the other way around.", "DNS only holds the records that point to the host."]
        },
        {
          q: "An AI-generated page served over HTTPS loads an image from an http:// address. What is this problem called, and why does it matter?",
          opts: [
            "Cascading, because styles override each other",
            "Hoisting, because it moves code to the top",
            "Mixed content, because insecure resources on a secure page can be blocked or trigger warnings",
            "Caching, because the image is stored for later"
          ],
          a: 2,
          why: "Loading insecure resources on a secure page weakens security and can cause browsers to block them or show warnings.",
          fb: ["Cascading is a CSS concept.", "Hoisting is a JavaScript concept.", "", "Caching is a different topic."]
        },
        {
          q: "You are launching a simple personal portfolio with no accounts or database. Which is the most sensible starting choice?",
          opts: [
            "A large server cluster with a custom database",
            "A complex backend with microservices",
            "A native mobile app",
            "Static hosting"
          ],
          a: 3,
          why: "Choose the simplest option that satisfies the requirement. A static site is fast, cheap and low maintenance.",
          fb: ["This adds cost and complexity with no benefit.", "Microservices solve problems this site does not have.", "A mobile app is a different product altogether.", ""]
        }
      ],
      practice: {
        prompt: "For the project you chose in Module 00, which hosting approach would you start with, and why? Mention whether it needs a backend.",
        min: 50
      },
      challenge: {
        prompt: "Pick a domain name for your project. Write three alternatives and explain which one you would choose, thinking about spelling, memorability and length.",
        min: 50
      },
      summary: "A domain is the address, hosting is where files live, DNS connects them, and HTTPS secures the connection. Start with the simplest hosting that meets your needs.",
      takeaways: [
        "Domain, hosting and DNS are three separate things.",
        "Static hosting is a great default for content sites.",
        "Watch for mixed content when enabling HTTPS."
      ],
      next: "Next: APIs, databases and how to choose the right architecture."
    },
    /* ---------------------------------------------------------------- 1.5 */
    {
      id: "m1l5",
      title: "APIs, Databases and Choosing an Architecture",
      time: 9,
      objective: "Explain what APIs and databases do, contrast static and dynamic sites, and choose a basic architecture for a project.",
      intro: "Some sites only show content. Others store information, talk to other services and personalize what you see. This lesson explains the pieces behind that, and how to decide how much you actually need.",
      script: `We've covered the browser, the server, the three frontend layers and hosting. Today we connect the final pieces: databases and APIs.

A database is organized storage. Think of a very smart spreadsheet that software can read and write instantly. Product lists, user accounts, orders, comments, they all live in databases.

An API, short for Application Programming Interface, is a doorway. It's a defined way for one piece of software to ask another for something. Your site might ask a weather service for today's temperature, or ask a payment provider to charge a card. The conversation is structured: a request goes in, usually data comes back, often in a format called JSON.

Here's a way to picture it. You're at a restaurant. You don't walk into the kitchen. You tell the waiter what you want, and the waiter brings it back. The API is the waiter.

Now let's use this to define two types of websites.

A static site has fixed files. Everyone gets the same HTML. It's fast, secure and cheap.

A dynamic site assembles pages on demand, often using a database. Your account page shows your name because the server looked you up.

And you can mix. Modern sites often serve a static page and then load a small piece of dynamic data using an API, for example, today's opening hours.

So here's how I want you to think about architecture. Always ask: what is the least amount of technology that does this job well?

For NOVA: menu, story, location, opening hours? Static. Online pre-orders with payments? That needs a backend and a payment API, or a service that provides it. Do we need it for version one? No. Launch simple, learn from real visitors, and add complexity when it is justified.

That's a mature way to build, and with AI it's even more important, because AI will happily build you a complicated system that you do not need.`,
      explain: [
        `<h3>Databases</h3><p>A <strong>database</strong> stores structured information so software can create, read, update and delete it quickly. Typical uses: users, products, orders, posts. If a feature must remember something between visits, it probably needs a database.</p>`,
        `<h3>APIs</h3><p>An <strong>API</strong> lets one program request data or actions from another. Responses commonly use <strong>JSON</strong>, a simple, readable data format:</p><pre><code>{
  "shop": "NOVA",
  "open": true,
  "hours": "7:00 - 18:00"
}</code></pre><p>A frontend can call an API with JavaScript and display the result.</p>`,
        `<h3>Static, dynamic and application</h3><table class="tbl"><tr><th>Type</th><th>How it works</th><th>Best for</th></tr><tr><td>Static site</td><td>Prebuilt files served as-is</td><td>Brochure sites, portfolios, landing pages</td></tr><tr><td>Dynamic site</td><td>Pages assembled using data on request</td><td>Stores, blogs, directories</td></tr><tr><td>Web application</td><td>Interactive tools where users create and change data</td><td>Dashboards, SaaS products</td></tr></table>`,
        `<h3>The decision rule</h3><p>Use the <strong>least</strong> technology that fully serves the goal. Add a database, backend or API only when a real feature requires it. Each addition brings cost, security responsibility and maintenance.</p>`,
        `<h3>What can go wrong with AI</h3><p>Ask an AI for 'a modern website' and it may add a database, user accounts and an admin panel that you never needed. Always state your architecture constraints in the prompt.</p>`
      ],
      examples: [
        `<h3>A simple API call</h3><pre><code>fetch("https://api.example.com/hours")
  .then(function (res) { return res.json(); })
  .then(function (data) {
    document.querySelector("#hours").textContent = data.hours;
  });</code></pre><p>This requests data, converts the response from JSON and shows it on the page.</p>`
      ],
      activity: {
        type: "mcq",
        title: "Decide the architecture",
        prompt: "NOVA's owner wants version one live in two weeks: menu, story, location, opening hours and a 'Contact us' form. Online payments may come later. Which architecture is the best fit for version one?",
        opts: [
          "A full web application with user accounts, an admin dashboard and a payment system",
          "A static site with a form service for the contact form, designed so ordering can be added later",
          "A native mobile app for iOS and Android",
          "A dynamic site with a custom database and custom login"
        ],
        a: 1,
        why: "Version one needs content and a simple contact path. A static site with a form service is quick, secure and inexpensive, and can grow later. The others add complexity the goal does not require.",
        fb: ["This overbuilds. Accounts and payments are not required for version one.", "", "A mobile app is a separate, much larger project.", "A custom database and login add complexity with no benefit for this scope."]
      },
      quiz: [
        {
          q: "In the restaurant analogy, what role does an API play?",
          opts: [
            "The recipe book",
            "The waiter, carrying requests to the kitchen and returning results",
            "The dining room decor",
            "The bill"
          ],
          a: 1,
          why: "An API is the structured way one piece of software asks another for something, like a waiter relaying orders and returning dishes.",
          fb: ["A recipe book is closer to code or data than an interface.", "", "Decor represents visual presentation.", "The bill represents payment, which is only one possible API use."]
        },
        {
          q: "Which feature most clearly requires a database?",
          opts: [
            "Showing the same About page to every visitor",
            "Displaying a static image",
            "Remembering each customer's past orders between visits",
            "Applying a brown color to headings"
          ],
          a: 2,
          why: "Remembering information across visits requires persistent storage, which means a database.",
          fb: ["Identical content for everyone can be a static file.", "Images are just files.", "", "Color is a CSS concern."]
        },
        {
          q: "Which approach reflects good architecture judgment for a first version?",
          opts: [
            "Add every technology you might need in the future",
            "Use the least technology that fully serves the goal, then expand when needed",
            "Avoid APIs entirely because they are risky",
            "Choose the most advanced stack available"
          ],
          a: 1,
          why: "Extra systems cost time, money and security risk. Start lean and add complexity when real requirements justify it.",
          fb: ["Building for imagined future needs creates waste.", "", "APIs are useful and common. They just need to be used deliberately.", "Advanced does not mean appropriate."]
        }
      ],
      practice: {
        prompt: "For your chosen project, decide whether version one should be static, dynamic or an application. Justify your choice in three or four sentences.",
        min: 80
      },
      challenge: {
        prompt: "List one feature of your project that would require a database or an API. Explain what would be stored or requested and whether you can postpone it to a later version.",
        min: 60
      },
      summary: "Databases store information, APIs let software talk to other software, and architecture should use the least technology that does the job.",
      takeaways: [
        "Databases remember. APIs connect.",
        "Static is fast, secure and simple. Add dynamic features only when needed.",
        "Tell the AI your architecture constraints, or it may overbuild."
      ],
      next: "Next: take the Module 01 quiz, then begin Module 02 and learn how AI really works for web creation."
    }
  ],
  quiz: {
    title: "Module 01 Quiz: How Modern Websites Work",
    questions: [
      {
        q: "A visitor enters nova-coffee.com. Which sequence is correct?",
        opts: [
          "Render the page, send an HTTP request, look up DNS, receive the response",
          "DNS lookup, secure connection, HTTP request, server response, render",
          "HTTP response, DNS lookup, render, connection",
          "Render, DNS lookup, response, request"
        ],
        a: 1,
        why: "The browser must find the server (DNS), connect securely, ask for the page, receive it and then render it.",
        fb: ["Rendering happens last.", "", "A response cannot come before a request.", "Rendering cannot come first."]
      },
      {
        q: "Which pairing of layer and responsibility is correct?",
        opts: [
          "CSS: structure, HTML: behavior, JavaScript: style",
          "HTML: style, CSS: structure, JavaScript: DNS",
          "JavaScript: structure, HTML: style, CSS: hosting",
          "HTML: structure, CSS: style, JavaScript: behavior"
        ],
        a: 3,
        why: "HTML structures content, CSS presents it and JavaScript adds behavior.",
        fb: ["These roles are mixed up.", "JavaScript does not handle DNS.", "These roles are mixed up.", ""]
      },
      {
        q: "A site has nothing but pages, images and a contact form. The owner wants it live quickly and cheaply. What is the best approach?",
        opts: [
          "Static hosting plus a form service",
          "A custom backend with a user database",
          "A cluster of servers",
          "A native app"
        ],
        a: 0,
        why: "No accounts or stored data are required, so static hosting with a form service is simplest and sufficient.",
        fb: ["", "Nothing here requires a user database.", "This is overkill.", "This is a different product."]
      },
      {
        q: "Which HTML structure is better for a page's main navigation?",
        opts: [
          "A div containing divs with click handlers",
          "A nav element containing anchor links",
          "Images of the link names",
          "A paragraph with line breaks"
        ],
        a: 1,
        why: "A nav element with real links is semantic, keyboard-accessible and understood by assistive tools and search engines.",
        fb: ["Divs have no built-in meaning or keyboard behavior.", "", "Images of text are not accessible.", "A paragraph does not signal navigation."]
      },
      {
        q: "True or false: A page served over HTTPS can still trigger warnings if it loads some resources over HTTP.",
        opts: ["True", "False"],
        a: 0,
        why: "That is called mixed content. Insecure resources on a secure page can be blocked or flagged.",
        fb: ["", "Mixed content is a genuine and common issue."]
      },
      {
        q: "What does a 404 status code mean?",
        opts: [
          "The server is overloaded.",
          "The request succeeded.",
          "The server is working but found nothing at the requested address.",
          "The visitor's browser is outdated."
        ],
        a: 2,
        why: "404 means not found. The server responded, but there was no resource at that path.",
        fb: ["Server overload is usually a 5xx error.", "Success is 200.", "", "Browser versions are not what 404 reports."]
      }
    ]
  }
};
