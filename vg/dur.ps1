# How to use this script (it's super easy!)
# Create a CSV file. It only needs one column with the header "SamAccountName"
# Then populate the subsequent rows with the usernames of users that will be disabled.

# Please note that this script will remove all licenses so if the email needs to be preserved they'll need to be given an E2 manually after running
# Also be sure to put your name into the $name variable so it will show correctly in AD

# NOTE: this script was written with Powershell version 5 and is intended to be used with that verison. 

# If using Powershell version 6+ from Visual Studio Code, you'll need to install the MSOL Connect Module manually before running
# Import-Module MSOnlineConnect-MsolService
# Install-Module MSOnline
# Install-Module AzureAD
# Import-Module AzureAD
$tech = $env:UserName

# change this to $true if you want to be prompted to select a file.
# otherwise, $sourcefile is automatically set to \\pgnfile02\goodstuff$\NewUserAutomation\DeleteUser-Query.csv
$FileSelect = $false

$YourName = "Chris"
$desc_date = Get-Date -Format "MM/dd/yyyy"


#get date for log file name
$date_full = Get-Date -Format "MM-dd-yy HHmmss"

$dateDay = Get-Date -format "dd"
$dateMonth = Get-Date -format "MM"
$dateYear = Get-Date -format "yyyy"

$pathROOT = "\\pgnfile02\goodstuff$\NewUserAutomation\logs\"
$testPath = $pathROOT + $dateYear

$yearCheck = Test-Path $testPath

# Check if Year folder is there
if (!$yearCheck) {
    # IF there is NO folder with the Year...
    New-Item $testPath -ItemType Directory | Out-Null
    Write-Host "No folder found for the year $dateYear. I'll make one now!"

    # If there's no Year folder, there will obviously not be a month or date folder but I'm going to let this trickle down instead of making a separate case that will only fire once a year
}

$testPath = $testPath + "\" + $dateMonth
$monthCheck = Test-Path $testPath

# Check if Month folder is there
if (!$monthCheck) {
    # IF there is NO folder with the Month...
    New-Item $testPath -ItemType Directory | Out-Null
    Write-Host "No folder found for the month $dateMonth. I'll make one now!"
}


# construct path string
$path = "\\pgnfile02\goodstuff$\NewUserAutomation\logs\{0}\{1}\{2}_delete_users.txt" -f $dateYear, $dateMonth, $date_full

Start-Transcript -Path $path | Out-Null

$TargetOU = "OU=Disabled Users,OU=PathGroup - Disabled,DC=pathgroup,DC=com"

$index = 0

if ($FileSelect) {
    # open a dialogue box to select the CSV file
    Add-Type -AssemblyName System.Windows.Forms
    $FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{ 
        InitialDirectory = "\\pgnfile02\goodstuff$\NewUserAutomation\"
        Filter           = "CSV files (*.csv)|*.csv"
    }


    $null = $FileBrowser.ShowDialog()

    $sourcefile = $FileBrowser.FileName.ToString()

    if (!$sourcefile) {
        "No file selected! Stopping script."
        Exit
    }
    else {
        "
        Reading data from: {0}" -f $sourcefile
    }

    $DeleteUsers = Import-CSV $FileBrowser.FileName 
}
else {
    $sourcefile = "\\pgnfile02\goodstuff$\NewUserAutomation\System Access Request.csv"
    $DeleteUsers = Import-CSV $sourcefile
}

$DeleteUsers | Add-Member -NotePropertyName IsReady -NotePropertyValue ""
$DeleteUsers | Add-Member -NotePropertyName HasPathSys -NotePropertyValue ""
$DeleteUsers | Add-Member -NotePropertyName HasPhone -NotePropertyValue ""

"=================================================="

$TextInfo = (Get-Culture).TextInfo

if (!($DeleteUsers.count)) {
    "Deleting access for 1 user!"
}

else {
    "Deleting access for {0} users!" -f $DeleteUsers.Count
}

$today = Get-Date -Format "MM/dd/yyyy"

$index = 0

