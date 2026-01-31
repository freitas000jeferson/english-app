This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
pnpm lint // executa lint
pnpm format // executa formata o codigo
pnpm check // executa lint e formata
pnpm test // executa testes unitarios com vitest
pnpm test:ui // executa testes
pnpm test:run // executa testes
```


## importar novas palavras para base de dados
```bash
node scripts/importWordsData.ts
```
## Backup e restore (simples e poderoso)
### Backup
copiar prisma/dev.db → backup

### Restore
colar dev.db → projeto