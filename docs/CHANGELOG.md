# Changelog

## [1.9.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.8.1...release/1.9.0) (2023-11-07)


### Features

* **matomo:** change matomo integration method ([2c4011d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/2c4011d74776b7b4fd9c207a1eaf20719725f209))
* **matomo:** integrate Matomo client ([934e631](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/934e631205cc65497865b04e687b47659962cf0e))


### Bug Fixes

* **articles:** fix tag search in articles tab ([89a2513](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/89a2513334261c1f301bf05106377ee729959d43))
* **articles:** no empty tag filter ([4e975f3](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/4e975f33ffd0e43783b7c0fdc721d396bef57ede))
* **articles:** prevent same tag to be add ([beb870b](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/beb870b8da885f78ade5e138c7eaa1f7e19cdb00))
* **articles:** search by tag with enter key ([e0f0623](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/e0f0623b2c5d9097e84263c0b3a31a51696227ee))
* **audit:** update critically vulnerable libraries ([509a620](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/509a6207f58dd5c147d69b6b4ea1a761e3bf129a))
* **gitignore:** add new ignored folder ([c7fa86d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/c7fa86dc0560276c92123a63f8b428f9c7c0319e))
* **library:** upgrade svelte-i18n to non broken version ([be96034](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/be9603460c70de98666aadbb9a0c7c6770851001))
* **tags:** fix active tags not updating when selecting a tag ([192ed9a](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/192ed9a8c90dfa6de06a71a10cf6ad687b8bf9b2))

### [1.8.1](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.8.0...release/1.8.1) (2023-10-02)


### Bug Fixes

* **articles:** adjust sanitizeHtml parameters for articles ([1e5f84f](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/1e5f84f4d7ddba37a891c2cee3c72bf2bb69d515))
* **articles:** allow embedded videos in articles ([2de64d0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/2de64d0dcbaf2001fb0d0aff914c3628c86eb689))

## [1.8.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.7.0...release/1.8.0) (2023-08-24)


### Features

* **index:** add version number in tab name ([6e3b536](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/6e3b536cab219f25f93f9b1e9b29bdc92b1a477e))
* **maintenance:** display maintenance message when needed ([8035596](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/803559641f9f53476ee552bcaeba8c5ff697fde9))
* **refactor:** rewrite code for sveltekit 1.20 ([b39c565](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b39c56540ca45c5ffb3cdc22ae0e0753074b4263))
* **search:** search is now case insensitive ([4cafecc](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/4cafecc6331d642f86b0d5bb670ed4168a60ebe2))


### Bug Fixes

* **audit:** force resolution of semver library version ([1e589ca](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/1e589cac547d6b3261a4d56d4acbf46f9f2c458f))
* **refactor:** fetch maintenance data ([b71031d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b71031d3418b1cdf0b4ce68b2fd364e72cea6702))
* **refactor:** get version from package.json ([1ce78b1](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/1ce78b1ed20f91cf97d38788187166d5e8b6eb83))
* **refactor:** update favorites page ([91aaf6f](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/91aaf6f0c6471c4fd976a42ed03226388db989bb))
* **search:** manage c letter in case insensitive search ([3bf9431](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/3bf94312bf30ed41bb56ae979785180db8faf45a))
* **translation:** replace tag by mot clé in french translation ([a7a6668](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/a7a66683aa45bc1cdef50742e9894b241ab91814))

## [1.7.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.6.0...release/1.7.0) (2023-04-18)


### Features

* **favorite:** add count of favorite added ([e17b345](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/e17b345f3dcc3027fd43f17558e72b08e97af190))
* **favorite:** change expend button style ([39f1b82](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/39f1b8216bad744a1c6c12e350c4496d84f41c41))
* **favorite:** collapse fav group in favorite page ([b25ad46](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b25ad46f402c036550516afe58884649d78a0d41))
* **favorite:** factorise front html ([02371a9](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/02371a933d3cd7af9908f7d5ad87a13cfdf736ab))
* **favorites:** add i18n and some style ([caadafe](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/caadafeab5b439020448a37504deedf2d7888cad))
* **fevorites:** change divider position ([280a26f](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/280a26f3f294cd2bbe04d1db12916ad1c927fca6))


