@echo off
setlocal enabledelayedexpansion

set "functionName=myFunction"
set "directory=C:\path\to\directory"

rem Change to the target directory
cd /d "%directory%"

rem Iterate through all .c files in the directory
for %%F in (*.c) do (
    rem Use findstr to search for the function definition
    for /f "tokens=1,* delims=:" %%A in ('findstr /n /C:"%functionName%(" "%%F"') do (
        echo Function found in file: %%F on line: %%A
    )
)

endlocal
