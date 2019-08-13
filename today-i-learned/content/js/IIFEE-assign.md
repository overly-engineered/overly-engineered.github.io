---
title: "Method chaining"
metaTitle: "TIL: method chaining"
---

Really useful rather than declaring a variable using let before hand.

```javascript
let a;
if(thing) {
  a = abc;
} else {
  switch(case) {
    case a: {
      return bac;
    }
    case b: {
      return cab;
    }
    default: {
      return bca;
    }
  }
}
```

Removes the chances of a being undefined.

```javascript
const a = (() => {
  if(thing) {
    return abc;
  }
  switch(case) {
    case a: {
      return bac;
    }
    case b: {
      return cab;
    }
    default: {
      return bca;
    }
  }
})
```