$longestNameLength = 0;
$longestNameIndex = 0;

$DeleteUsers | Add-Member -NotePropertyName FullName -NotePropertyValue ""

$DeleteUsers | ForEach-Object {

    $FirstName = ($DeleteUsers[$index].FirstName).trim()
    $MI = ($DeleteUsers[$index].MI).trim()
    $LastName = ($DeleteUsers[$index].LastName).trim()


    if (!$MI) {
        #if MI IS NULL
        $FullName = $FirstName + " " + $LastName
    }

    else {
        $FullName = $FirstName + " " + $MI + ". " + $LastName
        $BackUpName = $FirstName + " " + $LastName
    }

    $FullName = $TextInfo.ToTitleCase($FullName.ToLower())

    $DeleteUsers[$index].FullName = $FullName

    if ($FullName.Length -gt $longestNameLength) {
        $longestNameLength = $FullName.Length
        $longestNameIndex = $index
        $longestName = $FullName
    }


    $DeleteUsers[$index].FirstName = $FirstName
    $DeleteUsers[$index].MI = $MI
    $DeleteUsers[$index].LastName = $LastName
    $DeleteUsers[$index].FullName = $FullName

    $index++

}

$index = 0
$killSwitch = $false

$DeleteUsers | ForEach-Object {

    $FullName = $DeleteUsers[$index].FullName
    $FirstName = $DeleteUsers[$index].FirstName
    $LastName = $DeleteUsers[$index].LastName

    # New Form Stuff
    # $Name = $DeleteUsers[$index].["User Name"]
    # $Username = get-aduser -Filter {Name -like $Name}

    # using Ceiling here to always round up to the next 8
    $multiple = [math]::Ceiling($longestNameLength / 8)

    $goalLength = ($multiple * 8)
 

    if ( ($longestNameLength / 8) % 1 -eq 0) {

        #this number is evenly divisibly by 8 so it needs more spacing
        $goalLength += 2
    
    }
    else {

        #there's enough room already due to the string's length that we don't need to add more padding
    
    }

    $remainder = $goalLength - $FullName.Length

    for ($remainder -eq 0; $remainder--) {

        $FullName += " "
    
    }

    $dateDate = [datetime]($DeleteUsers[$index]."Date Needed")
    $date = $dateDate.ToString("MM/dd/yyyy")

    if ((get-date $today) -lt (get-date $date)) {

        $FullName = $FullName + "**** Not due yet, skipping **** "
        $DeleteUsers[$index].IsReady = $false
        #$killSwitch = $true
    }
    else {
        $DeleteUsers[$index].IsReady = $true
    }

    $testUsername = (Get-ADUser -Properties SamAccountName -Filter { givenname -like $FirstName -and surname -like $LastName }).SamAccountName

    # if testUsername var is blank (aka no result from Get-ADUser)
    if (!$testUsername) {
        "USER NOT FOUND: " + $FullName

        if ((get-date $today) -lt (get-date $date)) {
            "This isn't due today so I'll just skip it, but you'll want to correct it before you run this again."
            $DeleteUsers[$index].IsReady = $false
        }
        else {
            $killSwitch = $true
        }

    }
    else {

        $special = $DeleteUsers[$index]."Free Text Box"
        if (!$special) {
            "* " + $FullName + "(" + $date + ")"
        }
        else {
            "* " + $FullName + "(" + $date + ")" + " - " + $special
        }

    }

    $index++
    $testUsername = ""

}

if ($killSwitch) {
    "There are one or more errors with the users or request dates on this list. Please check the highlighted issues and resubmit."
    Exit
}

Read-Host "Press Enter to continue or Control + C to cancel the script..."
"=================================================="





#$cred = Get-Credential croy@pathgroup.com
# this doesn't work with Connect-AzureAD

#Install-Module -Name AzureAD
#Install-Module MSOnline
# Installation is only needed the first time per PC

# Connect to things
# Connect-AzureAD
"Connecting to MSOL Service. Please log in."
Connect-MsolService

