#!/bin/bash

echo $1
echo $2

echo starting django server

$ source $1/bin/activate

$ python $2/manage.py runserver