### Bug Fixes

* **articles:** sanitize article content before displaying ([e1664a9](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/e1664a903bfb4098e83f9079109316c11ce4792b))

## [1.6.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.5.0...release/1.6.0) (2023-02-24)


### Features

* **favorite:** add delte button for favorite group ([5075653](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/507565369240e56f77a2ea14ac005a7ff7acb4ec))


### Bug Fixes

* **articles:** fix pagination ([b110c03](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b110c031e3c7d3a4c88ca8b6631ce13bed9e159a))

## [1.5.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.4.0...release/1.5.0) (2023-01-30)


### Features

* **groups:** display structure groups correctly ([07b0960](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/07b0960cabc9017698ec8385cb18f78d783ab19f))
* **tag:** factorise add tags management ([84cb2a5](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/84cb2a5377450cebf235ee99e099e5c60b7f2770))
* **tags:** allow click for searching on article tags ([b2c4c3d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b2c4c3d1c561038882269bb865c3974bdb2e7a4c))


### Bug Fixes

* **stylesheet:** delete import from quilljs cdn ([fb9255e](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/fb9255ee48d1b16113f15825e13b45730b6c14ff))
* **tags:** delete tagfilter in useless pages ([af6fc31](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/af6fc31b6a9e08e19a9735fdeece33cd5c9788a5))

## [1.4.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.3.0...release/1.4.0) (2022-11-22)


### Features

* **articles:** hide tags card if article hasn't tags ([414514f](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/414514f649fd416dcd13d7189f051214810e5c32))
* **button:** add tooltip on all favorites button ([56b1953](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/56b1953b84985d2949093b3bdd4df4491ad36e6e))
* **config:** add prettier in project ([355a01a](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/355a01ab44b52f6ca85184a06099af1915c2e9d7))
* **config:** add svelte plugin for prettier ([ee73449](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/ee73449ed1a2a6cd958ba1adc4eda8ddcaaddf04))


### Bug Fixes

* **academies:** change sort order in academies page ([cdaf6cc](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/cdaf6cc3a72974066534397b9f7625388357eb03))
* **authorcard:** add unknown author case ([7f591d1](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/7f591d1087c954531efbcd22218922c4261985e4))
* **favoritesGroup:** add container for spacing each card ([471030d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/471030d4e3e319e6ce3091822f9779cb367d1d6a))
* **footer:** get appsettings from laboite to generate footer links ([8fb7970](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/8fb7970b93f1137e512668aacabf91daa9a6d85e))
* **prettier:** format all svelte file with prettier new config ([a4ae51c](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/a4ae51ca6aa970f0a5572cc5ba34af8b110432ea))


### Code Refactoring

* **title:** change page title from la boite le blog to la boite ([e6c95e0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/e6c95e079f71c09a8e396152019d3c2b5c841e67))

## [1.3.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.2.0...release/1.3.0) (2022-09-20)


### Features

* **article:** add licence to articles ([97ef8cc](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/97ef8cc3c03c5f8cc38ac822467d898fdd4c46d7))
* **image:** add alt attribute on licence image ([a493148](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/a4931489cc9dfdc8232e1ddd34dcff61039ecd87))


### Bug Fixes

* **article:** fix large article display and add hide option button ([0f3ed8b](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/0f3ed8b6e074f18a4fc0ad4897b201fc2dabeeb7))
* **i18n:** add i18n for license field ([5276e23](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/5276e2391d6221cfaf31bc7150550500103cd364))
* **ui:** add tooltip translations ([11c98dd](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/11c98dd9941a01109518306367b76448980f329b))
* **ui:** fix i18n for licenses ([3de56fd](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/3de56fdfbe8cc95aacff8fae56e96552da222242))


### Documentation

* **readme:** add translation for readme and licence in source code ([fdd6f40](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/fdd6f40978c76b0a837f134e2a950ae5378027aa))

