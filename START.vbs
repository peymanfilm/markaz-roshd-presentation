' ---------------------------------------------------------------------------
'  ارائهٔ «مرکز رشد» — اجرای نسخهٔ کامل برنامه
'  با دابل‌کلیک، بدون CMD و بدون نصب هیچ برنامه‌ای.
'
'  این اسکریپت یک Node همراهِ پوشه (runtime\node.exe) را پنهان اجرا می‌کند،
'  صبر می‌کند تا سرور بالا بیاید و بعد مرورگر پیش‌فرض را باز می‌کند.
' ---------------------------------------------------------------------------
Option Explicit

Dim shell, fso, base, nodeExe, startJs, url, i

Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

base = fso.GetParentFolderName(WScript.ScriptFullName)
nodeExe = base & "\runtime\node.exe"
startJs = base & "\runtime\start.js"
url = "http://127.0.0.1:3210"

If Not fso.FileExists(nodeExe) Then
  MsgBox "runtime\node.exe پیدا نشد." & vbCrLf & vbCrLf & _
         "این پوشه باید کامل کپی شده باشد. فایل‌های runtime را دوباره کپی کنید.", _
         16, "Markaz Roshd"
  WScript.Quit 1
End If

If Not fso.FileExists(startJs) Then
  MsgBox "runtime\start.js پیدا نشد." & vbCrLf & vbCrLf & _
         "این پوشه باید کامل کپی شده باشد. فایل‌های runtime را دوباره کپی کنید.", _
         16, "Markaz Roshd"
  WScript.Quit 1
End If

' اجرای پنهان سرور (بدون پنجرهٔ کنسول)
shell.Run """" & nodeExe & """ """ & startJs & """", 0, False

' انتظار برای بالا آمدن سرور
For i = 1 To 80
  WScript.Sleep 500
  If ServerReady(url) Then
    shell.Run url, 1, False
    WScript.Quit 0
  End If
Next

MsgBox "سرور در ۴۰ ثانیه بالا نیامد." & vbCrLf & vbCrLf & _
       "اگر قبلاً یک نسخه در حال اجراست، پنجرهٔ مرورگر را ببندید و دوباره تلاش کنید." & vbCrLf & _
       "راه‌حل جایگزین: فایل START-DECK.html را باز کنید (بدون نیاز به سرور).", _
       48, "Markaz Roshd"

' ---------------------------------------------------------------------------
Function ServerReady(u)
  Dim http
  On Error Resume Next
  ServerReady = False
  Set http = CreateObject("MSXML2.XMLHTTP")
  If Err.Number <> 0 Then
    Err.Clear
    Exit Function
  End If
  http.Open "GET", u, False
  http.SetRequestHeader "Range", "bytes=0-64"
  http.Send
  If Err.Number = 0 Then
    If http.Status >= 200 And http.Status < 500 Then ServerReady = True
  End If
  Err.Clear
End Function
