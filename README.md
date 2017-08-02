# tfux-deploy-replace-file
tfux-deploy-replace-file


## INSTALL

```bash
npm install [-g] tfux-deploy-replace-file
```

## USE

```js
fis.match('**', {
    deploy: [
        fis.plugin('replace-file', {
            from: 'from/string',
            to: 'to/string' //file path
        }),
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```


## EXAMPLE


```js
fis.match('**', {
    deploy: [
        fis.plugin('replace-file', {
            from: '__zhTranslate()',
            to: 'i18n/zh_CN.json'
        }),
        fis.plugin('local-deliver')
    ]
});
```


