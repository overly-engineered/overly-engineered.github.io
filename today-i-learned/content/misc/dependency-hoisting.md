---
title: "Dependency hoisting"
metaTitle: "TIL: dependency hoisting"
---

# Never trust hoisting.

Never trust dependency hoisting, ever.

Scenario:

```
|- DependencyA @1.0
|- DependencyB @1.1
|- |- DependencyA @0.4 <-- unsafe to hoist
```

There is no guarantee which version of Dependency A will be used by dependency B.

If you need to be certain use the resolutions option in package.json

```
"resolutions": {
  "DependencyA": "1.0"
}
```
