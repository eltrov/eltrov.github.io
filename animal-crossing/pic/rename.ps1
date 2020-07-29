# Get-ChildItem *.png | Rename-Item -NewName { $_.Name -replace 'sakana_', 'f0' }

Get-ChildItem *.png | Rename-Item -NewName { $_.Name -replace '_i(1)', '' }