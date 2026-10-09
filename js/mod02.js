/* MODULE 02 — AI Fundamentals for Web Creation */
window.COURSE = window.COURSE || {};
COURSE.m2 = {
  id: "m2",
  title: "AI Fundamentals for Web Creation",
  lessons: [
    /* ---------------------------------------------------------------- 2.1 */
    {
      id: "m2l1",
      title: "What Generative AI Is, and What It Is Not",
      time: 8,
      objective: "Explain how generative AI produces output, identify its strengths and limitations, and recognize hallucinations.",
      intro: "To work well with AI, you do not need to know the mathematics. You need an accurate intuition for how it behaves: where it excels, where it fails, and why it sometimes sounds right while being wrong.",
      script: `Let's build an accurate picture of what generative AI is, because most mistakes people make with AI come from a wrong mental model.

Generative AI, in the form we use for web work, is a language model. It has been trained on enormous amounts of text and code, and it works by predicting what should come next, one piece at a time, based on everything it has seen and everything you have told it in this conversation.

That one idea explains almost everything.

It explains why AI is great at code. Code is highly patterned. HTML and CSS follow rules, and the internet is full of examples. So AI can produce a decent navigation bar in seconds.

It explains why AI is great at variations. Ask for ten headline options and it will give you ten.

But it also explains the weaknesses. The model is predicting something plausible, not checking something true. When it lacks information, it doesn't stop. It fills the gap with the most likely-sounding answer. That's a hallucination: a confident, fluent statement that is simply wrong. An invented statistic. A CSS property that doesn't exist. A library function with a believable name that was never written.

It also has no memory of your project beyond what's in the current conversation. We call that the context. If something falls outside it, the AI doesn't know it. And it has no taste of its own. Without direction, it drifts toward the most average design on the internet.

So here is your working summary. AI is strong at drafting, patterns, variations, explanations and review. AI is weak at truth, judgment, your specific context and original taste.

That tells you how to use it. Give it context. Give it constraints. Ask it to explain. Check what matters. And never confuse fluent with correct.

In the activity, you'll see five statements from an AI. Your job is to spot the one that's likely to be a hallucination.`,
      explain: [
        `<h3>How it works, simply</h3><p>A language model predicts likely next pieces of text or code from patterns it learned in training and from the context you provide. It does not look things up unless it is given tools to do so, and it does not verify its own output.</p>`,
        `<h3>Strengths for web creation</h3><ul><li>Drafting HTML, CSS and JavaScript quickly.</li><li>Generating multiple options for copy and layouts.</li><li>Explaining unfamiliar code or error messages.</li><li>Reviewing code for common issues.</li><li>Refactoring repetitive code.</li></ul>`,
        `<h3>Limitations</h3><ul><li><strong>Hallucinations:</strong> plausible but false output.</li><li><strong>Limited context:</strong> it only knows what is in the conversation.</li><li><strong>Generic taste:</strong> it defaults to the most common patterns.</li><li><strong>Outdated knowledge:</strong> libraries and practices change.</li><li><strong>No real testing:</strong> it cannot see your site on a real phone.</li></ul>`,
        `<h3>How to reduce the risk</h3><p>Provide context, request specifics, ask the AI to flag uncertainty, check anything factual, run the code, and test in the browser.</p>`
      ],
      examples: [
        `<h3>A typical hallucination</h3><div class="compare"><div class="bad"><h4>AI output</h4><pre><code>.card {
  text-wrap-balance: always;
  corner-smooth: 12px;
}</code></pre><p>Looks professional. Neither property exists as written.</p></div><div class="good"><h4>After checking</h4><pre><code>.card {
  text-wrap: balance;
  border-radius: 12px;
}</code></pre><p>Real properties, verified in the browser.</p></div></div>`
      ],
      activity: {
        type: "mcq",
        title: "Spot the hallucination",
        prompt: "An AI assistant gave you five statements while helping with NOVA's website. Which one is most likely to be a hallucination that needs verification?",
        opts: [
          "A paragraph is marked up with the p element.",
          "Image alt text should describe the image's purpose.",
          "A study by the 'Global Bakery Institute' found that 94% of visitors leave sites that load slower than 1.3 seconds.",
          "CSS Grid can arrange cards in rows and columns.",
          "HTTPS encrypts data between the browser and the server."
        ],
        a: 2,
        why: "A highly specific statistic attributed to a vague source is a classic hallucination. The other four are well-established, general facts. Always verify specific numbers and named studies.",
        fb: ["This is standard HTML.", "This is standard accessibility guidance.", "", "This is standard CSS.", "This is a correct description of HTTPS."]
      },
      quiz: [
        {
          q: "Why can an AI produce a confident answer that is wrong?",
          opts: [
            "It is intentionally trying to deceive.",
            "It predicts plausible output and does not verify truth.",
            "It always has access to current information.",
            "It only makes mistakes when the prompt is short."
          ],
          a: 1,
          why: "A language model generates likely-sounding text. Plausibility and truth are different, so fluent answers can be false.",
          fb: ["There is no intent. It is how prediction works.", "", "It does not automatically know current facts.", "Length of the prompt is not the cause."]
        },
        {
          q: "Which task is AI best suited to in a website project?",
          opts: [
            "Deciding what the business's primary goal should be, with no input from you",
            "Confirming that your site works on every real device",
            "Drafting several variations of a responsive navigation bar",
            "Guaranteeing that a legal claim in your copy is accurate"
          ],
          a: 2,
          why: "Drafting patterned code and producing variations are strengths. Goals, device testing and legal accuracy need human judgment and verification.",
          fb: ["Goals come from you and your business.", "AI cannot test on your real devices.", "", "Legal accuracy needs verification from a qualified source."]
        },
        {
          q: "True or false: If you ask an AI 'Are you sure?' and it says yes, the answer is verified.",
          opts: ["True", "False"],
          a: 1,
          why: "False. The AI may simply continue the pattern of confidence. Verification means checking the output against a real source or by running and testing it.",
          fb: ["Self-confirmation is not verification.", ""]
        }
      ],
      practice: {
        prompt: "Write down two situations in your project where an AI hallucination could cause real harm or embarrassment. How would you check for each?",
        min: 60
      },
      challenge: {
        prompt: "Ask any AI assistant a factual question about CSS that you can verify (for example, what a lesser-known property does). Check its answer against a trustworthy source such as MDN. Report whether it was fully correct.",
        min: 60
      },
      summary: "Generative AI predicts plausible output. It is strong at patterns, drafts and variations, and weak at truth, judgment and your specific context.",
      takeaways: [
        "Plausible is not the same as true.",
        "Specific numbers, names and properties deserve verification.",
        "Context is the AI's only knowledge of your project."
      ],
      next: "Next: the anatomy of a great prompt, and how bad prompts go wrong."
    },
    /* ---------------------------------------------------------------- 2.2 */
    {
      id: "m2l2",
      title: "The Anatomy of a Great Prompt",
      time: 9,
      objective: "Identify the essential parts of an effective prompt and improve a weak prompt by adding role, context, goal, audience, technology, constraints and output format.",
      intro: "A prompt is not a wish. It is a brief. The more clearly you define the job, the less the AI has to guess. This lesson breaks a good prompt into parts you can reuse.",
      script: `Let me show you two prompts, and I want you to predict which one gets a better result.

Prompt one: "Make me a website for my coffee shop."

Prompt two: "You are a senior front-end developer. I'm building NOVA, a premium coffee and bakery for busy local professionals. Create the hero section for the home page using semantic HTML and CSS only, no frameworks. It should have a headline, a one-sentence subheading and one primary button that says 'Order for pickup'. The tone is warm and crafted. It must be responsive and keyboard accessible. Return a single HTML file with the CSS in a style tag, and briefly explain your choices."

Obviously the second one wins. But why? Let's take it apart.

It gives the AI a role. A senior front-end developer. That shifts the style and care of the answer.

It gives context. What NOVA is and who it's for.

It states a goal. A hero section, with specific contents.

It names the technology. Semantic HTML and CSS only. Without this, the AI might pick a framework you don't want.

It sets requirements and constraints. Responsive, keyboard accessible, one button.

And it defines the output format. A single HTML file, plus a short explanation.

Role, context, goal, audience, technology, design, requirements, constraints, output format. These are the nine parts of the Prompt Builder you will use in the next lesson.

You will not always need all nine. A small change can be a one-liner. But for any significant piece of work, this structure removes guesswork.

A final tip: ask for one thing at a time. A prompt that asks for the entire website at once produces a large, shallow result that is hard to check. Small prompts produce checkable output.

Now improve a weak prompt yourself.`,
      explain: [
        `<h3>The nine parts of a strong prompt</h3><table class="tbl"><tr><th>Part</th><th>Purpose</th><th>Example</th></tr><tr><td>Role</td><td>Sets expertise and style</td><td>You are a senior front-end developer.</td></tr><tr><td>Context</td><td>Explains the situation</td><td>NOVA is a premium coffee and bakery.</td></tr><tr><td>Goal</td><td>States the exact task</td><td>Create the hero section.</td></tr><tr><td>Audience</td><td>Who it is for</td><td>Busy local professionals.</td></tr><tr><td>Technology</td><td>The tools allowed</td><td>HTML and CSS only, no frameworks.</td></tr><tr><td>Design</td><td>Look and feel</td><td>Warm, editorial, generous spacing.</td></tr><tr><td>Requirements</td><td>Things that must be present</td><td>One primary button.</td></tr><tr><td>Constraints</td><td>Limits and things to avoid</td><td>No stock gradients, no carousels.</td></tr><tr><td>Output format</td><td>How to deliver the answer</td><td>A single HTML file and a short explanation.</td></tr></table>`,
        `<h3>Bad prompt, good prompt</h3><div class="compare"><div class="bad"><h4>Weak</h4><p>"Make a modern website for my business. Make it look good."</p><p>Missing: what the business is, audience, pages, technology, limits, format. 'Modern' and 'good' are not measurable.</p></div><div class="good"><h4>Strong</h4><p>"You are a front-end developer. Build the Menu page for NOVA, a coffee shop, for busy professionals. Use semantic HTML and CSS only. Show 6 items as cards with name, short description and price. Must be responsive with one column on mobile. Avoid placeholder lorem ipsum. Return one HTML file."</p></div></div>`,
        `<h3>When to use less</h3><p>For tiny tweaks ("make the button 8px taller") you do not need nine parts. Match the prompt's detail to the size and risk of the task.</p>`,
        `<h3>What can go wrong</h3><p>Overloading a prompt with contradictory demands ("minimal but with lots of animation"), or leaving out the constraints that matter most. The AI will pick one reading and not tell you.</p>`
      ],
      examples: [
        `<h3>From vague to specific, a NOVA example</h3><p><strong>Before:</strong> "Write some copy for my About page."</p><p><strong>After:</strong> "You are a brand copywriter. NOVA is a neighborhood coffee shop and bakery that roasts in small batches. Write a 90-word About section for busy local professionals. Tone: warm, confident, no clichés like 'passion for coffee'. Do not claim awards or statistics. Return two options."</p>`
      ],
      activity: {
        type: "promptfix",
        title: "Improve a weak prompt",
        prompt: "Rewrite this weak prompt into a strong one. Aim to include role, context, audience, technology, constraints and output format.",
        weak: "Make me a website for my coffee shop.",
        criteria: [
          { re: "(you are|act as|as a)\\s+(an?\\s+)?[a-z\\- ]*(developer|designer|engineer|copywriter)", label: "Role: tells the AI who to be" },
          { re: "(nova|coffee|bakery|shop|caf)", label: "Context: explains the business or situation" },
          { re: "(audience|visitors|customers|professionals|users|families|for busy|aimed at)", label: "Audience: says who the page is for" },
          { re: "(html|css|javascript|vanilla|no framework|semantic)", label: "Technology: names the tools to use" },
          { re: "(must|should|avoid|do not|don't|no |only|without|responsive|accessible)", label: "Requirements or constraints: sets rules and limits" },
          { re: "(return|output|format|single file|one file|explain|provide|deliver)", label: "Output format: says how to deliver the answer" }
        ],
        pass: 4
      },
      quiz: [
        {
          q: "Which prompt is most likely to give a useful, checkable result?",
          opts: [
            "Build a great modern website.",
            "Generate the entire website with every page, animation and backend feature in one response.",
            "Create the header and navigation for NOVA using semantic HTML and CSS only. Include 4 links and a primary button. Make it keyboard accessible. Return one HTML file.",
            "Make it better."
          ],
          a: 2,
          why: "It defines the task, technology, content, an accessibility requirement and the format. It is small enough to inspect.",
          fb: ["'Great' and 'modern' are not measurable.", "Huge prompts produce shallow, hard-to-verify output.", "", "There is no context about what 'it' is or what 'better' means."]
        },
        {
          q: "What is the main benefit of stating constraints such as 'no frameworks' or 'do not use lorem ipsum'?",
          opts: [
            "It makes the AI work faster.",
            "It reduces the number of guesses the AI makes, so output matches your needs.",
            "It guarantees there will be no mistakes.",
            "It lets you skip testing."
          ],
          a: 1,
          why: "Constraints narrow the space of possible answers, and the output becomes more predictable. They do not replace testing.",
          fb: ["Speed is not the main effect.", "", "Nothing guarantees zero mistakes.", "You should still test every result."]
        },
        {
          q: "You want a quick change: make an existing button slightly larger. What is the best approach?",
          opts: [
            "Write a nine-part prompt describing the entire project.",
            "A short, specific prompt that points at the exact element and the exact change.",
            "Ask the AI to redesign the page.",
            "Do nothing, because AI cannot make small changes."
          ],
          a: 1,
          why: "Match the prompt's detail to the task. Small, precise requests are best for small, precise changes.",
          fb: ["That is overkill for a tiny tweak.", "", "A redesign risks unrelated changes.", "AI handles small, targeted edits well."]
        }
      ],
      practice: {
        prompt: "Write a strong prompt for the first section (the hero) of your own project. Include at least role, context, technology, a constraint and an output format.",
        min: 150
      },
      challenge: {
        prompt: "Take the prompt you just wrote and deliberately remove the constraints and output format. Predict, in two or three sentences, what kind of unwanted output the AI might produce.",
        min: 60
      },
      summary: "A strong prompt is a brief: role, context, goal, audience, technology, design, requirements, constraints and output format. Ask for one checkable thing at a time.",
      takeaways: [
        "Specific beats vague.",
        "Constraints narrow guesses and improve control.",
        "Match prompt detail to task size."
      ],
      next: "Next: use the Prompt Builder to assemble a complete prompt in seconds."
    },
    /* ---------------------------------------------------------------- 2.3 */
    {
      id: "m2l3",
      title: "The Prompt Builder",
      time: 8,
      objective: "Use the Prompt Builder to generate a complete, structured prompt for a real website task.",
      intro: "Now you will turn the nine parts into a working tool. The Prompt Builder assembles your answers into a clean, ready-to-use prompt, and you can reuse it throughout the course.",
      script: `You now know the nine parts of a strong prompt. Let's make them effortless.

The Prompt Builder on this platform gives you a field for each part: role, context, goal, audience, technology, design, requirements, constraints and output format. As you type, it assembles a clean prompt that you can copy into any AI tool.

Let me tell you how to get the most from it.

First, start with the goal. Write the smallest useful thing. Not "build my website", but "create the hero section for the home page".

Second, be generous with context. One or two sentences about the business and the audience change everything about the quality of the result.

Third, use the design field to describe feeling and references in words you can verify. "Warm, editorial, generous spacing, one accent color" works. "Pretty" doesn't.

Fourth, use constraints to protect yourself. This is where you write the things that go wrong most often. No lorem ipsum. No external libraries. No made-up claims. Keep it accessible.

And fifth, always fill in the output format. Ask for the files you want, in the shape you want, and ask for a short explanation of choices so you learn something every time.

Once you've built your prompt, don't treat it as sacred. Run it, inspect the result, and then improve the prompt. A prompt is a living document. Over a project, your best prompts are the ones you've refined three or four times.

Go ahead and build one now for NOVA's hero section, or for your own project. Fill at least six fields, then generate.`,
      explain: [
        `<h3>How to fill each field</h3><ul><li><strong>Role:</strong> a specific professional, such as "senior front-end developer".</li><li><strong>Context:</strong> what the business is and what the page is part of.</li><li><strong>Goal:</strong> the smallest useful deliverable.</li><li><strong>Audience:</strong> real people with real needs.</li><li><strong>Technology:</strong> languages and constraints on tools.</li><li><strong>Design:</strong> feeling, hierarchy, spacing and references in plain language.</li><li><strong>Requirements:</strong> what must be included.</li><li><strong>Constraints:</strong> what to avoid.</li><li><strong>Output format:</strong> files, structure and whether to explain.</li></ul>`,
        `<h3>Reuse and refine</h3><p>Keep a library of your best prompts. When a prompt works, save it. When it fails, note why and fix the part that caused it. Over time, your prompts become reusable templates.</p>`,
        `<h3>What can go wrong</h3><p>Pasting a generated prompt without reading it. The Builder organizes your thinking, but it cannot replace it. If your goal is fuzzy, the prompt will be too.</p>`
      ],
      examples: [
        `<h3>A completed prompt for NOVA</h3><pre><code>ROLE
You are a senior front-end developer with strong visual taste.

CONTEXT
NOVA is a premium coffee and bakery in a city neighborhood.

GOAL
Create the hero section of the home page.

AUDIENCE
Busy local professionals and weekend families.

TECHNOLOGY
Semantic HTML and CSS only. No frameworks.

DESIGN
Warm, editorial, generous spacing, one accent color.

REQUIREMENTS
One headline, one subheading, one primary button.

CONSTRAINTS
No lorem ipsum. No stock gradients. Keep it keyboard accessible.

OUTPUT FORMAT
One HTML file with CSS in a style tag. Briefly explain choices.</code></pre>`
      ],
      activity: {
        type: "promptbuilder",
        title: "Build your own prompt",
        prompt: "Fill in at least six of the nine fields, then generate your prompt."
      },
      quiz: [
        {
          q: "Which Goal entry is best for the Prompt Builder?",
          opts: [
            "Build my whole website.",
            "Create a responsive pricing section with three plan cards for the Taskwell home page.",
            "Make it nice.",
            "Do web stuff."
          ],
          a: 1,
          why: "A small, specific deliverable is easier to produce and easier to check.",
          fb: ["Too large to check or control.", "", "'Nice' cannot be measured.", "No deliverable is defined."]
        },
        {
          q: "What should you do after the AI responds to a prompt you built?",
          opts: [
            "Ship the result immediately.",
            "Inspect the output, then refine the prompt or follow up for any issues.",
            "Delete the prompt and never use it again.",
            "Add more unrelated requests to the same prompt."
          ],
          a: 1,
          why: "Prompts are iterative. Inspect, learn what was missing, and improve the prompt or follow up with a targeted correction.",
          fb: ["Unchecked output is risky.", "", "A prompt that almost worked is valuable. Refine it.", "Mixing in unrelated requests muddies the result."]
        },
        {
          q: "Which constraint is most useful to include in a prompt for a small business site?",
          opts: [
            "Use as many animations as possible.",
            "Do not invent statistics, awards or customer testimonials.",
            "Make the code as long as possible.",
            "Use a different font for every section."
          ],
          a: 1,
          why: "Protecting against invented claims prevents misleading or legally risky content, a common AI failure.",
          fb: ["Excess animation harms performance and usability.", "", "Longer code is harder to maintain.", "Inconsistent typography looks amateur."]
        }
      ],
      practice: {
        prompt: "Paste or describe the prompt you generated, and note one thing you would change after reading it.",
        min: 60
      },
      challenge: {
        prompt: "Use your generated prompt in an AI tool of your choice (or imagine what it would return). List two things you would inspect first in the result, and why.",
        min: 60
      },
      summary: "The Prompt Builder structures your thinking into nine fields and assembles a prompt. Strong prompts come from clear thinking, then iteration.",
      takeaways: [
        "Start with the smallest useful goal.",
        "Use constraints to guard against common failures.",
        "Refine prompts after every inspection."
      ],
      next: "Next: iterating, debugging and reviewing AI-generated code."
    },
    /* ---------------------------------------------------------------- 2.4 */
    {
      id: "m2l4",
      title: "Iterating, Debugging and Reviewing AI Code",
      time: 10,
      objective: "Review AI-generated code critically, find common bugs, and write effective follow-up and debugging prompts.",
      intro: "The first answer from an AI is a draft. Professionals iterate. They read the code, test it, describe problems precisely and ask for targeted fixes. This lesson gives you that routine.",
      script: `The first response from an AI is not the finished product. It's a draft. Treating it that way is what separates people who ship good sites from people who ship buggy ones.

Here's a four-step routine I want you to adopt.

Step one: read. Before you run anything, skim the code. You don't need to understand every line. Ask simple questions. Which layer am I looking at? Is the HTML meaningful, or is it a pile of divs? Are there any libraries I didn't ask for? Does anything look made-up?

Step two: run and look. Open it in a browser. Resize the window. Press tab to move through links with the keyboard. Open the Network tab and check for errors.

Step three: describe the problem precisely. This is where most people lose time. "It's broken" gives the AI nothing. Compare that with: "On screens narrower than 600 pixels, the navigation links overlap the logo. Here is my current CSS for the header. Fix only the header, and don't change the colors."

See the difference? What happens, where, under what conditions, what code is relevant, and what must stay untouched.

Step four: verify the fix and check you didn't break anything else. AI loves to fix one thing and quietly change another. That's why we work in small pieces, and why we keep what's working.

There's also a bonus move. You can ask the AI to review its own code: "List any bugs, accessibility problems or assumptions in the code you just wrote." Second look often catches things the first pass missed. But remember, it's a prompt to get you looking, not a replacement for looking yourself.

Now let's try a real debugging example.`,
      explain: [
        `<h3>The review routine: Read, Run, Describe, Verify</h3><ol><li><strong>Read</strong> the code for structure, unexpected libraries and invented features.</li><li><strong>Run</strong> it in a browser, resize, use the keyboard and check the console.</li><li><strong>Describe</strong> any problem precisely: what, where, when, which code and what must not change.</li><li><strong>Verify</strong> the fix and re-test the rest of the page.</li></ol>`,
        `<h3>A precise debugging prompt</h3><div class="compare"><div class="bad"><h4>Vague</h4><p>"The menu is broken, fix it."</p></div><div class="good"><h4>Precise</h4><p>"On screens under 600px, the nav links overlap the logo. Here is the header HTML and CSS. Fix only the header layout. Do not change colors or other sections. Explain what caused it."</p></div></div>`,
        `<h3>Common issues in AI-generated code</h3><ul><li>Missing <code>alt</code> text or labels on form fields.</li><li>Fixed widths that overflow on small screens.</li><li>Click handlers on non-interactive elements (not keyboard accessible).</li><li>Unnecessary libraries.</li><li>Invented CSS properties or functions.</li><li>Unrelated changes made during a fix.</li></ul>`,
        `<h3>Spaced review: semantic HTML</h3><p>Remember from Module 01: prefer meaningful elements like <code>button</code> and <code>nav</code> over generic <code>div</code>. A click handler on a div is a classic AI shortcut that breaks keyboard use.</p>`
      ],
      examples: [
        `<h3>Spot the problem</h3><pre><code>&lt;div class="btn" onclick="openMenu()"&gt;Menu&lt;/div&gt;

&lt;img src="hero.jpg"&gt;

&lt;input type="email" placeholder="Your email"&gt;</code></pre><p>Three issues: a clickable <code>div</code> instead of a <code>button</code>; an image with no <code>alt</code>; an input with no real <code>label</code>.</p>`
      ],
      activity: {
        type: "mcq",
        title: "Debug it",
        prompt: `An AI generated this menu control for NOVA. Visitors who use only a keyboard cannot open the menu. What is the root cause?<pre><code>&lt;div class="menu-toggle" onclick="openMenu()"&gt;
  Menu
&lt;/div&gt;</code></pre>`,
        opts: [
          "The word 'Menu' is too short.",
          "A div is not focusable or keyboard-operable by default. It should be a button element.",
          "The class name is wrong.",
          "JavaScript cannot be used with HTML."
        ],
        a: 1,
        why: "Elements like div have no built-in keyboard behavior. A real button element is focusable and operable with Enter and Space, and it is announced correctly by screen readers.",
        fb: ["Length of the label is not the problem.", "", "Class names do not affect keyboard behavior.", "JavaScript and HTML work together all the time."]
      },
      quiz: [
        {
          review: "Module 01",
          q: "Which HTML structure is more accessible for a page's main navigation?",
          opts: [
            "A div with several div children and click handlers",
            "A nav element containing anchor links",
            "A single image with the link text drawn on it",
            "A paragraph with links separated by line breaks"
          ],
          a: 1,
          why: "A nav element with real links is semantic and keyboard friendly, and assistive technologies can identify it as navigation.",
          fb: ["Divs lack meaning and keyboard behavior.", "", "Images of text are not accessible.", "A paragraph does not identify navigation."]
        },
        {
          q: "Which follow-up prompt will most likely get a correct fix?",
          opts: [
            "It looks wrong. Try again.",
            "Rebuild everything from scratch.",
            "On screens under 600px the hero image overflows horizontally. Here is the hero CSS. Fix only the image sizing and do not change the text styles.",
            "Make it better and more modern."
          ],
          a: 2,
          why: "A precise description of the problem, the code, and the boundaries lets the AI make a targeted fix without breaking other things.",
          fb: ["No information about what is wrong.", "Rebuilding discards working code.", "", "This is not a bug report."]
        },
        {
          q: "After the AI fixes one bug, what should you do?",
          opts: [
            "Assume nothing else changed.",
            "Verify the fix and re-check the rest of the page for unintended changes.",
            "Immediately ask for a new design.",
            "Delete the previous version."
          ],
          a: 1,
          why: "AI fixes can introduce side effects. Re-testing prevents regressions.",
          fb: ["AI sometimes changes unrelated code.", "", "Redesigning is unrelated to verifying the fix.", "Keep earlier working versions."]
        },
        {
          q: "Which of these is a warning sign in AI-generated code that deserves checking?",
          opts: [
            "A button element used for opening a menu",
            "An image with a descriptive alt attribute",
            "A CSS property you cannot find in MDN documentation",
            "A label connected to an input"
          ],
          a: 2,
          why: "Properties that cannot be found in trusted documentation may be hallucinated. Verify before keeping them.",
          fb: ["This is good practice.", "This is good practice.", "", "This is good practice."]
        }
      ],
      practice: {
        prompt: "Write a precise debugging prompt for this problem: 'On mobile, my page scrolls sideways.' Include where, when, what code is relevant and what must not change.",
        min: 100
      },
      challenge: {
        prompt: "Write a short code-review prompt you could paste after any AI-generated section to make the AI list bugs, accessibility problems and assumptions. Explain why you would still check the result yourself.",
        min: 80
      },
      summary: "Treat AI output as a draft. Read, run, describe problems precisely, then verify. Specific bug reports produce reliable fixes.",
      takeaways: [
        "Read, Run, Describe, Verify.",
        "A good bug report states what, where, when and what must not change.",
        "Always re-test after a fix."
      ],
      next: "Next: using AI for design thinking and copywriting, and where to be careful."
    },
    /* ---------------------------------------------------------------- 2.5 */
    {
      id: "m2l5",
      title: "AI for Design and Copywriting",
      time: 8,
      objective: "Use AI to support design decisions and website copy while keeping brand voice, honesty and quality under human control.",
      intro: "Design and copy are where AI can sound most polished and be most generic. This lesson shows you how to use it for ideas and critique while keeping the voice and the standards yours.",
      script: `We've used AI for code. Now let's talk about design and words, where AI is both powerful and risky.

Start with design. AI can propose layouts, color palettes, type pairings, section ideas, even critique a screenshot. It's a fast brainstorming partner. The risk is sameness. Ask for "a modern coffee shop website" and you'll get the same cream background, serif heading and rounded cards that everyone else gets.

The fix is direction. Instead of asking for "modern", describe the feeling, the audience, the hierarchy and the things to avoid. "Editorial, warm, a strong serif headline, one accent color, no gradients, lots of whitespace, photography-led." Now you've given it something specific to aim at.

You can also use AI as a critic. Describe a section and ask: "What are the three biggest hierarchy problems here?" That's often more valuable than asking it to create something new.

Now copy. AI writes smooth copy fast. It also writes empty copy fast. Phrases like "passionate about quality" and "elevate your experience" are everywhere, and visitors skim right past them.

Give it substance. Real facts about the business, your voice, what you want to avoid. Ask for options, not one answer. Then edit. Your edits are where the brand lives.

And be strict about honesty. Never publish invented testimonials, awards, statistics or claims. If it isn't true and provable, it doesn't go on the site.

Here's my rule: let AI widen your options, then you narrow them. It generates, you decide.

Let's practice choosing the strongest prompt for a design task.`,
      explain: [
        `<h3>AI for design</h3><ul><li>Brainstorm layouts, section order and visual directions.</li><li>Suggest palettes and type pairings from described moods.</li><li>Critique a described or pictured layout for hierarchy, contrast and spacing.</li></ul><p><strong>Risk:</strong> generic, template-looking results. <strong>Fix:</strong> describe feeling, audience, hierarchy and what to avoid.</p>`,
        `<h3>AI for copywriting</h3><ul><li>Generate multiple headline and CTA options.</li><li>Rewrite for tone, length or clarity.</li><li>Draft structure for About, FAQ and product descriptions.</li></ul><p><strong>Risk:</strong> clichés, invented claims and a voice that is not yours. <strong>Fix:</strong> supply real facts, define the voice, forbid claims you cannot prove, and edit the output.</p>`,
        `<h3>A weak and a strong design prompt</h3><div class="compare"><div class="bad"><h4>Weak</h4><p>"Design a modern homepage for a bakery."</p></div><div class="good"><h4>Strong</h4><p>"Suggest three homepage section orders for NOVA, a premium neighborhood bakery for busy professionals. The goal is morning pre-orders. Tone: warm, editorial, photography-led. Avoid carousels and generic gradients. For each, explain why it supports the goal."</p></div></div>`,
        `<h3>Honesty rule</h3><p>Do not publish invented testimonials, awards, reviews or statistics. Use real customer feedback with permission, or leave the section out.</p>`
      ],
      examples: [
        `<h3>Cliché versus specific</h3><div class="compare"><div class="bad"><h4>Empty</h4><p>"At NOVA, we are passionate about delivering an elevated coffee experience."</p></div><div class="good"><h4>Specific</h4><p>"We roast in small batches every morning at 5:30, and the first croissants leave the oven at 7."</p></div></div>`
      ],
      activity: {
        type: "mcq",
        title: "Choose the best prompt",
        prompt: "You want help choosing a visual direction for NOVA. Which prompt is most likely to produce a useful, non-generic result?",
        opts: [
          "Make NOVA look modern and premium.",
          "Give me a design for a coffee site.",
          "Suggest three visual directions for NOVA, a neighborhood premium bakery for busy professionals. Goal: morning pre-orders. Describe typography, one accent color, image style and spacing for each. Avoid gradients and stock-template looks.",
          "Choose the best colors for me and do not explain."
        ],
        a: 2,
        why: "It includes the audience, goal, the aspects to describe, and what to avoid. It asks for options so you can decide. The others are vague or remove your ability to judge.",
        fb: ["'Modern' and 'premium' are subjective and vague.", "No audience, goal or constraints.", "", "Skipping explanation removes your chance to evaluate the reasoning."]
      },
      quiz: [
        {
          q: "An AI drafts a testimonial from 'Sarah, a happy customer' for your site. Sarah does not exist. What should you do?",
          opts: [
            "Publish it. Testimonials are normal marketing.",
            "Do not publish it. Use real, permitted customer feedback or omit the section.",
            "Change the name to something that sounds more real.",
            "Publish it with a photo to build trust."
          ],
          a: 1,
          why: "Fabricated testimonials are deceptive, can be illegal, and destroy trust if discovered.",
          fb: ["Fake testimonials are deceptive.", "", "Disguising the fabrication makes it worse.", "Adding a photo deepens the deception."]
        },
        {
          q: "Why do AI-generated design suggestions often look generic?",
          opts: [
            "AI cannot produce layouts.",
            "Without specific direction, it defaults to the most common patterns it has seen.",
            "AI is not allowed to use color.",
            "Design is only a matter of typing speed."
          ],
          a: 1,
          why: "A model leans toward the average of what it has seen. Specific direction pulls it away from the default.",
          fb: ["AI can propose layouts.", "", "AI can discuss and use color.", "Speed has nothing to do with originality."]
        },
        {
          q: "Which approach best combines AI strengths with human judgment in copywriting?",
          opts: [
            "Accept the first draft unchanged.",
            "Ask for several options with real facts supplied, then choose and edit.",
            "Never use AI for writing.",
            "Ask for 100 words and publish whichever is longest."
          ],
          a: 1,
          why: "AI widens the options and you narrow and refine them. Supplying real facts reduces filler and invention.",
          fb: ["First drafts tend to be generic.", "", "AI is a useful brainstorming partner when supervised.", "Length is not quality."]
        }
      ],
      practice: {
        prompt: "Write a design-direction prompt for your own project. Include audience, goal, the aspects you want described and at least two things to avoid.",
        min: 100
      },
      challenge: {
        prompt: "Write three headline options for your project, then edit the best one by hand to make it more specific and truthful. Explain what you changed and why.",
        min: 80
      },
      summary: "Use AI to widen design and copy options, then narrow with your own judgment. Give direction to avoid sameness, supply real facts, and never publish invented claims.",
      takeaways: [
        "Direction defeats genericness.",
        "AI generates options. You decide.",
        "Never publish fabricated testimonials, awards or statistics."
      ],
      next: "Next: take the Module 02 quiz to earn your Prompt Builder achievement and complete the module."
    }
  ],
  quiz: {
    title: "Module 02 Quiz: AI Fundamentals for Web Creation",
    questions: [
      {
        q: "Which statement best explains a hallucination?",
        opts: [
          "The AI deliberately lies to the user.",
          "The AI produces a fluent, confident answer that is not true.",
          "The AI refuses to answer.",
          "The AI copies a user's input word for word."
        ],
        a: 1,
        why: "Hallucinations are plausible but false outputs generated because the model predicts likely text and does not verify truth.",
        fb: ["There is no intent to deceive.", "", "Refusal is not a hallucination.", "Repeating input is not a hallucination."]
      },
      {
        q: "Which part of a prompt best prevents the AI from choosing tools you do not want?",
        opts: ["Role", "Technology and constraints", "Audience", "Output format"],
        a: 1,
        why: "Naming the technology and listing constraints (for example 'no frameworks') narrows the AI's choices.",
        fb: ["Role shapes expertise and style, not tool choice.", "", "Audience describes who it is for.", "Output format describes how to deliver results."]
      },
      {
        review: "Module 01",
        q: "AI generated a clickable div to open a menu. Which element should replace it so the control works for keyboard users?",
        opts: ["span", "button", "section", "p"],
        a: 1,
        why: "A button element is focusable and operable with the keyboard by default, and assistive technology announces it correctly.",
        fb: ["A span has no built-in keyboard behavior.", "", "A section is a structural element, not a control.", "A paragraph is not interactive."]
      },
      {
        q: "A bug report to the AI should include which of the following?",
        opts: [
          "Only the words 'it is broken'",
          "What happens, where and when, the relevant code, and what must not change",
          "A request to rebuild the entire site",
          "No code, to avoid confusing the AI"
        ],
        a: 1,
        why: "Precise reports allow targeted fixes without unrelated changes.",
        fb: ["This gives the AI nothing to work with.", "", "Rebuilding discards working work.", "The relevant code is what allows an accurate fix."]
      },
      {
        q: "Which is the best use of AI in writing website copy?",
        opts: [
          "Invent customer reviews for social proof",
          "Generate several options based on real facts, then edit and verify",
          "Add made-up statistics to appear authoritative",
          "Publish the first draft unchanged"
        ],
        a: 1,
        why: "AI is excellent for options and drafts when supplied with real facts, as long as a human edits and verifies.",
        fb: ["Invented reviews are deceptive.", "", "Invented statistics damage credibility.", "First drafts are often generic."]
      },
      {
        q: "You ask AI to build the entire website in one prompt and get a huge, shallow result. What is the best next step?",
        opts: [
          "Ship it because it exists.",
          "Break the project into stages and prompt for one checkable section at a time.",
          "Ask for an even longer response.",
          "Stop using AI entirely."
        ],
        a: 1,
        why: "Small, staged prompts produce output you can inspect and improve, which leads to more maintainable results.",
        fb: ["Unchecked work is risky.", "", "Longer output is harder to check.", "AI still helps when used in stages."]
      }
    ]
  }
};
