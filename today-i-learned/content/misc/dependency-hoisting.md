---
title: "Dependency hoisting"
metaTitle: "TIL: dependency hoisting"
---

# Never trust hoisting.

## Problem

Never trust dependency hoisting, ever.

Scenario:

```
|- DependencyA @1.0
|- DependencyB @1.1
|- |- DependencyA @0.4 <-- unsafe to hoist
```

There is no guarantee which version of Dependency A will be used by dependency B.

If you need to be certain use the resolutions option in package.json, or upgrade your version of dependencyB.

```
"resolutions": {
  "DependencyA": "1.0"
}
```

## A possible solution to be tested

https://yarnpkg.com/blog/2018/02/15/nohoist/

## Further reading

https://yarn.bootcss.com/blog/2017/05/31/determinism/
