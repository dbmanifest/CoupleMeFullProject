#!/bin/bash

# # List of GitHub repositories (GitHub URLs)
repos=("git@github.com:xartgenerator/digifab_fastapi.git")

# repos=("git@github.com:dbmanifest/discosback_landingpage.git")
# Loop through each repository

# Loop through each repository
for repo in "${repos[@]}"
do
    git clone $repo
    git clone
done

# echo "All repositories have been processed."
# RUNPOD_API_KEY="DNVAO711YH8EQJAK8Y0L7DAS132CDM3WW4B33JFY"
# runpodctl config --apiKey $RUNPOD_API_KEY
# POD_ID="jjgzmcnggv7pfa"
# # runpodctl remove pod $POD_ID
# echo "Pod $POD_ID has been deleted."
# vercel remove digifab-fastapi --yes --scope VirtualArmour
# vercel remove virtual-armour --yes --scope VirtualArmour


echo "Vercel Deployment $DEPLOYMENT_ID has been deleted."