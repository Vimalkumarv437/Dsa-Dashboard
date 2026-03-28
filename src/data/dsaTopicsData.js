// DSA Topics — all 15 topics with Python examples, complexity, and key concepts
// Part 1: Arrays → Recursion

export const dsaTopics = [

  // ─────────────── 1. ARRAYS ───────────────
  {
    id: "arrays",
    title: "Arrays",
    category: "Arrays",
    difficulty: "Easy",
    description: "The most fundamental data structure — contiguous memory, O(1) access by index.",
    explanation: `An array stores elements in contiguous memory locations. Each element is accessible in O(1) time via its index. Arrays are the building block of almost every algorithm — mastering them is the first step in DSA preparation.`,
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    keyConcepts: [
      "Indexing: arr[i] is O(1) — direct memory address calculation",
      "Insertion/Deletion at end: O(1) amortized (dynamic arrays)",
      "Insertion/Deletion at middle: O(n) — requires shifting elements",
      "Two Pointer technique: solve many array problems in O(n)",
      "Prefix Sum: precompute cumulative sums for O(1) range queries",
      "Kadane's Algorithm: maximum subarray sum in O(n)",
      "Boyer-Moore Voting: find majority element in O(n) time O(1) space",
    ],
    codeExample: `# ── Two Sum — O(n) time, O(n) space ──────────────────────────────
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value → index
    for i, num in enumerate(nums):
        if target - num in seen:
            return [seen[target - num], i]
        seen[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))   # [0, 1]

# ── Prefix Sum — range sum in O(1) after O(n) build ───────────────
def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i, v in enumerate(nums):
        prefix[i + 1] = prefix[i] + v
    return prefix

def range_sum(prefix, l, r):         # inclusive [l, r]
    return prefix[r + 1] - prefix[l]

# ── Maximum Subarray — Kadane's O(n) ──────────────────────────────
def max_subarray(nums: list[int]) -> int:
    cur = best = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6

# ── Rotate Array in-place — O(n) time O(1) space ──────────────────
def rotate(nums: list[int], k: int) -> None:
    n = len(nums)
    k %= n
    nums.reverse()
    nums[:k] = reversed(nums[:k])
    nums[k:] = reversed(nums[k:])`,
    leetcodeProblems: [
      { name: "Two Sum", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
      { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium" },
      { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy" },
      { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium" },
      { name: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Arrays Crash Course", url: "https://www.youtube.com/embed/KLlXCFG5TnA" },
    ],
  },

  // ─────────────── 2. STRINGS ───────────────
  {
    id: "strings",
    title: "Strings",
    category: "Strings",
    difficulty: "Easy",
    description: "Immutable sequences of characters — the backbone of text processing problems.",
    explanation: `Strings are immutable arrays of characters. Most string problems reduce to: hashing characters (frequency maps), two pointers, or sliding window. Key insight: strings in Python are immutable — building a new string in a loop is O(n²); use list then ''.join() instead.`,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n²)" },
    spaceComplexity: "O(n) for extra storage",
    keyConcepts: [
      "Character frequency map: Counter or dict of size 26 — O(1) space for lowercase",
      "Two Pointers for palindrome check: O(n) time O(1) space",
      "Anagram: same character multiset — sort or frequency map",
      "Sliding Window for substring problems: expand right, shrink left",
      "String building: always use list + join, NOT += in loops",
      "KMP Algorithm: O(n+m) pattern matching (failure function)",
      "Z-Algorithm: another O(n+m) pattern matching approach",
    ],
    codeExample: `from collections import Counter

# ── Valid Anagram — O(n) ───────────────────────────────────────────
def is_anagram(s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

# ── Longest Palindromic Substring — Expand Around Center O(n²) ────
def longest_palindrome(s: str) -> str:
    res, res_len = "", 0
    for i in range(len(s)):
        for l, r in [(i, i), (i, i + 1)]:   # odd and even
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if r - l + 1 > res_len:
                    res, res_len = s[l:r+1], r - l + 1
                l -= 1; r += 1
    return res

print(longest_palindrome("babad"))   # "bab"

# ── Valid Parentheses — O(n) ───────────────────────────────────────
def is_valid(s: str) -> bool:
    stack, mapping = [], {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in mapping:
            if not stack or stack[-1] != mapping[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    return not stack

# ── Group Anagrams — O(n * k log k) ───────────────────────────────
from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for w in strs:
        groups[tuple(sorted(w))].append(w)
    return list(groups.values())

# ── Reverse Words in a String — O(n) ──────────────────────────────
def reverse_words(s: str) -> str:
    return " ".join(s.split()[::-1])`,
    leetcodeProblems: [
      { name: "Valid Anagram", url: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy" },
      { name: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium" },
      { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
      { name: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium" },
      { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard" },
    ],
    videos: [
      { title: "String Manipulation Problems", url: "https://www.youtube.com/embed/KLlXCFG5TnA" },
    ],
  },

  // ─────────────── 3. LINKED LIST ───────────────
  {
    id: "linked-list",
    title: "Linked List",
    category: "Linked List",
    difficulty: "Easy",
    description: "Nodes connected by pointers — dynamic size, O(1) insert/delete at known node.",
    explanation: `A Linked List is a sequence of nodes where each node holds a value and a pointer to the next node. Unlike arrays, linked lists do not require contiguous memory and support O(1) insertion/deletion at any known node. The tradeoff: O(n) random access instead of O(1).`,
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    keyConcepts: [
      "Singly Linked List: each node has value + next pointer",
      "Doubly Linked List: each node has value + next + prev",
      "Fast & Slow Pointers (Floyd's): detect cycles, find middle",
      "Dummy Head Node: simplifies edge cases for head deletion/insertion",
      "Reverse in-place: three pointer technique — prev, curr, next",
      "Merge Two Sorted Lists: two pointer merge like merge sort",
      "LRU Cache: HashMap + Doubly Linked List = O(1) get/put",
    ],
    codeExample: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# ── Reverse Linked List — O(n) iterative ──────────────────────────
def reverse_list(head: ListNode) -> ListNode:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

# ── Detect Cycle — Floyd's Algorithm O(n) O(1) ────────────────────
def has_cycle(head: ListNode) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False

# ── Find Middle Node — fast/slow O(n) O(1) ────────────────────────
def middle_node(head: ListNode) -> ListNode:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# ── Merge Two Sorted Lists — O(n+m) ───────────────────────────────
def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = curr = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next, l1 = l1, l1.next
        else:
            curr.next, l2 = l2, l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next

# ── Remove Nth From End — one pass O(n) ───────────────────────────
def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    left = dummy
    right = head
    for _ in range(n):
        right = right.next
    while right:
        left = left.next
        right = right.next
    left.next = left.next.next
    return dummy.next`,
    leetcodeProblems: [
      { name: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy" },
      { name: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy" },
      { name: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy" },
      { name: "Remove Nth Node From End", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium" },
      { name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Linked Lists for Beginners", url: "https://www.youtube.com/embed/Hj_rA0dhr2I" },
    ],
  },

  // ─────────────── 4. STACK ───────────────
  {
    id: "stack",
    title: "Stack",
    category: "Stack",
    difficulty: "Easy",
    description: "LIFO structure — push and pop from the same end. Great for matching/nesting.",
    explanation: `A Stack is a Last-In-First-Out (LIFO) data structure. Elements are pushed onto the top and popped from the top. Stacks are natural for problems involving nested structures, undo operations, DFS traversal, and monotonic sequences.`,
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    keyConcepts: [
      "Push: add element to top — O(1)",
      "Pop: remove element from top — O(1)",
      "Peek/Top: view top without removing — O(1)",
      "Monotonic Stack: maintains increasing or decreasing order",
      "Valid Parentheses: classic stack pattern for matching brackets",
      "Next Greater Element: monotonic stack — process right to left",
      "Largest Rectangle in Histogram: monotonic stack left-right sweep",
    ],
    codeExample: `# ── Valid Parentheses — O(n) ───────────────────────────────────────
def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in pairs:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)
    return not stack

# ── Daily Temperatures — Monotonic Stack O(n) ─────────────────────
def daily_temperatures(temps: list[int]) -> list[int]:
    """For each day, how many days until a warmer temperature."""
    res = [0] * len(temps)
    stack = []   # stores indices; maintains decreasing temps
    for i, t in enumerate(temps):
        while stack and t > temps[stack[-1]]:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res

print(daily_temperatures([73,74,75,71,69,72,76,73]))
# Output: [1, 1, 4, 2, 1, 1, 0, 0]

# ── Min Stack — O(1) all operations ───────────────────────────────
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []   # tracks current min at each push

    def push(self, val: int):
        self.stack.append(val)
        cur_min = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(cur_min)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def get_min(self) -> int:
        return self.min_stack[-1]

# ── Evaluate Reverse Polish Notation — O(n) ───────────────────────
def eval_rpn(tokens: list[str]) -> int:
    stack = []
    ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,
           '*': lambda a,b: a*b, '/': lambda a,b: int(a/b)}
    for t in tokens:
        if t in ops:
            b, a = stack.pop(), stack.pop()
            stack.append(ops[t](a, b))
        else:
            stack.append(int(t))
    return stack[0]`,
    leetcodeProblems: [
      { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
      { name: "Min Stack", url: "https://leetcode.com/problems/min-stack/", difficulty: "Medium" },
      { name: "Daily Temperatures", url: "https://leetcode.com/problems/daily-temperatures/", difficulty: "Medium" },
      { name: "Evaluate Reverse Polish Notation", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "Medium" },
      { name: "Largest Rectangle in Histogram", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard" },
    ],
    videos: [
      { title: "Stack Data Structure", url: "https://www.youtube.com/embed/KInG04mAjO0" },
    ],
  },

  // ─────────────── 5. QUEUE ───────────────
  {
    id: "queue",
    title: "Queue",
    category: "Queue",
    difficulty: "Easy",
    description: "FIFO structure — enqueue at rear, dequeue from front. Used in BFS and scheduling.",
    explanation: `A Queue is a First-In-First-Out (FIFO) structure. Elements are added at the rear (enqueue) and removed from the front (dequeue). Queues power BFS (Breadth-First Search) for shortest paths in unweighted graphs and level-order tree traversal. Use collections.deque in Python for O(1) operations at both ends.`,
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    keyConcepts: [
      "Enqueue: add to rear — O(1) with deque",
      "Dequeue: remove from front — O(1) with deque",
      "Python: use collections.deque; list.pop(0) is O(n)!",
      "BFS: uses a queue to visit nodes level by level",
      "Circular Queue: fixed-size queue using modular arithmetic",
      "Deque (Double-ended Queue): push/pop from both ends O(1)",
      "Monotonic Deque: sliding window maximum in O(n)",
    ],
    codeExample: `from collections import deque

# ── BFS Shortest Path — O(V + E) ──────────────────────────────────
def bfs_shortest_path(graph: dict, start, end) -> int:
    """Returns shortest path length from start to end in unweighted graph."""
    visited = {start}
    queue = deque([(start, 0)])   # (node, distance)
    while queue:
        node, dist = queue.popleft()
        if node == end:
            return dist
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1

# ── Level Order Tree Traversal — O(n) ─────────────────────────────
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def level_order(root: TreeNode) -> list[list[int]]:
    if not root:
        return []
    result, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result

# ── Sliding Window Maximum — Monotonic Deque O(n) ─────────────────
def max_sliding_window(nums: list[int], k: int) -> list[int]:
    """Deque stores indices; front is always the current window max."""
    dq = deque()   # monotonically decreasing
    res = []
    for i, n in enumerate(nums):
        # Remove elements outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Maintain decreasing order
        while dq and nums[dq[-1]] < n:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res

print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))
# Output: [3,3,5,5,6,7]`,
    leetcodeProblems: [
      { name: "Number of Islands (BFS)", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
      { name: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" },
      { name: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" },
      { name: "Design Circular Queue", url: "https://leetcode.com/problems/design-circular-queue/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Queue Data Structure", url: "https://www.youtube.com/embed/KInG04mAjO0" },
    ],
  },

  // ─────────────── 6. BINARY SEARCH ───────────────
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Search",
    difficulty: "Medium",
    description: "Eliminate half the search space each step — O(log n) on sorted/monotonic inputs.",
    explanation: `Binary Search repeatedly halves the search space by comparing the target against the middle element. Requires the search space to be sorted or have a monotonic property. Beyond finding exact values, binary search can be applied to answer spaces: "find the minimum x such that condition(x) is true."`,
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1) iterative",
    keyConcepts: [
      "Classic: find exact target — O(log n)",
      "Left boundary: find first position where condition is true",
      "Right boundary: find last position where condition is true",
      "Template: left = 0, right = n-1, mid = left + (right-left)//2",
      "Binary search on answer: search values in [lo, hi], check feasibility",
      "Off-by-one errors: careful with left <= right vs left < right",
      "Applications: sorted array, rotated array, sqrt, kth smallest",
    ],
    codeExample: `# ── Classic Binary Search — O(log n) ──────────────────────────────
def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# ── Find First Position (Left Bound) — O(log n) ───────────────────
def search_first(nums: list[int], target: int) -> int:
    left, right, result = 0, len(nums) - 1, -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1   # keep searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return result

# ── Search in Rotated Sorted Array — O(log n) ─────────────────────
def search_rotated(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:    # left half is sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:                          # right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1

# ── Binary Search on Answer: Minimum Eating Speed — O(n log m) ────
import math

def min_eating_speed(piles: list[int], h: int) -> int:
    """Koko eating bananas — find minimum k such that all piles eaten in h hours."""
    def feasible(speed):
        return sum(math.ceil(p / speed) for p in piles) <= h

    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if feasible(mid):
            right = mid
        else:
            left = mid + 1
    return left`,
    leetcodeProblems: [
      { name: "Binary Search", url: "https://leetcode.com/problems/binary-search/", difficulty: "Easy" },
      { name: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium" },
      { name: "Find Minimum in Rotated Sorted Array", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium" },
      { name: "Koko Eating Bananas", url: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "Medium" },
      { name: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard" },
    ],
    videos: [
      { title: "Binary Search — NeetCode", url: "https://www.youtube.com/embed/znqivey1Tlo" },
    ],
  },

  // ─────────────── 7. SORTING ───────────────
  {
    id: "sorting",
    title: "Sorting",
    category: "Sorting",
    difficulty: "Medium",
    description: "Core algorithms — Merge Sort, Quick Sort, Counting Sort and their trade-offs.",
    explanation: `Sorting algorithms arrange data in a specific order. Understanding the trade-offs (time, space, stability, in-place) is essential. Merge Sort guarantees O(n log n) worst case, Quick Sort achieves O(n log n) average with O(1) extra space. Counting/Radix Sort achieves O(n) for bounded integers.`,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²) for Quick" },
    spaceComplexity: "O(n) Merge, O(log n) Quick",
    keyConcepts: [
      "Comparison-based sorts: Ω(n log n) theoretical lower bound",
      "Merge Sort: divide → sort → merge; stable; O(n log n) guaranteed",
      "Quick Sort: pivot partition; O(n log n) avg, O(n²) worst; in-place",
      "Heap Sort: uses max-heap; O(n log n) worst; not stable; in-place",
      "Counting Sort: O(n+k) — only for small integer keys",
      "Stability: stable sort preserves relative order of equal elements",
      "Python's Timsort: hybrid merge+insertion; stable O(n log n)",
    ],
    codeExample: `# ── Merge Sort — O(n log n) time, O(n) space ──────────────────────
def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

# ── Quick Sort — O(n log n) avg, O(n²) worst ──────────────────────
def quick_sort(arr: list[int], lo: int, hi: int) -> None:
    if lo < hi:
        p = partition(arr, lo, hi)
        quick_sort(arr, lo, p - 1)
        quick_sort(arr, p + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1

# ── Sort Colors (Dutch National Flag) — O(n) O(1) ─────────────────
def sort_colors(nums: list[int]) -> None:
    """Three-way partition: 0s | 1s | 2s in one pass."""
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

# ── Merge Intervals — O(n log n) ──────────────────────────────────
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
    leetcodeProblems: [
      { name: "Sort Colors", url: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium" },
      { name: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium" },
      { name: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" },
      { name: "Meeting Rooms II", url: "https://leetcode.com/problems/meeting-rooms-ii/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Sorting Algorithms Explained", url: "https://www.youtube.com/embed/kgBjXUE_Nwc" },
    ],
  },

  // ─────────────── 8. RECURSION ───────────────
  {
    id: "recursion",
    title: "Recursion",
    category: "Recursion",
    difficulty: "Medium",
    description: "A function calling itself — the foundation of backtracking, DFS, and divide & conquer.",
    explanation: `Recursion solves a problem by breaking it into smaller instances of the same problem. Every recursive solution needs: a base case (stop condition) and a recursive case (smaller problem). The call stack uses O(depth) space. Tail recursion can sometimes be converted to iteration to avoid stack overflow.`,
    timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(2ⁿ) naive" },
    spaceComplexity: "O(depth) call stack",
    keyConcepts: [
      "Base Case: the stopping condition — ALWAYS define this first",
      "Recursive Case: call function with smaller/simpler input",
      "Call Stack: each recursive call adds a frame — risk of stack overflow",
      "Memoization: cache recursive results to avoid recomputation",
      "Backtracking: recursion + undo choices when a path fails",
      "Divide & Conquer: split into independent subproblems (merge sort)",
      "Tree recursion: multiple recursive calls per frame (Fibonacci naive)",
    ],
    codeExample: `from functools import lru_cache

# ── Fibonacci with Memoization — O(n) ─────────────────────────────
@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# ── Power Function — O(log n) ─────────────────────────────────────
def my_pow(x: float, n: int) -> float:
    """Fast exponentiation using divide & conquer."""
    if n == 0:
        return 1.0
    if n < 0:
        x, n = 1 / x, -n
    half = my_pow(x, n // 2)
    return half * half if n % 2 == 0 else half * half * x

# ── Generate All Subsets — O(2ⁿ) ─────────────────────────────────
def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(start, path):
        result.append(path[:])   # snapshot
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()           # undo
    backtrack(0, [])
    return result

# ── Permutations — O(n!) ──────────────────────────────────────────
def permutations(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i, n in enumerate(remaining):
            path.append(n)
            backtrack(path, remaining[:i] + remaining[i+1:])
            path.pop()
    backtrack([], nums)
    return result

# ── Tower of Hanoi — O(2ⁿ) ───────────────────────────────────────
def hanoi(n: int, src: str, dst: str, aux: str) -> None:
    if n == 1:
        print(f"Move disk 1 from {src} to {dst}")
        return
    hanoi(n-1, src, aux, dst)
    print(f"Move disk {n} from {src} to {dst}")
    hanoi(n-1, aux, dst, src)`,
    leetcodeProblems: [
      { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy" },
      { name: "Subsets", url: "https://leetcode.com/problems/subsets/", difficulty: "Medium" },
      { name: "Permutations", url: "https://leetcode.com/problems/permutations/", difficulty: "Medium" },
      { name: "Letter Combinations of a Phone Number", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "Medium" },
      { name: "Word Search", url: "https://leetcode.com/problems/word-search/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Recursion & Backtracking", url: "https://www.youtube.com/embed/gQszF5qdZ-8" },
    ],
  },
  // ─────────────── 9. TREES ───────────────
  {
    id: "trees",
    title: "Trees",
    category: "Trees",
    difficulty: "Medium",
    description: "Hierarchical structures — DFS, BFS, and the beautiful world of BSTs.",
    explanation: `A tree is a hierarchical structure of nodes connected by edges with no cycles. Binary Trees have at most 2 children. Binary Search Trees (BST) enforce left < node < right. Most tree problems use DFS (recursion — elegant and compact) or BFS (level-order — uses a queue). Key insight: think recursively — solve for a node assuming left/right subtrees are already solved.`,
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n) unbalanced" },
    spaceComplexity: "O(h) — h = height",
    keyConcepts: [
      "Inorder (L→Root→R): gives sorted sequence in BST",
      "Preorder (Root→L→R): serialize/copy a tree",
      "Postorder (L→R→Root): bottom-up computation, delete tree",
      "Level Order (BFS): uses deque, processes level by level",
      "BST property: inorder traversal yields sorted array",
      "Balanced Tree: |height(left) - height(right)| ≤ 1 at every node",
      "Lowest Common Ancestor: key BST/general tree interview pattern",
    ],
    codeExample: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# ── Max Depth — O(n) DFS ──────────────────────────────────────────
def max_depth(root: TreeNode) -> int:
    if not root: return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# ── Is Balanced — O(n) ────────────────────────────────────────────
def is_balanced(root: TreeNode) -> bool:
    def height(node):
        if not node: return 0
        lh = height(node.left)
        if lh == -1: return -1
        rh = height(node.right)
        if rh == -1 or abs(lh - rh) > 1: return -1
        return 1 + max(lh, rh)
    return height(root) != -1

# ── Level Order BFS — O(n) ────────────────────────────────────────
def level_order(root: TreeNode) -> list[list[int]]:
    if not root: return []
    result, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
        result.append(level)
    return result

# ── Inorder Traversal (Iterative) — O(n) ─────────────────────────
def inorder(root: TreeNode) -> list[int]:
    result, stack, curr = [], [], root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result

# ── Lowest Common Ancestor (General Tree) — O(n) ─────────────────
def lca(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root is p or root is q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    return root if left and right else left or right`,
    leetcodeProblems: [
      { name: "Maximum Depth of Binary Tree", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy" },
      { name: "Invert Binary Tree", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "Easy" },
      { name: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" },
      { name: "Lowest Common Ancestor of a BST", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium" },
      { name: "Binary Tree Maximum Path Sum", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "Hard" },
    ],
    videos: [
      { title: "Trees — NeetCode", url: "https://www.youtube.com/embed/fAAZixBzIAI" },
    ],
  },

  // ─────────────── 10. HEAP ───────────────
  {
    id: "heap",
    title: "Heap",
    category: "Heap",
    difficulty: "Medium",
    description: "Priority Queue via heap — get min/max in O(1), insert/delete in O(log n).",
    explanation: `A Heap is a complete binary tree satisfying the heap property: in a min-heap, every parent ≤ its children (root = minimum). Python's heapq is a min-heap by default. Use negative values for max-heap simulation. Heaps power priority queues, Dijkstra's algorithm, and the top-K pattern.`,
    timeComplexity: { best: "O(1) peek", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    keyConcepts: [
      "Min-Heap: root is always the smallest element",
      "Max-Heap: root is always the largest (negate values in Python)",
      "heapq.heappush(h, x): insert in O(log n)",
      "heapq.heappop(h): remove minimum in O(log n)",
      "heapq.heapify(list): build heap in O(n)",
      "Top-K pattern: maintain heap of size K",
      "K-way merge: merge K sorted lists using a heap",
    ],
    codeExample: `import heapq

# ── Kth Largest Element — O(n log k) ──────────────────────────────
def find_kth_largest(nums: list[int], k: int) -> int:
    """Maintain a min-heap of size k; root = kth largest."""
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

print(find_kth_largest([3,2,1,5,6,4], 2))  # 5

# ── Top K Frequent Elements — O(n log k) ─────────────────────────
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

# ── Merge K Sorted Lists — O(n log k) ────────────────────────────
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def __lt__(self, other):
        return self.val < other.val

def merge_k_lists(lists: list[ListNode]) -> ListNode:
    heap = []
    for node in lists:
        if node:
            heapq.heappush(heap, node)
    dummy = curr = ListNode(0)
    while heap:
        node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, node.next)
    return dummy.next

# ── Find Median from Data Stream — O(log n) insert, O(1) median ───
class MedianFinder:
    def __init__(self):
        self.lo = []   # max-heap (negate values)
        self.hi = []   # min-heap

    def add_num(self, num: int):
        heapq.heappush(self.lo, -num)
        # Balance: move max of lo to hi
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def find_median(self) -> float:
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2.0`,
    leetcodeProblems: [
      { name: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" },
      { name: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium" },
      { name: "Merge K Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard" },
      { name: "Find Median from Data Stream", url: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard" },
    ],
    videos: [
      { title: "Heap / Priority Queue", url: "https://www.youtube.com/embed/HqPJF2L5h9U" },
    ],
  },

  // ─────────────── 11. GRAPH ───────────────
  {
    id: "graph",
    title: "Graph",
    category: "Graph",
    difficulty: "Hard",
    description: "Nodes and edges — DFS, BFS, topological sort, union-find, Dijkstra.",
    explanation: `A graph is a collection of nodes (vertices) connected by edges. It generalizes trees — graphs can have cycles. Key operations: DFS (stack/recursion) explores as deep as possible; BFS (queue) finds shortest path in unweighted graphs. Algorithms: Dijkstra (weighted shortest path), topological sort (DAG ordering), Union-Find (connected components).`,
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V²)" },
    spaceComplexity: "O(V+E)",
    keyConcepts: [
      "Adjacency List: dict[node] = [neighbors] — sparse graphs",
      "Adjacency Matrix: O(1) edge check — dense graphs",
      "DFS: depth-first, uses stack/recursion, finds components",
      "BFS: breadth-first, queue, shortest path in unweighted",
      "Topological Sort: Kahn's (BFS) or DFS post-order for DAG",
      "Union-Find (DSU): O(α(n)) per op — detect cycles, components",
      "Dijkstra: min-heap BFS for weighted shortest path O((V+E)logV)",
    ],
    codeExample: `from collections import deque, defaultdict

# ── Number of Islands — DFS O(m*n) ───────────────────────────────
def num_islands(grid: list[list[str]]) -> int:
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c); count += 1
    return count

# ── Course Schedule — Topological Sort / Cycle Detection O(V+E) ───
def can_finish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = defaultdict(list)
    for a, b in prerequisites:
        adj[b].append(a)
    visited = set()
    def dfs(node):
        if node in visiting: return False
        if node in visited:  return True
        visiting.add(node)
        for nei in adj[node]:
            if not dfs(nei): return False
        visiting.discard(node)
        visited.add(node)
        return True
    visiting = set()
    return all(dfs(c) for c in range(numCourses))

# ── Dijkstra — O((V+E) log V) ────────────────────────────────────
import heapq

def dijkstra(graph: dict, start: int) -> dict:
    """graph[u] = [(weight, v), ...]. Returns shortest dist from start."""
    dist = {start: 0}
    heap = [(0, start)]   # (cost, node)
    while heap:
        cost, u = heapq.heappop(heap)
        if cost > dist.get(u, float('inf')): continue
        for w, v in graph.get(u, []):
            new_cost = cost + w
            if new_cost < dist.get(v, float('inf')):
                dist[v] = new_cost
                heapq.heappush(heap, (new_cost, v))
    return dist

# ── Union-Find (DSU) — O(α(n)) per op ────────────────────────────
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y) -> bool:
        px, py = self.find(x), self.find(y)
        if px == py: return False   # already connected
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        return True`,
    leetcodeProblems: [
      { name: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
      { name: "Clone Graph", url: "https://leetcode.com/problems/clone-graph/", difficulty: "Medium" },
      { name: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium" },
      { name: "Pacific Atlantic Water Flow", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "Medium" },
      { name: "Network Delay Time", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Graph Algorithms — NeetCode", url: "https://www.youtube.com/embed/EgI5nU9etnU" },
    ],
  },

  // ─────────────── 12. DYNAMIC PROGRAMMING ───────────────
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "DP",
    difficulty: "Hard",
    description: "Solve overlapping subproblems once — from exponential to polynomial time.",
    explanation: `Dynamic Programming (DP) optimizes recursive solutions by storing results of overlapping subproblems. Identify: optimal substructure (optimal solution built from optimal sub-solutions) and overlapping subproblems. Two approaches: top-down memoization (recursion + cache) and bottom-up tabulation (iterative DP table). State definition is the hardest part.`,
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n³)" },
    spaceComplexity: "O(n) to O(n²)",
    keyConcepts: [
      "State: what info uniquely identifies a subproblem",
      "Recurrence: how dp[i] depends on previous states",
      "Base cases: smallest valid inputs",
      "Top-Down (Memoization): recursion + dict/lru_cache",
      "Bottom-Up (Tabulation): fill dp array iteratively",
      "1D DP patterns: Fibonacci, Climbing Stairs, House Robber",
      "2D DP patterns: LCS, Edit Distance, Knapsack",
    ],
    codeExample: `from functools import lru_cache

# ── Coin Change — Bottom-Up O(amount * len(coins)) ────────────────
def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if a >= coin:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 5, 11], 15))  # 3 (11+3*1 or 5*3)

# ── Longest Common Subsequence — 2D DP O(m*n) ─────────────────────
def lcs(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# ── 0/1 Knapsack — O(n * W) ───────────────────────────────────────
def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(W + 1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][W]

# ── Longest Increasing Subsequence — O(n log n) ───────────────────
import bisect

def lis(nums: list[int]) -> int:
    tails = []
    for n in nums:
        pos = bisect.bisect_left(tails, n)
        if pos == len(tails):
            tails.append(n)
        else:
            tails[pos] = n
    return len(tails)`,
    leetcodeProblems: [
      { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy" },
      { name: "House Robber", url: "https://leetcode.com/problems/house-robber/", difficulty: "Medium" },
      { name: "Coin Change", url: "https://leetcode.com/problems/coin-change/", difficulty: "Medium" },
      { name: "Longest Common Subsequence", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium" },
      { name: "Edit Distance", url: "https://leetcode.com/problems/edit-distance/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Dynamic Programming — NeetCode", url: "https://www.youtube.com/embed/oBt53YbR9Kk" },
    ],
  },

  // ─────────────── 13. GREEDY ───────────────
  {
    id: "greedy",
    title: "Greedy",
    category: "Greedy",
    difficulty: "Medium",
    description: "Make the locally optimal choice at each step — sometimes gives global optimum.",
    explanation: `Greedy algorithms make the best available choice at each step without reconsidering past choices. They work when problems exhibit the greedy choice property (local optimal leads to global optimal). Greedy is often simpler and faster than DP but requires proof of correctness — not all problems admit a greedy solution.`,
    timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1) to O(n)",
    keyConcepts: [
      "Greedy Choice Property: local optimum → global optimum",
      "Optimal Substructure: problem can be decomposed (shared with DP)",
      "Sorting is often the first step in greedy problems",
      "Interval Scheduling: sort by end time, greedily pick non-overlapping",
      "Jump Game: track max reachable index",
      "Huffman Encoding: greedy compression using min-heap",
      "Activity Selection: classic greedy problem, O(n log n)",
    ],
    codeExample: `# ── Jump Game — O(n) ─────────────────────────────────────────────
def can_jump(nums: list[int]) -> bool:
    """Can we reach the last index? Track max reachable position."""
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    return True

# ── Jump Game II (Min Jumps) — O(n) ──────────────────────────────
def jump(nums: list[int]) -> int:
    jumps = cur_end = furthest = 0
    for i in range(len(nums) - 1):
        furthest = max(furthest, i + nums[i])
        if i == cur_end:       # must jump here
            jumps += 1
            cur_end = furthest
    return jumps

# ── Non-overlapping Intervals — O(n log n) ────────────────────────
def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    """Minimum number of intervals to remove for non-overlapping."""
    intervals.sort(key=lambda x: x[1])   # sort by end time
    removed = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removed += 1
    return removed

# ── Assign Cookies — O(n log n) ───────────────────────────────────
def find_content_children(g: list[int], s: list[int]) -> int:
    """g = children's greed factor, s = cookie sizes."""
    g.sort(); s.sort()
    child = cookie = 0
    while child < len(g) and cookie < len(s):
        if s[cookie] >= g[child]:
            child += 1
        cookie += 1
    return child

# ── Gas Station — O(n) ───────────────────────────────────────────
def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost): return -1
    tank = start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            tank = 0; start = i + 1
    return start`,
    leetcodeProblems: [
      { name: "Jump Game", url: "https://leetcode.com/problems/jump-game/", difficulty: "Medium" },
      { name: "Jump Game II", url: "https://leetcode.com/problems/jump-game-ii/", difficulty: "Medium" },
      { name: "Non-overlapping Intervals", url: "https://leetcode.com/problems/non-overlapping-intervals/", difficulty: "Medium" },
      { name: "Gas Station", url: "https://leetcode.com/problems/gas-station/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Greedy Algorithms", url: "https://www.youtube.com/embed/HzeK7g8cD0Y" },
    ],
  },

  // ─────────────── 14. SLIDING WINDOW ───────────────
  {
    id: "sliding-window",
    title: "Sliding Window",
    category: "Sliding Window",
    difficulty: "Medium",
    description: "Maintain a window over a sequence — avoid O(n²) nested loops.",
    explanation: `The Sliding Window technique maintains a contiguous subarray/substring as a dynamic window. The right pointer expands the window; the left pointer shrinks it when a constraint is violated. This turns O(n²) brute force into O(n) by reusing previously computed work as the window slides.`,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(k) — k = distinct elements",
    keyConcepts: [
      "Fixed window: k elements always — slide right+1, remove left",
      "Variable window: expand right freely, shrink left when invalid",
      "Character frequency map for substring window problems",
      "When to shrink: when window violates the given constraint",
      "Answer: max or min window size satisfying constraint",
      "Two-pointer equivalence: for simple monotonic windows",
      "Monotonic Deque: sliding window maximum variant",
    ],
    codeExample: `from collections import defaultdict

# ── Longest Substring Without Repeating Characters — O(n) ─────────
def length_of_longest_substring(s: str) -> int:
    char_set = set()
    left = res = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.discard(s[left])
            left += 1
        char_set.add(s[right])
        res = max(res, right - left + 1)
    return res

print(length_of_longest_substring("abcabcbb"))  # 3

# ── Minimum Window Substring — O(n) ──────────────────────────────
def min_window(s: str, t: str) -> str:
    if not t: return ""
    need = defaultdict(int)
    for c in t: need[c] += 1
    missing = len(t)
    start = end = 0
    res = ""
    left = 0
    for right, c in enumerate(s):
        if need[c] > 0: missing -= 1
        need[c] -= 1
        if missing == 0:     # valid window found
            while need[s[left]] < 0:
                need[s[left]] += 1
                left += 1
            if not res or right - left + 1 < len(res):
                res = s[left:right+1]
            need[s[left]] += 1
            missing += 1; left += 1
    return res

# ── Maximum Sum Subarray of Size K — O(n) ─────────────────────────
def max_subarray_sum_k(arr: list[int], k: int) -> int:
    window = sum(arr[:k])
    max_sum = window
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]   # slide: add right, drop left
        max_sum = max(max_sum, window)
    return max_sum

# ── Longest Repeating Character Replacement — O(n) ────────────────
def character_replacement(s: str, k: int) -> int:
    """Max window where we replace at most k chars to get uniform string."""
    count = defaultdict(int)
    left = max_count = res = 0
    for right in range(len(s)):
        count[s[right]] += 1
        max_count = max(max_count, count[s[right]])
        if (right - left + 1) - max_count > k:
            count[s[left]] -= 1
            left += 1
        res = max(res, right - left + 1)
    return res`,
    leetcodeProblems: [
      { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
      { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard" },
      { name: "Longest Repeating Character Replacement", url: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "Medium" },
      { name: "Sliding Window Maximum", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" },
    ],
    videos: [
      { title: "Sliding Window — NeetCode", url: "https://www.youtube.com/embed/jM2dhDPYMQM" },
    ],
  },

  // ─────────────── 15. BIT MANIPULATION ───────────────
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    category: "Bit Manipulation",
    difficulty: "Medium",
    description: "Use bitwise ops to solve problems in O(1) space and crazy fast speed.",
    explanation: `Bit Manipulation operates directly on binary representations. Using AND, OR, XOR, NOT, and shifts allows O(1) space solutions to problems that would otherwise require extra data structures. XOR is especially powerful: a ^ a = 0 and a ^ 0 = a — perfect for finding unique elements.`,
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    keyConcepts: [
      "AND (&): both bits must be 1 — used for masking",
      "OR (|): at least one bit is 1 — used for setting bits",
      "XOR (^): bits differ — a^a=0, a^0=a — find unique element",
      "NOT (~): flip all bits",
      "Left Shift (<<): multiply by 2",
      "Right Shift (>>): divide by 2",
      "n & (n-1): clears the lowest set bit — count set bits",
      "n & (-n): isolates the lowest set bit",
    ],
    codeExample: `# ── Single Number — XOR O(n) O(1) ────────────────────────────────
def single_number(nums: list[int]) -> int:
    """Every element appears twice except one. XOR cancels pairs."""
    result = 0
    for n in nums:
        result ^= n
    return result

print(single_number([4, 1, 2, 1, 2]))  # 4

# ── Number of 1 Bits (Hamming Weight) — O(1) ─────────────────────
def hamming_weight(n: int) -> int:
    """n & (n-1) clears the lowest set bit each iteration."""
    count = 0
    while n:
        n &= (n - 1)   # remove lowest 1-bit
        count += 1
    return count

# ── Counting Bits 0..n — O(n) ────────────────────────────────────
def count_bits(n: int) -> list[int]:
    """dp[i] = dp[i >> 1] + (i & 1)  — right shift removes last bit."""
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

print(count_bits(5))  # [0,1,1,2,1,2]

# ── Missing Number — XOR O(n) O(1) ───────────────────────────────
def missing_number(nums: list[int]) -> int:
    """XOR all indices 0..n with all values — pairs cancel, missing remains."""
    n = len(nums)
    result = n
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result

# ── Reverse Bits — O(32) = O(1) ───────────────────────────────────
def reverse_bits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result

# ── Power of Two — O(1) ───────────────────────────────────────────
def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0`,
    leetcodeProblems: [
      { name: "Single Number", url: "https://leetcode.com/problems/single-number/", difficulty: "Easy" },
      { name: "Number of 1 Bits", url: "https://leetcode.com/problems/number-of-1-bits/", difficulty: "Easy" },
      { name: "Counting Bits", url: "https://leetcode.com/problems/counting-bits/", difficulty: "Easy" },
      { name: "Missing Number", url: "https://leetcode.com/problems/missing-number/", difficulty: "Easy" },
      { name: "Sum of Two Integers", url: "https://leetcode.com/problems/sum-of-two-integers/", difficulty: "Medium" },
    ],
    videos: [
      { title: "Bit Manipulation — NeetCode", url: "https://www.youtube.com/embed/NLKQEOgBAnw" },
    ],
  },
];

// ── Exports ────────────────────────────────────────────────────────
export const dsaTopicById = Object.fromEntries(dsaTopics.map(t => [t.id, t]));
export const dsaCategories = [...new Set(dsaTopics.map(t => t.category))];