$error.clear()
$loginFailed = $true

#input DA ACCOUNT HERE
if (!$cred) {
    "Now enter your DA account credentials."
    $cred = Get-Credential croyda@pathgroup.com
}

$check = Get-ADUser $tech -Credential $cred
$fails = 0

# not sure if this is working?
if ($error) {
    $error.Clear()
    while ($loginFailed -eq $true) {
        $fails++

        if ($fails -gt 2) {
            "You've tried too many times! Gonna stop this script before your account gets locked out."
            Exit
        }

        "Password incorrect! Try again"
        $cred = Get-Credential croyda@pathgroup.com

        get-aduser $tech -Credential $cred

        if (!$error) {
            "Password correct!"
            $loginFailed = $False
        }
    }
}

"=================================================="



$index = 0

$DeleteUsers | ForEach-Object {

    if ($DeleteUsers[$index].IsReady) {
        # TO DO - beacuse sometimes managers neglect to include middle initials into the form, it'd be best to test Firstname + Lastname and then throw MI in as a wildcard if that fails
        # we're also running into some issues where the MI is causing issues because it's not part of their actual username

        $requestor = $DeleteUsers[$index]."Requestor/Supervisor Name"

        $hasMI = $requestor.IndexOf(".")

        if ($hasMI -eq "-1") {
            # Only Two Names
            $loc = $requestor.IndexOf(" ");
            $len = $requestor.Length;
            $req_FirstName = $requestor.Substring(0, $loc);
            $req_LastName = $requestor.Substring($loc + 1, (($len - $loc) - 1));

            $req_FullName = (get-aduser -prop Name -filter { givenname -like $req_FirstName -and surname -like $req_LastName }).Name;
        }
        else {
            # Has MI
            $loc = $requestor.IndexOf(" ");
            $len = $requestor.Length;
            $req_FirstName = $requestor.Substring(0, $loc);
            $req_MI = $requestor.Substring($loc + 1, 1);
            $req_LastName = $requestor.Substring($loc + 4, (($len - $loc) - 4));

            $req_FullName = (get-aduser -prop Name -filter { givenname -like $req_FirstName -and initials -like $req_MI -and surname -like $req_LastName }).Name;
        }

        $firstname = ($DeleteUsers[$index].Firstname).trim()
        $MI = ($DeleteUsers[$index].MI).trim()
        $lastname = ($DeleteUsers[$index].Lastname).trim()

        if (!$MI) {
            #if MI IS NULL
            $FullName = $firstname + " " + $lastname
            $UserName = (get-aduser -prop SamAccountName -filter { givenname -like $firstname -and surname -like $lastname }).SamAccountName
        }

        else {
            $FullName = $firstname + " " + $MI + ". " + $lastname
            $UserName = (get-aduser -prop SamAccountName -filter { displayName -like $FullName }).SamAccountName

            # Backup Case - If there's a MI on the form but not in AD, 
            if (!$UserName) {
                $UserName = (get-aduser -prop SamAccountName -filter { givenname -like $firstname -and surname -like $lastname }).SamAccountName
            }
        }

        $FullName = $TextInfo.ToTitleCase($FullName.ToLower())

        # User Amanda Smith is an example
        # could use: If $fullnamne.count > 1 to look at each result and find the correct user
        # in a loop, get-aduser where samaccount = $FullName[i] AND manager = manager, loop until not null

        # (get-aduser -prop Manager -filter{SamAccountName -like $usernanme[i] -and Manager -like $req_FullName}).Manager
        # removing this from an IF statement because I don't think it's actually needed. If, in the rare case that there are two users with the same name (first and last) then the manager's name can be used to find the corret person
        if ($username.Count -eq 1) {
            # do nothing :)
        }
        elseif ($username.Count -eq 0) {
            "Something is wrong here. I wasn't able to find anyone named '" + $FullName + "'. Check the spelling and run this again."
            Stop-Transcript

            Invoke-Item $path
            Exit
        }

        else {

            "Error! More than one user with this first and last name has been found!"
            "Name: $FullName"
            "Possible usernames:"
            $in = 0;

            while ($in -lt $UserName.count) {
                $username[$in]
                $in++
            }

            $username = Read-Host "Enter the username to continue or just hit enter to exit the script"

            if (!$username) { 
                "Exiting script."
                Exit 
            }
        }

        if (!$req_FullName) {
            $req_FullName = "* " + $requestor + " *";
        }

 
        $Department = (Get-ADUser $UserName -Properties Department).Department

        $Title = (Get-ADUser $UserName -Properties Title).Title

        <#
        "Manager: " + $req_FullName
        "Title: " + $title
        "Date Entered: " + ([datetime]($DeleteUsers[$index].RequestDate)).ToString("MM/dd/yyyy h:mm tt")
        #>

        if ($Department -like "*Phlebotomy*") {
            if ($title -like "*Float*" -or $title -like "*Lead*" -or $Title -like "*Manager*") {
                $DeleteUsers[$index].HasPathSys = $true
            }
            else {
                # Don't output anything
            }
        }
        else {
            $DeleteUsers[$index].HasPathSys = $true
        }

        if ($title -like "*Supervisor*" -or $title -like "*Lead*" -or $Title -like "*Manager*" -or $Department -like "*IT*" -or $Department -like "Medical Information Integrity") {
            $DeleteUsers[$index].HasPhone = $true
        }

        # Remove all licenses
        # $upn = '{0}@pathgroup.com' -f $DeleteUsers[$index].SamAccountName
        $upn = $UserName + "@pathgroup.com"
        (get-MsolUser -UserPrincipalName $upn).licenses.AccountSkuId |
        ForEach-Object {

            Set-MsolUserLicense -UserPrincipalName $upn -RemoveLicenses $_

            # "The following license has been removed: {0}" -f $_
        }

        # Disable AD Account
        Disable-ADAccount -Identity $UserName
        # Replace description
        Set-ADUser -Identity $UserName -Description "Disabled by $YourName - $desc_date"
        # Move user to Disabled Users OU
        $UserDN = (Get-ADUser -Identity $UserName).distinguishedName 
        Move-ADObject -Identity $UserDN -TargetPath $TargetOU -Credential $cred

        if ($DeleteUsers[$index].HasPathSys) {
            # "{0} probably has PathSys. Please disable their PathSys account." -f $FullName
            "{0}: PATHSYS" -f $FullName
        }
        elseif ($DeleteUsers[$index].HasPhone) {
            "*** {0} probably has a phone. Check Verizon/MobileIron and let LouAnne know, and also check for any other hardare in Inventory." -f $FullName
        }
        else {
            "{0} has been disabled." -f $FullName
        }



        $notes = ($DeleteUsers[$index]."Free Text Box").trim()
        if (!$notes) {
            #if notes is NULL
            # do(nothing)
        }
     
        else {
            "Additional notes: " + $notes
        }

        # "=================================================="
    }
    else {
        
        "{0}: It's not time to do this yet, so I'm skipping it." -f $DeleteUsers[$index].FullName
    }

   

    # do this regardless of IsReady state
    $index++

    "----------"
}


$index = 0

$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri http://pgnexchrelay/PowerShell/ -Authentication Kerberos -Credential $cred

Import-PSSession $Session -DisableNameChecking

$DeleteUsers | ForEach-Object {

    if ($DeleteUsers[$index].IsReady) {

        $fn = $DeleteUsers[$index].FirstName 
        $ln = $DeleteUsers[$index].LastName
        $results = (get-aduser -Filter { GivenName -like $fn -and Surname -like $ln })

        if ($results -is [array]) {
            "There are too many users with this name and I can't figuer out which one you want to delete, so you should do it yourself."
    
        }
        else {
            $trueName = $results.Name
            Disable-RemoteMailbox -Identity $trueName -Archive -Confirm:$false
            "Mailbox archiving disabled for {0}" -f $trueName
        }

        $index++
    }
}
"All done!"

Stop-Transcript

Invoke-Item $path