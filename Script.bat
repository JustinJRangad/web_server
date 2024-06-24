@echo off
setlocal enabledelayedexpansion

set "functionName=myFunction"
set "inFunction=0"

rem Clear the output file
> function.txt echo:

rem Read the source file line by line
for /F "tokens=*" %%A in (source.c) do (
    set "line=%%A"

    rem Check if the line contains the start of the function
    if not !inFunction!==1 (
        echo !line! | findstr /C:"%functionName%(" >nul
        if !errorlevel! == 0 (
            set "inFunction=1"
        )
    )

    rem If inside the function, write the line to the output file
    if !inFunction! == 1 (
        echo !line! >> function.txt

        rem Check if the line contains the end of the function
        echo !line! | findstr /R /C:"^}" >nul
        if !errorlevel! == 0 (
            set "inFunction=0"
        )
    )
)
endlocal
