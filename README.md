aupr
====

AUPR -> auth-user-password-rights

## Installation

```sh
$ npm install aupr
```

## Basic usage

```js
var express = require('express');
var app = express();
var aupr = require('aupr');

aupr.parseAuthData("MariaUshiromiya:beatrice:r,EnmaAi:revenge:rw");
// or aupr.parseAuthData([{name: 'MariaUshiromiya', pass: 'beatrice', permission: {read: true, write: false}},{name: 'EnmaAi', pass: 'revenge', permission: {read: true, write: true}}]);

app.use(aupr.auth);

```

--------------------------

### [License (MIT)](LICENSE)