# os

Last Friday I started a conversation with Claude about operating systems.

(Brief, personal. The same energy as the Slack message: “at some point on friday, i started chatting...” Don’t oversell it. Let the reader discover what it became.)

I’ve always found operating systems fascinating. Not using them — thinking about them. The assumptions buried so deep that nobody questions them anymore. What would you do differently if you started over?

That conversation turned into a design session. The design session turned into a prototype. I haven’t really stopped since. It’s been a week.

[Screenshot/video of the demo here]

---

## the thesis

On your computer, you can’t look at a photo without choosing which app opens it. You can’t read a document without the right software installed. Your files live inside applications.

This wasn’t inevitable. Xerox Star (1981) was genuinely document-centric — you started with documents, not apps. Apple and IBM tried it with OpenDoc in the mid-90s. It didn’t fail because the idea was wrong. It failed because 1990s component architectures weren’t up to the challenge, and the economic incentives of major OS vendors were aligned with the app-centric model.

What if you rethought the whole stack with decades of hindsight?

**The idea:**

- The OS understands content types natively. Mimetype is OS-managed metadata, not a userspace convention.
- The OS renders everything itself, as a pure function of file state. No app needed to view.
- Editors are modal plugins — tools you pick up when you need to change something, then put down. They augment the viewer, they never replace it.
- Every edit writes immediately to a copy-on-write filesystem. There is no Save button. Undo is automatic and non-circumventable — the OS snapshots at operation boundaries regardless of what the editor does.
- Complexity is pushed to leaf nodes behind simple interfaces. The connective tissue stays clean.

Built on established standards where they exist — arm64, ELF, mimetypes, TrueType, Unicode, virtio — but rethinking everything above: no POSIX, no filesystem paths, no application model.

(Link to the design documents in the repo for anyone who wants the full depth.)

---

## the week

Not a diary. Key inflection points.

**Friday:** A conversation becomes code. First commit at 6:27 PM. Boot sequence, timer, memory management. By midnight, a heap allocator.

**Saturday:** The big day. Threading, scheduling, syscalls, per-process address spaces, userspace processes, IPC channels, a handle table. 31 commits. Went from bare boot to a multi-process kernel in one day.

**Sunday:** Design-heavy. Scheduling improvements, the rendering technology decision, device tree parsing. The pace of coding slows because the pace of thinking speeds up — some decisions need to be right, not fast.

**Monday:** Infrastructure hardening. Wait syscall, interrupt forwarding, DMA, process creation from userspace, virtio drivers, kernel stack guard pages. A code review that found real bugs. The kernel starts to feel solid.

**Tuesday:** Pixels on screen. Bitmap fonts, then a compositor, then alpha blending, then a TrueType rasterizer, then structured IPC with ring buffers. The display pipeline goes from nothing to working in one day.

**Wednesday:** 54 commits. Input and event loops at 1 AM. A kernel crash under rapid typing — fixed by 5 AM (11 root causes, including aliasing UB in syscall dispatch and a use-after-free in deferred thread cleanup). Then a formal bug audit: 8 milestones, every unsafe block in the kernel verified, 700+ tests when it’s done. Then editor process separation. Then a text layout engine. Then TrueType compound glyph support. Then a virtio-9p filesystem driver for loading fonts from the host. Midnight.

**Thursday:** [The demo. TBD once mission completes.]

158 commits. 33,000 lines of code. 88 source files. 700+ tests. 2,200 lines of design documentation. 13 settled architectural decisions.

_I’d never even seen Rust code before Friday._

---

## how I worked

This is the part I think might be useful to others.

I was an AI skeptic — not in the “AI is fake” sense, but in the practical sense that I wasn’t convinced they saved more time than they took up. I think Opus 4.5 late last year was when it became clear that they could be a net benefit. And 4.6, which I used for almost everything this week, made me a convert. I cannot be a skeptic anymore.

Getting this repo to this point on my own would surely take a year or two 🤷‍♂️. I’d have to learn Rust from scratch. And ARM assembly (I had one class in college 25 years ago 😣). And the nuances of QEMU, ELF, virtio, aarch64 memory models. And even then — if we’re being honest — there would be almost no useful documentation. And probably no tests 😬.

One detail that might surprise people: I chose Rust partly because Claude told me it’s simply better at writing Rust than C. That turned out to be true — the generated code is idiomatic, the unsafe blocks are well-reasoned, and the compiler catches what the AI misses. Choosing your implementation language based on what your AI collaborator is best at is a new kind of technology decision, but it’s a rational one.

**What AI is good at here:**

