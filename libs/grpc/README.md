# GRPC Module

When proto files are changed, it's need to re-run proto-to-ts script:

```
sh scripts/translate-proto-to-ts.sh
```

As result the new `*.ts` file will be created. There will be all interfaces that represent the current proto file.