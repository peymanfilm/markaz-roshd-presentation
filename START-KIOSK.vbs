' ---------------------------------------------------------------------------
'  ارائهٔ «مرکز رشد» — نمایش تمام‌صفحه (Kiosk)
'  دابل‌کلیک: فایل START-DECK.html در حالت تمام‌صفحه باز می‌شود.
'  اگر Chrome یا Edge نصب نباشد، فایل در مرورگر پیش‌فرض باز می‌شود.
'  برای خروج از حالت تمام‌صفحه کلید Esc را بزنید.
' ---------------------------------------------------------------------------
Option Explicit

Dim shell, fso, base, deck, browsers, i, browser, url, iFile

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

base = fso.GetParentFolderName(WScript.ScriptFullName)
deck = base & "\START-DECK.html"

If Not fso.FileExists(deck) Then
  MsgBox "START-DECK.html پیدا نشد." & vbCrLf & vbCrLf & _
         "این پوشه باید کامل کپی شده باشد.", 16, "Markaz Roshd"
  WScript.Quit 1
End If

url = "file:///" & fso.GetAbsolutePathName(deck)

browsers = Array( _
  shell.ExpandEnvironmentStrings("%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"), _
  "C:\Program Files\Google\Chrome\Application\chrome.exe", _
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe", _
  shell.ExpandEnvironmentStrings("%LOCALAPPDATA%\Microsoft\Edge\Application\msedge.exe"), _
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe", _
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" _
)

browser = ""
For i = 0 To UBound(browsers)
  If browsers(i) <> "" And fso.FileExists(browsers(i)) Then
    browser = browsers(i)
    Exit For
  End If
Next

If browser <> "" Then
  shell.Run """" & browser & """ --kiosk --allow-file-access-from-files """ & url, 1, False
Else
  ' مرورگر پیش‌فرض (با پنجرهٔ معمولی)
  shell.Run url, 1, False
End If
