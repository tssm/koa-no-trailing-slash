Koa middleware that redirects all requests to an URL with a
trailing slash to the same URL without it, ignoring the query
string (key and value).

# Installation

    npm install koa-no-trailing-slash

# Usage

```javascript
const app = new (require('koa'));
app.use(reuire('koa-no-trailing-slash')());
app.use(function *(next) {
   this.response.body = 'Did this URL had a trailing slash?';
});
app.listen(8000);
```

# License

[CC0](https://creativecommons.org/publicdomain/zero/1.0/)

# Related middleware

[koa-lowercase-url](https://www.npmjs.com/package/koa-lowercase-url)
