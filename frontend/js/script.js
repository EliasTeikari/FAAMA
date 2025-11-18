function markExerciseComplete(exerciseId) {
  const exercise = document.getElementById(exerciseId);
  exercise.classList.toggle("completed");

  const checkboxes = exercise.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(
    (checkbox) => (checkbox.checked = exercise.classList.contains("completed"))
  );

  saveProgress();
}

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

document.addEventListener("DOMContentLoaded", loadProgress);

document.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    saveProgress();
  }
});
