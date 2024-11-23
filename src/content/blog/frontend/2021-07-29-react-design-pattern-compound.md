---
title: "React 設計模式 - 複合元件"
description: "一般來說，在進行正式的專案開發，製作可以重複被使用的元件時，常常也必須考慮到元件的彈性、與可維護性。因為我們不知道在未來，這個元件會因為產品的需求而產生怎麼樣的調整，所以最低程度地保持元件的可擴充性就可以讓開發者在這個時候比較輕鬆的以最小限度的影響來達成想要的修改。"
date: '2021-07-29'
tags: ["react", "javascript", "frontend"]
cover: "/_images/frontend-react-design-pattern-example1.png"
tags: ["react", "javascript", "frontend"]
---

![Heading Image](/_images/frontend-react-design-pattern-pink-cloud.png)

一般來說，在進行正式的專案開發，製作可以重複被使用的元件時，常常也必須考慮到元件的彈性、與可維護性。因為我們不知道在未來，這個元件會因為產品的需求而產生怎麼樣的調整，所以最低程度地保持元件的可擴充性就可以讓開發者在這個時候比較輕鬆的以最小限度的影響來達成想要的修改。

**複合元件( Compound Component )** 就是一種可以同時提高可維護性跟彈性的元件設計方法，或稱為設計模式（ Design Pattern ) 。設計模式一詞源自更早期的軟體界發展歷史，這個詞可以用來代稱那些應付經常出現問題的解決辦法。**亦即設計模式是經年累月透過所有軟體界的開發者不斷地遇到相同或類似問題之後，慢慢整理出來的方法。** 有一些設計模式是所有語言都可以通用的，例如你可能會聽過的「 工廠模式 」、「 觀察者模式」。而有一些模式是針對特定情境的問題所設計的，我們今天要談的複合元件就是前端元件開發的設計模式之一。

## 需要的先備知識

這篇文章主要會講解如何設計一個複合元件，在繼續往下閱讀之前，你可能要確保自己了解 React children 與 context 的相關概念，才能夠比較輕鬆的閱讀這篇文章所提及的內容，在這邊附上幾篇可以參考的資源：

React Children —  操作元素的 React 原生 API ：

