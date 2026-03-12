# Recent Projects

## [os](https://github.com/jonathanrtuck/os)

- A design exploration for a document-centric operating system
- Inverts the traditional model: _OS → Document → Tool_ instead of _OS → App → File_
- Fully content-aware through [mimetypes](https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types) and rich queryable metadata

So far, the project has produced a bare-metal [aarch64](https://en.wikipedia.org/wiki/AArch64) microkernel written in [Rust](https://www.rust-lang.org/) that boots in [QEMU](https://www.qemu.org/). Notably, the kernel is a well-documented, general-purpose implementation — not coupled to the document-centric design above.

## [Mario](https://jonathanrtuck.github.io/mario/) ([Repo](https://github.com/jonathanrtuck/mario))

Recreation of World 1 Level 1 from [Super Mario Bros.](https://en.wikipedia.org/wiki/Super_Mario_Bros.) using [canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas).

Everything was created from scratch using [bitmaps](https://en.wikipedia.org/wiki/Bitmap) and [Classes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Classes_in_JavaScript) for game entities.

It was an interesting challenge to figure out how to create a video game with no prior knowledge or research. I had to stumble through the implementation of a [game loop](https://gameprogrammingpatterns.com/game-loop.html) and physics, including [collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection), which required many rewrites.

The level is mostly playable. Although, enemies and items, such as coins, have not been added yet.

### Keys

| Key(s)            | Action               |
| ----------------- | -------------------- |
| `Shift`, `z`      | run / throw fireball |
| `Spacebar`, `x`   | jump                 |
| `a`, `LeftArrow`  | move left            |
| `d`, `RightArrow` | move right           |
| `s`, `DownArrow`  | crouch               |
| `Enter`           | pause                |
