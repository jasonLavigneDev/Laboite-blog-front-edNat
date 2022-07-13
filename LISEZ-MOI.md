# @sveltejs/adapter-node

[Adapter](https://kit.svelte.dev/docs/adapters) pour les applications SvelteKit qui génèrent un serveur Node autonome.

## Usage

Installé avec `npm i -D @sveltejs/adapter-node`, puis ajouter l'[Adapter] à votre `svelte.config.js`:

```js
// svelte.config.js
import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter(),
  },
};
```

## Variables d'environnement

### `PORT` et `HOST`

Par défaut, le serveur acceptera les connexions sur `0.0.0.0` en utilisant le port 3000. Celles-ci peuvent être personnalisées avec les variables d’environnement `PORT` et `HOST` :

```
HOST=127.0.0.1 PORT=4000 node build
```

### `ORIGIN`, `PROTOCOL_HEADER` et `HOST_HEADER`

HTTP ne donne pas à SvelteKit un moyen fiable de connaître l’URL actuellement demandée. La façon la plus simple de dire à SvelteKit où l’application est servie est de définir la variable d’environnement `ORIGIN` :

```
ORIGIN=https://my.site node build
```

Avec cela, une demande pour le chemin `/stuff` se résoudra correctement à `https://my.site/stuff`. Vous pouvez également spécifier des en-têtes qui indiquent à SvelteKit le protocole de requête et l’hôte, à partir desquels il peut construire l’URL d’origine :

```
PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node build
```

> [`x-forwarded-proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto) et [`x-forwarded-host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host) sont de facto des en-têtes standard qui transmettent le protocole d’origine et l’hôte si vous utilisez un reverse proxy (pensez au load balancers et CDN). Vous ne devriez définir ces variables que si votre serveur est derrière un reverse proxy de confiance ; sinon, il serait possible pour les clients d'usurper ces en-têtes.

### `ADDRESS_HEADER` et `XFF_DEPTH`

L’objet [RequestEvent] (https://kit.svelte.dev/docs/types#additional-types-requestevent) transmis aux hooks et aux endpoints comprend une propriété `event.clientAddress` représentant l’adresse IP du client. Par défaut, il s’agit de la connexion `remoteAddress`. Si votre serveur est derrière un ou plusieurs proxies (comme un load balancer), cette valeur contiendra l’adresse IP du proxy le plus interne plutôt que celle du client, nous devons donc spécifier un `ADDRESS_HEADER” pour lire l’adresse de :

```
ADDRESS_HEADER=True-Client-IP node build
```

> Les en-têtes peuvent facilement être usurpés. Comme pour `PROTOCOL_HEADER` et `HOST_HEADER`, vous devriez [savoir ce que vous faites](https://adam-p.ca/blog/2022/03/x-forwarded-for/) avant de les configurer.

Si l’en-tête `ADDRESS_HEADER` est `X-Forwarded-For`, la valeur de l’en-tête contiendra une liste d’adresses IP séparées par des virgules. La variable d’environnement `XFF_DEPTH` doit spécifier le nombre de proxys de confiance devant votre serveur. Par exemple, s’il y a trois proxy de confiance, les proxys 3 transmettront les adresses de la connexion originale et des deux premiers proxys :

```
<client address>, <proxy 1 address>, <proxy 2 address>
```

Certains guides vous diront de lire l’adresse la plus à gauche, mais cela vous laisse [vulnérable à l'usurpation d'identité](https://adam-p.ca/blog/2022/03/x-forwarded-for/):

```
<spoofed address>, <client address>, <proxy 1 address>, <proxy 2 address>
```

Au lieu de cela, nous lisons à partir du _right_, en tenant compte du nombre de proxy de confiance. Dans ce cas, nous utiliserions `XFF_DEPTH=3`.

> Si vous devez plutôt lire l’adresse la plus à gauche (et ne vous souciez pas de l'usurpation d'identité) — par exemple, pour offrir un service de géolocalisation, où il est plus important que l’adresse IP soit _real_ que _trusted_, vous pouvez le faire en inspectant l’en-tête `x-forwarded-for` de votre application.

## Options

L’adapter peut être configuré avec différentes options :

```js
// svelte.config.js
import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      out: "build",
      precompress: false,
      envPrefix: "",
    }),
  },
};
```

### out

Le répertoire vers lequel construire le serveur. Par défaut, il est `build`. C'est à dire `node build` lancerait le serveur localement après sa création.

### precompress

Permet le prétraitement à l’aide de gzip et de brotli pour les assets et les pages préétablies. Par défaut, la valeur est `false`.

### envPrefix

Si vous devez changer le nom des variables d’environnement utilisées pour configurer le déploiement (par exemple, pour déconfliter avec des variables d’environnement que vous ne contrôlez pas), vous pouvez spécifier un préfixe :

```js
envPrefix: "MY_CUSTOM_";
```

```
MY_CUSTOM_HOST=127.0.0.1 \
MY_CUSTOM_PORT=4000 \
MY_CUSTOM_ORIGIN=https://my.site \
node build
```

## Serveur personnalisé

L’adapter crée deux fichiers dans votre répertoire de compilation — `index.js` et `handler.js`. Exécuter `index.js` — ex., `node build`, si vous utilisez le répertoire de construction par défaut — lancera un serveur sur le port configuré.

Vous pouvez également importer le fichier `handler.js`, qui exporte un gestionnaire compatible avec [Express](https://github.com/expressjs/expressjs.com), [Connect](https://github.com/senchalabs/connect) ou [Polka](https://github.com/lukeed/polka) (ou même seulement le [`http.createServer`](https://nodejs.org/dist/latest/docs/api/http.html#httpcreateserveroptions-requestlistener)) et configurez votre propre serveur :

```js
// my-server.js
import { handler } from "./build/handler.js";
import express from "express";

const app = express();

// ajouter un itinéraire qui vit séparément de l’application SvelteKit
app.get("/healthcheck", (req, res) => {
  res.end("ok");
});

// Laissez SvelteKit gérer tout le reste, y compris le service des pages prérendered et des static assets
app.use(handler);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
```

## Deploiement

Vous aurez besoin du répertoire de sortie (`build` par défaut), du `package.json` du projet et des dépendances de production dans `node_modules` pour exécuter l’application. Les dépendances de production peuvent être générées avec `npm ci --prod`, vous pouvez également ignorer cette étape si votre application n’a pas de dépendances. Vous pouvez ensuite démarrer votre application avec

```bash
node build
```

## Changelog

[Le Changelog de ce paquet est disponible sur GitHub](https://github.com/sveltejs/kit/blob/master/packages/adapter-node/CHANGELOG.md).

## License

[MIT](LICENSE)
