// Assign Cookies
//was easy can do by sort

// Fractional Knapsack Problem
//this you were able to figure out yourself
//solution figure out value of 1 weight and now think  yourself

// Greedy algorithm to find minimum number of coins
//was easy did'nt do it

// Lemonade Change
//was easy did'nt do it

//    Valid Paranthesis Checker
//better get all posibilty of * where it can be str ( or ) through recursion
//optimal you are doing three posible scireio if * add 0 or ) bracket add -1 if ( than add 1 so instead of recursion you can use range like min and max
//see video from 15:00
//maintain a range by min and max

var checkValidString = function (str) {
  let min = 0;
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const cur = str[i];

    if (cur === "(") {
      min += 1;
      max += 1;
    } else if (cur === ")") {
      min -= 1;
      max -= 1;
    } else {
      min -= 1;
      max += 1;
    }

    if (min < 0) min = 0;
    if (max < 0) return false;
  }

  return min === 0;
};

const s = "(*)";
// console.log(checkValidString(s));

// N meetings in one room
//This was easy sort by end array because need to know which meeting end faster

// Jump Game
//This was easy i was able to figure out solution in mind

// Jump Game 2
//bruteforce can be done using recursoin try all possible ways
//this you were figure out yourself

var jump = function (nums) {
  if (nums.length === 1) return 0;

  let max = 0;
  let dist = 0;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i];

    max = Math.max(max, i + cur);

    if (i === dist) {
      count++;
      dist = max;
      if (dist >= nums.length - 1) {
        return count;
      }
    }
  }

  return count;
};

const arr = [2, 3, 0, 1, 4];
// console.log(jump(arr));

// Minimum number of platforms required for a railway
//this problem is exactly like merge intervals
//you solved this yourself

function minNoOfPlatforms(arrival, departure) {
  let previousTrainTime = [arrival[0], departure[0]];
  let count = 0;
  let max = 0;

  for (let i = 0; i < arrival.length; i++) {
    const arrivalTime = arrival[i];
    const departureTime = departure[i];

    if (arrivalTime <= previousTrainTime[1]) {
      count += 1;
    } else {
      max = Math.max(max, count);
      count = 1;
      previousTrainTime = [arrivalTime, departureTime];
    }
  }

  return Math.max(count, max);
}

const arrival = [1000, 935, 1100];
const departure = [1200, 1240, 1130];

// console.log(minNoOfPlatforms(arrival, departure));

// Job sequencing Problem
//not able to solve 
//intuition sort by profit and make a empy array of size n and 
//move on greatest proft which is 80 and deadline is 6 so make 6 day in array taken
//then deadline is again 6 so is less thna 6 availble yes make 5 as taken and to so on

// Candy
//slope algorithm to solve

// Program for Shortest Job First (or SJF) CPU Scheduling
//very easy no need to do it

// Program for Least Recently Used (LRU) Page Replacement Algorithm

// Insert Interval
//was easy did'nt do it

// Merge Intervals

// Non-overlapping Intervals
