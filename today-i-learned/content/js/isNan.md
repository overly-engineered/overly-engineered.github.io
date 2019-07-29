---
title: "isNan"
metaTitle: "TIL: isNaN"
---

There are two different versions of isNan that produce different results

### isNan()

The global isNan function produces a lot of false positives

```javascript
isNaN(false); // false
isNaN(true); // false
isNaN(0); // false
isNaN("string"); // true
isNaN({}); // true
isNaN(NaN); // true
```

### Number.isNaN()

Number.isNaN is more reliable at detecting what is NaN and what isnt.

```javascript
Number.isNaN(false); // false
Number.isNaN(true); // false
Number.isNaN(0); // false
Number.isNaN("string"); // false
Number.isNaN({}); // false
Number.isNaN(NaN); // true
```
