// Data
let data = [
    {
        id: 0,
        name: "肥宅心碎賞櫻3日",
        imgUrl:
            "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
        area: "高雄",
        description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
        group: 87,
        price: 1400,
        rate: 10,
    },
    {
        id: 1,
        name: "貓空纜車雙程票",
        imgUrl:
            "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        area: "台北",
        description:
            "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
        group: 99,
        price: 240,
        rate: 2,
    },
    {
        id: 2,
        name: "台中谷關溫泉會1日",
        imgUrl:
            "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        area: "台中",
        description:
            "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
        group: 20,
        price: 1765,
        rate: 7,
    },
    // {
    //     id: 3,
    //     name: "綠島自由行套裝行程",
    //     imgUrl: "https://i.imgur.com/QXa1fMZ.png",
    //     area: "台北",
    //     description: "嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合。",
    //     group: 8,
    //     price: 1280,
    //     rate: 8,
    // },
    // {
    //     id: 4,
    //     name: "清境高空觀景步道二日遊",
    //     imgUrl: "https://i.imgur.com/4UHm8WX.png",
    //     area: "台北",
    //     description:
    //         "清境農場青青草原數十公頃碧草，，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。",
    //     group: 12,
    //     price: 2580,
    //     rate: 8,
    // },
    // {
    //     id: 5,
    //     name: "山林悠遊雙人套票",
    //     imgUrl: "https://i.imgur.com/H97Wgfn.png",
    //     area: "台中",
    //     description:
    //         "山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點。",
    //     group: 2,
    //     price: 880,
    //     rate: 9,
    // },
];

// Element
const selectRegionSearch = document.querySelector(".regionSearch");
const textTicketName = document.querySelector("#ticketName");
const textTicketImgUrl = document.querySelector("#ticketImgUrl");
const selectTicketRegion = document.querySelector("#ticketRegion");
const numberTicketPrice = document.querySelector("#ticketPrice");
const numberTicketNum = document.querySelector("#ticketNum");
const numberTicketRate = document.querySelector("#ticketRate");
const textTicketDescription = document.querySelector("#ticketDescription");
const btnAddTicket = document.querySelector("#btnAddTicket");

// Initialize
displayTicketCardArea(data);

// Event
selectRegionSearch.addEventListener("change", regionSearchChanged, false);
textTicketName.addEventListener("blur", checkInputIsLegal, false);
textTicketImgUrl.addEventListener("blur", checkInputIsLegal, false);
selectTicketRegion.addEventListener("blur", checkInputIsLegal, false);
numberTicketPrice.addEventListener("blur", checkInputIsLegal, false);
numberTicketNum.addEventListener("blur", checkInputIsLegal, false);
numberTicketRate.addEventListener("blur", checkInputIsLegal, false);
textTicketDescription.addEventListener("blur", checkInputIsLegal, false);
btnAddTicket.addEventListener("click", addTicketData, false);