- [A Complete Guide To props.children In React | codeburst](https://codeburst.io/a-complete-guide-to-props-children-in-react-c315fab74e7c)

- [官方文件  — React Top-Level API](https://reactjs.org/docs/react-api.html)

- React 裡面 Context 的概念：
  [官方文件  — Context](https://reactjs.org/docs/context.html)

## 複合元件是什麼

複合元件，或稱合成元件 ( Compound Component ）可以從詞面上看出它大致的意思，就是指數個聚集在一起，並有某些相互關係的元件。透過複合元件，可以讓兩個或兩個以上相關聯的元件用一些不明顯的方式來共用狀態，這是什麼意思，而複合元件到底又解決了什麼樣的問題呢？

## 元件常見的多層結構問題

舉我們常見的下拉選單為例，如果我們現在想要製作自己的選單元件，最直觀的製作方法會是直接創造一個元件，然後把所有相關的資料傳入：

![example1](/_images/frontend-react-design-pattern-example1.png)

上面的程式碼範例只是一個示意，所以並沒有考慮到 CSS 的樣式，這邊會以狀態傳遞的方式為重點。所以以這個下拉選單的例子來說，我們會把整個選單的名字跟對應的數值，直接傳入這個 `<Select/>` 元件裡面。

![example2](/_images/frontend-react-design-pattern-example2.png)

但是這麼一來除了沒辦法直接存取到 `<Option/>` 元件之外，你也可以發現這份相關的選單資料其實是從最上層傳入 `<Select/>` 元件之後，再次被傳入 `<Option/>`，`<Option>`這個元件才有辦法拿到需要用來顯示的選項內容與對應數值。

一般我們不會樂見這種資料被層層傳遞的使用方式，你可能覺得兩層可能還好，不會太難看出它們的關係，但在實際開發時總是無法永遠確保不會有需要第三層的情況出現，因此雖然難免還是有些不得已必須這麼使用的情況，大多時候對開發者來說這種情況當然是越少越好。你可以想像使用這個用法製作的元件，在當所必須傳入的屬性隨著時間和需求的改變而變得太多時，它會變得越來越難看清楚每個屬性所對應的內容，和與之相關的流程邏輯。

對上面的 `<Select/>` 元件來說，也許一個比較好的設計方式最好還是能夠跟原生的 select 與 option 標籤具有同樣的使用方式：

![example3](/_images/frontend-react-design-pattern-example3.png)

當我們把 `<Select/>` 元件用某種方式拆分成兩個個別獨立，且相關連的元件之後，就能夠享有一個好處是能夠把元件的樣式內容分開來管理，也就是說我們在設計元件時不需要把所有的程式碼塞在一起。而除了讓內容分離之外，使用複合元件的另外一個很大的好處是能夠讓狀態在這兩個相關連的元件之間共享，這麼一來也可以減少把狀態「傳到上層再傳到下層」的情況發生。

## 複合元件的好處

綜上所述，由於複合元件原本就是為了讓元件之間的相依，並提高使用彈性的方法。所以他所帶來的好處也不難理解：

讓開發者能夠更容易且隨心所欲控制元件，例如：元件的排列順序。
讓相關元件扁平化，可以使用在同一層而不用全部包在一個地方。
元件內容分離，讓元件更容易管理，就像我們即將要做的：把上面原本的 `<Select/>` ，拆出 `<Option/>`，分離成兩個元件。

## 以 `<Select/>` 為例子來設計複合元件

下拉選單是前端一個很常見的需求，尤其我們因為樣式的關係，無法使用原生的 Html 元素，所以常常需要客製化的製作。這邊我們就來看看怎麼利用 React 來設計一個跟前端原生的 `<select>` 元素使用方式較為相近的元件吧！在這個例子裡面，我會以 Class Component 為基礎來進行設計。

## 元件的條件要求

`<Select>` 與 `<Option>` 兩個元件必須要能夠分開使用而不是全部放在同一個元件中，像是這樣：

![example4](/_images/frontend-react-design-pattern-example4.png)

`<Select/>` 必須能夠根據其子元素的所有 `<Option/>`元件內容以及排列順序來顯示下拉清單
元件的製作結果如下：

![result1](/_images/frontend-react-design-pattern-result1.gif)

先思考元件結構
通常複合元件中，會有一個作為父層元件的主元件，而由其他的元件作為子元件。而在 `<Select/>` 與 `<Option/>`的例子中則比較單純，只有父層的 `<Select/>` 與子層的 `<Option/>`。以這個架構為前提之下，我們可以繼續往下想想另外幾個問題，那就是：

作為父層元件的 `<Select/>` 是怎麼知道在它下層的 `<Option/>` 的內容的？
`<Select/>` 又是怎麼比對出當下使用者所選到的選項的？
只要能夠解答這兩個問題，我們基本上就掌握了實作這個 `<Select/>` 複合元件的關鍵。

首先，第一個問題的思考方向是一個很常見的 children 屬性，我們只要透過這個屬性就能夠取得「被放入」元件的內容，也就是所有的 `<Option/>` 元件。而關於 `<Select/>` 是怎麼知道目前所選的數值的？可想而知的是在 `<Select/>` 內一定會有一個狀態負責儲存目前被選中的值。

另外我們再每個 `<Option/>` 被選中時也必須進行更新這個被選中數值的動作，所以我們也需要在 Option 元件上面掛上對應的 onClick 事件，這麼一來當 `<Option>` 被點擊時，`<Select/>` 才有辦法知道被選中的 `<Option/>` 的數值是哪一個。關於這一點我們可以透過 React 的相關 API ： Children.map 以及 cloneElement 來達成。

Children.map 負責巡訪每個 `<Option/>` 子元件 ， cloneElement 則複製一個新的 Option 並讓我們可以在這個時候再次傳入額外的屬性。

![example5](/_images/frontend-react-design-pattern-example5.png)

藉由上述的程式碼片段可以看出我把個別的子元件內容傳給了 onClick 事件，接下來在事件裡面只要知道要儲存什麼數值藉以比對選中的選項，並拿到元件上對應的屬性值，就能夠透過這個數值進行比對。

![example6](/_images/frontend-react-design-pattern-example6.png)

在點擊事件內雖然我做了許多件事情，不過可以看到我從 child 的 props （**也就是 `<Option/>`上的屬性內容**）取出兩個屬性值，分別為 value 以及 optionKey，其中 optionKey 是每個 `<Option/>`上都會有，用來區別選項且應該要不重複的值，之後我們就可以拿這個值來決定目前所選中的選項是哪一個。

接下來的流程就很單純，既然我們可以拿到 `<Option/>` 上的屬性，我們就能夠拿出來跟儲存在 `<Select/>` 裡面，代表被選中的 `<Option/>` 的 selectedOptionKey 這個狀態做比對，如下：

![example7](/_images/frontend-react-design-pattern-example7.png)

我們直接利用 isSelected 以布林值的形式傳給下層的 `<Option/>`，這麼一來 `<Option/>` 就能夠透過這個數值決定要顯示什麼樣的內容，或是樣式，我們來看看 `<Option/>` 的內容。

![example8](/_images/frontend-react-design-pattern-example8.png)

由於這個例子中 `<Option/>` 需要顯示的東西和需要判斷的邏輯比較單純，所以元件內容也比較單純，但可以看到我們拿到從 `<Select/>` 元件裡面傳入的兩個屬性來做一些顯示和判斷，這兩個屬性都不是在使用元件時傳入的，而是從 `<Select/>` 元件來，所以如果不了解原理的話，單看 `<Option/>` 這個元件根本就沒辦法直接看出來處。

## 利用 Class Component 靜態屬性

通常複合元件在設計時會把複合元件中的子元件掛在父元件上，而因為在本篇文章所舉的例子裡面，剛好用到的是 Class Component ，所以可以利用 Class 中靜態屬性的概念，讓兩個看似分離的元件，更明確的產生關聯，所以我們在 `<Select/>`元件內會多做一件事情：

![example9](/_images/frontend-react-design-pattern-example9.png)

這麼一來開發者就可以用 `<Select.Option>` 來表示 `<Option/>` 元件，也可以讓使用的開發者馬上理解兩者是有關聯的，而這也是你在各大 React UI 元件框架裡面常常會看到的用法。你可能會問：為什麼可以在標籤內存取 Select 底下的屬性 Option ?

這就要回歸到語法的本質了，要了解這件事你必須先了解一件事就是，**這邊所使用的 \<..\> 角括號並不是原生的 Html 標籤，而是所謂用來簡化 React 寫法的 JSX 語法**，它所代替的程式碼片段其實是最早 React 內的 React.createElement 方法，參考下面的例子：

![example10](/_images/frontend-react-design-pattern-example10.png)

以上面這個元件為例，下面兩種用法所產生的結果都是一樣的：

![example11](/_images/frontend-react-design-pattern-example11.png)

JSX 這種看起來像是 Html 標籤的用法其實就是簡化的 React 寫法，既然原本 React 就是透過把 JavaScript 的元件類別傳入 createElement 這個方法中，在這個前提之下**它所接收的類別當然與一般 JavaScript 的類別並無二致囉**。這個用法對不了解的人看起來可能會有點眼花撩亂，但其實其中的原理就是這麼單純而已。

## 善用 Context API

雖然在這個例子裡面我們沒有使用到，不過若是想要設計的複合元件結構比較複雜，有多層元件結構的話，可以利用 React 提供的 Context API 來進行跨多層元件的數值內容傳遞。

![example12](/_images/frontend-react-design-pattern-example12.png)

## 最終完成的結果

在上面的內容之中我只解說幾個最關鍵的部分，至於沒有講到的其他細節，就請讀者自己思考看看囉，在這邊附上完整的程式碼範例。

<iframe src="https://codesandbox.io/embed/compound-compoennt-selectoption-u1x4w?fontsize=14&hidenavigation=1&theme=dark"
     style={{
      width:'100%',
      height:'500px',
      border:0,
      borderRadius: '4px',
      overflow:'hidden'
     }}
     title="Compound Compoennt - Select/Option"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   >
</iframe>

## 動手試試看

本篇文章的是以 Class Component 為例子來進行設計這個複合元件，不過在撰寫這篇文章的此刻，Functional Component 是實際開發時比較主流的元件類型，**其實利用 Functional Component 照理說也能夠設計出使用方式與這個例子完全一樣的複合元件**，讀者們在了解複合元件的概念後，也可以自己嘗試使用 Functional Component 來實做看看自己的複合元件，希望這篇文章能夠幫助到你。那麼，就先說到這囉！

## 參考資源

- [A Complete Guide To props.children In React | codeburst](https://codeburst.io/a-complete-guide-to-props-children-in-react-c315fab74e7c)

- [Compound React Components with Hooks + TypeScript | Martin’s Blog (martindidiego.com)](https://blog.martindidiego.com/compound-components-typescript/)

- [Find and Filter React Children By Type (HTML Elements) | by Michael Paravano | Medium](https://mparavano.medium.com/find-filter-react-children-by-type-html-elements-11a0e7bd08bf)
