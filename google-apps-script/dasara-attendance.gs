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
 * Student entries are added to a tab named after the class (e.g. "Class 7").
 * Teacher entries go to the "Teachers" tab. Tabs are created automatically.
 * After changing this code: Deploy -> Manage deployments -> Edit -> New version.
 */

const SECRET = 'CHANGE_ME'; // must match DASARA_SHEET_SECRET in .env.local
const HEADERS = ['Date', 'Time', 'Roll Number', 'Student Name', 'Class'];
const TEACHER_TAB = 'Teachers';
const TEACHER_HEADERS = ['Date', 'Time', 'Teacher Name', 'Class', 'Subject'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json_({ ok: false, error: 'unauthorised' });

    const isTeacher = body.role === 'teacher';
    const roll = String(body.roll || '').replace(/[^0-9]/g, '').slice(0, 10);
    const name = String(body.name || '').replace(/[^A-Za-z. ]/g, '').trim().slice(0, 60);
    const grade = String(body.grade || '').replace(/[^A-Za-z0-9&() .-]/g, '').trim().slice(0, 40);
    const subject = String(body.subject || '').replace(/[^A-Za-z0-9&,. -]/g, '').trim().slice(0, 40);
    if (isTeacher ? !name || !grade || !subject : !roll || !name || !grade) {
      return json_({ ok: false, error: 'missing fields' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const tabName = isTeacher ? TEACHER_TAB : grade;
      const headers = isTeacher ? TEACHER_HEADERS : HEADERS;
      let sheet = ss.getSheetByName(tabName);
      if (!sheet) {
        sheet = ss.insertSheet(tabName);
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#FFEDE9');
        sheet.setFrozenRows(1);
      }
      const now = new Date();
      const tz = 'Asia/Kolkata';
      const date = Utilities.formatDate(now, tz, 'dd-MM-yyyy');
      const time = Utilities.formatDate(now, tz, 'hh:mm a');
      // Leading apostrophe keeps roll numbers like "007" as text
      sheet.appendRow(isTeacher ? [date, time, name, grade, subject] : [date, time, "'" + roll, name, grade]);
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
