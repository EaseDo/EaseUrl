export type Url = {
    path: string,
    host: string,
    port: number,
    hash: string,
    scheme?: string,
    query?: Array<{key: string, value: string}>
}

export enum HashPos {
    BEFORE,
    AFTER
}

export class EaseUrl {

    static parse(url?: string | Url) : EaseUrl

    public path: string
    public host: string
    public hash: string
    public scheme: string
    public query: Query

    public set port(v: number)
    public get port() : number
    public get origin() : string
    public get url() : string

    constructor(url?: string | Url )
    parse(url: string | Url) : void

}

export type QueryParam = {
    key: string, 
    value: string | number
}

export class Query {

    public params: Array<QueryParam>

    public get dict() : {[key: string]: string | number}
    public get search() : string

    constructor(query: string | Array<QueryParam> | Object)
    public parse(query: string | Array<QueryParam> | Object)

    public add(key: string, value: string | number)
    public remove(key: string)

}