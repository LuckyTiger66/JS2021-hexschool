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
let bmiHistoryData = [];

function addData(bmi, bmiState) {
  bmiHistoryData.push({ bmi, bmiState });
  // console.log(bmiHistoryData);
}

function printBmi(height, weight) {
  let bmi = (weight / (height / 100) ** 2).toFixed(2);
  // console.log(bmi);
  console.log(bmiState);
  if (!isFinite(bmi)) {
    // 檢查是否為有效的數值或可以轉型為 Number 的值
    // 排除不可轉型字串 NaN Infinity -Infinity
    console.log("您的數值輸入錯誤，請重新輸入");
    return;
  } else if (0 <= bmi && bmi < 18.5) {
    bmiState = "overThin";
  } else if (bmi < 24) {
    bmiState = "normal";
  } else if (bmi < 27) {
    bmiState = "overWeight";
  } else if (bmi < 30) {
    bmiState = "mildFat";
  } else if (bmi < 35) {
    bmiState = "moderateFat";
  } else if (35 <= bmi) {
    bmiState = "severeFat";
  } else {
    console.log("出現例外情況");
  }
  // 印出第一階段、第二階段結果用
  console.log(
    `您的體重${bmiStatesData[bmiState].state}，健康指數為${bmiStatesData[bmiState].color}`
  );

  addData(bmi, bmiState);
}

function showHistoryData() {
  console.log(`
  您總共計算 ${bmiHistoryData.length} 次 BMI 紀錄，最後一次 BMI 指數為 ${
    bmiHistoryData[bmiHistoryData.length - 1].bmi
  }，
  體重${bmiStatesData[bmiHistoryData[bmiHistoryData.length - 1].bmiState].state}
  健康指數為${
    bmiStatesData[bmiHistoryData[bmiHistoryData.length - 1].bmiState].color
  }`);
}

printBmi(178, 20);
printBmi(178, 70);
printBmi(178, 85);
showHistoryData();
