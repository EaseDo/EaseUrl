import { Query } from './../src/parse';

test('query instance test', () => {

    let param = {key: 'key', value: 'value'},
        query = new Query()

    expect(Object.values(query.dict).length).toBe(0);

    const assert = () => {
        expect(query.dict.key).toBe(param.value);
        expect(query.params[0].key).toBe(param.key)
        expect(query.params[0].value).toBe(param.value)
        expect(query.search).toBe(`${param.key}=${param.value}`)
    }

    query.add(param.key, param.value)
    assert()

    query = new Query({key: 'value'})
    assert()

    query = new Query([param])
    assert()

    query = new Query('?key=value')
    assert()
    
    query.remove(param.key)
    expect(Object.values(query.dict).length).toBe(0);
    expect(query.params.length).toBe(0);
    expect(query.search).toBe('')

});