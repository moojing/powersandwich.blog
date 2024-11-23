---
title: "React 模組化筆記（二）- 打包工具的選擇"
date: '2021-09-12'
description: "在開發 React 元件庫時，選擇合適的打包工具是一個重要的決定。這篇文章將介紹不同打包工具的特性，以及如何選擇最適合你需求的工具。"
cover: "../../assets/frontend-npm-module.png"
tags: ["frontend", "react", "webpack", "rollup"]
---

在元件庫系列文的第二部分，會試著用 webpack 來打包模組，並把過程記錄下來。我們在前面的文章裡面提到了許多種類的 JavaScript 模組系統，而模組系統的差異在 SSR 架構下，我們要製作元件庫時可能會是一個需要處理的問題，除了把所有元件庫的程式碼直接轉換成 UMD 的模組系統，我們也可以透過 package.json 來做處理，這一點我們也會一併說明。

## Outline

- [Outline](#outline)
- [package.json 是什麼？](#packagejson-是什麼)
  - [`name`](#name)
  - [`version`](#version)
  - [`main`](#main)
  - [`scripts`](#scripts)
- [來用 Webpack 動手試試看](#來用-webpack-動手試試看)
  - [Webpack 打包指令、與設定檔](#webpack-打包指令與設定檔)
  - [Webpack 的 `entry`](#webpack-的-entry)
  - [Webpack 的 `output`](#webpack-的-output)
  - [處理 React 程式碼](#處理-react-程式碼)
  - [處理 SCSS 程式碼](#處理-scss-程式碼)
  - [執行打包指令](#執行打包指令)
  - [模組內 package.json 的設定](#模組內-packagejson-的設定)
- [試著在其他專案引入模組](#試著在其他專案引入模組)
- [為什麼打包成 umd 還是可以被其他專案引用？](#為什麼打包成-umd-還是可以被其他專案引用)
- [利用 Webpack 將程式碼轉換成 ESM 模組系統](#利用-webpack-將程式碼轉換成-esm-模組系統)
- [參考資源](#參考資源)

## package.json 是什麼？

相信不管是開前端或後端的 JavaScript 開發者，一定都看過，或多少知道 `package.json` 的存在。不少人對它的初步印象是「紀錄專案用到哪些 Npm 模組」，或是「區分開發環境和產品正是環境所需要的模組」，其實這些都沒錯，但其實 `package.json` 的用處可不只有這些，事實上，`package.json` 紀錄了對所在專案非常全面的相關描述。除了規定專案安裝哪些套件之外，也包含紀錄被引用的入口點、或是限制使用的 node.js 版本、以及專案相關的指令等等資訊。接下來我們會針對本篇文章所需要知道的 `package.json` 描述值來一一作介紹。

### `name`

模組的名稱。雖然這個值應該非常常見，但一般來說如果你沒有特地要做一個 npm 模組的話不會去注意它。這邊設定的名字會在 npm 模組上架之後出現在 npm 的頁面上。

### `version`

模組的版本，你的模組通常不會一次做完之後就不在改動，而是會隨著時間過去，修理了一些問題、了解到更好的做法而有所改變，這時用版本來做區分就可以讓使用的開發者很容易來做區分與溝通。版本號在設計上通常會有一種慣例稱為「Semantic Versioning」 （語意化的版本），雖然官方並沒有強硬規定要用這種格式，但目前已經變成了許多開發者的不成文規定。

[SemVer – 語意化版本規範 | E.E. Breakdown (eebreakdown.com)](https://www.eebreakdown.com/2016/09/semver.html)

### `main`

main 是我們要自製模組時一個很重要的設定。如果你在專案 npm install 之後仔細觀察 node_module 裡面模組的內容的話，會發現每個模組裡面都有各自的 package.json。以 node.js 來講，當這個模組被我們的專案引用的時候， Node.js 事實上會依照 package.json 裡面的 `main` 來作為引入時第一個執行的檔案。

![npm module](../../assets/frontend-npm-module.png)

### `scripts`

`scripts` 則是不管你有沒有要開發模組，都有可能會用到的設定，在 `scripts` 裡面可以把自己的一段 cli 指令記錄下來，並搭配 `npm run` 來執行這一段指令。最常見的就是 `npm start` 然後在 `scripts` 底下的 `start` 鍵值寫入真正要執行的 `server` 啟動指令。這部分可以參考 [create-react-app](https://github.com/facebook/create-react-app/blob/main/package.json) 的 `script` 設定，會比較容易理解。

## 來用 Webpack 動手試試看

這一段落開始會試著實作，把我們的元件程式碼以 UMD 的形式做成一個模組，並讓他在其他專案可以使用。請注意：

- 這個範例使用的 webacpk 版本是 webpack5 ，所以在設定上有可能會跟你看過的專案有一點點的差異。
- 你可能需要有用 webpack 調整或架設過一個 React 的專案，會比較好懂。但沒有也是可以，只是這個範例會是用 React 來做說明。
- 這個模組一樣會放在 local ，但在使用上仍然屬於外部模組，差別只在於有沒有放上 npm，若你做完自己的模組確定沒問題，想發上去也是可以的，但這部分就需要你另外研究一下，這邊不會實作地這麼仔細。
- 懶得看文字的人可以直接參考我的 [Github Repo](https://github.com/moojing/react-module-bundle-demo) 。

### Webpack 打包指令、與設定檔

要讓我們的程式碼能夠被打包，我們一定需要利用 webpack 這個套件的幫忙，所以我們這個元件專案裏面的 package.json 大概會長這樣：

```json
// package.json
{
  ...
  "scripts": {
    "build:webpack": "webpack --config webpack.config.js"
  }
  ...
}
```

而在 webpack.config.js 內，我們需要給定 entry 與 output，以及 react 原始碼轉換相關的設定。

### Webpack 的 `entry`

entry 指的是 「 Webpack 該從哪裡開始打包？」，你也可以稱作入口點，當我們執行了 webpack 的打包指令之後，就會從你指定的檔案開始做轉換的處理。

```js
//webpack.config.js
module.exports = {
  ...
  entry: {
      main: path.resolve(__dirname, "components/index.js"),
  }
  ...
}
```

上述程式碼中可以看出 entry 是一個物件，物件的 key 可以用來決定打包後的檔案名稱，所以你也可以有多個入口來讓 webpack 做處理。若你確定在處理過程中只會有一個入口的話，也可以直接給字串，預設的檔名就是 main。

而上述進入點的程式碼，通常會是輸出元件模組的內容，不過因為本專案只是示範，所以目前只會有一個 Button 元件。

```js
export { default as Button } from './Button'
```

### Webpack 的 `output`

這應該很好理解， `output` 指的就是 webpack 處理過後的程式碼要放在哪裡，一個常見的慣例是會放在 `build` 或是 dist 資料夾裡面。

從 `output` 這個設定裡面我們可以看到一個比較特別的地方是 `filename` 所給定的 `[name].js`，這邊的意思是把 `entry` 設定時給的檔名帶進來，所以你有多個 `entry` 的時候 `webpack` 就能夠相對應地幫你創造多個檔案輸出。

而 `library` 裏面的 `type` 則是決定要用哪一種模組系統來處理我們的模組，這邊我們給 `umd`，但其實 webpack 也是能夠支援輸出成許多種其他如 amd 或 commonJS 模組的，這部分可以參考 webpack 的[文件說明](https://webpack.js.org/configuration/output/#outputlibrarytype)。

### 處理 React 程式碼

以上的設定可以說是已經把專案輸入與輸出的位置都設定好了，接下來我們要告訴 webpack ，在**過程中我們具體要做什麼樣的轉換**，這部分的設定通常會是使用 webpack 時最複雜的其中一個地方，要注意這裡的設定**常常會因為需求而有所不同**。

總之這邊我們必須加上設定讓 webpack 記得處理 React 的元件程式碼。我們會在 `module` 裡面的 `rule` 來設定轉換的規則。

```js
//webpack.config.js
module.exports = {
  ...
   module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ]
  }
  ...
}
```

上面可以看出我們其實還是利用 babel 來處理那些瀏覽器看不懂的 React 程式碼的，我們只是告訴 **webpack 要記得讓 babel 來幫忙處理在 `test` 內所配對到的檔案內容而已**。

webpack 幾乎只處理打包這件事，想做到其他的效果就要搭配其他所謂的 plugin。這一點如果你有 scss 程式碼需要處理也是一樣的。

### 處理 SCSS 程式碼

```js
//webpack.config.js
module.exports = {
  ...
   module: {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
  ...
}
```

### 執行打包指令

現在我們完成了 webpack 的設定，雖然上述段落的設定都是非常建議快速的帶過，不過實際上在做設定時其實少不了對每個 plugin 的研究和文件的查找，也要思考哪樣子的設定才真正適合自己，所以也許你的設定在經過調整之後會跟我的有些許的不同，請依照自己的需求來做吧。接著，我們可以試著執行剛剛設定好的指令來打包試試看。

```bash
yarn build:webpack
```

這個專案是使用 yarn 做為模組管理的工具，習慣使用 npm 的話當然也是沒問題的。

指令執行完之後，應該就會看到包含著處理過後的程式碼的 dist 資料夾出現了。

![webpack result](../../assets/frontend-pack-result.png)

### 模組內 package.json 的設定

我們的最後一個步驟就是要確保其他專案引用這個模組的時候所拿到的會是正確的、處理過後程式碼，所以我們要來看看 package.json 裏面兩個比較重要的設定，一個是 `name` ，這會**決定引入模組時使用的名字**、另一個則是 `main` ，這則是會決定模組被引入時所實際上被引用的程式碼位置，我們必須把它**指定給 dist 這個有處理後的程式碼的位置**。這兩個值其實在前面介紹都有提過，這邊特別再提醒一次。

```json
// package.json
{
  "name": "mujing-module-demo",
  ...
   "main": "dist/main.js",
}
```

## 試著在其他專案引入模組

現在我們可以試著在另外一個專案引入來試試看，我這邊會用 create-react-app 來創造一個新的專案做示範，你不一定要完全按照我的作法，如果你也有自己的其他專案也可以。

這邊我們直接用 npx 使用 create-react-app 來創造專案，npx 可以讓你在沒有安裝某個模組的情況下直接使用該模組，當你不常用某模組也不想要特地安裝的時候就很方便。

```bash
npx create-react-app your-react-project
```

創造模組之後，我們第一件要做的事情就是在專案裡面安裝我們剛剛打包好的模組，你可以選擇把你的模組發布成 npm ，或是用另外一種比較不常見的方式——在 local 端安裝，這個做法可以讓你在開發模組，並且持續有修改時，不需要每次都發布一個 npm 版本才能知道修改結果。作法如下：

1. 用指令介面 cd 到你的模組專案資料夾內
2. 下 pwd 指令，該指令會顯示你專案資料夾的路徑
   （像我的可能會是：/Users/mujingtsai/JS/bundle-module/webpack）
3. 回到剛剛創造出來的 CRA 專案，執行以下安裝 npm 時會使用的指令，但把「模組名稱」改為剛剛的到的路徑

```bash
yarn add /Users/mujingtsai/JS/bundle-module/webpack
```

就可以在本地環境安裝自己正在開發的模組了。
接著，我們把 App.jsx 裏面原來預設的範例程式碼改一改，並且直接引入剛剛做好的模組：

```js
import './App.css'
import { Button } from 'mujing-module-demo'

function App() {
  return (
    <div className="App">
      <Button />
    </div>
  )
}

export default App
```

都做好之後我們就可以來啟動專案了，啟動之後你會發現我們所引入的按鈕元件居然完全沒有樣式，只有 Html 結構和 class name 而已，這是怎麼回事呢？

![webpack result](../../assets/frontend-webpack-import-example-result.png)

因為在這個新創造的 CRA 專案內我們引入 Button 元件時，事實上只有引入到 JS 程式碼而已，而如果你回頭去看我們的打包流程就會發現，我們的 CSS 是分開來另外處理成為另外一個獨立的 CSS 檔案的， 所以這時當然吃不到樣式啦！ 我們得另外在專案內引入才行。

讓我們在 CRA 專案內的更上層，也就是 src/index.js 這個引入 App 元件的位置來引入我們的 CSS 程式碼吧：

```js
// in create-react-app project
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'mujing-module-demo/dist/css/common.css'
```

加入引入 CSS 的設定之後，我們應該就可以在畫面上看到一個完整的按鈕元素：

![webpack result](../../assets/frontend-webpack-import-example-addCss.png)

## 為什麼打包成 umd 還是可以被其他專案引用？

如果你有試著自己打包看看，並嘗試成功後，可以接著思考另外一個問題。

以上我們自己打包的模組專案雖然使用 webpack 將程式碼處理為 umd **這個模組系統**，但是當它被另外一個專案所引用的時候，仍然可以被正常的使用 import 這種 esm 系統的語法來做引入，這是為什麼呢？

關鍵就在於：**雖然我們的模組是使用 umd 模組系統，但是由於我們的所引入的專案（CRA 專案）事實上也有使用 webpack 來處理程式碼**（ 只是沒辦法直接看出來，必須做 eject 才有辦法把 webpack 設定產生出來，且通常還會搭配 babel ），所以那些模組裡面的 umd 程式碼在最後實際被執行時仍下會被轉為可以被瀏覽器執行的 JavaScript code.

![webpack result](../../assets/frontend-umd-import-example.png)

所以在這種情況下只要模組內的程式碼能夠順利被專案內的 webpack 處理，基本上都能夠順利跑起來，不過如果我們**想要做到 tree shaking 的效果，就一定要讓 module 在被引入的時候是 esm 這種模組系統 才行**。

## 利用 Webpack 將程式碼轉換成 ESM 模組系統

如同上面所述， Webpack 本身在處理專案內所使用的程式碼時，是可以根據 esm 模組系統的的語法（也就是 import / export ）來[做到 tree shaking 的效果的](https://webpack.js.org/guides/tree-shaking/)。所以**如果專案內所引用的模組是 esm 之外的模組系統，雖然 Webpack 還是可以處理，但是就沒辦法判斷哪些部分的程式碼真的有引用到，哪些可以拿掉了**。所以我們在想要製作的模組專案上真正需要的模組系統是 esm ，而不是 umd。

可惜的是我們目前是用 Webpack 來處理這個模組專案，但是 Webpack 目前在輸出 esm 模組系統的功能上還是屬於[實驗階段](https://webpack.js.org/configuration/output/#type-module)，因此不適合正式拿來做為專案的一部分使用。

![webpack result](../../assets/frontend-webpack-example-esm.png)

因為這個原因，所以利用 webpack 來打包模組的嘗試就到這裡先暫停了，後來我們發現另一套打包工具 Rollup 可以解決這個問題，在本系列文的下一篇會講到如何用 Rollup 來將專案處理成 esm 的 module。

## 參考資源

- [The package.json guide (nodejs.dev)](https://nodejs.dev/learn/the-package-json-guide)
- [package.json | npm Docs (npmjs.com)](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [Tree Shaking | webpack](https://webpack.js.org/guides/tree-shaking/)
