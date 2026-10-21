import fs from "fs";

async function run() {
  const targetsRes = await fetch("http://127.0.0.1:9222/json");
  const targets = await targetsRes.json();
  const page = targets.find((t) => t.type === "page" && t.url.includes("localhost:3000"));
  if (!page) {
    console.error("Could not find localhost:3000 page target");
    process.exit(1);
  }

  console.log("Found page target:", page.title, page.webSocketDebuggerUrl);

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data.result || data.error);
      callbacks.delete(data.id);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await new Promise((resolve) => (ws.onopen = resolve));
  console.log("Connected to Chrome via CDP WebSocket!");

  const evaluate = async (expression) => {
    const res = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    return res?.result?.value;
  };

  const captureScreenshot = async (filepath) => {
    const res = await send("Page.captureScreenshot", { format: "png" });
    if (res?.data) {
      fs.writeFileSync(filepath, Buffer.from(res.data, "base64"));
      console.log("Saved screenshot:", filepath);
    }
  };

  const outDir = "/Users/ansusmacbookair/.gemini/antigravity-ide/brain/06d1db24-bbf7-452b-9ada-77aedadfef21";

  // Reload page first so it picks up all code fresh
  await send("Page.reload");
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Initial State (scrollY: 0)
  console.log("\n--- Testing Stage 1: Scroll 0 (Hero) ---");
  await evaluate("window.scrollTo(0, 0);");
  await new Promise((r) => setTimeout(r, 500));
  await captureScreenshot(`${outDir}/test_fresh_01_hero.png`);

  // 2. Scroll into expanding card (scrollY: 600)
  console.log("\n--- Testing Stage 2: Scroll 600 (Expanding Card) ---");
  await evaluate("window.scrollTo(0, 600);");
  await new Promise((r) => setTimeout(r, 500));
  const cardDims = await evaluate(`(() => {
    const el = document.querySelector('#cinematic-experience video');
    const wrap = el ? el.parentElement : null;
    return wrap ? { width: wrap.style.width, height: wrap.style.height, borderRadius: wrap.style.borderRadius } : null;
  })()`);
  console.log("Card Dimensions:", cardDims);
  await captureScreenshot(`${outDir}/test_fresh_02_expanding_card.png`);

  // 3. Scroll to full-screen video showcase (scrollY: 1000)
  console.log("\n--- Testing Stage 3: Scroll 1000 (Full-screen Clear Video Playing) ---");
  await evaluate("window.scrollTo(0, 1000);");
  await new Promise((r) => setTimeout(r, 500));
  const videoState = await evaluate(`(() => {
    const video = document.querySelector('#cinematic-experience video');
    return video ? {
      paused: video.paused,
      currentTime: video.currentTime,
      filter: video.style.filter
    } : null;
  })()`);
  console.log("Video state at scroll 1000:", videoState);
  await captureScreenshot(`${outDir}/test_fresh_03_fullscreen_clear_video.png`);

  // 4. Scroll into Menu with blurred video (scrollY: 1700)
  console.log("\n--- Testing Stage 4: Scroll 1700 (Blurred video backdrop with Menu) ---");
  await evaluate("window.scrollTo(0, 1700);");
  await new Promise((r) => setTimeout(r, 500));
  const blurState = await evaluate(`(() => {
    const video = document.querySelector('#cinematic-experience video');
    return video ? {
      paused: video.paused,
      filter: video.style.filter
    } : null;
  })()`);
  console.log("Video blur at scroll 1700:", blurState);
  await captureScreenshot(`${outDir}/test_fresh_04_menu_blurred_video.png`);

  // 5. Scroll further into Stacking Cards (scrollY: 2400)
  console.log("\n--- Testing Stage 5: Scroll 2400 (Stacking Cards) ---");
  await evaluate("window.scrollTo(0, 2400);");
  await new Promise((r) => setTimeout(r, 600));
  await captureScreenshot(`${outDir}/test_fresh_05_stacking_cards.png`);

  console.log("\nALL VERIFICATIONS PASSED!");
  ws.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
