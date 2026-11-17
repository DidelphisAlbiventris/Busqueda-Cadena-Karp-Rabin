# Architecture Index

This index is not the full contract. Do not implement from this file alone; follow the artifact paths below.

## Implementation Guide

### Global artifacts

- `unit_graph.yaml`: boundary, entrypoint and source anchors. Read the `interactive-search` row first.
- `wire_contracts.yaml`: outward API and integration contracts; this project currently has none.
- `shared_modules.yaml`: cross-unit modules; currently empty because there is one unit.
- `cross_unit_state.yaml`: implicit state flows; currently empty because state is explicit in `App`.
- `project-structure.md`: module/layer map and structural observations.
- `tech-stack.md`: existing runtime, dependencies, scripts and configuration findings.
- No `seams.yaml` is emitted because no partial-migration seam was found or declared.

### Unit: interactive-search

- external trigger: SPA page interactions in the root document; form submit, next-step button and restart button.
- must read:
  - `units/interactive-search/behavior.yaml` — side effects, branches, error contracts and synchronous transition semantics.
  - `units/interactive-search/bindings.yaml` — React mounting, event bindings and runtime constants.
  - `units/interactive-search/unit_decomposition.yaml` — advisory split candidates only; `commit: false` means no split is decided.
- relevant global rows:
  - `wire_contracts.yaml`: no rows.
  - `shared_modules.yaml`: no rows.
  - `cross_unit_state.yaml`: no rows.
- before DONE report: artifacts read, every `must_preserve` and `must_appear_in_target` item verified, unresolved cleanup observations, and test/build/runtime evidence.

## Review notes

- The implementation currently passes the available unit tests and production build.
- `src/components/HashDetails.jsx` is an unreferenced component and `src/vite.config.js` is a duplicate configuration candidate; confirm whether to integrate/remove them in the cleanup pass.
