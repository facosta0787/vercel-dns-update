# Vercel DNS Records Update/Create

## Install

### Command

```bash
curl -o- https://raw.githubusercontent.com/facosta0787/vercel-dns-update/main/tools/install.sh | sh
```

### Options

| Option | Description |
| ------ | ----------- |
| `--domain` | Domain to update the records|
| `--records` | Recrods to update, It can be comma separeted list|

#### Example

```bash
TOKEN=<your-vercel-token> node bin/dns-update --domain=yourdomain.com --records=record1,record2
```
### Author

@facosta0787
