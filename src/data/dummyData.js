const topics = [
  "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack",
  "Binary Search", "Linked List", "Trees", "Tries", "Backtracking",
  "Heap / Priority Queue", "Graphs", "Advanced Graphs",
  "1-D DP", "2-D DP", "Greedy", "Intervals", "Math & Geometry", "Bit Manipulation"
];

const companies = ["Amazon", "Google", "Meta", "Microsoft", "Apple", "Netflix", "Bloomberg", "Uber", "Any"];

export const generateTasks = () => {
  const tasks = [];
  const startDate = new Date();
  
  for (let i = 1; i <= 180; i++) {
    const isMockInterview = i % 14 === 0;
    const focusArea = isMockInterview ? "Mock Interview" : (i % 5 === 0 ? "System Design" : "DSA");
    const topic = topics[Math.floor((i - 1) / 10) % topics.length];
    
    const taskDate = new Date(startDate);
    taskDate.setDate(startDate.getDate() + i - 1);
    
    tasks.push({
      id: i,
      day: i,
      date: taskDate.toISOString().split('T')[0],
      topic: isMockInterview ? "Full Syllabus" : (focusArea === "System Design" ? "System Design Basics" : topic),
      focusArea: focusArea,
      problems: isMockInterview ? "1x Coding, 1x SD" : `Solve 2-3 prob. on ${topic}`,
      companyTag: companies[Math.floor(Math.random() * companies.length)],
      status: "Pending"
    });
  }
  
  return tasks;
};
