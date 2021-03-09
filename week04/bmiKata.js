function printBmi(height, weight) {
  let bmi = (weight / (height / 100) ** 2).toFixed(2);
  console.log(bmi);
  if (!isFinite(bmi)) {
    // 檢查是否為有效的數值或可以轉型為Number的值
    // 排除字串 NaN Infinity -Infinity
    console.log("你的數值輸入錯誤，請重新輸入");
  } else if (0 <= bmi && bmi < 18.5) {
    console.log("你的體重過輕");
  } else if (bmi < 24) {
    console.log("你的體重正常");
  } else if (bmi < 27) {
    console.log("你的體重過重");
  } else if (bmi < 30) {
    console.log("你的體重輕度肥胖");
  } else if (bmi < 35) {
    console.log("你的體重中度肥胖");
  } else if (35 <= bmi) {
    console.log("你的體重重度肥胖");
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