- Writing code in a language I don’t know, following patterns I understand architecturally but can’t express in syntax
- Research — surveying prior art, understanding what other OSes do, finding what failed and why. Knowing that OpenDoc’s component model collapsed under COM complexity, or how Plan 9’s per-process namespaces worked, or what BeOS’s BFS attributes looked like in practice — that context directly shaped design decisions
- Holding enormous context — the design documents, the existing codebase, the decisions already made — and producing code that’s consistent with all of it
- The tedious work that is genuinely important: documentation, tests, safety comments on every unsafe block
- Systematic auditing — going through every source file against a checklist, finding real bugs, writing regression tests

**What AI is not good at (and what I did):**

- The design. The thesis, the architectural decisions, the tradeoffs. AI is a great thinking partner — it pokes holes, surfaces connections, brings up prior art — but the decisions are mine. Every settled decision in the register came from a conversation where I was driving.
- Knowing what to build next. The sequencing, the “this decision needs to be settled before that one can move,” the “this is interesting, let’s go deep here.”
- Seeing the forest. I could spot when an IPC pattern was the same shape as an edit protocol pattern and steer toward consistency and reuse across components. The AI implements the trees; the human sees the forest.
- Taste. What’s simple enough. What’s too clever. When to stop.

**The daily workflow that emerged:**

_Morning:_ A planning session. Review where things stand, figure out what the day’s mission should be. Define the scope, the milestones, the validation criteria. Launch the mission.

_While the mission runs:_ Design sessions in another terminal. Settle decisions that will unblock tomorrow’s work. Or explore tangents. The mission runs autonomously — agents doing implementation, code review, testing — while I think about architecture.

_Evening:_ Cleanup. Small fixes, reorganization, making sure the repo is in a state I feel good about before bed. (On the nights I went to bed.)

**The model that works:** Human drives architecture and sequencing. AI handles implementation, testing, auditing, and documentation. Not “AI writes my code” — more like “AI makes it possible to explore at the speed of curiosity.”

(Cost transparency placeholder — once Ross provides the numbers, frame as: “This week cost $X in API calls. I won’t pretend that’s nothing, but for context, [comparison — e.g., less than a week of contractor time for any single component / about what I’d spend on a semester of courses covering these topics / etc.]. The repo, the design, the tests, and everything I learned came out the other side.” Keep it one sentence of number + one sentence of context. No apologizing, no flexing. If omitted, people will assume worse.)

---

## what I learned

(Shorter section. Personal reflections.)

- Rust is remarkable even when you can’t read it. The compiler catches entire categories of bugs at compile time. The test infrastructure is excellent. I still can’t write Rust, but I understand why people love it.
- OS development is more tractable than its reputation suggests, if you’re willing to be selective. I’m not trying to run Firefox. I’m exploring whether a specific design thesis holds together. That focus makes it possible.
- The design is the hard part, not the code. The code is a side effect of the design. This is probably always true, but AI makes it viscerally obvious — when implementation is cheap, you can feel how much of the real work is in the decisions.
- Prior art matters enormously. OpenDoc, Xerox Star, Plan 9, BeOS, Mercury OS, Ideal OS — every one of them informed decisions in this project. Building on ideas is not the same as building on implementations.

---

## where it’s going

This is a design exploration, not a product. I’m not trying to build the next Linux. The primary artifact is a coherent OS design; the code exists to validate that design and to see if the ideas actually work when you try to build them.

The repo is public. The design documents are extensive — if the thesis interests you, start with `design/foundations.md` and `design/decisions.md`. There are [N] settled decisions, [N] open questions, and a journal that tracks every discussion and insight.

The kernel itself is relatively generic — there’s nothing document-centric about a scheduler or a page allocator. It’s a real microkernel: aarch64, SMP, preemptive, formally audited, with clean interfaces. If the OS design interests you, the design documents are where to look. If you just want a small, readable, well-tested Rust kernel to learn from or build on, that might be useful too.

[Link to repo]

What I’m most curious about: does the core thesis hold? Is document-centric computing an idea whose time has come, or are there fundamental reasons it keeps failing? I’ve been thinking about this for a week straight. [I’d love to hear what you think](https://github.com/jonathanrtuck/os/discussions).

---

## notes / open questions

- Length: This is ~1,500 words without the demo section. Probably 1,800-2,000 with it. That’s about right for a blog post that HN would engage with — substantial but not exhausting.
- Tone check: personal throughout, never promotional. "Here’s what happened" not "look what I did."
- The "what AI is not good at" section is important. Without it, the piece reads as "AI did everything." With it, it reads as "here’s how a human and AI actually collaborate on hard problems."
- Usage numbers: would be powerful if available. Makes it concrete. "$200 in API calls" (or whatever it is) is the kind of detail that shifts perception.
- GIF of the demo: the centerpiece. Embedded in blog post and repo README. Plus maybe 1-2 static screenshots (design doc, test output).
- The "What I learned" section could be cut if the post is too long. But "the design is the hard part, not the code" is a strong insight.
- Ross audience: sections 4 and 5 are the payload for him. The daily workflow, the skeptic-to-convert arc, the cost transparency.
