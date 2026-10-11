/**
 * Dasara Live Portal → Google Sheet logger
 * Sheet: "Student Holly days class tracking"
 *
 * Setup (one time):
 *  1. Open the sheet → Extensions → Apps Script, paste this whole file, Save.
 *  2. Deploy → New deployment → type "Web app"
 *       Execute as: Me      Who has access: Anyone
 *  3. Copy the Web app URL (ends with /exec) into hari-school/.env.local:
 *       DASARA_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
 *       DASARA_SHEET_SECRET=<any random text, same as SECRET below>
 *  4. Restart the Next.js server.
 *
 * Every portal entry is added as a row in a tab named after the class
 * (e.g. "Class 7"). Tabs are created automatically on first entry.
 */

const SECRET = 'CHANGE_ME'; // must match DASARA_SHEET_SECRET in .env.local
const HEADERS = ['Date', 'Time', 'Roll Number', 'Student Name', 'Class'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json_({ ok: false, error: 'unauthorised' });

    const roll = String(body.roll || '').replace(/[^0-9]/g, '').slice(0, 10);
    const name = String(body.name || '').replace(/[^A-Za-z. ]/g, '').trim().slice(0, 60);
    const grade = String(body.grade || '').replace(/[^A-Za-z0-9&() .-]/g, '').trim().slice(0, 40);
    if (!roll || !name || !grade) return json_({ ok: false, error: 'missing fields' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let sheet = ss.getSheetByName(grade);
      if (!sheet) {
        sheet = ss.insertSheet(grade);
        sheet.appendRow(HEADERS);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#FFEDE9');
        sheet.setFrozenRows(1);
      }
      const now = new Date();
      const tz = 'Asia/Kolkata';
      // Leading apostrophe keeps roll numbers like "007" as text
      sheet.appendRow([
        Utilities.formatDate(now, tz, 'dd-MM-yyyy'),
        Utilities.formatDate(now, tz, 'hh:mm a'),
        "'" + roll,
        name,
        grade,
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
