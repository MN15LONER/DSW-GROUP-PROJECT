document.addEventListener("DOMContentLoaded", function () {
    fetch("../INCLUDES/fetch_user_reports.php")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("userReports");
        if (data.length === 0) {
            container.innerHTML = "<p>No reports submitted yet.</p>";
            return;
        }

        data.forEach(report => {
            const div = document.createElement("div");
            div.classList.add("report-box");
            div.innerHTML = `
                <p><strong>Type:</strong> ${report.crimeType}</p>
                <p><strong>Description:</strong> ${report.crimeDesc}</p>
                <p><strong>Location:</strong> ${report.latitude}, ${report.longitude}</p>
                <p><strong>Time:</strong> ${report.reportTime}</p>
                <button onclick="deleteReport(${report.id})">Delete</button>
                <hr>
            `;
            container.appendChild(div);
        });
    })
    .catch(err => {
        console.error("Error fetching reports:", err);
    });

  //Updating the password
  const form = document.getElementById("changePasswordForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const current = document.getElementById("currentPassword").value.trim();
    const newPass = document.getElementById("newPassword").value.trim();
    const repeatNew = document.getElementById("repeatNewPassword").value.trim();

    if (newPass !== repeatNew) {
      alert("New passwords do not match.");
      return;
    }

    fetch("../INCLUDES/change_password.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `current=${encodeURIComponent(current)}&new=${encodeURIComponent(newPass)}&confirm=${encodeURIComponent(repeatNew)}`
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong.");
      });
  });
});

function deleteReport(id) {
    if (!confirm("Are you sure you want to delete this report?")) return;

    fetch("../INCLUDES/delete_report.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `report_id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.querySelector(`button[onclick="deleteReport(${id})"]`).parentElement.remove();// Reload to show updated list
    })
    .catch(err => {
        console.error("Delete failed:", err);
        alert("Something went wrong.");
    });
}

// Fetch user info and populate the name and email fields
        fetch("../INCLUDES/get_user_info.php")
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              document.getElementById("profileName").value = data.fullname;
              document.getElementById("profileEmail").value = data.email;
            }
          })
          .catch(error => console.error("Error loading user info:", error));
