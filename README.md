# Kwekerij Annie

Korte toelichting bij de technische keuzes voor dit assessment.

---

## Waarom Vite?

Ik heb Vite gekozen als build tool in plaats van Create React App (CRA) of alleen Webpack:

- Vite is heel snel voor development. Geen grote bundle die eerst gebouwd moet worden.
- Het is een moderne stack
- Makkelijke config

---

## Overige keuzes

- **Tailwind CSS** – Snelle styling, meeste ervaring mee. Heb ook ervaring met css, scss, bootstrap.
- **Axios** – Betere error handling, automatische json parsing, ingebouwde beveiliging.
- **Heroicons** – Consistente icon library, makkelijk te gebruiken.
- **ESLint + Prettier** – Consistente code, checken op linting problemen.

---

## Projectstructuur

- `src/api/` – API-client en product-endpoints  
- `src/components/` – Herbruikbare UI (navigatie, productCards, filters)  
- `src/pages/` – Pagina’s gekoppeld aan routes  
- `src/utils/` – Hulpfuncties
- `src/types/` – TypeScript-types (Product)

---

## Starten

```bash
npm install
npm run dev
```

Zorg dat `VITE_API_URL` in een `.env` bestand staat (of in de omgeving) zodat de product-API bereikbaar is.

## Aanbeveling
- Zorg dat de API nameFilter niet hoofdletter gevoelig is.

