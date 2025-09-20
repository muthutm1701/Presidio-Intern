# C++ Map & Unordered Map Exploration

This repository documents my study of ordered (std::map) and unordered (std::unordered_map) maps in C++. It includes a summary of their core concepts, a comparison of their time complexities, and C++ solutions to common problems that leverage these data structures.
# 💻 Problems Solved
I've applied these concepts to solve the following problems. The solutions can be found in this repository.

1. Frequency of Elements
File: frequncyOfElements.cpp

Description: A program to count the occurrences of each element in a given array.

Data Structure Used: std::unordered_map was the ideal choice here due to its O(1) average time complexity for insertions and lookups, making the process of tallying element counts extremely efficient.

2. Subarray with Zero Sum
File: sumzero.cpp

Description: A program to determine if a subarray with a sum of zero exists within a given array.

Data Structure Used: std::unordered_map was used to store prefix sums. This allows for an O(1) check to see if a particular sum has been encountered before, leading to an optimal overall solution with O(n) time complexity.