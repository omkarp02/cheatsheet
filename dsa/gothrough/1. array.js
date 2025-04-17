/*


don't need to solve
Largest Element in an Array

don't need to solve
Second Largest Element in an Array without sorting

don't need to solve
Check if the array is sorted

don't need to solve
Remove duplicates from Sorted array

don't need to solve
Left Rotate an array by one place

don't need to solve
Left rotate an array by D places

don't need to solve
Move Zeros to end

don't need to solve
Find the Union

formula for sum of n natural number is (n * (n + 1)) / 2  
can be done using xor
don't need to solve
Find missing number in an array

can be done in single traversal
Maximum Consecutive Ones

better: hashing
optimal: using xor
Find the number that appears once, and other numbers twice.

better: hashing
here there is edge case with zero suppose the array is [2, 0, 0, 3] your answer will be index 3 to 3 but it is 1 to 3 just remember the edge case solution is easy
optimal:  prefix sum by anuj here for 0 edge case just do not reudpate
Longest subarray with given sum K(positives)

encode using length of the string like abc will be 3#abc
Enocode and decode

two pointer
Container with most water 

*/

/*


better: hasing
optimal: two pointer
2Sum Problem

this you have done many time using mid
Sort an array of 0's 1's and 2's

better: hashing
optimal: moore algorithm
Majority Element (>n/2 times)

Kadane's Algorithm, maximum subarray sum

this was easy can be done in o(n) useLowestSoFar
Stock Buy and Sell

better: can be done using an extra array
Rearrange the array in alternating positive and negative items

can be done using recursion or you can check
Next Permutation

very easy don't do it
Leaders in an Array problem


better: sort the array
optimal: use set
Longest Consecutive Sequence in an Array

brute you were able to solve easily see the mapping
better O(2n) space complixisty 0(1) convert to -1 instead of zero in first iteration
Set Matrix Zeros

better:  transpose the matrix than reverse
hashmap: 1e, 1a, 1t is the key
Rotate Matrix by 90 degrees

this was easy try one time just the theory hint four for loop for four side don't try to complicate
keep top, left at 0 then bottom right at 5
then for  loop left to right and so on
Print the matrix in spiral manner

using prefix sum hashmap 
Count subarrays with given sum

brute:  sort every word
Group anagram




******************************************************
Hard

this can be solve using some alog and other by find the upper index
Pascal's Triangle

better: hashing
optimal: you know since it is n/3 there would be 2 element present which would be appearing n/3 times like if n = 8 then it would be 8/3 = 2 so 3 + 3 + 2 so 2 numbers
see the optimal solution can be solved by twiking morees solution
Majority Element (n/3 times)


brute ncube
better use 2 for loop and hashing - tc nsquare use set to handle duplicates
sort the array keep i constant and move j and k make sure to handle duplicates according to queston
3-Sum Problem

just like 3 sum
4-Sum Problem

optimal this can be done using prefix sum
Largest Subarray with 0 Sum

Count number of subarrays with given xor K

optimal: sort by both pair first sort by first element and if both elelent are equeal sort by last element
Merge Overlapping Subintervals

better start from first array end and second array first and compare
Merge two sorted arrays without extra space

missing number better: hash optimal: cyclic sort and maths 
you can check stiver solution once
Find the repeating and missing number

merge sort
Count Inversions

merge sort
Reverse Pairs

this can be done using suffix and prefix
Maximum Product Subarray

*/
