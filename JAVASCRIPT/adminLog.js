document.addEventListener("DOMContentLoaded", () => {
  fetch("../INCLUDES/fetch_admin_reports.php")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data.error) {
        console.error('Server error:', data.error);
        alert('Error loading reports: ' + data.error);
        return;
      }

      const urgentContainer = document.getElementById("urgentReports");
      const pendingContainer = document.getElementById("pendingReports");

      // Clear containers first
      urgentContainer.innerHTML = '';
      pendingContainer.innerHTML = '';

      if (data.length === 0) {
        urgentContainer.innerHTML = '<p>No urgent reports</p>';
        pendingContainer.innerHTML = '<p>No pending reports</p>';
        return;
      }

      data.forEach(report => {
        const card = document.createElement("div");
        card.classList.add("report-card", report.type);

        card.innerHTML = `
          <h3>${report.crimeType || "Emergency Report"}</h3>
          <p><strong>Description:</strong> ${report.crimeDesc || 'No description available'}</p>
          <p><strong>Location:</strong> ${report.latitude || 'N/A'}, ${report.longitude || 'N/A'}</p>
          <p><strong>Time:</strong> ${report.reportTime || 'N/A'}</p>
        `;

        if (report.type === "urgent") {
          urgentContainer.appendChild(card);
        } else {
          pendingContainer.appendChild(card);
        }
      });
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Error loading reports. Check console for details.');
    });
});