import { EaseUrl } from './../src/parse';

test('EaseUrl instance test', () => {

    let url = {
        scheme: 'http',
        port: 8080,
        host: 'www.wallework.com',
        path: '/account',
        hash: '#hash',
        query: [{key: 'key', value: 'value'}]
    }
    let ease = new EaseUrl()

    expect(ease.origin).toBe('https://')

    ease.scheme = url.scheme
    expect(ease.origin).toBe('http://')

    ease.host = url.host
    expect(ease.origin).toBe(`${url.scheme}://${url.host}`)

    ease.port = url.port
    expect(ease.origin).toBe(`${url.scheme}://${url.host}:${url.port}`)

    ease.port = 80
    expect(ease.origin).toBe(`${url.scheme}://${url.host}`)

    ease.query.add('key', 'value')
    expect(ease.url).toBe(`${url.scheme}://${url.host}/?key=value`)
    
    ease.path = url.path
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}?key=value`)

    ease.hash = url.hash
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}?key=value${url.hash}`)
    console.log(ease)
    ease = EaseUrl.parse(`${url.scheme}://${url.host}${url.path}?key=value${url.hash}`)
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}?key=value${url.hash}`)

    ease = EaseUrl.parse(`${url.scheme}://${url.host}${url.path}${url.hash}?key=value`)
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}${url.hash}?key=value`)

    ease = EaseUrl.parse(`${url.scheme}://${url.host}${url.path}${url.hash}`)
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}${url.hash}`)

    ease = EaseUrl.parse(`${url.scheme}://${url.host}${url.path}`)
    expect(ease.url).toBe(`${url.scheme}://${url.host}${url.path}`)

    ease = EaseUrl.parse(`${url.host}${url.path}`)
    expect(ease.url).toBe(`https://${url.host}${url.path}`)

    ease = EaseUrl.parse(`${url.host}`)
    expect(ease.url).toBe(`https://${url.host}/`)

    ease = EaseUrl.parse(`${url.host}${url.path}${url.hash}?key=value`)
    expect(ease.url).toBe(`https://${url.host}${url.path}${url.hash}?key=value`)
    
    ease = EaseUrl.parse(url)
    expect(ease.url).toBe(`${url.scheme}://${url.host}:${url.port}${url.path}?key=value${url.hash}`)

});