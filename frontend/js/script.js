// Function to mark an exercise as complete
function markExerciseComplete(exerciseId) {
  const exercise = document.getElementById(exerciseId);
  exercise.classList.toggle("completed");

  // Check/uncheck all sets when marking exercise as complete/incomplete
  const checkboxes = exercise.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(
    (checkbox) => (checkbox.checked = exercise.classList.contains("completed"))
  );

  // Save progress to localStorage
  saveProgress();
}

// Function to save progress to localStorage
function saveProgress() {
  const exercises = document.querySelectorAll(".exercise");
  const progress = {};

  exercises.forEach((exercise) => {
    const exerciseId = exercise.id;
    const checkboxes = exercise.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = Array.from(checkboxes).map(
      (checkbox) => checkbox.checked
    );
    progress[exerciseId] = {
      completed: exercise.classList.contains("completed"),
      sets: checkboxStates,
    };
  });

  localStorage.setItem("pushWorkoutProgress", JSON.stringify(progress));
}

// Function to load progress from localStorage
function loadProgress() {
  const savedProgress = localStorage.getItem("pushWorkoutProgress");
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    Object.keys(progress).forEach((exerciseId) => {
      const exercise = document.getElementById(exerciseId);
      if (exercise) {
        if (progress[exerciseId].completed) {
          exercise.classList.add("completed");
        }

        const checkboxes = exercise.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox, index) => {
          checkbox.checked = progress[exerciseId].sets[index];
        });
      }
    });
  }
}

// Load progress when the page loads
document.addEventListener("DOMContentLoaded", loadProgress);

// Save progress when individual sets are checked/unchecked
document.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    saveProgress();
  }
});
