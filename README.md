# Fundamentos backend

Install dependencies

```bash
npm install
```

Initialize the database (check anuncios.json)

```bash
npm run init-db
```

Start application in development

```bash
npm run dev
```

## API

All calls to the API use the path /apiv1

### GET /anuncios

```json
{
  "results": [
    {
      "_id": "66858eb655c55f4c45222b7e",
      "nombre": "Bicicleta",
      "venta": true,
      "precio": 230.15,
      "tags": [
        "lifestyle",
        "motor"
      ]
    }
  ]
}
```

A query string can be added with the following params:

1. 'skip' and 'limit': skips the first n specified 'anuncios' and limits the output to a number

2. 'sort': sorts by one of the 'anuncios' data

3. 'tag': allows an array of tags and limits the output to the 'anuncios' that have all the tags specified

4. 'venta': selects only the 'anuncios' that are for selling(true) or not(false)

5. 'nombre': output the ones where its name starts with the specified string

6. 'precio': meaning a range, has 4 options:
    * '10-50': 'anuncios' where its prize its between both values
    * '10-': its prize its greater than the value
    * '-50': its prize its litter than the value
    * '50': its prize matches the value

### GET /anuncios/tags

Returns the list of available tags

### POST /anuncios

The params come in the request's body. For example:

|Key|Value|
|---|---|
|tags|lifestyle|
|tags|work|
|nombre|superman3000|
|precio|50.53|
|venta|false|

Gets the following result:

```json
{
    "newAnuncio": {
        "nombre": "superman3000",
        "venta": false,
        "precio": 50.53,
        "tags": [
            "lifestyle",
            "work"
        ],
        "_id": "668597aef1ac977c95fc0d17",
        "__v": 0
    }
}
```
