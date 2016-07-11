#!/bin/bash

rm -r build
polymer build --html.collapseWhitespace
firebase deploy
