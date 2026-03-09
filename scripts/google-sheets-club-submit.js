/**
 * Google Apps Script: Club submissions → Google Sheet
 *
 * SETUP:
 * 1. Create a new Google Sheet for club submissions
 * 2. In the sheet, add headers in row 1: Name | Description | Meeting Time | Skill Level | Tags | Contact Email | Join Link | Submitted At
 * 3. Extensions → Apps Script
 * 4. Replace the default Code.gs with this script
 * 5. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the web app URL
 * 7. Add to your .env.local: ADD_CLUB_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const row = [
      data.name || '',
      data.description || '',
      data.meetingTime || '',
      data.skillLevel || '',
      Array.isArray(data.tags) ? data.tags.join(', ') : (data.tags || ''),
      data.contactEmail || '',
      data.joinLink || '',
      new Date().toISOString(),
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString(),
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
