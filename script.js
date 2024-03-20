// Add event listener for keypress event on the document
document.addEventListener("keypress", function(event) {
  // Check if the pressed key is Enter
  if (event.key === "Enter") {
    // Call the handleSubmit function
    handleSubmit();
  }
});

// Add click event listener for the submit button
document.getElementById("submit").addEventListener("click", function() {
  // Call the handleSubmit function
  handleSubmit();
});

// Define handleSubmit function to handle the form submission
function handleSubmit() {
  const n = parseInt(document.getElementById("nInput").value);
  const headID = parseInt(document.getElementById("headIDInput").value);
  const managerInput = document.getElementById("managerInput").value;
  const manager = managerInput.split(",").map(Number);
  const informTimeInput = document.getElementById("informTimeInput").value;
  const informTime = informTimeInput.split(",").map(Number);

  // Calculate the result
  const result = numOfMinutes(n, headID, manager, informTime);

  // Display the result in the output element
  document.getElementById("output").innerText =
    "Time needed to inform all employees: " + result;
}

// Define the numOfMinutes function to perform the calculation
const numOfMinutes = function(n, headID, manager, informTime) {
  const map = {};

  // Build adjacency list representation of the hierarchy
  for (let i = 0; i < manager.length; i++) {
    if (!map[manager[i]]) {
      map[manager[i]] = [i];
    } else {
      map[manager[i]].push(i);
    }
  }

  let res = 0;

  // Depth-first search to calculate the time
  const dfs = (node, time) => {
    if (map[node]) {
      for (let curr of map[node]) {
        dfs(curr, time + informTime[curr]);
      }
    } else {
      res = Math.max(res, time);
    }
  };

  // Start DFS from the head
  dfs(headID, informTime[headID]);

  return res;
};
