# CDTI Angles Explorer

An interactive 3D view of a cardiac diffusion tensor in the local left-ventricular frame
(radial R, circumferential C, longitudinal L), showing how each angle used to describe the
tensor is measured. Set the tensor with the forward model's angles (HA, IA, RA), rotate it, and switch between three
families of angles:

| View | Angles | What they measure |
|---|---|---|
| The forward model | HA, IA, RA | The sliders. HA: the fibre direction e1 within the wall; IA: how steeply e1 dives into the wall; RA: the roll of the sheetlet (e2, e3) about e1, from the cross-myocyte vector v_cm (flat in the wall) towards v_rad (standing across it) |
| Alternative angles | EA, TA, SIA | EA and TA describe e1 with l as the pole (elevation out of the R–C plane, azimuth within it); SIA is e2 against the wall (C–L) plane |
| Describing the aggregate | E2A, AA | E2A: e2 projected into the v_cm–R plane, from v_cm (close to RA); AA: the sheetlet normal e3 against R |

Angles that nearly coincide (HA and EA; IA and TA; RA, SIA and E2A) are in different views, so each is visible.

A chart shows how SIA, E2A and AA differ from RA at the current intrusion angle IA. RA, SIA and
E2A are equal only when IA = 0; signed AA never gets closer to 0 than |IA|, so it jumps by
2|IA| where its sign changes.

**Live version:** <!-- TODO: GitHub Pages URL -->
**Paper:** <!-- TODO: citation / DOI -->

## Run it locally
Everything is in `index.html`; three.js 0.160.0 is included in `vendor/three/`.

Serve the folder and open the page:

    python -m http.server 8000
    # then open http://localhost:8000/

Opening `index.html` directly as a file also works in most browsers. If the local copy of
three.js is blocked there, the page loads the same version from jsDelivr instead (this needs an
internet connection). If the 3D view cannot start at all, the page shows the error.

## Tests
`tests/test_math.js` checks the page's angle calculations (the `angles_math` block in
`index.html`) against `tests/reference_cases.json`: 200 random tensors whose angles were
computed independently in Python. Run it with [Deno](https://deno.com):

    deno run --allow-read tests/test_math.js

The worst error should be about 1e-13 degrees.

## Licence
MIT, see `LICENSE`. 3D rendering uses [three.js](https://threejs.org), also MIT
(see `vendor/three/LICENSE`).
