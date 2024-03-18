# GDAL Installation and Setup

## Introduction

GDAL (Geospatial Data Abstract Library) underpins almost all geospatial data translation, including QGIS and FME. It is an incredible tool and is used across OS to convert, load and translate OS data. For GDTF to work we need to install and get it setup correctly before we can start data testing.

## Installation

There are multiple ways to install GDAL, especially for Windows, you can download executables, install for Python, and lots of other flavours. Below is the guide that has always worked for me and should be used.

Go to [GIS Internals](https://www.gisinternals.com/) and click on 'Stable Releases'

![image](..\Images\GDAL_Setup_1.png)

Then select the MSVC 2022 x64 release

![image](..\Images/GDAL_Setup_2.png)

Then download the gdal-3.8.1-1930-x64-core.msi

![image](..\Images/GDAL_Setup_3.png)

Once download launch the executable.

![image](..\Images/GDAL_Setup_4.png)
Click 'Next'

![image](..\Images/GDAL_Setup_5.png)
Click the licence acceptence

![image](..\Images/GDAL_Setup_6.png)
Choose 'Complete'

![image](..\Images/GDAL_Setup_7.png)
Click 'Install'

![image](..\Images/GDAL_Setup_8.png)
Click 'Finish'

This completes the installation and now comes the configuration.

## GDAL Configuration

To allow us to use GDAL like we need and to deal with OS data we need to configure it before we can use it. 

Click the Start button and search for 'Environment Variables' 

![image](..\Images/GDAL_Setup_9.png)
Click 'Environment Variables'

![image](..\Images/GDAL_Setup_10.png)
On this dialogue page we need to create and edit a few environment variables and edit the PATH environment variable. 

Under 'System variables' scroll down till you see 'Path', select the row and then click 'Edit'.

![image](..\Images/GDAL_Setup_11.png)
We need to make sure we use the installed GDAL version and not the one that comes with PostgreSQL+PostGIS, so we need to make sure the path to C:\Program Files\GDAL is above the C:\Program Files\PostgreSQL\16\bin. Use the Move Up and Move Down to accomplish this and then click 'Ok'.

Depending on the order you installed GDAL or PostgreSQL+PostGIS we need to edit the GDAL_DATA variable. 

![image](..\Images/GDAL_Setup_12.png)

You can see the current entry is looking at the PostgreSQL version, so select it and then click 'Edit' and change the it to point to the GDAL one.

![image](..\Images/GDAL_Setup_13.png)
Click 'Ok' to save those changes.

Finally we need to create a new System Variable called PROJ_LIB, so in the dialogue box click 'New' and enter in the following details and then click 'Ok'.
![image](..\Images/GDAL_Setup_14.png)

To make sure all of this has worked open a Powershell or Command Prompt window and type the following command

```
ogrinfo --version
```
This will display which GDAL has been found.

![image](..\Images/GDAL_Setup_15.png)
If this displays 3.8.1 we know this is correct as the version installed with PostrgeSQL is 3.7. 