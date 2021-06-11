

If you face issues of `d3-array.js`, update below code in `node_modules/victory-histogram/node_modules/d3-array/dist/d3-array.js`.

Change this,

```
function cumsum(values, valueof) {
  var sum = 0, index = 0;
  return Float64Array.from(values, valueof === undefined
    ? v => (sum += +v || 0)
    : v => (sum += +valueof(v, index++, values) || 0));
}
```

to this

```
function cumsum(values, valueof) {
  var sum = 0, index = 0;
  return Float64Array.from(values, valueof === undefined
    ? (v => (sum += +v || 0))
    : (v => (sum += +valueof(v, index++, values) || 0)));
}
```