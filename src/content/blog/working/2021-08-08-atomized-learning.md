---
title: "原子化學習 — 程式語言中基礎知識的重要性"
post_date: '2021-08-08'
# menu_order: 1
post_status: publish
post_excerpt: "回顧一下轉為前端工程師的這一年經歷，因為一些原因，偶然讓我在將近三個月內就找到新的工作並成功轉職，而在那之前，我自認是一個毫無實戰經驗的打雜工讀生 (在公司只接觸 CMS 系統後端，並不斷重複造輪子)。這篇文章旨在分析並強調學習基礎知識的重要性，以及分享我這一年來學習的心得 ，希望你能夠從這之中得到一些東西，如果有什麼疑問，也歡迎隨時和我一起討論。"
featured_image: "/_images/working/atomized-learning/atomized-learning-head.png"
taxonomy:
    category: ["working"]
    post_tag: ["book-reflection"]
---



![Heading Image](/_images/working-atomized-learning-head.png)

回顧一下轉為前端工程師的這一年經歷，因為一些原因，偶然讓我在將近三個月內就找到新的工作並成功轉職，而在那之前，我自認是一個毫無實戰經驗的打雜工讀生 (在公司只接觸 CMS 系統後端，並不斷重複造輪子)。這篇文章旨在分析並強調學習基礎知識的重要性，以及分享我這一年來學習的心得 ，希望你能夠從這之中得到一些東西，如果有什麼疑問，也歡迎隨時和我一起討論。

## 框架還是語言

當時剛好是前端框架非常流行的時候，在我的身邊幾乎每個只要是正在入門前端的人都在學習 Vue.js （上手快速），但我並沒有一頭栽進框架的學習旋渦裡面，那個時候我只覺得<mark>就算是學 JQuery ，還是任何一種其他框架，最終最終都必須迎接考驗 JS 語言本身理解度時刻的到來，既然如此就不應該只依賴於任何一種框架</mark>（同樣的東西，不使用任何工具你能做得出來嗎？）。

後來我找了一堂對 JS 底層運作講的很詳細的線上課程，花了兩個月的時間認真看完並確定理解後，才開始接觸那些主流的框架跟工具。<mark>儘管我比別人還要晚開始，但是在框架的熟悉速度上並沒有比較緩慢，反而因為那些相對來講比較艱澀的基礎知識，讓我更知道目前自己缺少哪些部分，在學習上也能夠更踏實的安排學習目標。</mark>就算現在我還是常常會聽到跟 JS 相關不懂的話題，但是因為基礎理解的夠紮實，後面再自己去研讀，也不會花太多心力。

直到第一份前端工作離職，開始面試找工作，遇到幾個跟我學齡差不多的同行之後，我才真正意識到我的學習方式所帶來的程度上的落差（集體面試觀察其他人反應得知）。

## 第一性原理

這個時候我想到了哲學中的「第一性原理」，<mark>第一性原理是指找到某個問題的根本，綜觀該問題所屬的系統，然後從頭往下探討。</mark>最有名的相關案例是 Elon Musk 分析後發現問題出在人事費用並大幅降低 Tesla 電池成本，讓電動車的普及可能性又往前推進了一大步。

Elon Musk 能夠找到解方，正是因為他了解電池的組成成分，並做了很詳細的分析、了解整個製作流程後、把可能有問題的模塊再次設計，一步一步優化整個生產流程，才有最後的結果。然而應用在程式學習這點上，第一性原理並沒有這麼宏觀跟難以理解，上面這個案例只是想讓你了解：

> 在相關領域裡面，你懂的基礎知識越多，發生問題時就能夠越容易找到癥結點。

以前端為例：

1. 你懂 HTTP 傳遞流程，知道 API 的運作，就有能力辨別問題是否真的出在前端。
2. 你了解瀏覽器渲染流程，就更容易真正做到效能調教以及產品的優化。 ( 順便舉另外一個例子，你知道前端為什麼要做 SSR 的真正原因嗎？ )
3. 了解 JS 的 Event Queue 後，就更能夠 trace 非同步產生的問題。

而這一切都是建立在基礎知識上慢慢累積出來的經驗，換句話說，如果連最基本的功夫都懞懞懂懂，也很難對這些技術有更深入的了解跟體會，而我想我就是在無意間遵循了這個原則。

## 不太容易做到，因為很無聊

老實跟你說，真的要能夠把所有相關的基礎知識都學完，這個過程是一件非常無聊的事情，前端其實並不難，至少以能夠找到工作為目標的話並不難，困難的是在持之以恆。而這終究會關係到你對這項技術是不是真的具有熱情，或純粹只是跟隨趨勢跟潮流（你真的願意每天起床跟離開公司時在第一時間打開 Udemy 一直看一直看一直看嗎？），這個問題我沒有辦法幫你解答，你必須自己再一次好好思考。