// Function
// 根據傳入的data顯示TicketCard
function displayTicketCardArea(data) {
    // Element
    const ticketCardArea = document.querySelector(".ticketCard-area");
    const searchResultText = document.querySelector("#searchResult-text");
    const cantFindArea = document.querySelector(".cantFind-area");

    // 寫入搜尋到幾筆資料
    searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`;

    // 顯示票卡資訊
    let dataString = "";
    data.forEach((item) => {
        dataString += `<li class="ticketCard">
            <div class="ticketCard-img">
                <a href="#">
                    <img src="${item.imgUrl}" alt="">
                </a>
                <div class="ticketCard-region">${item.area}</div>
                <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
                <div>
                    <h3>
                        <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">
                        ${item.description}
                    </p>
                </div>
                <div class="ticketCard-info">
                    <p class="ticketCard-num">
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                    </p>
                    <p class="ticketCard-price">
                        TWD <span id="ticketCard-price">$${item.price}</span>
                    </p>
                </div>
            </div>
        </li>`;
    });
    ticketCardArea.innerHTML = dataString;

    // 顯示有無查詢到資料
    if (data.length <= 0) {
        elementDisplay(cantFindArea);
    } else {
        elementHide(cantFindArea);
    }
}

// 下拉選單篩選顯示區域
function regionSearchChanged() {
    // console.log(
    //     selectRegionSearch.options[selectRegionSearch.selectedIndex].value
    // );
    const selectedValue =
        selectRegionSearch.options[selectRegionSearch.selectedIndex].value;
    if (selectedValue === "") {
        displayTicketCardArea(data);
    } else {
        displayTicketCardArea(
            data.filter((item) => item.area === selectedValue)
        );
    }
}

// 新增Ticket資料
function addTicketData() {
    // 前置判斷
    if (
        !isInputValueLegal(textTicketName) ||
        !isInputValueLegal(textTicketImgUrl) ||
        !isInputValueLegal(selectTicketRegion) ||
        !isInputValueLegal(numberTicketPrice) ||
        !isInputValueLegal(numberTicketNum) ||
        !isInputValueLegal(numberTicketRate) ||
        !isInputValueLegal(textTicketDescription)
    ) {
        alert("請確認資料輸入是否完整或有提示異常!!");
        return;
    }

    // Parameters
    const name = textTicketName.value;
    const imgUrl = textTicketImgUrl.value;
    const area =
        selectTicketRegion.options[selectTicketRegion.selectedIndex].value;
    const price = Number(numberTicketPrice.value);
    const group = Number(numberTicketNum.value);
    const rate = Number(numberTicketRate.value);
    const description = textTicketDescription.value;

    // 產生物件並加入data物件陣列
    let objTicket = {};
    objTicket.id =
        data.length <= 0 ? 1 : Math.max(...data.map((item) => item.id)) + 1;
    objTicket.name = name;
    objTicket.imgUrl = imgUrl;
    objTicket.area = area;
    objTicket.description = description;
    objTicket.group = group;
    objTicket.price = price;
    objTicket.rate = rate;
    data.push(objTicket);

    alert("資料新增成功!!");

    // 清除資料
    clearData();

    // 將地區搜尋篩選變成全部地區
    selectRegionSearch.selectedIndex = 1;
    regionSearchChanged();
}

// 清除資料
function clearData() {
    textTicketName.value = "";
    textTicketImgUrl.value = "";
    selectTicketRegion.selectedIndex = 0;
    numberTicketPrice.value = "";
    numberTicketNum.value = "";
    numberTicketRate.value = "";
    textTicketDescription.value = "";
}

// Input元件離開時觸發
function checkInputIsLegal(e) {
    const prompt = document.querySelector(`#${e.target.id}-message`);

    // 檢查是否有輸入值
    const isElementInput = checkElementInput(e);

    // 檢查數值元件值是否輸入正確
    const isElementNumberCorrect = checkElementNumber(e);

    // 如果有異常就顯示錯誤訊息
    if (!isElementInput || !isElementNumberCorrect) {
        elementDisplay(prompt);
    } else {
        elementHide(prompt);
    }
}

// 檢查是否有輸入值
function checkElementInput(e) {
    if (!isValueInput(e.target.value)) {
        modifyErrorMessage(e, "必填!");
        return false;
    }

    return true;
}

// 檢查數值元件值是否輸入錯誤
function checkElementNumber(e) {
    if (e.target.type === "number") {
        if (isNumberError(e.target.value)) {
            modifyErrorMessage(e, "輸入數值異常!");
            return false;
        } else if (isNumberLessThanZero(e.target.value)) {
            modifyErrorMessage(e, "輸入數值不能小於零!");
            return false;
        } else if (
            e.target.id === "ticketRate" &&
            (e.target.value < 1 || e.target.value > 10)
        ) {
            modifyErrorMessage(e, "套票星級必須介於 1 和 10 之間!");
            return false;
        } else if (e.target.id === "ticketNum" && e.target.value < 1) {
            modifyErrorMessage(e, "套票組數必須大於或等於 1 組!");
            return false;
        }
    }

    return true;
}

// 顯示元件
function elementDisplay(e) {
    e.setAttribute("style", "display:block");
}

// 隱藏元件
function elementHide(e) {
    e.setAttribute("style", "display:none");
}

// 修改異常訊息內容
function modifyErrorMessage(e, msg) {
    const errorMessage = document.querySelector(
        `#${e.target.id}-message > span`
    );
    errorMessage.textContent = msg;
}

// 判斷是否有輸入
function isValueInput(value) {
    return value !== "";
}

// 判斷數值是否異常
function isNumberError(value) {
    return isNaN(value) || !isFinite(value);
}

// 判斷數值是否小於零
function isNumberLessThanZero(value) {
    return value < 0;
}

// 判斷輸入的數值是否合法
function isInputValueLegal(e) {
    // 判斷是否輸入
    if (!isValueInput(e.value)) {
        return false;
    }

    // 判斷數值是否正確
    if (
        e.type === "number" &&
        (isNumberError(e.value) || isNumberLessThanZero(e.value))
    ) {
        return false;
    }

    // 客製化判斷
    // 套票星級必須介於1~10之間
    if (e.id === "ticketRate" && (e.value < 1 || e.value > 10)) {
        return false;
    }
    // 套票組數必須大於或等於 1 組
    else if (e.id === "ticketNum" && e.value < 1) {
        return false;
    }

    return true;
}
