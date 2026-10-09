/* MODULE 00 — Welcome to AI Website Launch */
window.COURSE = window.COURSE || {};
COURSE.m0 = {
  id: "m0",
  title: "Welcome to AI Website Launch",
  quiz: null,
  lessons: [
    /* ---------------------------------------------------------------- 0.1 */
    {
      id: "m0l1",
      title: "Welcome: What You Will Build",
      time: 6,
      objective: "Describe the eight-step AI Website Launch method and what you will be able to build by the end of the course.",
      intro: "Most people who try to build a website with AI make the same mistake: they type one giant request, accept whatever comes back, and wonder why the result feels generic and fragile. This course teaches a different way of working, one that treats AI as a capable partner and keeps you in the driver's seat.",
      script: `Let me start with a confession. The first time I asked an AI to build me a website, I typed one sentence, hit enter, and thirty seconds later I had a page. It looked fine. For about five minutes I felt like a genius.

Then I tried it on my phone. The menu overlapped the logo. The text was nearly invisible on one section. And when I asked the AI to fix it, it quietly broke two other things.

That is the gap this course exists to close. AI can write code faster than any of us. What it cannot do is decide what your website is for, who it serves, or whether the result is actually good. That part is yours.

So here is the method we will use for the entire course. Think. Plan. Prompt. Build. Inspect. Test. Refine. Ship. Eight steps, always in that order.

Notice how late the prompting comes. Most beginners start at step three or four. We start by thinking and planning, because a clear plan makes every prompt ten times better.

Over the next modules you will learn how websites really work, how AI behaves, how to plan a site, how to design it so it does not look like a template, and how to test it for accessibility, search and speed.

Along the way you will build NOVA, a premium coffee and bakery website, step by step. You will not be handed the finished product. You will construct it, and understand every decision.

At the end, you will build your own website as a capstone project, and audit it against a 100-point checklist.

You do not need to be a programmer. You need curiosity and a willingness to inspect what you create. Let's get started.`,
      explain: [
        `<h3>The method: eight steps</h3><p><strong>Think</strong> about the purpose and the audience. <strong>Plan</strong> the structure and content. <strong>Prompt</strong> the AI with clear, structured instructions. <strong>Build</strong> in small stages. <strong>Inspect</strong> the output with your own eyes and the browser's tools. <strong>Test</strong> on real screen sizes, with a keyboard, and for speed. <strong>Refine</strong> what is weak. <strong>Ship</strong> it.</p>`,
        `<p><strong>Why it matters.</strong> AI is fast, but speed without direction produces clutter. The method front-loads the thinking so the fast part (building) has something good to follow.</p>`,
        `<p><strong>What can go wrong.</strong> Skipping straight to Prompt. The AI will fill every gap in your instructions with its own guesses, and those guesses will be average. Average is the look you are trying to avoid.</p>`,
        `<h3>What you will be able to do</h3><ul><li>Explain how a modern website works, in plain language.</li><li>Write structured prompts that get reliable results.</li><li>Plan a site with a brief, a sitemap and a content hierarchy.</li><li>Recognize and apply premium design principles.</li><li>Build, inspect and debug HTML, CSS and JavaScript with AI.</li><li>Test for responsiveness, accessibility, SEO and performance.</li><li>Audit a site against a 100-point scale and launch it.</li></ul>`
      ],
      examples: [
        `<h3>Same goal, two approaches</h3><div class="compare"><div class="bad"><h4>The one-shot approach</h4><p>"Build me a coffee shop website."</p><p>Result: generic hero, stock layout, broken mobile menu, no clear goal.</p></div><div class="good"><h4>The method</h4><p>Define the audience (local professionals, weekend families). Set the goal (pre-orders and visits). Plan five sections. Prompt for one section at a time. Inspect on a phone. Refine.</p><p>Result: a focused, testable site you understand.</p></div></div>`
      ],
      activity: {
        type: "sequence",
        title: "Put the method in order",
        prompt: "Click the eight steps of the AI Website Launch method in the correct order, starting with the first.",
        steps: [
          { t: "Think", d: "Start with purpose and audience. Everything else depends on this." },
          { t: "Plan", d: "Decide structure, pages and content before any code exists." },
          { t: "Prompt", d: "Now give the AI clear, structured instructions based on your plan." },
          { t: "Build", d: "Generate the site in small stages, not one giant leap." },
          { t: "Inspect", d: "Read what the AI produced. Look at it in the browser. Question it." },
          { t: "Test", d: "Check mobile, keyboard, accessibility, search and speed." },
          { t: "Refine", d: "Fix weak spots found during testing with targeted prompts." },
          { t: "Ship", d: "Publish with confidence, because you verified it." }
        ]
      },
      quiz: [
        {
          q: "Why does the method place Think and Plan before Prompt?",
          opts: [
            "AI tools cannot accept prompts until a plan is uploaded.",
            "Prompts are only useful once you know what you want, so planning makes every prompt clearer and better.",
            "Planning is optional and only needed for large websites.",
            "Prompting is the least important step, so it comes in the middle."
          ],
          a: 1,
          why: "A prompt can only be as clear as the thinking behind it. Planning first means the AI receives a specific audience, goal and structure instead of guessing.",
          fb: ["AI tools do not require a plan. The reason is about quality, not a technical rule.", "", "Planning matters for sites of every size because the AI fills gaps with guesses either way.", "Prompting is important. It comes later because it depends on the earlier steps."]
        },
        {
          q: "After the AI generates a section of your website, what should you do next?",
          opts: [
            "Ship it immediately because AI code is reliable.",
            "Ask the AI to rewrite the whole site from scratch.",
            "Skip to the footer so the page is complete.",
            "Inspect the result in a browser and check it before moving on."
          ],
          a: 3,
          why: "Inspect comes right after Build. Looking at the output early catches problems while they are small and cheap to fix.",
          fb: ["AI code can contain errors that only show up when you look at it.", "Rewriting everything throws away good work and hides the real problem.", "Jumping ahead stacks new work on top of unchecked work.", ""]
        },
        {
          q: "True or false: The goal of the course is for you to copy a finished website that is handed to you.",
          opts: ["True", "False"],
          a: 1,
          why: "False. You will construct NOVA step by step so you understand why each decision was made, then build your own site in the capstone.",
          fb: ["The course deliberately avoids handing over a finished product.", ""]
        }
      ],
      practice: {
        prompt: "In two or three sentences, describe a website you would like to be able to build by the end of this course. Who is it for?",
        min: 30
      },
      challenge: {
        prompt: "Think of a website you use often. Name one thing it does well and one thing that would break if the owner had skipped the Think and Plan steps. Write your answer below.",
        min: 40
      },
      summary: "You met the eight-step method, learned why planning precedes prompting, and saw the roadmap from NOVA to your own capstone site.",
      takeaways: [
        "The method is Think, Plan, Prompt, Build, Inspect, Test, Refine, Ship.",
        "AI is fast. Direction, taste and verification are your job.",
        "You will build NOVA step by step, then your own website."
      ],
      next: "Next: how the course and the platform work, and what counts as progress."
    },
    /* ---------------------------------------------------------------- 0.2 */
    {
      id: "m0l2",
      title: "How the Course and the Platform Work",
      time: 5,
      objective: "Navigate the platform, understand how progress and XP are earned, and know what a lesson requires to be complete.",
      intro: "A good learning platform should feel like a workshop, not a library. This lesson shows you how every lesson is organized, what earns progress, and how to get the most out of the interactive parts.",
      script: `Quick tour, and I promise to keep it short.

Every lesson in this course follows the same structure, so you always know where you are. There is a short video lesson with a full transcript. Then the main explanation with real examples. Then an interactive activity, where you make decisions rather than read. Then a knowledge check, a practice exercise, and a challenge.

Now, progress. Here is the rule I care most about: opening a lesson does not complete it. You complete a lesson by doing three things. You finish the interactive activity. You pass the knowledge check, which means seventy percent or higher, and you can retry as many times as you like. And you write a short practice response.

The challenge is optional, but it is where the real learning sticks, and it earns bonus experience points.

Speaking of which, XP. You earn ten points for a lesson, twenty for a quiz, thirty for a challenge, fifty for a project milestone, and a hundred when you finish a module. It is subtle on purpose. It is a progress marker, not a slot machine.

You will also see review questions pop up in later modules. Those are old ideas coming back on purpose. Research on memory is clear: ideas you revisit after a gap stay with you far longer than ideas you see once.

Finally, your progress is saved in your browser, so you can close the tab and return any time.

Okay. That is the whole platform. Let's try it.`,
      explain: [
        `<h3>Anatomy of a lesson</h3><ol><li><strong>Video lesson and transcript.</strong> The instructor script, readable at your own pace.</li><li><strong>Main explanation.</strong> The ideas in text, with what, why, how, when and what can go wrong.</li><li><strong>Practical examples.</strong> Real cases, often from NOVA.</li><li><strong>Interactive activity.</strong> You make decisions, sort, build or fix.</li><li><strong>Knowledge check.</strong> Short questions that test understanding.</li><li><strong>Practice exercise.</strong> A short written response to apply the idea.</li><li><strong>Challenge.</strong> An optional stretch task for bonus XP.</li></ol>`,
        `<h3>What completes a lesson</h3><p>A lesson counts as complete only when the activity is finished, the knowledge check is passed (70% or higher) and the practice response is written. Opening or scrolling does nothing.</p>`,
        `<h3>XP at a glance</h3><table class="tbl"><tr><th>Action</th><th>XP</th></tr><tr><td>Lesson completed</td><td>+10</td></tr><tr><td>Quiz passed</td><td>+20</td></tr><tr><td>Challenge completed</td><td>+30</td></tr><tr><td>Project milestone</td><td>+50</td></tr><tr><td>Module completed</td><td>+100</td></tr><tr><td>Capstone completed</td><td>+500</td></tr></table>`
      ],
      examples: [
        `<h3>A realistic study session</h3><p>Maya has 20 minutes on her commute. She reads the transcript (6 minutes), completes the activity (5), passes the check on her second try (4) and writes her practice response (5). She earns +10 and +20 XP and sees the lesson turn complete on her dashboard. The challenge waits for tonight.</p>`
      ],
      activity: {
        type: "multi",
        title: "What counts toward lesson completion?",
        prompt: "Select all of the actions that are required to complete a lesson.",
        opts: [
          "Opening the lesson page",
          "Finishing the interactive activity",
          "Passing the knowledge check with 70% or higher",
          "Writing the practice response",
          "Completing the optional challenge"
        ],
        a: [1, 2, 3],
        why: "Completion requires the activity, a passing knowledge check and the practice response. Opening a page proves nothing, and the challenge is optional bonus work.",
        fb: ["Opening a page does not show that you learned anything.", "", "", "", "The challenge is optional. It earns bonus XP but is not required."]
      },
      quiz: [
        {
          q: "You pass a knowledge check with 60%. What happens?",
          opts: [
            "The lesson is marked complete anyway.",
            "You can retry the check as many times as you like until you reach 70%.",
            "You must restart the whole course.",
            "Your XP is reduced."
          ],
          a: 1,
          why: "The pass mark is 70%, and retries are unlimited. The check is a learning tool, not a trap.",
          fb: ["60% is below the pass mark, so the lesson is not complete yet.", "", "Nothing is lost by retrying, and you only redo the check.", "XP is never taken away."]
        },
        {
          q: "Why do some later lessons show questions from earlier modules?",
          opts: [
            "The platform ran out of new questions.",
            "To slow down your progress.",
            "Revisiting ideas after a gap makes them stick longer. This is called spaced review.",
            "Because earlier modules were not completed."
          ],
          a: 2,
          why: "Spaced review brings concepts back on purpose, which strengthens long-term memory. Review questions are marked with a badge.",
          fb: ["Review questions are deliberate, not filler.", "Review is meant to help, not slow you down.", "", "They appear even if you completed the earlier module."]
        },
        {
          q: "Which of these earns the most XP?",
          opts: ["Passing a quiz", "Completing a lesson", "Completing a module", "Completing a challenge"],
          a: 2,
          why: "Completing a module earns +100 XP, more than a quiz (+20), a lesson (+10) or a challenge (+30).",
          fb: ["A quiz gives +20 XP.", "A lesson gives +10 XP.", "", "A challenge gives +30 XP."]
        }
      ],
      practice: {
        prompt: "Write a short study plan: when will you work on this course, and for how long each session? Be specific.",
        min: 30
      },
      challenge: {
        prompt: "Explain in your own words why opening a lesson should not count as completing it. Then describe one habit you will use to make sure you actually learn, not just click.",
        min: 40
      },
      summary: "Each lesson combines a video script, explanation, activity, check, practice and challenge. Completion is earned through meaningful actions, never by opening a page.",
      takeaways: [
        "Complete a lesson with the activity, a 70%+ check and a practice response.",
        "XP marks progress. It is a signal, not the goal.",
        "Review questions are intentional and appear in later modules."
      ],
      next: "Next: how AI will be used throughout the course, and what you should never hand over to it."
    },
    /* ---------------------------------------------------------------- 0.3 */
    {
      id: "m0l3",
      title: "How AI Fits In: Your Development Partner",
      time: 7,
      objective: "Decide which parts of website creation to delegate to AI and which parts to keep for human judgment.",
      intro: "Think of AI as a very fast, very well-read junior teammate. It can draft, suggest and explain at remarkable speed. It does not know your customers, your brand or your standards unless you tell it, and it can be confidently wrong. This lesson draws the line between delegation and responsibility.",
      script: `Let's talk about what AI actually is in this course. Not a magic button. A partner.

Picture a junior developer who has read every web tutorial ever written. Impossibly fast, endlessly patient, and fantastic at first drafts. Now picture that same person has never met your customers, has no idea what your business stands for, and will never say "I'm not sure." They will always give you an answer, even when they are guessing.

That is AI for web creation. And it tells us exactly how to work with it.

What should you delegate? Drafting code. Generating variations. Explaining unfamiliar errors. Suggesting copy options. Reviewing your work for things you missed.

What should you keep? The goal of the site. Knowing your audience. Taste. Deciding what is good enough. Checking facts. And above all, verifying the result.

A useful rule: delegate the typing, keep the thinking.

Here is a small example. You ask AI to write a headline for a bakery. It gives you ten options in four seconds. That is delegation, and it is great. But choosing the one that fits your brand voice, and noticing that two of them make claims you cannot support, that is your job.

Same with code. AI generates a contact form. You still check that the labels are real, that it works with a keyboard, and that the form actually sends somewhere.

Throughout this course you will use AI the same way professionals do. Not to avoid thinking, but to remove the slow, repetitive parts so you can spend your attention on decisions that matter.

Next lesson in this module, you'll set up your first mini project. Before that, try the sorting activity.`,
      explain: [
        `<h3>Delegate the typing, keep the thinking</h3><p><strong>What AI does well:</strong> generating first drafts of HTML, CSS and JavaScript; producing copy and layout variations; explaining errors; refactoring repetitive code; reviewing for common mistakes.</p><p><strong>What stays with you:</strong> defining the goal and audience; judging quality and taste; verifying facts and claims; checking accessibility and real-device behavior; deciding when something is ready to ship.</p>`,
        `<h3>Why this division matters</h3><p>AI predicts plausible output. It does not know whether the output is true, safe, accessible or right for your brand. If you delegate the judgment, you inherit its blind spots.</p>`,
        `<h3>What can go wrong</h3><ul><li><strong>Hallucinations:</strong> invented facts, fake statistics, or code that references features that do not exist.</li><li><strong>Generic design:</strong> without direction, AI defaults to the most common patterns.</li><li><strong>Hidden bugs:</strong> code that looks right but fails on mobile or with a keyboard.</li><li><strong>Overconfidence:</strong> a wrong answer sounds exactly as sure as a right one.</li></ul>`,
        `<h3>How to improve</h3><p>Give context, work in small steps, ask for explanations, and always inspect. You will practice each of these in Modules 02, 05 and 09.</p>`
      ],
      examples: [
        `<h3>NOVA example: a headline</h3><div class="compare"><div class="bad"><h4>Blind delegation</h4><p>"Write NOVA's headline." Copy whatever comes back: "The World's Best Coffee."</p><p>Problem: an unprovable claim, and generic.</p></div><div class="good"><h4>Partnership</h4><p>Ask for 10 options in a warm, craft-focused voice. Pick one. Check that it makes no claim you cannot support. Edit it.</p><p>Result: "Slow-roasted mornings, baked fresh daily."</p></div></div>`
      ],
      activity: {
        type: "multi",
        title: "Who should own it?",
        prompt: "Select every task that should stay with the human creator rather than be fully handed to AI.",
        opts: [
          "Deciding the primary goal of the website",
          "Typing out repetitive CSS for a card grid",
          "Verifying that a claim in the copy is true",
          "Generating five alternative headline options",
          "Confirming the site works on a real phone"
        ],
        a: [0, 2, 4],
        why: "Goals, fact-checking and real-device verification require judgment and responsibility. Repetitive code and generating options are ideal for AI to draft, though you still review them.",
        fb: ["", "Repetitive code is a good AI task, although you still review it.", "", "Generating options is a strength of AI. Choosing among them is your job.", ""]
      },
      quiz: [
        {
          q: "An AI tool gives you a statistic for your About page: '87% of customers prefer artisanal bakeries.' What should you do?",
          opts: [
            "Publish it, since AI trained on large amounts of data.",
            "Verify it against a reliable source or remove it.",
            "Increase it to 95% so it sounds stronger.",
            "Ask the AI if it is sure and trust a yes."
          ],
          a: 1,
          why: "AI can produce convincing but invented numbers. Any factual claim must be checked against a real source or removed. Asking the AI to confirm itself does not verify anything.",
          fb: ["Large training data does not make a specific number true.", "", "Changing it makes it even less honest.", "An AI will often say yes to a fabricated claim."]
        },
        {
          q: "Which statement best describes the recommended relationship with AI?",
          opts: [
            "AI replaces the need to understand websites.",
            "AI should only be used for spell-checking.",
            "Delegate repetitive drafting and keep goals, judgment and verification.",
            "Always reject AI-generated code."
          ],
          a: 2,
          why: "The partnership works when you delegate the typing and keep the thinking, which includes goals, taste and verification.",
          fb: ["Understanding is what lets you judge the output.", "That wastes most of what AI can do well.", "", "Rejecting everything is as unhelpful as accepting everything."]
        },
        {
          q: "True or false: If AI sounds confident, its answer is probably correct.",
          opts: ["True", "False"],
          a: 1,
          why: "False. AI sounds equally confident when it is right and when it is wrong. Confidence of tone is not evidence of accuracy.",
          fb: ["Tone is not a reliable signal of accuracy.", ""]
        }
      ],
      practice: {
        prompt: "List two tasks in your own website idea that you would happily delegate to AI, and two that you would keep for yourself. Explain why.",
        min: 50
      },
      challenge: {
        prompt: "Write a short rule you will follow whenever AI gives you something that sounds factual, such as a statistic, a quote or a claim about a product. Make it a rule you could actually apply every time.",
        min: 40
      },
      summary: "AI is a fast, well-read partner without judgment of its own. Delegate drafting, keep goals, taste and verification.",
      takeaways: [
        "Delegate the typing. Keep the thinking.",
        "AI can hallucinate. Verify every factual claim.",
        "Inspection is not optional, because tone of confidence is not evidence."
      ],
      next: "Next: your first mini challenge. You will choose a project idea and generate a starter brief."
    },
    /* ---------------------------------------------------------------- 0.4 */
    {
      id: "m0l4",
      title: "Your First Mini Challenge: Choose a Project Idea",
      time: 8,
      objective: "Choose a project idea and generate a first mini website brief with an audience, goal, call to action and page list.",
      intro: "Good websites start as a few clear decisions, not a pile of code. In this lesson you will pick an idea and see how a short brief turns a vague wish into something you can plan, prompt and build.",
      script: `This is where you get to make something. Nothing technical yet. Just decisions.

Every professional website project starts with a brief. A brief is a short document that answers five questions. What is this website? Who is it for? What should visitors do? What pages does it need? And how should it feel?

If you can answer those five, you are already ahead of most people who open an AI tool and start typing.

Here is why this matters. Imagine two people ask an AI for a website. The first says "I need a website for my business." The second says "I need a three-page site for a local bakery, aimed at busy professionals, with one clear goal: pre-orders for the morning pickup."

Same AI. Completely different results, because the second person made decisions first.

In a moment you will see a set of project ideas. Pick the one that interests you. It does not have to be your final project; the capstone is a separate choice later on. Think of this as a warm-up.

Once you pick, the platform will generate a mini brief for you. Read it carefully. Does the audience feel right? Is the goal specific? Would you change anything?

That last question is the real exercise. A brief is a starting point, and the best habit you can build is to question it.

Take a few minutes and make your choice. I'll see you in Module 01.`,
      explain: [
        `<h3>What a mini brief contains</h3><ul><li><strong>Project:</strong> what the site is.</li><li><strong>Audience:</strong> who it is for, in specific terms.</li><li><strong>Primary goal:</strong> one thing the site should achieve.</li><li><strong>Primary call to action (CTA):</strong> the single action visitors should take.</li><li><strong>Pages:</strong> the minimum set needed to reach the goal.</li><li><strong>Tone:</strong> how the site should sound and feel.</li></ul>`,
        `<h3>Why one goal beats five</h3><p>A site that tries to do everything makes visitors decide everything. One primary goal gives you a clear hierarchy: the strongest button, the most prominent headline, the shortest path.</p>`,
        `<h3>What can go wrong</h3><p>Vague audiences ("everyone"), multiple competing goals and long page lists. Each one pushes the AI, and later the visitor, toward generic output.</p>`
      ],
      examples: [
        `<h3>Vague versus specific</h3><div class="compare"><div class="bad"><h4>Vague</h4><p>Audience: everyone who likes coffee.<br>Goal: increase sales and awareness.<br>Pages: Home, About, Menu, Blog, Shop, Contact, Careers, Press.</p></div><div class="good"><h4>Specific</h4><p>Audience: busy local professionals and weekend families.<br>Goal: drive morning pre-orders.<br>Pages: Home, Menu, Order, Visit.</p></div></div>`
      ],
      activity: {
        type: "projectpick",
        title: "Choose a project idea",
        prompt: "Pick one idea. A mini brief will be generated for you. Then read it critically.",
        options: [
          {
            id: "coffee", name: "NOVA Coffee & Bakery", icon: "☕",
            line: "A premium neighborhood coffee shop and bakery.",
            brief: {
              audience: "Local professionals who want a quality morning stop, and weekend families who browse the menu together.",
              goal: "Increase morning pre-orders and in-person visits.",
              cta: "Order for pickup",
              pages: ["Home", "Menu", "Order", "Visit & contact"],
              tone: "Warm, crafted, unhurried, confident."
            }
          },
          {
            id: "saas", name: "Taskwell: Team Planning App", icon: "▦",
            line: "A simple planning tool for small remote teams.",
            brief: {
              audience: "Team leads at companies of 5 to 30 people who are tired of juggling too many tools.",
              goal: "Convince visitors to start a free trial.",
              cta: "Start free trial",
              pages: ["Home", "Features", "Pricing", "Sign up"],
              tone: "Clear, calm, efficient, trustworthy."
            }
          },
          {
            id: "portfolio", name: "Portfolio for a Photographer", icon: "◉",
            line: "A visual portfolio for a freelance photographer.",
            brief: {
              audience: "Couples planning weddings and small brands that need campaign photography.",
              goal: "Generate booking inquiries.",
              cta: "Check availability",
              pages: ["Home", "Work", "About", "Contact"],
              tone: "Elegant, quiet, image-first."
            }
          },
          {
            id: "restaurant", name: "Brasa: Neighborhood Restaurant", icon: "◐",
            line: "A wood-fired restaurant with weekend brunch.",
            brief: {
              audience: "Locals planning dinner or brunch and visitors searching for a table nearby.",
              goal: "Increase table reservations.",
              cta: "Reserve a table",
              pages: ["Home", "Menu", "Reservations", "Location & hours"],
              tone: "Inviting, lively, appetizing."
            }
          },
          {
            id: "service", name: "Clearline: Local Service Business", icon: "✦",
            line: "A professional home cleaning service.",
            brief: {
              audience: "Busy homeowners who want a trustworthy, reliable cleaner they can book quickly.",
              goal: "Generate quote requests.",
              cta: "Get a free quote",
              pages: ["Home", "Services", "Pricing", "Contact"],
              tone: "Friendly, reliable, straightforward."
            }
          },
          {
            id: "event", name: "Northlight Design Conference", icon: "◇",
            line: "A one-day conference for independent designers.",
            brief: {
              audience: "Freelance and in-house designers who want practical talks and networking.",
              goal: "Sell tickets before early-bird pricing ends.",
              cta: "Get your ticket",
              pages: ["Home", "Speakers", "Schedule", "Tickets"],
              tone: "Energetic, creative, professional."
            }
          }
        ]
      },
      quiz: [
        {
          q: "Which of these is the strongest primary goal for a website brief?",
          opts: [
            "Build awareness, increase sales, grow social media and improve SEO.",
            "Drive morning pre-orders for local pickup.",
            "Be the best website in the industry.",
            "Look modern."
          ],
          a: 1,
          why: "A specific, measurable single goal gives the entire site direction. The other options are either a list of competing goals or too vague to act on.",
          fb: ["Four goals compete with one another and leave nothing to prioritize.", "", "'Best' cannot be measured or acted on.", "Appearance is a means, not a goal for the business."]
        },
        {
          q: "A brief says the audience is 'everyone.' What is the main problem?",
          opts: [
            "It is too long to read.",
            "It makes design decisions impossible because no one is being designed for.",
            "AI cannot process the word 'everyone.'",
            "There is no problem. Broad is better."
          ],
          a: 1,
          why: "Without a specific audience you cannot choose tone, content or design with confidence. Specific audiences produce specific, memorable sites.",
          fb: ["Length is not the issue. Specificity is.", "", "AI can read the word. It will just produce generic output.", "Broad audiences usually lead to generic websites."]
        },
        {
          q: "How many primary calls to action should a simple website have on its main page?",
          opts: ["As many as possible", "Four or five equal ones", "Zero", "One primary action, with optional secondary ones"],
          a: 3,
          why: "One clear primary CTA gives visitors an obvious next step. Secondary links can exist, but they should not compete with it.",
          fb: ["Too many choices reduce action.", "Equal options create hesitation.", "A site without a CTA cannot achieve a goal.", ""]
        }
      ],
      practice: {
        prompt: "Review your generated brief. Rewrite the audience line to be even more specific about who they are and what they need.",
        min: 40
      },
      challenge: {
        prompt: "Change one thing about the generated brief that you would disagree with, such as the goal, the CTA or the pages. Write the new version and explain your reasoning in two sentences.",
        min: 50
      },
      summary: "A brief answers five questions: what, who, goal, CTA and pages. Specific decisions made before prompting lead to far better results.",
      takeaways: [
        "A brief turns a wish into a plan.",
        "One primary goal and one primary CTA create clarity.",
        "Always read a generated brief critically and improve it."
      ],
      next: "Next: Module 01, How Modern Websites Work. Learn what actually happens between a click and a page."
    }
  ]
};
