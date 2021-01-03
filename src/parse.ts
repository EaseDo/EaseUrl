export type Url = {
    path: string,
    host: string,
    port: number,
    hash: string,
    scheme?: string,
    query?: Array<{key: string, value: string}>
}

enum HashPos {
    BEFORE,
    AFTER
}

export class EaseUrl {

    static parse(url?: string | Url) {
        return new EaseUrl(url)
    }

    public path: string = '/'
    public host: string = ''
    public hash: string = ''
    public scheme: string= 'https'
    public query: Query

    private _port: number = undefined
    private _hashPos: HashPos = HashPos.AFTER

    public set port(v: number) {
        this._port = v
    }

    public get port() {
        return this._port ?? this.defaultPorts[this.scheme]
    }

    public get origin() {
        let port = this.defaultPorts[this.scheme] == this.port ? undefined : this.port
        return `${this.scheme ? this.scheme + '://' : '' }${this.host}${port ? ':' + port : ''}`
    }

    public get url() {
        let befHash = this._hashPos == HashPos.BEFORE ? this.hash : '',
            aftHash = this._hashPos == HashPos.AFTER ? this.hash : ''
        return `${this.origin}${this.path}${befHash}${this.query.params.length ? '?' + this.query.search : ''}${aftHash}`
    }

    private get defaultPorts() {
        return {
            http: 80,
            https: 443
        }
    }

    constructor(url?: string | Url ) {

        this.query = new Query()

        url && this.parse(url)
    }
    

    parse(url: string | Url) {

        if (typeof url == 'string') {

            let parsed = (url as String).split('?'),
                find = parsed[0].split('#')
                
            if (find.length > 1) {
                this._hashPos = HashPos.BEFORE
                this.hash = '#' + find[1]
            }   

            find = find[0].match(/(([a-z]+):\/\/)?([0-9a-z\.\-]+)(:([0-9]{2,7}))?(\/.*)?(#.*?)?/i)
            
            if (find) {
                this.scheme = find[2] ?? 'https'
                this.host = find[3]
                this.path = find[6] ?? '/'
    
                this._port = Number(find[5]) || undefined
            }
            

            if (parsed.length > 1) {
                
                find = parsed[1].split('#')

                if (find.length > 1) {
                    this._hashPos = HashPos.AFTER
                    this.hash = '#' + find[1]
                }
                
                this.query.parse(find[0])
            }

        }
        else if (typeof url == 'object') {

            this.host = url.host
            this.path = url.path || '/'
            this.hash = url.hash || ''
            this.scheme = url.scheme || 'https'
            this._port = url.port
            
            this.query.parse(url.query)

        }
    }

}

export type QueryParam = {
    key: string, 
    value: string | number
}

export class Query {

    params: Array<QueryParam> = []

    constructor(query: string | Array<QueryParam> | Object = []) {
        this.parse(query)
    }

    public parse(query: string | Array<QueryParam> | Object = []) {

        const queryType = query.constructor

        this.params.length = 0

        if (queryType == Object) {
            for(let key in query as object) {
                this.params.push({key: key, value: query[key]})
            }
        }
        else if (queryType == Array) {
            (query as Array<QueryParam>).forEach((item) => {
                this.params.push({key: item.key, value: item.value})
            });
        }
        else if (queryType == String) {
            (query as string).split('&').forEach((item) => {
                const param = item.match(/([0-9a-z\.\-\_]+)=(.*)/i)
                if (param) {
                    this.params.push({key: param[1], value: param[2]})
                }
            })
        }
    }

    public get dict() : {[key: string]: string | number} {
        const dict = {}
        this.params.forEach((item) => {
            dict[item.key] = item.value
        });
        return dict
    }

    public get search() {
        const query = [];
        this.params.forEach((item) => {
            query.push(`${item.key}=${item.value}`)
        })
        return query.length ? query.join('&') : ''
    }

    public add(key: string, value: string | number) {
        this.params.push({key: key, value: value})
    }

    public remove(key: string) { 
        for (let i in this.params) {
            if (this.params[i].key == key) {
                this.params.splice(Number(i), 1)
                break
            }
        }
    }

}