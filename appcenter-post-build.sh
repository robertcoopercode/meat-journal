#!/usr/bin/env bash

echo "Running the post build script in the app center!"

# TODO, figure out how to stop the git clone from hanging up with Fastlane Match

# Upload directly to itunes connect
# if [ "$APPCENTER_BRANCH" == "master" ];
# then
#     sudo gem install fastlane
#     sudo gem install gh_inspector
#     cd $APPCENTER_SOURCE_DIRECTORY
#     cd ios
#     bundle exec fastlane ios appcenterPost password:$PASSWORD user:$USER ipa:$APPCENTER_OUTPUT_DIRECTORY/MeatJournal.ipa
# fi