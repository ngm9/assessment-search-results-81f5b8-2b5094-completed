const MOCK_ASSESSMENTS = [
  { id: 1, title: "Machine Learning Fundamentals", domain: "AI / ML", duration: "45 min", level: "Basic" },
  { id: 2, title: "Neural Networks & Deep Learning", domain: "AI / ML", duration: "60 min", level: "Intermediate" },
  { id: 3, title: "DevOps Core Practices", domain: "DevOps", duration: "40 min", level: "Basic" },
  { id: 4, title: "CI/CD Pipeline Design", domain: "DevOps", duration: "55 min", level: "Intermediate" },
  { id: 5, title: "JavaScript DOM & Events", domain: "Frontend", duration: "30 min", level: "Basic" },
  { id: 6, title: "React Component Architecture", domain: "Frontend", duration: "50 min", level: "Intermediate" },
  { id: 7, title: "Python for Data Science", domain: "Data Science", duration: "45 min", level: "Basic" },
  { id: 8, title: "SQL Query Optimization", domain: "Data Engineering", duration: "35 min", level: "Basic" }
];

const fakeFetch = (topic) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (topic.trim().toLowerCase() === "error") {
        reject(new Error("Network response was not ok"));
        return;
      }
      const filtered = MOCK_ASSESSMENTS.filter(
        (a) =>
          a.title.toLowerCase().includes(topic.toLowerCase()) ||
          a.domain.toLowerCase().includes(topic.toLowerCase())
      );
      resolve(filtered);
    }, 800);
  });
};

const topicInput = document.getElementById("topic-input");
const searchBtn = document.getElementById("search-btn");
const loader = document.getElementById("loader");
const resultsContainer = document.getElementById("results-container");
const searchError = document.getElementById("search-error");

topicInput.addEventListener("input", () => {
  searchAssessments();
});

function searchAssessments() {
  const topic = topicInput.value;

  loader.hidden = false;
  searchError.textContent = "";
  resultsContainer.innerHTML = "";

  fakeFetch(topic)
    .then((assessments) => {
      loader.hidden = true;

      assessments.forEach((assessment) => {
        const card = document.createElement("div");
        card.innerHTML = `
          <div>${assessment.title}</div>
          <div>${assessment.domain}</div>
          <div>${assessment.duration} &bull; ${assessment.level}</div>
        `;
        resultsContainer.appendChild(card);
      });

      if (assessments.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "No assessments found. Try a different keyword.";
        resultsContainer.appendChild(empty);
      }
    })
    .catch((err) => {
      resultsContainer.innerHTML = "";
    });
}
