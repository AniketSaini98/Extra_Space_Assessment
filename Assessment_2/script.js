document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jsonData = formData.get("json_data");
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    });
    const data = await response.json();

    const tableBody = document.getElementById("jsonTableBody");
    tableBody.innerHTML = "";
    for (const [key, value] of Object.entries(data)) {
      const row = tableBody.insertRow();
      const keyCell = row.insertCell(0);
      const valueCell = row.insertCell(1);
      keyCell.textContent = key;
      valueCell.textContent = value;
    }
  });
