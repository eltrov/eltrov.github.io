<# This part just generates a list. If it already exists you can skip this part
I've commented it out but I should be using code to check. Oh well.

# open a dialogue box to select the CSV file
Add-Type -AssemblyName System.Windows.Forms
$FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{ 
    InitialDirectory = "C:\Users\croy\OneDrive - PathGroup\blaseball"
    Filter = "CSV files (*.csv)|*.csv"
}
$null = $FileBrowser.ShowDialog()

$sourcefile = $FileBrowser.FileName.ToString()

""

"Reading data from: {0}" -f $sourcefile

$players = Import-CSV $FileBrowser.FileName 

# making empty LISTS
$firstNames = New-Object System.Collections.ArrayList
$lastNames = New-Object System.Collections.ArrayList

$index = 0;

$players | ForEach-Object {

$firstNames.Add($players[$index].firstName);
$lastNames.Add($players[$index].lastName);

$index++;
}

$path = "C:\Users\croy\OneDrive - PathGroup\blaseball\"

$firstNames | Out-File -FilePath "C:\Users\croy\OneDrive - PathGroup\blaseball\s1-firstNames.txt"
$lastNames | Out-File -FilePath "C:\Users\croy\OneDrive - PathGroup\blaseball\s1-lastNames.txt"
#>

if (!$firstNames) {
$firstNames = Get-Content "s1-firstnames.txt"
}

if (!$lastNames) {
$lastNames = Get-Content "s1-lastnames.txt"
}

$firstMax = $firstNames.Count - 1
$lastMax = $lastNames.Count - 1

$goal = Read-Host "How many names do you want?"

for ($i = 0; $i -lt $goal; $i++)
{

$rng1 = (0..$firstMax) | Get-Random -Count 1
$rng2 = (0..$lastMax) | Get-Random -Count 1

$bat1 =  (1..6) | Get-Random -Count 1
$bat2 =  (1..6) | Get-Random -Count 1
$bat3 =  (1..6) | Get-Random -Count 1
$bat = $bat1 + $bat2 + $bat3

$pitch1 =  (1..6) | Get-Random -Count 1
$pitch2 =  (1..6) | Get-Random -Count 1
$pitch3 =  (1..6) | Get-Random -Count 1
$pitch = $pitch1 + $pitch2 + $pitch3

$def1 =  (1..6) | Get-Random -Count 1
$def2 =  (1..6) | Get-Random -Count 1
$def3 =  (1..6) | Get-Random -Count 1
$def = $def1 + $def2 + $def3

$run1 =  (1..6) | Get-Random -Count 1
$run2 =  (1..6) | Get-Random -Count 1
$run3 =  (1..6) | Get-Random -Count 1
$run = $run1 + $run2 + $run3

$randFirst = $firstNames[$rng1]
$randLast = $lastNames[$rng2]

$randFirst + " " + $RandLast + " " + $bat1 + " " + $bat2 + " " + $bat3 + " " + $bat + " " + $pitch1 + " " + $pitch2 + " " + $pitch3 + " " + $pitch + " "+ $def1 + " " + $def2 + " " + $def3 + " " + $def + " "+ $run1 + " " + $run2 + " " + $run3 + " " + $run
}