export const calculateMetrics = (
  activity: string,
  age: string,
  gender: string,
  height: string,
  weight: string,
  target: string,
) => {
  const weightNum = Number(weight);
  const heightNum = Number(height);
  const ageNum = Number(age);
  let activityNum = 1.2;
  let targetNum = 1;

  switch (activity) {
    case "1":
      activityNum = 1.2;
      break;
    case "2":
      activityNum = 1.375;
      break;
    case "3":
      activityNum = 1.55;
      break;
    case "4":
      activityNum = 1.725;
      break;
  }

  switch (target) {
    case "loss":
      targetNum = 0.85;
      break;
    case "maintain":
      targetNum = 1;
      break;
    case "gain":
      targetNum = 1.15;
      break;
  }

  let bmr = 0;
  if (gender === "male") {
    bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
  } else {
    bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
  }

  const totalCalories = Math.round(bmr * activityNum * targetNum);

  return { totalCalories };
};
