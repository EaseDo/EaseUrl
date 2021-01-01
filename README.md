# EaseUrl

EaseUrl is a small node library that makes parsing and manipulating URLs easy.

#### Install

```
npm install ease-url
yarn add ease-url
```

#### Code time
Paths and query arguments are easy. Really easy.

```
import { EaseUrl } from 'ease-url';

ease = EaseUrl.parse(`https://www.wallework.com/account?key=value#hash`)
```

Or use options with object.

```
ease = EaseUrl.parse({
    scheme: 'http',
    port: 8080,
    host: 'www.wallework.com',
    path: '/account',
    hash: '#hash',
    query: [{key: 'key', value: 'value'}]
})
```

#### Query

```
import { Query } from 'ease-url';

let param = {key: 'key', value: 'value'},
    query = new Query()

query.add(param.key, param.value)
```

query.search output: `key=value`

Or remove param
```
query.remove(param.key)
```

#### structure
```
EaseUrl {
    path: '/account',
    host: 'www.wallework.com',
    hash: '#hash',
    scheme: 'http',
    port: 8080,
    # read only
    origin: 'https://www.wallework.com:8080',
    # read only
    url: 'https://www.wallework.com:8080/account?key=value#hash'
    # query is instance for Query
    query: Query { 
        params: [ { key: 'key', value: 'value' } ],
        # read only
        dict: { key: 'value' }
    } }
```