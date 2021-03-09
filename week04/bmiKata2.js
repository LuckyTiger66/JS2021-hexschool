const bmiStatesData = {
  overThin: {
    state: "過輕",
    color: "藍色",
  },
  normal: {
    state: "正常",
    color: "紅色",
  },
  overWeight: {
    state: "過重",
    color: "澄色",
  },
  mildFat: {
    state: "輕度肥胖",
    color: "黃色",
  },
  moderateFat: {
    state: "中度肥胖",
    color: "黑色",
  },
  severeFat: {
    state: "重度肥胖",
    color: "綠色",
  },
};

function bmiStateTest(bmiState) {
  console.log(
    `您的體重${bmiStatesData[bmiState].state}，健康指數為${bmiStatesData[bmiState].color}`
  );
}

function printBmi(height, weight) {
  let bmi = (weight / (height / 100) ** 2).toFixed(2);
  console.log(bmi);
  if (!isFinite(bmi)) {
    // 檢查是否為有效的數值或可以轉型為Number的值
    // 排除字串 NaN Infinity -Infinity
    console.log("您的數值輸入錯誤，請重新輸入");
  } else if (0 <= bmi && bmi < 18.5) {
    bmiStateTest('overThin');
  } else if (bmi < 24) {
    bmiStateTest("normal");
  } else if (bmi < 27) {
    bmiStateTest("overWeight");
  } else if (bmi < 30) {
    bmiStateTest("mildFat");
  } else if (bmi < 35) {
    bmiStateTest("moderateFat");
  } else if (35 <= bmi) {
    bmiStateTest("severeFat");
  } else {
    console.log("出現例外情況");
  }
}
// 以下為測試用數據
// printBmi(0,0)    //bmi 為 NaN
// printBmi(100,0)  //bmi 為 0
// printBmi(0,100)  //bmi 為 Infinity
// printBmi(0,-100) //bmi 為 -Infinity
// printBmi('100','10') //bmi 為 10
printBmi(178, 20);
printBmi(178, 70);
printBmi(178, 85);
printBmi(178, 90);
printBmi(178, 110);
printBmi(178, 130);
printBmi("身高", "體重");
