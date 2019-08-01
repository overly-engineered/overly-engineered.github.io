---
title: "Selector quick reference"
metaTitle: "TIL: selectors"
---

Just some quick reference selectors

```scss
ul li {
  color: red;
} // all children
ul > li {
  color: red;
} // direct desendents
ul + li {
  color: red;
} // adjacent sibling
ul ~ li {
  color: red;
} // following siblings
div[class^="class"] {
  color: red;
} // class starts with
div[class*="class"] {
  color: red;
} // class contains
```
