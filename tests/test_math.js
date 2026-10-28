// Check the explorer page's maths (the angles_math block in index.html) against
// reference_cases.json: 200 random tensors whose angles were computed independently in Python.
// Run:  deno run --allow-read tests/test_math.js

const here = (name) => new URL(name, import.meta.url);
const html = await Deno.readTextFile(here("../index.html"));
const block = html.split("// BEGIN angles_math")[1].split("// END angles_math")[0];
const { computeAngles } = new Function(block + "\nreturn { computeAngles };")();

const cases = JSON.parse(await Deno.readTextFile(here("reference_cases.json")));
const TOL = 1e-6;  // degrees
let worst = { err: 0 };
for (const ref of cases) {
  const got = computeAngles(ref.HA, ref.IA, ref.RA)  // the page's forward model takes (HA, IA, RA);
  for (const k of Object.keys(ref)) {
    const err = Math.abs(got[k] - ref[k]);
    if (err > worst.err) worst = { err, k, ref, got: got[k] };
  }
}
console.log(`${cases.length} cases, worst error ${worst.err.toExponential(2)}°` +
            (worst.k ? ` (${worst.k}: page ${worst.got}, python ${worst.ref[worst.k]})` : ""));
if (worst.err > TOL) { console.log("FAIL"); Deno.exit(1); }
console.log("PASS");