## 原子化理論

關於程式語言的學習方法，只用「學習基本功」一句話帶過好像有點模糊，那麼也許可以從另一種角度來解釋。在前幾年，一位前端工程師 ( Brad Frost )把化學中原子跟分子之間關係應用在 UI 設計上面，帶起了現在被稱為「原子化設計」方法的風潮。在化學中，所有的物體都是由原子組成，往上聚合成分子，再到有機物，最後慢慢形成我們看到的現實世界。

![Heading Image](/_images/working/atomized-learning/atomized-learning-design.png)

而在原子化設計裡面，<mark>原子所指的是網頁視覺的顏色、文字、框線等等最小單位，這些元素又能夠組成比較小的元件如按鈕跟導航列，慢慢往上構成整個網頁架構，而這一整套架構也被稱為設計系統。</mark>如果像這樣子往上疊加的關係可以用在一整個系統上面，那麼用來解釋系統知識的學習，是再適合不過了。

## 結合以上兩種方式來看待程式學習

原子化理論是在<mark>構築事情時，由最小單位開始做起</mark>；而第一性原理則著重於將可見的結果拆解成最小元素然後觀察。藉由結合這兩種概念，<mark>我們就可以把一個乍看龐大的問題拆解成最小單位知識並逐個學習，融會貫通後組合成新事物。</mark>講到這裡實在很難不引用某部著名漫畫(鋼鍊)的經典台詞：

> 理解、分解、再建構

雖然聽起來很瞎掰，但的確是這麼回事，因為在這整個過程裡，你會很清楚知道哪些是你已經學會、而哪些是你還缺少的，單位知識之間的作用關係又是什麼？所以上述這一句講的其實可以這樣理解：

> 理解(問題)、分解(需求)、再建構(最終目標)

## 理解問題

舉個例子，今天你的目標是實作一個 10 秒內計算點擊次數的競賽小遊戲，你第一時間應該會想到可能會遇到問題的地方有幾個點：

1. JS 計時功能
2. 點擊畫面後自動加一分
3. 紀錄歷史戰績

## 分解需求

上面幾點可以再次個別分解成更細小的技術需求

1. 計時功能：

   - 「 JS Date 物件」
   - 「如何讓瀏覽器每秒重新渲染一次」( SetInterval )
   - 「時間到之後如何終止遊戲」( Callback )

2. 點擊畫面後自動加一分

   - 了解瀏覽器的事件序列」
   - 「瀏覽器點擊事件 API 」

3. 紀錄歷史戰績：

   - 「熟悉陣列操作」
   - 「了解瀏覽器 cookie 或是 localStorage 差別」

## 組合成最終目標

熟悉個別技術點，思考如何組合成最後的功能，藉由這樣子的思維練習讓自己慢慢對問題的架構更了解。而其實這非常相似於第一性原理，但是概念上卻又處於互補的關係。

> 第一性原理注重系統，而原子化理論著重在元素與元素之間的關聯

前者把重點放在分析整個系統，後者注重每個元素如何互相搭配並組成更大更完整個元件，而結合這兩個觀念，才能夠更全面的從分解問題，到構築一個系統。

最後，總結一下這篇文章想要帶給你的三個觀念：

1. 第一性原理 — 學習基礎知識雖然沒辦法馬上見效，但關鍵時刻非常重要
2. 原子化理論 — 你如何看待與安排你的學習
3. 試著結合以上兩種觀點來思考碰到的問題

以上。

稍微整理了這一年來我自己體會到的方法，希望這些觀念對你的學習能夠多多少少有一點幫助，後續我也會繼續將這些方法應用在未來的學習上，一起加油吧！謝謝你的閱讀。

## 參考資料

- [引發驚人的爆炸力！ Elon Musk 知識軍火庫中最強殺傷力的武器 : 「第一性原理」（ First Principle )](https://medium.com/gurugurugo/%E5%BC%95%E7%99%BC%E9%A9%9A%E4%BA%BA%E7%9A%84%E7%88%86%E7%82%B8%E5%8A%9B-%E9%8B%BC%E9%90%B5%E4%BA%BA-elon-musk-%E7%9F%A5%E8%AD%98%E8%BB%8D%E7%81%AB%E5%BA%AB%E4%B8%AD%E6%9C%80%E5%BC%B7%E6%AE%BA%E5%82%B7%E5%8A%9B%E7%9A%84%E6%AD%A6%E5%99%A8-%E7%AC%AC%E4%B8%80%E6%80%A7%E5%8E%9F%E7%90%86-first-principle-80de738799ce)
- [原子化設計](https://www.uisdc.com/atomic-design-theory)
- [First principles thinking](https://jamesclear.com/first-principles)