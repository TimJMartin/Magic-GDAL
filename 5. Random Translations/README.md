# Random Translations

This page holds all the different GDAL/OGR2OGR translations that I commonly use and thought I would share.

---
Export specific PostGIS table to a GeoPackage

```ogr2ogr -progress -gt 65000 -f GPKG Table.gpkg PG:"dbname=data user=x password=x host=x port=x" -nlt GEOMETRY_TYPE -nln NEW_TABLENAME -sql "SELECT * FROM schema_name.tablename" -a_srs EPSG:27700```

I use the -sql parameter so that I can control exactly the fields I want to export or even do some PostGIS functions during the export like ST_Buffer or ST_Transform

---

Export entire PostGIS schema to GPKG

```ogr2ogr --config PG_LIST_ALL_TABLES YES --config PG_SKIP_VIEWS YES -progress -gt 65000 -f GPKG Schema.gpkg PG:"dbname=data user=x password=x host=x port=x active_schema=schema_name schemas=schema_name"  -a_srs EPSG:27700```

The above uses some extra config parameters to make sure we get all tables and no views. We have also used the active_schema and schemas in the PG connection string to make sure we export just a single schema.

---

Export entire PostGIS schema to FileGDB

Similar to above but some differences because of the FileGDB parameters are different.

```ogr2ogr --config PG_LIST_ALL_TABLES YES --config PG_SKIP_VIEWS YES --config FGDB_BULK_LOAD YES -append -progress -gt 65000 -f "FileGDB" Schema.gdb -progress PG:"dbname=data user=x password=x host=x port=x active_schema=schema_name schemas=schema_name" -a_srs EPSG:27700```

The FileGDB can be bulk loaded so have included the __FGDB_BULK_LOAD YES__ parameter

---

Export table to GeoJSON using OSTN15

```ogr2ogr -progress -f GeoJSON Table.geojson PG:"dbname=x user=x password=x host=x port=x" -s_srs "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=C:\Proj4\OSTN15_NTv2_OSGBtoETRS.gsb" -t_srs EPSG:4326 -sql "SELECT * FROM schema_name.table_name" ```

This will export a GeoJSON file that can be opened in apps like geojson.io and QGIS.

**HOWEVER** the problem with this default export is the it uses the geoJSON 2008 Spec where the coordinate precision is set at 15 decimal places, for example it exports a point as

>"geometry": { "type": "Point", "coordinates": [ -0.904128717174183, 60.685660248261584 ] }

It is possible to set a new parameter that will use the RFC 7946 standard

```ogr2ogr -progress -lco RFC7946=YES -f GeoJSON Table.geojson PG:"dbname=x user=x password=x host=x port=x" -s_srs "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs +nadgrids=C:\Proj4\OSTN15_NTv2_OSGBtoETRS.gsb" -t_srs EPSG:4326 -sql "SELECT * FROM schema_name.table_name" ```

Which results in

>"geometry": { "type": "Point", "coordinates": [ -0.9041287, 60.6856602 ] }

For large files this will significantly reduce file sizes which is important if using the GeoJSON file in a web map application

---

Load file to a new schema in PostGIS

Sometimes I want to load a file into PostGIS and not have to open PGAdmin4 (urrrgghh) or the awesome DBeaver and create a schema to load the file into and the indexes I want to add afterwards.

Well amazingly you can do it entirely from ogr2ogr

```ogr2ogr -progress --config PG_USE_COPY YES -gt 65000 -f PostgreSQLPG:"dbname=x user=x password=x host=x port=5432" -a_srs EPSG:27700 -update -doo PRELUDE_STATEMENTS="DROP SCHEMA IF EXISTS new_schema CASCADE;CREATE SCHEMA new_schema;" -doo CLOSING_STATEMENTS="COMMIT;CREATE INDEX index_name_idx ON new_schema.table_name(attribute_name);"```

This means we can create a new schema, define the table structure, load the data and index all from one command - **GENIUS**

---
You can use gdaltindex to create an ESRI Shapefile showing the extent of a single or mutliple rasters and their filepaths

```gdaltindex -skip_different_projection -t_srs EPSG:27700 indexoutput.shp --optfile filelist.txt```