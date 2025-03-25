# React Shop

使用 React + Redux + React-router + Tailwind + Firestore 製作的簡易電商 (前端部分)

## 目前已完成功能

- [x] 網站原生登入、自動註冊 (輸入無註冊過的帳號密碼會自動註冊)
- [x] 第三方登入 (GOOGLE、LINE) (目前重定向是設定為部屬的前端網址，本地端不可使用此功能登入，測試可以點擊github頁面右上方的網址)
- [x] 增加、移除購物車
- [x] 第三方金流 (藍新金流) (測試付款可選 webATM 選項)
- [x] 增加、移除收藏商品
- [x] 簡易訂單紀錄

## 安裝
以下將會引導你如何安裝此專案到你的電腦上。

### 取得專案

```
git clone https://github.com/YuCheng07/react-shop.git
```

### 移動到專案內

```
cd react-shop
```

### 安裝套件

```
npm install
```

### 運行專案

```
npm run dev
```

### 開啟專案

運行後會自動開啟瀏覽器，或在瀏覽器輸入以下網址

```
http://localhost:5173/
```

## 資料夾
- pages - 主要頁面
- components - 組件

## 環境變數
- VITE_API_URL=""  #後端網址
- VITE_BASE_URL=""  #前端網址
- VITE_LINE_CLIENT_ID=""  #LINE CLIENT ID
- VITE_LINE_REDIRECT_URI=""  #LINE 重定向網址
- VITE_GOOGLE_CLIENT_ID=""  #GOOGLE CLIENT ID
- VITE_GOOGLE_CLIENT_SECRET_KEY=""  #GOOGLE CLIENT 密鑰
