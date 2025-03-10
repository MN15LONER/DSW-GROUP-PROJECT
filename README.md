hERE ARE THE USE CASES:
📌 Use Case 1: Crime Reporting
Actors:
Registered User
Anonymous User
System Administrator
Preconditions:
User has access to the website.
User is either logged in or using the anonymous reporting option.
Basic Flow:
User navigates to the "Report a Crime" page.
User fills in the crime details (location, type of crime, time, description).
User selects the reporting mode: Anonymous or Logged-in.
User submits the report.
System stores the report and sends it for verification.
If verified, the report appears on the Live Crime Map.
Alternative Flow:
If a required field is missing, the system prompts the user to complete it.
If the system detects a duplicate report, it warns the user before submission.
Postconditions:
The crime report is stored in the database.
Verified reports are displayed on the crime map.


📌 Use Case 2: Viewing Live Crime Hotspots
Actors:
General Public
Registered User
Preconditions:
User has internet access.
The system has existing crime data.
Basic Flow:
User visits the "Crime Hotspots" page.
The system loads an interactive map with recent crime reports.
User can filter crimes by type (e.g., theft, assault, car hijacking).
User can view details of a specific report.
User can zoom in/out and switch map views (e.g., heatmap).
Alternative Flow:
If no recent reports exist, the system displays a message: "No recent reports in your area."
Postconditions:
User gets updated information on crime trends.


📌 Use Case 3: Subscribing to Safety Alerts
Actors:
Registered User
Preconditions:
User is logged into the system.
Basic Flow:
User navigates to the "Safety Alerts" section.
User enters their location and selects preferred alert types.
User chooses the notification method (SMS or Email).
User clicks "Subscribe."
System stores the preferences and sends alerts when relevant crime reports are submitted.
Alternative Flow:
If user enters an invalid email/phone number, the system prompts for correction.
If the system fails to send an alert, a retry mechanism is triggered.
Postconditions:
User receives real-time crime alerts based on their preferences.


📌 Use Case 4: Accessing Emergency Contacts
Actors:
Any User
Preconditions:
The system has a database of emergency contacts.
Basic Flow:
User navigates to the "Emergency Contacts" page.
System displays SAPS, private security, medical, and community patrol contacts.
User clicks a quick-dial button to call or send an alert.
Alternative Flow:
If a contact is outdated, users can report it to admins for updating.
Postconditions:
User successfully contacts emergency services.


📌 Use Case 5: Joining a Community Crime Prevention Group
Actors:
Registered User
Preconditions:
User is logged into their account.
Basic Flow:
User visits the "Community Groups" page.
System lists neighborhood watch groups and crime prevention forums.
User selects a group and clicks “Join.”
System sends a request to the group admin.
If approved, user gains access to group discussions and alerts.
Alternative Flow:
If the group is full, the user is placed on a waiting list.
Postconditions:
User is successfully added to a crime prevention group.


📌 Use Case 6: Business & Home Security Ratings
Actors:
Registered User
Preconditions:
User is logged into the system.
Basic Flow:
User visits the "Safety Ratings" page.
User searches for a business or location.
System displays community safety reviews.
User leaves a rating and review (e.g., “Safe parking,” “Poor lighting”).
System updates the location’s average safety score.
Alternative Flow:
If a business does not exist in the database, users can add it for review.
Postconditions:
The public gets valuable safety insights about locations.
