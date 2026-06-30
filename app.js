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

function searchAssessments() {
  const topic = topicInput.value;

  loader.hidden = false;
  searchError.textContent = "";
  resultsContainer.innerHTML = "";
  resultsContainer.setAttribute("aria-busy", "true");

  fakeFetch(topic)
    .then((assessments) => {
      loader.hidden = true;
      resultsContainer.removeAttribute("aria-busy");

      if (assessments.length === 0) {
        const empty = document.createElement("p");
        empty.className = "results-empty";
        empty.textContent = "No assessments found. Try a different keyword.";
        resultsContainer.appendChild(empty);
        return;
      }

      const announcement = document.createElement("p");
      announcement.className = "visually-hidden";
      announcement.textContent = `${assessments.length} assessment${
        assessments.length === 1 ? "" : "s"
      } found.`;

      const list = document.createElement("ul");
      list.className = "results-list";

      assessments.forEach((assessment) => {
        const item = document.createElement("li");
        item.className = "assessment-card";
        item.innerHTML = `
          <h3 class="assessment-card__title">${assessment.title}</h3>
          <p class="assessment-card__domain">${assessment.domain}</p>
          <p class="assessment-card__meta">${assessment.duration} &bull; ${assessment.level}</p>
        `;
        list.appendChild(item);
      });

      resultsContainer.appendChild(announcement);
      resultsContainer.appendChild(list);
    })
    .catch((err) => {
      loader.hidden = true;
      resultsContainer.removeAttribute("aria-busy");
      resultsContainer.innerHTML = "";
      searchError.textContent =
        "Unable to load assessments. Please check your connection and try again.";
    });
}

searchBtn.addEventListener("click", searchAssessments);

topicInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchAssessments();
  }
});
