# complex_pen
distance calculator

# example usage
```
const range = 100
const data = await readFile(filePath, { encoding: 'utf8' });
const partnersInRange = inCircle(
    { latitude: 42.6665921, longitude: 23.351723 },
    partnerParser(data),
    range
).sort(function (a, b) => (a.partner_id < b.partner_id) ? -1 : 1)
```