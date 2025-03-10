# ZAKKI (第二版)(React + TypeScript + Vite)

## 製作背景與目的

Zakki 為印尼非營利組織，專門為老人、身心障礙者及低收入戶提工幫助 → 由於這些族群在社會關注度低，也不知道如何向外界尋求幫助。因而在生活種遇到問題無法解決。ZAKKI 的成立提供他們一個可以與外界溝通的途徑

ZAKKI 希望重構網站，建立一個可以吸引世界所有人(不只是印尼在地人)進行捐款或成為志工的平台，進而更好幫助需要幫助的群體。

**本方案是第一期專案開發的延續，欲了解更多第一期專案相關資訊，請參考 [ZAKKI vite](https://github.com/tonia83731/ZAKKI-vite)**

## 專案使用者

- 欲了解 ZAKKI 組織的使用者
- 印尼「本地」的捐款者
- 全球有意願成為志工的使用者

## Demo

- 第一版請參考[這裡](https://tonia83731.github.io/ZAKKI-vite/)
- 第二版請參考[這裡](https://tonia83731.github.io/Zakki-frontend-optimized/)

# Project Improvement

- 階段一 : 使用者只能選擇**英文**來進行閱讀
  階段二 : 使用者可以依據喜好選擇**英文**、**中文**或**印尼文**
- 階段一: 從本地檔案抓取 Programs、Events 和 Join Us 的數據來顯示

  階段二: 改用 Sanity 來管理 Programs、Events 和 Join Us 頁面的數據，並透過 API 在前端抓取資料
  → 優勢:

  1. 擁有 Sanity Admin 權限的職員可直接新增或修改內容，無需重新部署
  2. 以 ZAKKI 目前的數據量來看，免費方案已足夠，可節省成本

- 階段一**：** Join Us 頁面為多頁表單（Multi-page Forms），目前提交後不會儲存資料，尚無法實際使用。
  階段二**：** 將 Join Us 頁面與 Google Sheets 串聯，使用者填寫表單後，透過 Google API 將報名資料寫入 Sheets，實現真正的資料儲存與管理

## Roles

- 過去在此專案擔任 UX 設計師職位，透過 UX 設計圖進行前端開發
  - UI/UX 規劃、前端工程製作 → 詳細資訊請參考[這裡](https://www.figma.com/file/UiUglBbnxgVxiF9x6EL265/Front-end-Project?type=design&node-id=1%3A4512&mode=design&t=rn2rKN4UeehwHo1F-1)

## Challenges

- 問題: 專案使用 React Router DOM 來切換路由，但在部署後，由於使用靜態網頁，當頁面重新整理時，伺服器無法解析正確的路徑，導致顯示 404 找不到頁面的錯誤
  - 解決方法: 目前使用 Hash Router 來作為替代方案，但路由會顯示”/#/”的字樣
- 問題: 如何避免頁面重新整理時，版面語言顯示跳回 default
  - 解決方法: 將顯則語言存到 localStorage 內，當更新頁面時，需重新抓取語言來進行頁面顯示

## Tools

- react @19.0.0
- typescript @5.7.2
- react-router-dom @7.2.0
- i18next @24.2.2
- react-i18next @15.4.1
- react-slick 0.30.3
- slick-carousel @1.8.1
- sweetalert2 @11.17.2
- tailwindcss @3.4.17
- validator @13.12.0
- eslint @9.19.0

## Further Developments

- 目前 Events 報名仍使用 Google Form，正在討論是否需要像 Join Us 頁面一樣，透過 Google API 方式儲存資料
- 由於隱私與安全考量，目前捐款僅支援本地匯款功能，未來將考慮整合信用卡刷卡功能，以提供更多捐款選項
