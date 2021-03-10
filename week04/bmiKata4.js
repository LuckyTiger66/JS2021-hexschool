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

let bmiHistoryData = [];

function addData(bmi, bmiState) {
  bmiHistoryData.push({ bmi, bmiState });
  console.log(bmiHistoryData);
}

function printBmi(cm,kg){
  let bmi = (kg / (cm/100)**2 ).toFixed(2);
  let bmiState;
  if(!isFinite(bmi)) return console.log(`「您的數值輸入錯誤，請重新輸入」`)
  else if(bmi < 18.5 ) bmiState = 'overThin'
  else if(bmi < 24 ) bmiState = 'normal'
  else if(bmi < 27 ) bmiState = 'overWeight'
  else if(bmi < 30 ) bmiState = 'mildFat'
  else if(bmi < 35 ) bmiState = 'moderateFat'
  else bmiState = 'severeFat'

  console.log(`「您的體重${bmiStatesData[bmiState].state}，健康指數為${bmiStatesData[bmiState].color}」`);

  addData(bmi, bmiState);
}

function showHistoryData() {
  let lastestData = bmiHistoryData[bmiHistoryData.length - 1]
  console.log(`
  您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，
  最後一次 BMI 指數為 ${lastestData.bmi}，
  體重${bmiStatesData[lastestData.bmiState].state}
  健康指數為${
    bmiStatesData[lastestData.bmiState].color
  }`);
}

// 第一組資料測試：
// printBmi(0,0)    //bmi 為 NaN
// printBmi(100,0)  //bmi 為 0
// printBmi(0,100)  //bmi 為 Infinity
// printBmi(0,-100) //bmi 為 -Infinity
// showHistoryData()
//
// 第二組資料測試:
printBmi(178, 20) 
printBmi(178, 70) 
printBmi(178, 85)
printBmi(178, 90)
printBmi(178, 110)
printBmi(178, 130)
printBmi("身高","體重")
showHistoryData()