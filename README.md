# rand

## Sample usage:

```javascript

var rand = require('vz.rand');

rand(5);                  // Integer in the interval [0,5)
rand(0,6);                // Integer in the interval [0,6)
rand(0,6,true);           // Float in the interval [0,6)
rand.string(20);          // String of 20 characters, combination of 0-9a-z
rand.string(20,true);     // Same as above, but including date information
rand.string(20,62);       // String of 20 characters, combination of 0-9a-zA-Z
rand.string(20,62,true);  // Same as above, but including date information

```
