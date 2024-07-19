/*

Constant Window

-1, 2, 3, 4, 5, -1

so like move the window keep two pointer i and j
if k = 4 , i = 0 and j = 3 and keep moving the window i = 1, j = 4 => i = 2, j = 5
while moving remove the last element from the sum

*/

/*

Longest subarray / substring

sum <= k

arr = [2, 5, 1, 7, 10]
k = 14

Better Solution

arr = [2, 5, 1, 7, 10]
k = 15


Expand r and Shrink l
sum

keep inially sum 0 

so add arr[r] to the sum
and take r to next one and keep doing it till sum < k expand
else remove l element and move l forward means shrink

while(r < n){
    sum += arr[r]

    while(sum > k){
        sum -= arr[l]
        l += 1
    }

    if(sum <= k){
        max = Math.max(r - l + 1, max)
    }
    r += 1
}



*/