# Changelog

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
