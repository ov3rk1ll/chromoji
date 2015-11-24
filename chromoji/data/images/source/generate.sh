#!/bin/bash

 sizes=(16 19 32 38 48 64 128)

for FILE in *.png;
do
echo $FILE;

filename="${FILE%.*}"
echo $filename;
for index in "${sizes[@]}"
do
echo "${index}";
    convert "$FILE" -resize ${index} "../${filename}-${index}.png"
done
done
