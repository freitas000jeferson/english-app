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


## Script gpt
```
{  "name": "Drinks",  "slug": "drinks" },
{  "name": "Body Parts",  "slug": "body-parts" },
{  "name": "Family",  "slug": "family" },
{  "name": "Daily Routine",  "slug": "daily-routine" },
{  "name": "Time & Frequency",  "slug": "time-frequency" },
{  "name": "City Places",  "slug": "city-places" },
{  "name": "Nature & Geography",  "slug": "nature-geography" },
{  "name": "Jobs & Professions",  "slug": "jobs-professions" },
{  "name": "Common Verbs",  "slug": "common-verbs" },
{  "name": "Phrasal Verbs (Basic)",  "slug": "phrasal-verbs-basic" },
{  "name": "Adjectives",  "slug": "adjectives" },
{  "name": "Emotions & Feelings",  "slug": "emotions-feelings" },
{  "name": "Technology",  "slug": "technology" },
{  "name": "Health",  "slug": "health" },
{  "name": "Shopping & Money",  "slug": "shopping-money" },
{  "name": "Travel",  "slug": "travel" },
{  "name": "Abstract Words",  "slug": "abstract-words" },
{  "name": "False Cognates",  "slug": "false-cognates" },
{  "name": "Common Mistakes (PT-BR)",  "slug": "common-mistakes-ptbr" },
{  "name": "Irregular Verbs",  "slug": "irregular-verbs" }]

Crie uma lista de 10 palavras para cada categoria a seguir food
Crie um Json com o seguinte formato { en: string; pt: string; partOfSpeech: string; category: string; description: string; examples: Array<{ affirmativeEn: string; affirmativePt: string; negativeEn: string; negativePt: string; interrogativeEn: string; interrogativePt: string; }>;}
no category use o slug "food", nos examples deve conter a mesma frase em ingles(en)-portugues(pt) nas versoes afirmativas, negativa e interrogativa. E adicione de 3 exemplos
```