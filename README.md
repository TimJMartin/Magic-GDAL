# The Magic of GDAL Workshop

This repo contains the workshop materials put together for FOSS4G Uk 2019 held in Edinburgh. It should contain all the relevent information, instructions and data to workthrough each of the different parts. If you find issues or have any comments please raise an Issue as I aim to keep this workshop evolving as GDAL continues to develop.

## Background

"GDAL is a translator library for raster and vector geospatial data formats that is released under an X/MIT style Open Source License by the Open Source Geospatial Foundation" (source: [GDAL](https://gdal.org/))

To me it is an invaluable asset to my GIS Toolkit and I use it most days to process some sort of data from one type to another. However I keep hearing that because it is mostly commandline or used within scripts it can put people off using it so defer to alternatives (even though those alternatives are commonly built on top of GDAL, [see list here](https://gdal.org/software_using_gdal.html#software-using-gdal).

So the purpose of this workshop is to getting users setup with GDAL and get them translating and processing a variety of different datasets (both vector and raster) using a wide range of the tools and paramaters that GDAL offers.

The workshop is broken down into different parts to help users flow through the workshop or jump into a specific section that they require.

1. __Installation__ - a guide on how to install GDAL for your operating system
2. __Getting Started__ - an introduction to some of the command line utilities
3. __Vector Data__ - using ogr for processing vector data
4. __Raster Data__ - using gdal programs for raster data
5. __Random Translations__ - a list of lots of different GDAL and OGR commands I use.

## Usuage

Download this repo either using git using __clone__ directly or the download it in the top right hand corner.

I would then recommend opening the folder (unzip it if required) in a good text editor like Visual Studio Code or Atom Editor, and then open each markdown readme file and then run the GDAL commands in Command Prompt rather than PowerShell on Windows, on Linux and OSX the terminal will work fine.

## Feedback

This workshop is intended to help all types of uses with beginner and advance examples. I have tried to include and cover as much however as GDAL gets updated some of the information included 

## Future Developments

I intend to add:

- some examples of scripting in NodeJS and Python using some of the commands included in the workshop
- COG - Cloud Optimised GeoTiff is really exciting new format added for version 3.1

## Licence and Copyright Acknowledgement

Data found in the /Data folder is taken from a variety of different OS Open Data products these include

- 1:250 000 Scale Raster
- OS Terrain 50 Grid
- OS Open Zoomstack
- OS Open GreenSpace

This therefore requires me to add the following acknowledgement.

>Contains OS data © Crown Copyright [and database right] 2019