## [1.2.0](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/compare/release/1.1.1...release/1.2.0) (2022-07-04)


### Features

* **env:** add adapter to generate build ([ba76c35](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/ba76c35e0464820364a812357f72f8adb0288330))
* **env:** change env handling ([377d0cd](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/377d0cdce61e949c0794e5c555fa510bdaa58e5b))
* **structure:** migrate & structure ([81681bf](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/81681bfff7297a79d701878658c2b5a615b01018))
* **ui:** host fontAnsome icons and fonts localy ([7468ebb](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/7468ebb9bc5f7371508a8c3572367b87230d2af9))


### Bug Fixes

* **articles:** fix mardown color syntax plugin ([2a373c2](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/2a373c220676a5955d7e322b467d895492c1fe97))
* **audit:** update libraries, add license ([609ccd3](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/609ccd3ce72d52dabed466b24caeb920bb9d9563))
* **authors:** display structures ([18f3832](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/18f3832461f724cb76d22216a02fd33abd6b35ed))
* **authors:** prevent too many api calls on authors card ([50d39e5](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/50d39e530a2baf357c09329d34878149072f8932))
* **build:** start refactor of Dockerfile ([69e309e](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/69e309e3521718948be4a338324dece4285cbff5))
* **docker:** alignment, declare port only once ([96c267a](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/96c267a1bf375ffa5129a6b04c6c742c934b3b54))
* **Dockerfile:** Replace npm by yarn ([afe9adb](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/afe9adbcdd74877d14785320eec15af42df6767e))
* **docker:** remove useless step during build ([dae820b](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/dae820b6e4cab21e8544fcbb785d1ad3246b3c26))
* **Dokerfile:** Update for svelte kit ([6af884c](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/6af884ca4a3218ae5e957b03ea1f0f8c9e07d32d))
* **env:** add new env variables ([b5bfa2b](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b5bfa2b11a7e0e1cc866275c530d74be0ea1ffc9))
* **favoris:** fix groups fav display and hide fav button for academies ([664443f](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/664443f667125cae9794f41e0e6366ea5efb1736))
* **package:** update package-lock ([115037d](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/115037da4a08f773689b1cfbe3531f44fc6092fb))
* **styles:** change images routes & improve modified pugin ([aa34902](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/aa3490250cb9915bd0278052c0a4da737300b733))
* **ui:** add font import in layout ([62dce6c](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/62dce6ce089abf666ed8bf31adf4c81274154659))
* **ui:** add missing imports ([8f704a5](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/8f704a5948b86688f637b9b63f4494c042e27a15))
* **ui:** remove console log in FavoritesResearch component ([8438658](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/8438658b14c5e360bd2d0d4005cd7b8990d1086e))
* **ui:** resize eole logo ([2010ab9](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/2010ab97d446857faa05b76b523520fa890bdb11))


### Code Refactoring

* **ui:** change logo in nav bar ([2b80851](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/2b8085121d5f553696368a7573b75fd69122afc4))
* **ui:** change spinner logo ([edf4f48](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/edf4f48c4f6682d84d9bb5da4a284c859f14285f))


### Continuous Integration

* **build:** create the docker image and push it to `${CI_REGISTRY}` ([02d6d94](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/02d6d94c4ce16baba3f24d3cddce7c90cadb337f))
* **commitlint:** enforce commit message format ([54c1539](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/54c1539dd0a5c580baab0a219912577e91b15e29))
* **release:** avoid regression in `dev` branch ([8ebe254](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/8ebe2545958338080e365b41b2896ff3b3a498d5))
* **release:** create release automatically with `semantic-release` ([a32f223](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/a32f22319804c045177863707a710ac0703b0923))
* **release:** tag docker images based on release cycle ([b02d072](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/b02d0729fd10fb813057b076df235ed9de33250e))
* **test:** verify dependencis, build and code tests ([14f7b07](https://gitlab.mim-libre.fr/alphabet/laboite-blog-front/commit/14f7b07fb015211c6a05763cc8881ee6b39790fb))
