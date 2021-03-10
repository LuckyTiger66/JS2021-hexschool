const bmiStatesData = {
  "overThin": {
    "state": "過輕",
    "color": "藍色"
  },
  "normal": {
    "state": "正常",
    "color": "紅色"
  },
  "overWeight": {
    "state": "過重",
    "color": "澄色"
  },
  "mildFat": {
    "state": "輕度肥胖",
    "color": "黃色"
  },
  "moderateFat": {
    "state": "中度肥胖",
    "color": "黑色"
  },
  "severeFat": {
    "state": "重度肥胖",
    "color": "綠色"
  },
}

// 第一組資料測試:
// printBmi(178, 20);
// printBmi(178, 70);
// printBmi(178, 85);
// printBmi(178, 90);
// printBmi(178, 110);
// printBmi(178, 130);
// printBmi("身高", "體重");
// showHistoryData()
//
// 第二組資料測試:
// printBmi(178, 20);
// printBmi(178, 70);
// printBmi(178, 85);
// showHistoryData()
//
// 第三組資料測試：
// printBmi(0,0)    //bmi 為 NaN
// printBmi(100,0)  //bmi 為 0
// printBmi(0,100)  //bmi 為 Infinity
// printBmi(0,-100) //bmi 為 -Infinity
// showHistoryData()
//
